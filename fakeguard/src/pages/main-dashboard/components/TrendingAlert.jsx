import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TrendingAlert = ({ alert }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-destructive bg-destructive/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-accent bg-accent/5';
      default: return 'border-border bg-muted/5';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Bell';
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Info';
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getSeverityIcon(alert.severity)} size={18} className="text-destructive" />
          <span className="text-sm font-medium text-destructive">{getSeverityText(alert.severity)}</span>
        </div>
        
        <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground transition-smooth">
          <Icon name="X" size={16} />
        </button>
      </div>

      <h4 className="text-sm font-semibold text-foreground mb-2">{alert.title}</h4>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{alert.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="TrendingUp" size={12} />
            <span>{alert.spreadRate} shares/hour</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{alert.affectedUsers} users affected</span>
          </span>
        </div>

        <Button variant="outline" size="xs">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default TrendingAlert;