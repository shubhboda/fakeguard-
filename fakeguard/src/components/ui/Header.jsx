import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/main-dashboard', icon: 'LayoutDashboard' },
    { label: 'Verify URL', path: '/article-url-verification', icon: 'Link' },
    { label: 'Verify Text', path: '/text-content-verification', icon: 'FileText' },
    { label: 'Verify Media', path: '/media-upload-verification', icon: 'Upload' },
  ];

  const moreItems = [
    { label: 'Results', path: '/verification-results-detail', icon: 'BarChart3' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/main-dashboard');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-card">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-modal py-1 z-50">
                {moreItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      handleNavigation(item.path);
                      setIsUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-left hover:bg-muted transition-smooth ${
                      isActivePath(item.path) ? 'text-primary' : 'text-popover-foreground'
                    }`}
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Menu */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-smooth">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
          </button>
          
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-smooth"
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {[...navigationItems, ...moreItems].map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">User Account</p>
                <p className="text-xs text-muted-foreground">Manage your profile</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;