import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveResults = ({ results, isVisible }) => {
  const navigate = useNavigate();

  if (!isVisible || !results) return null;

  const getCredibilityColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getCredibilityBg = (score) => {
    if (score >= 80) return 'bg-accent/10 border-accent/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  const getCredibilityIcon = (score) => {
    if (score >= 80) return 'CheckCircle';
    if (score >= 60) return 'AlertTriangle';
    return 'XCircle';
  };

  const handleViewFullReport = () => {
    navigate('/verification-results-detail', { 
      state: { 
        analysisId: results.id,
        type: 'url',
        results: results 
      } 
    });
  };

  const handleExportReport = () => {
    // Mock PDF export functionality
    alert('PDF report would be generated and downloaded here.');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Analysis Results</h3>
            <p className="text-sm text-muted-foreground">Real-time credibility assessment</p>
          </div>
        </div>

        {/* Credibility Score */}
        <div className={`p-4 rounded-lg border ${getCredibilityBg(results.credibilityScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getCredibilityIcon(results.credibilityScore)} 
                size={20} 
                className={getCredibilityColor(results.credibilityScore)} 
              />
              <span className="text-sm font-medium text-foreground">Credibility Score</span>
            </div>
            <span className={`text-2xl font-bold ${getCredibilityColor(results.credibilityScore)}`}>
              {results.credibilityScore}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                results.credibilityScore >= 80 ? 'bg-accent' :
                results.credibilityScore >= 60 ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${results.credibilityScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Article Information */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Article Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Headline:</span>
              <span className="text-foreground font-medium text-right max-w-xs truncate">
                {results.headline}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source:</span>
              <span className="text-foreground">{results.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Published:</span>
              <span className="text-foreground">{results.publishDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Author:</span>
              <span className="text-foreground">{results.author}</span>
            </div>
          </div>
        </div>

        {/* Source Reliability */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Source Reliability</h4>
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-secondary" />
              <span className="text-sm text-foreground">Overall Rating</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name="Star"
                  size={14}
                  className={star <= results.sourceRating ? 'text-warning fill-current' : 'text-muted-foreground'}
                />
              ))}
              <span className="text-sm text-foreground ml-2">{results.sourceRating}/5</span>
            </div>
          </div>
        </div>

        {/* Fact-Checking Cross-References */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Fact-Checking Cross-References</h4>
          <div className="space-y-2">
            {results.factCheckReferences.map((ref, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{ref.source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={ref.status === 'verified' ? 'CheckCircle' : ref.status === 'disputed' ? 'AlertTriangle' : 'XCircle'} 
                    size={14} 
                    className={
                      ref.status === 'verified' ? 'text-accent' :
                      ref.status === 'disputed' ? 'text-warning' : 'text-destructive'
                    } 
                  />
                  <span className="text-xs text-muted-foreground capitalize">{ref.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Breakdown */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Evidence Breakdown</h4>
          <div className="space-y-3">
            {results.evidenceBreakdown.map((evidence, index) => (
              <div key={index} className="border-l-2 border-muted pl-4">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{evidence.category}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    evidence.confidence >= 80 ? 'bg-accent/10 text-accent' :
                    evidence.confidence >= 60 ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
                  }`}>
                    {evidence.confidence}% confidence
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{evidence.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleViewFullReport}
            iconName="FileText"
            iconPosition="left"
            className="flex-1"
          >
            View Full Report
          </Button>
          <Button
            variant="outline"
            onClick={handleExportReport}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveResults;