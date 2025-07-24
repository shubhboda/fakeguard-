import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AnalysisResults = ({ results, onNewAnalysis, onExportReport }) => {
  const [selectedResult, setSelectedResult] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'metadata', label: 'Metadata', icon: 'FileText' },
    { id: 'detection', label: 'Detection', icon: 'Shield' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-accent';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  const currentResult = results[selectedResult];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Analysis Results</h2>
          <p className="text-muted-foreground">
            Comprehensive verification analysis for {results.length} file{results.length > 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onExportReport}
            iconName="Download"
            iconPosition="left"
          >
            Export Report
          </Button>
          <Button
            variant="default"
            onClick={onNewAnalysis}
            iconName="Plus"
            iconPosition="left"
          >
            New Analysis
          </Button>
        </div>
      </div>

      {/* File Selector */}
      {results.length > 1 && (
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => setSelectedResult(index)}
                className={`flex-shrink-0 p-3 rounded-lg border transition-all ${
                  selectedResult === index
                    ? 'border-primary bg-primary/10 text-primary' :'border-border bg-card text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={result.type === 'image' ? 'Image' : 'Video'} size={16} />
                  <span className="text-sm font-medium truncate max-w-24">
                    {result.fileName}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-lg border border-border p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Authenticity Score */}
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-muted"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${currentResult.authenticityScore}, 100`}
                        className={getScoreColor(currentResult.authenticityScore)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${getScoreColor(currentResult.authenticityScore)}`}>
                          {currentResult.authenticityScore}%
                        </div>
                        <div className="text-xs text-muted-foreground">Authentic</div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {currentResult.authenticityScore >= 80 ? 'Likely Authentic' : 
                     currentResult.authenticityScore >= 60 ? 'Uncertain' : 'Likely Manipulated'}
                  </h3>
                </div>

                {/* Detection Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {currentResult.detectionResults.map((detection, index) => (
                    <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
                      <Icon 
                        name={detection.icon} 
                        size={24} 
                        className={`mx-auto mb-2 ${detection.status === 'clean' ? 'text-accent' : 'text-warning'}`} 
                      />
                      <h4 className="text-sm font-medium text-foreground mb-1">{detection.type}</h4>
                      <p className={`text-xs ${detection.status === 'clean' ? 'text-accent' : 'text-warning'}`}>
                        {detection.status === 'clean' ? 'No issues detected' : `${detection.confidence}% confidence`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'metadata' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Technical Metadata</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(currentResult.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm text-foreground font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'detection' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Detection Analysis</h3>
                {currentResult.detectionResults.map((detection, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name={detection.icon} size={20} className="text-primary" />
                        <h4 className="font-medium text-foreground">{detection.type}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        detection.status === 'clean' ?'bg-accent/10 text-accent' :'bg-warning/10 text-warning'
                      }`}>
                        {detection.status === 'clean' ? 'Clean' : 'Suspicious'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{detection.description}</p>
                    {detection.confidence && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getScoreBgColor(detection.confidence)}`}
                            style={{ width: `${detection.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-foreground">{detection.confidence}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'timeline' && currentResult.type === 'video' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Frame Analysis Timeline</h3>
                <div className="space-y-3">
                  {currentResult.timeline?.map((frame, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                      <div className="text-sm font-mono text-muted-foreground min-w-16">
                        {frame.timestamp}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${getScoreBgColor(frame.confidence)}`}></div>
                          <span className="text-sm font-medium text-foreground">{frame.event}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{frame.description}</p>
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {frame.confidence}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* File Preview */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">File Preview</h3>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
              {currentResult.type === 'image' ? (
                <Image
                  src={currentResult.preview}
                  alt={currentResult.fileName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={currentResult.preview}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">File Name:</span>
                <span className="text-foreground font-medium truncate ml-2">{currentResult.fileName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size:</span>
                <span className="text-foreground font-medium">{currentResult.fileSize}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span className="text-foreground font-medium">{currentResult.type.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconName="Share"
                iconPosition="left"
              >
                Share Results
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Flag"
                iconPosition="left"
              >
                Report Issue
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="RefreshCw"
                iconPosition="left"
              >
                Re-analyze
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;