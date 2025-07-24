import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/main-dashboard': 'Dashboard',
    '/article-url-verification': 'Verify URL',
    '/text-content-verification': 'Verify Text',
    '/media-upload-verification': 'Verify Media',
    '/verification-results-detail': 'Results Detail',
    '/user-registration': 'Registration',
    '/settings': 'Settings',
    '/help': 'Help',
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/main-dashboard' }];

    if (location.pathname !== '/main-dashboard') {
      const currentPath = location.pathname;
      const currentLabel = pathMap[currentPath] || 'Unknown';
      
      if (currentPath.includes('verification') && currentPath !== '/verification-results-detail') {
        breadcrumbs.push({ label: 'Verify', path: null });
      }
      
      breadcrumbs.push({ label: currentLabel, path: currentPath });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-border" />
          )}
          {crumb.path && index < breadcrumbs.length - 1 ? (
            <button
              onClick={() => handleBreadcrumbClick(crumb.path)}
              className="hover:text-foreground transition-smooth font-caption"
            >
              {crumb.label}
            </button>
          ) : (
            <span className={`font-caption ${index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : ''}`}>
              {crumb.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;