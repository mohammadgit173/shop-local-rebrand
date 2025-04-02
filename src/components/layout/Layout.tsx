
import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout = ({ children, hideNav = false }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isAuthPage = location.pathname.includes('/login') || 
                    location.pathname.includes('/register') || 
                    location.pathname.includes('/forgot-password');

  // Add meta viewport tag to ensure proper scaling
  React.useEffect(() => {
    // Check if viewport meta tag exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    
    // Set the content attribute for mobile optimization
    viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    
    // Add status bar meta for iOS
    let statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!statusBarMeta) {
      statusBarMeta = document.createElement('meta');
      statusBarMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
      statusBarMeta.setAttribute('content', 'black-translucent');
      document.head.appendChild(statusBarMeta);
    }
    
    // Set capability meta
    let capableMeta = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!capableMeta) {
      capableMeta = document.createElement('meta');
      capableMeta.setAttribute('name', 'apple-mobile-web-app-capable');
      capableMeta.setAttribute('content', 'yes');
      document.head.appendChild(capableMeta);
    }
    
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && !hideNav && <Header />}
      <main className={`flex-grow ${isMobile ? 'pb-24 mobile-bottom-safe' : 'pb-0'}`}>
        {children}
      </main>
      {!isAuthPage && !hideNav && isMobile && <BottomNavigation />}
    </div>
  );
};

export default Layout;
