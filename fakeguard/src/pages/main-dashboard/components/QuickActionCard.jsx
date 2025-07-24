import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionCard = ({ title, description, icon, route, stats, color = "primary" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    warning: "bg-warning text-warning-foreground"
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-modal transition-smooth cursor-pointer group" onClick={handleClick}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]} group-hover:scale-105 transition-smooth`}>
          <Icon name={icon} size={24} />
        </div>
        <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-foreground transition-smooth" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
      
      {stats && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Used {stats.count} times</span>
          <span>{stats.accuracy}% accuracy</span>
        </div>
      )}
    </div>
  );
};

export default QuickActionCard;