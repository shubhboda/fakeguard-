import React from 'react';
import Icon from '../../../components/AppIcon';

const SmartDetectionPanel = ({ detectedElements, onElementClick }) => {
  const elementTypes = [
    { type: 'claims', icon: 'MessageSquare', label: 'Claims', color: 'text-primary' },
    { type: 'quotes', icon: 'Quote', label: 'Quotes', color: 'text-secondary' },
    { type: 'statistics', icon: 'BarChart3', label: 'Statistics', color: 'text-accent' },
    { type: 'dates', icon: 'Calendar', label: 'Dates', color: 'text-warning' }
  ];

  if (!detectedElements || Object.keys(detectedElements).length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Smart Detection
        </h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Our AI has automatically identified key elements in your text for focused verification.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {elementTypes.map((element) => {
          const count = detectedElements[element.type]?.length || 0;
          if (count === 0) return null;

          return (
            <button
              key={element.type}
              onClick={() => onElementClick(element.type)}
              className="p-3 bg-muted/50 hover:bg-muted rounded-lg transition-smooth text-left"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={element.icon} size={16} className={element.color} />
                <span className="text-sm font-medium text-foreground">
                  {element.label}
                </span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {count}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                detected
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-primary">
            <strong>Tip:</strong> Click on any category above to see the specific elements detected and their verification status.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartDetectionPanel;