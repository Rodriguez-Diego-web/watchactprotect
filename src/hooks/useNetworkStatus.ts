import { useState, useEffect } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
  connectionType: string;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isSlowConnection: false,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      const isSlowConnection = connection ? 
        connection.effectiveType === 'slow-2g' || 
        connection.effectiveType === '2g' || 
        connection.downlink < 1.5 : false;

      const connectionType = connection ? 
        connection.effectiveType || connection.type || 'unknown' : 'unknown';

      setNetworkStatus({
        isOnline: navigator.onLine,
        isSlowConnection,
        connectionType
      });
    };

    const handleOnline = () => {
      updateNetworkStatus();
      // Optional: Trigger data sync when back online
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          // Background sync for PWA
          if ('sync' in registration) {
            (registration as any).sync.register('background-sync');
          }
        });
      }
    };

    const handleOffline = () => {
      updateNetworkStatus();
    };

    const handleConnectionChange = () => {
      updateNetworkStatus();
    };

    // Initial update
    updateNetworkStatus();

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkStatus;
}; 