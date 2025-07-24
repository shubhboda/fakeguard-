import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SourceAnalysis = ({ sources }) => {
  const [selectedSource, setSelectedSource] = useState(null);

  const getReliabilityColor = (rating) => {
    if (rating >= 8) return 'text-accent';
    if (rating >= 6) return 'text-warning';
    return 'text-destructive';
  };

  const getReliabilityBg = (rating) => {
    if (rating >= 8) return 'bg-accent/10';
    if (rating >= 6) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getReliabilityLabel = (rating) => {
    if (rating >= 8) return 'Highly Reliable';
    if (rating >= 6) return 'Moderately Reliable';
    return 'Low Reliability';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Source Analysis
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={20} className="text-primary" />
          <span className="text-sm font-caption text-muted-foreground">
            {sources.length} Sources Analyzed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources List */}
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div 
              key={index}
              className={`border border-border rounded-lg p-4 cursor-pointer transition-smooth hover:shadow-card ${
                selectedSource === index ? 'ring-2 ring-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedSource(selectedSource === index ? null : index)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={source.favicon}
                    alt={`${source.domain} favicon`}
                    className="w-8 h-8 rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground truncate">
                      {source.title}
                    </h3>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getReliabilityBg(source.reliabilityScore)} ${getReliabilityColor(source.reliabilityScore)}`}>
                      {source.reliabilityScore}/10
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {source.domain}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{source.publishDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{source.views} views</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Share" size={12} />
                      <span>{source.shares} shares</span>
                    </span>
                  </div>
                </div>
              </div>

              {selectedSource === index && (
                <div className="mt-4 pt-4 border-t border-border space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Reliability Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      {getReliabilityLabel(source.reliabilityScore)} - {source.reliabilityReason}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Authority:</span>
                        <span className="text-foreground">{source.authorityScore}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Accuracy:</span>
                        <span className="text-foreground">{source.accuracyScore}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bias Level:</span>
                        <span className="text-foreground">{source.biasLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fact Check:</span>
                        <span className={source.factChecked ? 'text-accent' : 'text-destructive'}>
                          {source.factChecked ? 'Verified' : 'Unverified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
                      View Full Article
                    </button>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-muted-foreground hover:text-foreground transition-smooth">
                        <Icon name="ExternalLink" size={14} />
                      </button>
                      <button className="p-1 text-muted-foreground hover:text-foreground transition-smooth">
                        <Icon name="Bookmark" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Source Statistics */}
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Source Distribution</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Highly Reliable</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                    <div className="w-3/5 h-full bg-accent rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Moderately Reliable</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-warning rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">30%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Low Reliability</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-border rounded-full overflow-hidden">
                    <div className="w-1/12 h-full bg-destructive rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">10%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Cross-Reference Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Matching Claims:</span>
                <span className="text-foreground font-medium">8/12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Contradictory Claims:</span>
                <span className="text-destructive font-medium">2/12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Unverified Claims:</span>
                <span className="text-warning font-medium">2/12</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Expert Opinions</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Icon name="Quote" size={14} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-foreground">
                    "The claims are largely supported by credible sources."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    - Dr. Sarah Johnson, Media Analyst
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Quote" size={14} className="text-primary mt-1" />
                <div>
                  <p className="text-sm text-foreground">
                    "Some statistical data requires additional verification."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    - Prof. Michael Chen, Data Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceAnalysis;