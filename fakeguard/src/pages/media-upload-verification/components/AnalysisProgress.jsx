import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisProgress = ({ currentFile, progress, stage, isVisible }) => {
  const stages = [
    { id: 'upload', label: 'Uploading', icon: 'Upload' },
    { id: 'analysis', label: 'Analyzing', icon: 'Search' },
    { id: 'deepfake', label: 'Deepfake Detection', icon: 'Shield' },
    { id: 'metadata', label: 'Metadata Examination', icon: 'FileText' }
  ];

  const getCurrentStageIndex = () => {
    return stages.findIndex(s => s.id === stage);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border shadow-modal p-6 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="animate-spin">
              <Icon name="Loader2" size={32} className="text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Analyzing Media
          </h3>
          {currentFile && (
            <p className="text-sm text-muted-foreground truncate">
              {currentFile.name}
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {stages.map((stageItem, index) => {
            const currentIndex = getCurrentStageIndex();
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;

            return (
              <div
                key={stageItem.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  isCurrent
                    ? 'bg-primary/10 border border-primary/20'
                    : isCompleted
                    ? 'bg-accent/10 border border-accent/20' :'bg-muted/30 border border-transparent'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : isCompleted
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : isCurrent ? (
                    <div className="animate-spin">
                      <Icon name="Loader2" size={16} />
                    </div>
                  ) : (
                    <Icon name={stageItem.icon} size={16} />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent
                        ? 'text-primary'
                        : isCompleted
                        ? 'text-accent' :'text-muted-foreground'
                    }`}
                  >
                    {stageItem.label}
                  </p>
                </div>
                {isCurrent && (
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cancel Button */}
        <div className="mt-6 text-center">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Cancel Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;