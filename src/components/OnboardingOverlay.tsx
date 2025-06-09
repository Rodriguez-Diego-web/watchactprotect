import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingScreen {
  id: number;
  title: string;
  description: string;
  image: string;
}

const onboardingScreens: OnboardingScreen[] = [
  {
    id: 1,
    title: "Website entdecken",
    description: "Lerne die verschiedenen Bereiche unserer Kampagnen-Website kennen.",
    image: "/onboarding/1.png"
  },
  {
    id: 2,
    title: "Test starten",
    description: "Verstehe, wie unser interaktiver Test funktioniert und dir hilft.",
    image: "/onboarding/2.png"
  },
  {
    id: 3,
    title: "Gemeinsam handeln",
    description: "Erfahre, wie du Teil der Lösung werden kannst.",
    image: "/onboarding/3.png"
  }
];

interface OnboardingOverlayProps {
  onClose: () => void;
}

const OnboardingOverlay: React.FC<OnboardingOverlayProps> = ({ onClose }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const nextScreen = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onClose();
    }
  };

  const prevScreen = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleSkip = () => {
    // Mark onboarding as completed in localStorage
    localStorage.setItem('onboardingCompleted', 'true');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50"
      onClick={handleSkip}
    >
      <div className="h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Skip Button */}
        <div className="flex justify-end p-6">
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Überspringen
          </button>
        </div>

        {/* Screen Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center max-w-sm mx-auto"
            >
              {/* Large Image */}
              <div className="w-80 h-80 mb-12 flex items-center justify-center">
                <img
                  src={onboardingScreens[currentScreen].image}
                  alt={onboardingScreens[currentScreen].title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-4">
                {onboardingScreens[currentScreen].title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-base leading-relaxed">
                {onboardingScreens[currentScreen].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section */}
        <div className="p-8">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {onboardingScreens.map((_, index) => (
              <div
                key={index}
                className={`h-2 transition-all duration-300 ${
                  index === currentScreen
                    ? 'bg-white w-8'
                    : 'bg-gray-600 w-2'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <button
              onClick={prevScreen}
              disabled={currentScreen === 0}
              className={`px-6 py-3 transition-all ${
                currentScreen === 0
                  ? 'text-transparent cursor-not-allowed'
                  : 'text-white hover:text-gray-300'
              }`}
            >
              Zurück
            </button>

            {/* Next/Start Button */}
            <button
              onClick={nextScreen}
              className="px-8 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
            >
              {currentScreen === onboardingScreens.length - 1 ? 'Starten' : 'Weiter'}
            </button>
          </div>

          {/* Logo/Brand */}
          <div className="flex justify-center mt-8">
            <div className="text-[#fcc424] font-bold text-sm">
              WATCH.ACT.PROTECT
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingOverlay; 