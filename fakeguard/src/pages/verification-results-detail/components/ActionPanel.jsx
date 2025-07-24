import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ result, onShare, onExport, onBookmark, onReport }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(!isBookmarked);
  };

  const shareOptions = [
    { id: 'twitter', label: 'Twitter', icon: 'Twitter' },
    { id: 'facebook', label: 'Facebook', icon: 'Facebook' },
    { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin' },
    { id: 'copy', label: 'Copy Link', icon: 'Copy' }
  ];

  const exportOptions = [
    { id: 'pdf', label: 'PDF Report', icon: 'FileText' },
    { id: 'image', label: 'Social Media Image', icon: 'Image' },
    { id: 'citation', label: 'Citation Format', icon: 'Quote' },
    { id: 'json', label: 'Raw Data (JSON)', icon: 'Code' }
  ];

  const handleShare = (platform) => {
    onShare?.(platform);
    setShowShareMenu(false);
  };

  const handleExport = (format) => {
    onExport?.(format);
    setShowExportMenu(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Actions
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Settings" size={20} className="text-primary" />
          <span className="text-sm font-caption text-muted-foreground">
            Manage Results
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Button
              variant="outline"
              fullWidth
              iconName="Share"
              iconPosition="left"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              Share Results
            </Button>
            
            {showShareMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal py-1 z-50">
                {shareOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleShare(option.id)}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-muted transition-smooth"
                  >
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <Button
              variant="outline"
              fullWidth
              iconName="Download"
              iconPosition="left"
              onClick={() => setShowExportMenu(!showExportMenu)}
            >
              Export
            </Button>
            
            {showExportMenu && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal py-1 z-50">
                {exportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-muted transition-smooth"
                  >
                    <Icon name={option.icon} size={16} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant={isBookmarked ? "default" : "ghost"}
            fullWidth
            iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
            onClick={handleBookmark}
          >
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>

          <Button
            variant="ghost"
            fullWidth
            iconName="Flag"
            iconPosition="left"
            onClick={() => onReport?.()}
          >
            Report Issue
          </Button>

          <Button
            variant="ghost"
            fullWidth
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => window.location.reload()}
          >
            Re-analyze
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="bg-muted/50 rounded-lg p-4 mt-6">
          <h3 className="font-medium text-foreground mb-3">Quick Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Analysis ID:</span>
              <span className="text-foreground font-mono">{result.analysisId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processed:</span>
              <span className="text-foreground">{result.processedAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Model Version:</span>
              <span className="text-foreground">{result.modelVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Processing Time:</span>
              <span className="text-foreground">{result.processingTime}s</span>
            </div>
          </div>
        </div>

        {/* Follow-up Actions */}
        <div className="border-t border-border pt-4">
          <h3 className="font-medium text-foreground mb-3">Follow-up Options</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <Icon name="Bell" size={16} className="text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Monitor Updates</p>
                  <p className="text-xs text-muted-foreground">Get notified of changes to this content</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <Icon name="MessageSquare" size={16} className="text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Join Discussion</p>
                  <p className="text-xs text-muted-foreground">Community thread about this topic</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <div className="flex items-center space-x-3">
                <Icon name="BookOpen" size={16} className="text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Learn More</p>
                  <p className="text-xs text-muted-foreground">Educational resources on this topic</p>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;