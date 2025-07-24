import React from 'react';
import RegistrationHeader from './components/RegistrationHeader';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Create Your Account
            </h1>
            <p className="text-muted-foreground">
              Join thousands of users fighting misinformation with AI-powered verification
            </p>
          </div>

          {/* Registration Content */}
          <div className="bg-card rounded-xl shadow-card border border-border p-6 sm:p-8 space-y-8">
            <SocialRegistration />
            <RegistrationForm />
          </div>

          {/* Trust Signals */}
          <div className="mt-8">
            <TrustSignals />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FakeGuard. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <button className="hover:text-foreground transition-smooth">Help</button>
              <span>&bull;</span>
              <button className="hover:text-foreground transition-smooth">Support</button>
              <span>&bull;</span>
              <button className="hover:text-foreground transition-smooth">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;