import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DetailedFindings = ({ findings }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-accent/10';
      default: return 'bg-muted';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'HelpCircle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Detailed Findings
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={20} className="text-primary" />
          <span className="text-sm font-caption text-muted-foreground">
            {findings.length} Issues Found
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {findings.map((finding, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(`finding-${index}`)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getSeverityBg(finding.severity)}`}>
                  <Icon 
                    name={getSeverityIcon(finding.severity)} 
                    size={16} 
                    className={getSeverityColor(finding.severity)} 
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-foreground">{finding.title}</h3>
                  <p className="text-sm text-muted-foreground">{finding.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBg(finding.severity)} ${getSeverityColor(finding.severity)}`}>
                  {finding.severity.toUpperCase()}
                </span>
                <Icon 
                  name={expandedSections[`finding-${index}`] ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
            </button>

            {expandedSections[`finding-${index}`] && (
              <div className="px-4 pb-4 border-t border-border bg-muted/20">
                <div className="pt-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {finding.description}
                    </p>
                  </div>

                  {finding.evidence && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Evidence</h4>
                      <div className="bg-card rounded-md p-3 border border-border">
                        <p className="text-sm font-mono text-foreground">
                          "{finding.evidence}"
                        </p>
                      </div>
                    </div>
                  )}

                  {finding.recommendations && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recommendations</h4>
                      <ul className="space-y-1">
                        {finding.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-muted-foreground">
                        Confidence: {finding.confidence}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Impact: {finding.impact}
                      </span>
                    </div>
                    <button className="text-xs text-primary hover:text-primary/80 transition-smooth">
                      Learn More
                    </button>
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

export default DetailedFindings;