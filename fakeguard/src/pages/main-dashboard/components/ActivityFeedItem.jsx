import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeedItem = ({ verification }) => {
  const navigate = useNavigate();

  const getCredibilityColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getCredibilityBg = (score) => {
    if (score >= 80) return "bg-success/10";
    if (score >= 60) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'url': return 'Link';
      case 'text': return 'FileText';
      case 'media': return 'Image';
      default: return 'Shield';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleViewDetails = () => {
    navigate('/verification-results-detail', { state: { verification } });
  };

  const handleReAnalyze = () => {
    if (verification.type === 'url') {
      navigate('/article-url-verification', { state: { url: verification.content } });
    } else if (verification.type === 'text') {
      navigate('/text-content-verification', { state: { text: verification.content } });
    } else {
      navigate('/media-upload-verification');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-card transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
            <Icon name={getTypeIcon(verification.type)} size={18} className="text-muted-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground line-clamp-1">{verification.title}</h4>
            <p className="text-xs text-muted-foreground">{formatTimeAgo(verification.timestamp)}</p>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCredibilityBg(verification.credibilityScore)} ${getCredibilityColor(verification.credibilityScore)}`}>
          {verification.credibilityScore}% credible
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{verification.summary}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{verification.processingTime}s</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Database" size={12} />
            <span>{verification.sourcesChecked} sources</span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="xs" onClick={handleReAnalyze}>
            <Icon name="RotateCcw" size={14} className="mr-1" />
            Re-analyze
          </Button>
          <Button variant="outline" size="xs" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeedItem;