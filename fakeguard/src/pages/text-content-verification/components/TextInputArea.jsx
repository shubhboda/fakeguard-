import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TextInputArea = ({ text, setText, onVerify, isProcessing, characterLimit = 5000 }) => {
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);
  const recognition = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setText(prev => prev + ' ' + finalTranscript);
        }
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [setText]);

  const handleVoiceInput = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(prev => prev + clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    setText('');
    textareaRef.current?.focus();
  };

  const remainingChars = characterLimit - text.length;
  const isOverLimit = remainingChars < 0;

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Enter Text Content
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            iconName="Clipboard"
            iconPosition="left"
            disabled={isProcessing}
          >
            Paste
          </Button>
          {recognition.current && (
            <Button
              variant={isListening ? "destructive" : "ghost"}
              size="sm"
              onClick={handleVoiceInput}
              iconName={isListening ? "MicOff" : "Mic"}
              iconPosition="left"
              disabled={isProcessing}
            >
              {isListening ? 'Stop' : 'Voice'}
            </Button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type the text content you want to verify for misinformation. Include news articles, social media posts, claims, or any text-based content..."
          className="w-full h-64 md:h-80 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-input text-foreground placeholder:text-muted-foreground"
          disabled={isProcessing}
        />
        
        {isListening && (
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Listening...</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-caption ${
            isOverLimit ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {text.length.toLocaleString()} / {characterLimit.toLocaleString()} characters
          </span>
          
          {text.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              iconName="X"
              iconPosition="left"
              disabled={isProcessing}
            >
              Clear
            </Button>
          )}
        </div>

        <Button
          variant="default"
          onClick={onVerify}
          disabled={!text.trim() || isOverLimit || isProcessing}
          loading={isProcessing}
          iconName="Shield"
          iconPosition="left"
        >
          Verify Text
        </Button>
      </div>

      {isOverLimit && (
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-destructive)" />
            <span className="text-sm text-destructive">
              Text exceeds character limit. Please reduce content length.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInputArea;