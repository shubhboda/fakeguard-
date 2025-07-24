import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{getGreeting()}, User!</h1>
          <p className="text-white/80 mb-1">Ready to verify some content today?</p>
          <p className="text-sm text-white/60">{getCurrentDate()}</p>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Icon name="Shield" size={24} />
            </div>
            <p className="text-xs text-white/80">Protected</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
              <Icon name="CheckCircle" size={24} />
            </div>
            <p className="text-xs text-white/80">Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;