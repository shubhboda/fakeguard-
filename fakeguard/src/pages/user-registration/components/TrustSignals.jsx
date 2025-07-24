import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Users',
      title: 'Trusted by 50K+ Users',
      description: 'Join journalists and educators worldwide'
    },
    {
      icon: 'Award',
      title: 'Verified Platform',
      description: 'Partnered with fact-checking organizations'
    }
  ];

  const securityBadges = [
    { name: 'SSL Certificate', icon: 'Lock' },
    { name: 'GDPR Compliant', icon: 'Shield' },
    { name: 'SOC 2 Certified', icon: 'Award' }
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Trust Features */}
      <div className="grid grid-cols-1 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={feature.icon} size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground">{feature.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 py-4 border-t border-border">
        {securityBadges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name={badge.icon} size={12} />
            <span>{badge.name}</span>
          </div>
        ))}
      </div>

      {/* Privacy Policy Link */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          By creating an account, you agree to our{' '}
          <button className="text-secondary hover:text-secondary/80 underline transition-smooth">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-secondary hover:text-secondary/80 underline transition-smooth">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;