import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/main-dashboard');
  };

  const handleLoginClick = () => {
    navigate('/main-dashboard');
  };

  return (
    <header className="w-full bg-card border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-smooth"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <span className="text-xl font-heading font-semibold text-primary">
              FakeGuard
            </span>
          </button>

          {/* Login Link */}
          <Button
            variant="ghost"
            onClick={handleLoginClick}
            iconName="LogIn"
            iconPosition="left"
            className="text-sm"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;