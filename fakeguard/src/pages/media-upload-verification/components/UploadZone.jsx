import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const supportedFormats = [
    { type: 'Images', formats: 'JPG, PNG, GIF, WEBP', maxSize: '10MB' },
    { type: 'Videos', formats: 'MP4, MOV, AVI, MKV', maxSize: '100MB' }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 lg:p-12 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5'
        } ${isProcessing ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Upload Icon */}
        <div className="mb-6">
          <div className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${
            isDragOver ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
          }`}>
            <Icon name="Upload" size={32} />
          </div>
        </div>

        {/* Main Text */}
        <div className="mb-6">
          <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
            Upload Media for Verification
          </h3>
          <p className="text-muted-foreground text-sm lg:text-base">
            Drag and drop your files here, or click to browse
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button
            variant="default"
            onClick={handleBrowseClick}
            iconName="FolderOpen"
            iconPosition="left"
            disabled={isProcessing}
          >
            Browse Files
          </Button>
          <Button
            variant="outline"
            onClick={handleCameraClick}
            iconName="Camera"
            iconPosition="left"
            disabled={isProcessing}
            className="sm:hidden"
          >
            Take Photo
          </Button>
        </div>

        {/* Supported Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          {supportedFormats.map((format, index) => (
            <div key={index} className="bg-card rounded-lg p-3 border border-border">
              <div className="flex items-center space-x-2 mb-1">
                <Icon 
                  name={format.type === 'Images' ? 'Image' : 'Video'} 
                  size={16} 
                  className="text-primary" 
                />
                <span className="text-sm font-medium text-foreground">{format.type}</span>
              </div>
              <p className="text-xs text-muted-foreground">{format.formats}</p>
              <p className="text-xs text-muted-foreground">Max: {format.maxSize}</p>
            </div>
          ))}
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-card/80 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Processing files...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadZone;