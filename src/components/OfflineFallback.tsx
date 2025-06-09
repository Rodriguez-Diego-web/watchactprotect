import { motion } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

const OfflineFallback = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <WifiOff className="h-10 w-10 text-gray-500" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Keine Internetverbindung
        </h1>
        
        <p className="text-gray-600 mb-6">
          Es sieht so aus, als ob Sie offline sind. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.
        </p>
        
        <div className="space-y-4">
          <Button
            onClick={handleRetry}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Erneut versuchen
          </Button>
          
          <div className="text-sm text-gray-500">
            <p className="mb-2">Während Sie offline sind, können Sie:</p>
            <ul className="text-left space-y-1">
              <li>• Bereits geladene Inhalte ansehen</li>
              <li>• Den Test fortsetzen (falls bereits gestartet)</li>
              <li>• Ihre Ergebnisse später synchronisieren</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            WATCH.ACT.PROTECT funktioniert auch offline
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OfflineFallback; 