import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState({
    google: false,
    linkedin: false
  });

  const handleSocialLogin = async (provider) => {
    setIsLoading(prev => ({ ...prev, [provider]: true }));
    
    // Simulate social login API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful social registration
      const mockUser = {
        email: provider === 'google' ? 'user@gmail.com' : 'user@linkedin.com',
        role: 'general',
        provider: provider,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/main-dashboard');
    } catch (error) {
      console.error(`${provider} registration failed:`, error);
    } finally {
      setIsLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground">Quick signup with</p>
      </div>

      <Button
        variant="outline"
        fullWidth
        loading={isLoading.google}
        onClick={() => handleSocialLogin('google')}
        className="border-2 hover:bg-muted/50"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <span>Continue with Google</span>
        </div>
      </Button>

      <Button
        variant="outline"
        fullWidth
        loading={isLoading.linkedin}
        onClick={() => handleSocialLogin('linkedin')}
        className="border-2 hover:bg-muted/50"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <Icon name="Linkedin" size={12} color="white" />
          </div>
          <span>Continue with LinkedIn</span>
        </div>
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">or register with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;