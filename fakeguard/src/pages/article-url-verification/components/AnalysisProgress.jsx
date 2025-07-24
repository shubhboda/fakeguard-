import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisProgress = ({ isVisible, progress, currentStep }) => {
  const steps = [
    { id: 1, label: 'Fetching Article', icon: 'Download' },
    { id: 2, label: 'Content Analysis', icon: 'FileText' },
    { id: 3, label: 'Source Verification', icon: 'Shield' },
    { id: 4, label: 'Fact Checking', icon: 'CheckCircle' },
    { id: 5, label: 'Generating Report', icon: 'BarChart3' }
  ];

  if (!isVisible) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-secondary animate-pulse" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Analysis in Progress</h3>
          <p className="text-sm text-muted-foreground">Processing article for credibility assessment</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Analysis Steps */}
        <div className="space-y-3">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isPending = step.id > currentStep;

            return (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
                  isCompleted 
                    ? 'bg-accent text-accent-foreground' 
                    : isCurrent 
                    ? 'bg-secondary text-secondary-foreground animate-pulse' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`text-sm transition-smooth ${
                  isCompleted 
                    ? 'text-foreground font-medium' 
                    : isCurrent 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
                {isCurrent && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" />
                    <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1 h-1 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Estimated Time */}
        <div className="mt-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Estimated time remaining: {Math.max(0, 30 - Math.floor(progress * 0.3))} seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;