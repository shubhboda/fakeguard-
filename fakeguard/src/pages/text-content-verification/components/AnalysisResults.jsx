import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisResults = ({ results, onExport, onReport }) => {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    claims: false,
    sources: false,
    details: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-accent/10 border-accent/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  const highlightText = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text;
    
    let result = text;
    highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight.text})`, 'gi');
      const className = highlight.verified ? 'bg-accent/20 text-accent' : 'bg-destructive/20 text-destructive';
      result = result.replace(regex, `<span class="${className} px-1 rounded">$1</span>`);
    });
    
    return result;
  };

  if (!results) return null;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className={`bg-card rounded-lg border shadow-card p-6 ${getScoreBg(results.credibilityScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Verification Results
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReport}
              iconName="Flag"
              iconPosition="left"
            >
              Report
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(results.credibilityScore)}`}>
              {results.credibilityScore}%
            </div>
            <div className="text-sm text-muted-foreground font-caption mt-1">
              Credibility Score
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={results.credibilityScore >= 80 ? "CheckCircle" : results.credibilityScore >= 60 ? "AlertTriangle" : "XCircle"} 
                size={20} 
                className={getScoreColor(results.credibilityScore)}
              />
              <span className={`font-medium ${getScoreColor(results.credibilityScore)}`}>
                {results.credibilityScore >= 80 ? 'Highly Credible' : 
                 results.credibilityScore >= 60 ? 'Moderately Credible' : 'Low Credibility'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {results.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
        >
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Analysis Overview
          </h3>
          <Icon 
            name={expandedSections.overview ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </button>
        
        {expandedSections.overview && (
          <div className="px-6 pb-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {results.claimsAnalyzed}
                </div>
                <div className="text-sm text-muted-foreground font-caption">
                  Claims Analyzed
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {results.sourcesChecked}
                </div>
                <div className="text-sm text-muted-foreground font-caption">
                  Sources Verified
                </div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">
                  {results.confidence}%
                </div>
                <div className="text-sm text-muted-foreground font-caption">
                  AI Confidence
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Key Findings:</h4>
              <ul className="space-y-1">
                {results.keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="ArrowRight" size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Claims Analysis */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <button
          onClick={() => toggleSection('claims')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
        >
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Claim-by-Claim Analysis
          </h3>
          <Icon 
            name={expandedSections.claims ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </button>
        
        {expandedSections.claims && (
          <div className="px-6 pb-6 border-t border-border">
            <div className="space-y-4 mt-4">
              {results.claims.map((claim, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon 
                          name={claim.status === 'verified' ? "CheckCircle" : claim.status === 'disputed' ? "AlertTriangle" : "XCircle"} 
                          size={16} 
                          className={claim.status === 'verified' ? 'text-accent' : claim.status === 'disputed' ? 'text-warning' : 'text-destructive'}
                        />
                        <span className={`text-sm font-medium capitalize ${
                          claim.status === 'verified' ? 'text-accent' : claim.status === 'disputed' ? 'text-warning' : 'text-destructive'
                        }`}>
                          {claim.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-2">
                        <strong>Claim:</strong> {claim.text}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(claim.confidence)}`}>
                        {claim.confidence}%
                      </div>
                      <div className="text-xs text-muted-foreground font-caption">
                        Confidence
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <strong>Analysis:</strong> {claim.explanation}
                  </div>
                  
                  {claim.sources && claim.sources.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-medium text-muted-foreground mb-2">Supporting Sources:</div>
                      <div className="flex flex-wrap gap-2">
                        {claim.sources.map((source, idx) => (
                          <a
                            key={idx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-muted px-2 py-1 rounded hover:bg-muted-foreground/20 transition-smooth"
                          >
                            {source.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Source Analysis */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <button
          onClick={() => toggleSection('sources')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
        >
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Source Reliability
          </h3>
          <Icon 
            name={expandedSections.sources ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </button>
        
        {expandedSections.sources && (
          <div className="px-6 pb-6 border-t border-border">
            <div className="space-y-3 mt-4">
              {results.sources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      source.reliability === 'high' ? 'bg-accent' : 
                      source.reliability === 'medium' ? 'bg-warning' : 'bg-destructive'
                    }`}></div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{source.name}</div>
                      <div className="text-xs text-muted-foreground font-caption">{source.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium capitalize ${
                      source.reliability === 'high' ? 'text-accent' : 
                      source.reliability === 'medium' ? 'text-warning' : 'text-destructive'
                    }`}>
                      {source.reliability}
                    </div>
                    <div className="text-xs text-muted-foreground font-caption">
                      Reliability
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Analysis */}
      <div className="bg-card rounded-lg border border-border shadow-card">
        <button
          onClick={() => toggleSection('details')}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-smooth"
        >
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Detailed Analysis
          </h3>
          <Icon 
            name={expandedSections.details ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground"
          />
        </button>
        
        {expandedSections.details && (
          <div className="px-6 pb-6 border-t border-border">
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Language Analysis:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Detected Language</div>
                    <div className="text-lg font-bold text-primary">{results.languageAnalysis.language}</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm font-medium text-foreground">Sentiment</div>
                    <div className={`text-lg font-bold capitalize ${
                      results.languageAnalysis.sentiment === 'positive' ? 'text-accent' :
                      results.languageAnalysis.sentiment === 'neutral' ? 'text-muted-foreground' : 'text-destructive'
                    }`}>
                      {results.languageAnalysis.sentiment}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Bias Indicators:</h4>
                <div className="space-y-2">
                  {results.biasIndicators.map((bias, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                      <span className="text-sm text-foreground">{bias.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          bias.level === 'high' ? 'bg-destructive' : 
                          bias.level === 'medium' ? 'bg-warning' : 'bg-accent'
                        }`}></div>
                        <span className="text-xs text-muted-foreground font-caption capitalize">
                          {bias.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">Content Highlights:</h4>
                <div className="p-4 bg-muted/20 rounded-lg">
                  <div 
                    className="text-sm text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(results.originalText, results.highlights) 
                    }}
                  />
                </div>
                <div className="flex items-center space-x-4 mt-2 text-xs font-caption">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-accent/20 rounded"></div>
                    <span className="text-muted-foreground">Verified Content</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-destructive/20 rounded"></div>
                    <span className="text-muted-foreground">Questionable Content</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;