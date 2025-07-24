import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FilePreview = ({ files, onRemoveFile, onAnalyzeFiles }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return 'Image';
    if (file.type.startsWith('video/')) return 'Video';
    return 'File';
  };

  const isImage = (file) => file.type.startsWith('image/');
  const isVideo = (file) => file.type.startsWith('video/');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Selected Files ({files.length})
        </h3>
        <Button
          variant="default"
          onClick={onAnalyzeFiles}
          iconName="Search"
          iconPosition="left"
          disabled={files.length === 0}
        >
          Analyze Files
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <div key={index} className="bg-card rounded-lg border border-border overflow-hidden shadow-card">
            {/* File Preview */}
            <div className="aspect-video bg-muted relative overflow-hidden">
              {isImage(file) ? (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : isVideo(file) ? (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                 
                  muted
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name={getFileIcon(file)} size={48} className="text-muted-foreground" />
                </div>
              )}
              
              {/* Remove Button */}
              <button
                onClick={() => onRemoveFile(index)}
                className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-md"
              >
                <Icon name="X" size={16} />
              </button>

              {/* File Type Badge */}
              <div className="absolute bottom-2 left-2">
                <span className="inline-flex items-center space-x-1 px-2 py-1 bg-card/90 text-xs font-medium text-foreground rounded-md border border-border">
                  <Icon name={getFileIcon(file)} size={12} />
                  <span>{isImage(file) ? 'Image' : isVideo(file) ? 'Video' : 'File'}</span>
                </span>
              </div>
            </div>

            {/* File Info */}
            <div className="p-3">
              <h4 className="text-sm font-medium text-foreground truncate mb-1" title={file.name}>
                {file.name}
              </h4>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{formatFileSize(file.size)}</span>
                <span>{file.type.split('/')[1]?.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Batch Actions */}
      {files.length > 1 && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Batch Processing</h4>
              <p className="text-xs text-muted-foreground">
                Analyze all {files.length} files simultaneously for faster results
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => files.forEach((_, index) => onRemoveFile(index))}
                iconName="Trash2"
                iconPosition="left"
              >
                Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onAnalyzeFiles}
                iconName="Zap"
                iconPosition="left"
              >
                Batch Analyze
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreview;