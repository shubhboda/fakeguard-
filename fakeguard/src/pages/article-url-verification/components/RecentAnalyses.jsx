import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAnalyses = ({ analyses, onViewDetails }) => {
  const [expandedId, setExpandedId] = useState(null);

  const getCredibilityColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getCredibilityBg = (score) => {
    if (score >= 80) return 'bg-accent/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getCredibilityLabel = (score) => {
    if (score >= 80) return 'Verified';
    if (score >= 60) return 'Questionable';
    return 'False/Misleading';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!analyses.length) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 shadow-card text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="History" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Recent Analyses</h3>
        <p className="text-muted-foreground">Your recent URL verifications will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="History" size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Recent Analyses</h3>
              <p className="text-sm text-muted-foreground">{analyses.length} recent verifications</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal">
            View All
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {analyses.map((analysis) => (
          <div key={analysis.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate mb-1">
                  {analysis.headline}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {analysis.source} • {formatTimeAgo(analysis.timestamp)}
                </p>
              </div>
              <div className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${getCredibilityBg(analysis.credibilityScore)} ${getCredibilityColor(analysis.credibilityScore)}`}>
                {analysis.credibilityScore}% {getCredibilityLabel(analysis.credibilityScore)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} />
                  <span>Source: {analysis.sourceRating}/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="CheckCircle" size={12} />
                  <span>{analysis.factChecks} fact-checks</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(analysis.id)}
                  iconName={expandedId === analysis.id ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                >
                  {expandedId === analysis.id ? 'Less' : 'More'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(analysis.id)}
                  iconName="ExternalLink"
                >
                  Details
                </Button>
              </div>
            </div>

            {expandedId === analysis.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Analysis Summary</h5>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Key Findings</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {analysis.keyFindings.map((finding, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Dot" size={12} className="mt-1 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Globe" size={12} />
                    <a 
                      href={analysis.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-foreground transition-smooth truncate max-w-xs"
                    >
                      {analysis.url}
                    </a>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>Analysis took {analysis.processingTime}s</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAnalyses;