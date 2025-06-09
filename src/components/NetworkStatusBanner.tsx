import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi, Signal } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const NetworkStatusBanner = () => {
  const { isOnline, isSlowConnection, connectionType } = useNetworkStatus();

  if (isOnline && !isSlowConnection) {
    return null; // Don't show banner for good connections
  }

  return (
    <AnimatePresence>
      {(!isOnline || isSlowConnection) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-0 left-0 right-0 z-40 px-4 py-2 text-center text-sm font-medium ${
            !isOnline 
              ? 'bg-red-600 text-white' 
              : 'bg-yellow-500 text-black'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {!isOnline ? (
              <>
                <WifiOff className="h-4 w-4" />
                <span>Keine Internetverbindung - Sie sind offline</span>
              </>
            ) : isSlowConnection ? (
              <>
                <Signal className="h-4 w-4" />
                <span>
                  Langsame Verbindung erkannt ({connectionType}) - 
                  Einige Features können eingeschränkt sein
                </span>
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4" />
                <span>Verbindung wiederhergestellt</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NetworkStatusBanner; 