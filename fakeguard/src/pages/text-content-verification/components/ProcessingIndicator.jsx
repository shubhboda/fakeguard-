import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingIndicator = ({ isProcessing, progress = 0, currentStep = '', estimatedTime = '' }) => {
  const steps = [
    { id: 'parsing', label: 'Parsing Content', icon: 'FileText' },
    { id: 'claims', label: 'Identifying Claims', icon: 'Search' },
    { id: 'sources', label: 'Checking Sources', icon: 'Database' },
    { id: 'analysis', label: 'AI Analysis', icon: 'Brain' },
    { id: 'scoring', label: 'Generating Score', icon: 'BarChart3' }
  ];

  if (!isProcessing) return null;

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Analyzing Content
        </h3>
        <div className="text-sm text-muted-foreground font-caption">
          {estimatedTime && `Est. ${estimatedTime}`}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {Math.round(progress)}% Complete
          </span>
          <span className="text-sm text-muted-foreground font-caption">
            {currentStep}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Processing Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isActive = currentStep.toLowerCase().includes(step.id);
          const isCompleted = progress > (index + 1) * 20;
          
          return (
            <div 
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth ${
                isActive ? 'bg-primary/10 border border-primary/20' : 
                isCompleted ? 'bg-accent/10' : 'bg-muted/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCompleted ? 'bg-accent text-accent-foreground' :
                isActive ? 'bg-primary text-primary-foreground': 'bg-muted-foreground/20 text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : isActive ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              
              <div className="flex-1">
                <span className={`text-sm font-medium ${
                  isActive ? 'text-primary' : 
                  isCompleted ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-caption">
            Our AI is analyzing your content against multiple fact-checking databases and credible sources.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProcessingIndicator;