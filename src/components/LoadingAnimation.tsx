import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setCurrentStep(1), 1500);
    const timer3 = setTimeout(() => setCurrentStep(2), 2500);
    const timer4 = setTimeout(() => setCurrentStep(3), 3500);
    const timer5 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#fcc424]/20 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 1
              }}
              className="mb-12"
            >
              <motion.div
                animate={{ 
                  scale: currentStep >= 1 ? [1, 1.1, 1] : 1,
                  rotate: currentStep >= 2 ? [0, 5, -5, 0] : 0
                }}
                transition={{ 
                  duration: 0.6,
                  repeat: currentStep >= 1 ? Infinity : 0,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <img
                  src={logo}
                  alt="WATCH.ACT.PROTECT Logo"
                  className="w-32 h-32 object-contain"
                />
                
                {/* Glowing effect */}
                <motion.div
                  className="absolute inset-0 bg-[#fcc424]/20 rounded-full blur-xl"
                  animate={{ 
                    scale: currentStep >= 1 ? [1, 1.3, 1] : 0,
                    opacity: currentStep >= 1 ? [0.2, 0.6, 0.2] : 0
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: currentStep >= 1 ? 1 : 0, y: currentStep >= 1 ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-2xl font-bold text-white mb-2"
            animate={{ 
              color: currentStep >= 2 ? ["#ffffff", "#fcc424", "#ffffff"] : "#ffffff"
            }}
            transition={{ 
              duration: 1, 
              repeat: currentStep >= 2 ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            WATCH.ACT.PROTECT
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 text-sm"
          >
            Sichere Räume im Sport schaffen
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ 
            opacity: currentStep >= 1 ? 1 : 0,
            width: currentStep >= 1 ? "200px" : 0 
          }}
          transition={{ duration: 0.5 }}
          className="h-1 bg-gray-800 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#fcc424] via-[#dd4d22] to-[#1e8b88]"
            initial={{ x: "-100%" }}
            animate={{ x: currentStep >= 1 ? "0%" : "-100%" }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#fcc424] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: currentStep >= 3 ? 1 : 0, 
          y: currentStep >= 3 ? 0 : 50 
        }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-12 text-center text-gray-500 text-sm"
      >
        Lade dein Erlebnis...
      </motion.div>
    </motion.div>
  );
};

export default LoadingAnimation; 