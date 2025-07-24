import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UrlInputForm = ({ onAnalyze, isAnalyzing }) => {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const validateUrl = (inputUrl) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(inputUrl);
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    
    if (value && !validateUrl(value)) {
      setUrlError('Please enter a valid URL');
    } else {
      setUrlError('');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (text && !validateUrl(text)) {
        setUrlError('Please enter a valid URL');
      } else {
        setUrlError('');
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setUrlError('URL is required');
      return;
    }
    if (!validateUrl(url)) {
      setUrlError('Please enter a valid URL');
      return;
    }
    onAnalyze(url);
  };

  const handleBrowserExtension = () => {
    // Mock browser extension integration
    alert('Browser extension would be launched here. Install FakeGuard extension for seamless verification.');
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Link" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Article URL Analysis</h2>
          <p className="text-sm text-muted-foreground">Enter a news article URL to verify its credibility</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            label="Article URL"
            type="url"
            placeholder="https://example.com/news-article"
            value={url}
            onChange={handleUrlChange}
            error={urlError}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-8 p-1 text-muted-foreground hover:text-foreground transition-smooth"
            title="Paste from clipboard"
          >
            <Icon name="Clipboard" size={16} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isAnalyzing}
            disabled={!url.trim() || !!urlError}
            iconName="Search"
            iconPosition="left"
            className="flex-1"
          >
            {isAnalyzing ? 'Analyzing Article...' : 'Analyze Article'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleBrowserExtension}
            iconName="Puzzle"
            iconPosition="left"
            className="sm:w-auto"
          >
            Browser Extension
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-secondary mt-0.5" />
          <div className="text-sm">
            <p className="text-foreground font-medium mb-1">Quick Tips:</p>
            <ul className="text-muted-foreground space-y-1">
              <li>• Paste URLs directly from social media or news sites</li>
              <li>• Install our browser extension for one-click verification</li>
              <li>• Analysis typically takes 10-30 seconds depending on article length</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlInputForm;