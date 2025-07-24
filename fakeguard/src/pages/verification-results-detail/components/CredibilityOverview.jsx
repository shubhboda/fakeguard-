import React from 'react';
import Icon from '../../../components/AppIcon';

const CredibilityOverview = ({ result }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-accent/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Highly Credible';
    if (score >= 60) return 'Moderately Credible';
    return 'Low Credibility';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Credibility Overview
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          <span className="text-sm font-caption text-muted-foreground">
            AI Analysis Complete
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Score */}
        <div className={`${getScoreBgColor(result.credibilityScore)} rounded-lg p-4 text-center`}>
          <div className={`text-3xl font-heading font-bold ${getScoreColor(result.credibilityScore)} mb-2`}>
            {result.credibilityScore}%
          </div>
          <div className="text-sm font-medium text-foreground mb-1">
            {getScoreLabel(result.credibilityScore)}
          </div>
          <div className="text-xs text-muted-foreground">
            Overall Score
          </div>
        </div>

        {/* Confidence Level */}
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-3xl font-heading font-bold text-secondary mb-2">
            {result.confidenceLevel}%
          </div>
          <div className="text-sm font-medium text-foreground mb-1">
            High Confidence
          </div>
          <div className="text-xs text-muted-foreground">
            AI Certainty
          </div>
        </div>

        {/* Sources Checked */}
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-3xl font-heading font-bold text-primary mb-2">
            {result.sourcesChecked}
          </div>
          <div className="text-sm font-medium text-foreground mb-1">
            Sources Verified
          </div>
          <div className="text-xs text-muted-foreground">
            Cross-Referenced
          </div>
        </div>
      </div>

      {/* Quick Indicators */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <Icon 
            name={result.factCheckStatus === 'verified' ? 'CheckCircle' : 'XCircle'} 
            size={16} 
            className={result.factCheckStatus === 'verified' ? 'text-accent' : 'text-destructive'} 
          />
          <span className="text-sm font-caption text-foreground">
            Fact Check: {result.factCheckStatus === 'verified' ? 'Passed' : 'Failed'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name={result.sourceReliability === 'high' ? 'Star' : 'AlertTriangle'} 
            size={16} 
            className={result.sourceReliability === 'high' ? 'text-accent' : 'text-warning'} 
          />
          <span className="text-sm font-caption text-foreground">
            Source: {result.sourceReliability === 'high' ? 'Reliable' : 'Questionable'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name={result.biasDetection === 'minimal' ? 'Balance' : 'TrendingUp'} 
            size={16} 
            className={result.biasDetection === 'minimal' ? 'text-accent' : 'text-warning'} 
          />
          <span className="text-sm font-caption text-foreground">
            Bias: {result.biasDetection === 'minimal' ? 'Minimal' : 'Detected'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon 
            name="Clock" 
            size={16} 
            className="text-muted-foreground" 
          />
          <span className="text-sm font-caption text-foreground">
            {result.processingTime}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default CredibilityOverview;