import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Download, RefreshCw, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const PWAUpdatePrompt = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Service Worker Update Detection
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });

      // Check for waiting service worker
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.waiting) {
          setUpdateAvailable(true);
        }

        // Listen for waiting service worker
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setUpdateAvailable(true);
              }
            });
          }
        });
      });
    }

    // Install Prompt Detection
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      if (registration.waiting) {
        // Tell the waiting service worker to skip waiting
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
    
    // Reload the page after a short delay
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowInstallPrompt(false);
        setInstallPrompt(null);
      }
    }
  };

  return (
    <>
      {/* Update Prompt */}
      <AnimatePresence>
        {updateAvailable && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50 bg-white border-2 border-teal-500 rounded-lg shadow-xl p-4 max-w-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-teal-600" />
                <h3 className="font-semibold text-gray-900">Update verfügbar</h3>
              </div>
              <button
                onClick={() => setUpdateAvailable(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Eine neue Version der App ist verfügbar. Aktualisieren Sie für die neuesten Features und Verbesserungen.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isUpdating ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                {isUpdating ? 'Aktualisiere...' : 'Aktualisieren'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install Prompt */}
      <AnimatePresence>
        {showInstallPrompt && installPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 z-50 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg shadow-xl p-4 max-w-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                <h3 className="font-semibold">App installieren</h3>
              </div>
              <button
                onClick={() => setShowInstallPrompt(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-white/90 mb-4">
              Installieren Sie WATCH.ACT.PROTECT als App für schnelleren Zugriff und bessere Performance.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                className="flex-1 bg-white text-teal-600 hover:bg-gray-100"
              >
                <Download className="h-4 w-4 mr-2" />
                Installieren
              </Button>
              <Button
                onClick={() => setShowInstallPrompt(false)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Später
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAUpdatePrompt; 