import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, color = "primary" }) => {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive"
  };

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase': return 'text-success';
      case 'decrease': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'increase': return 'TrendingUp';
      case 'decrease': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${colorClasses[color]}`}>
          <Icon name={icon} size={16} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-xs ${getChangeColor(changeType)}`}>
            <Icon name={getChangeIcon(changeType)} size={12} />
            <span>{change}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;