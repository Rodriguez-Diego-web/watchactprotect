import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useBottomNavigation } from '../../hooks/useBottomNavigation';
import { useMenu } from '../../contexts/MenuContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  action?: () => void;
}

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const { isMenuOpen } = useMenu();
  // const { isVisible } = useBottomNavigation(); // Scroll-Animation deaktiviert
  const isVisible = !isMenuOpen; // Navigation versteckt sich wenn Menu offen ist

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/project-story' || path === '/team' || path === '/franchise-kit' || path === '/contact') {
      setActiveTab('home');
    } else if (path === '/test' || path === '/result') {
      setActiveTab('test');
    } else if (path === '/chat') {
      setActiveTab('chat');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  const handleChatClick = () => {
    // Trigger ChatBot - we'll dispatch a custom event
    window.dispatchEvent(new CustomEvent('toggleChatBot'));
  };

  const navItems: NavItem[] = [
    {
      id: 'test',
      label: 'TEST',
      icon: <FileText className="h-4 w-4" />,
      path: '/test'
    },
    {
      id: 'home',
      label: 'HOME',
      icon: <Home className="h-5 w-5" />,
      path: '/'
    },
    {
      id: 'chat',
      label: 'CHAT',
      icon: <MessageCircle className="h-4 w-4" />,
      path: '#',
      action: handleChatClick
    }
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.action) {
      item.action();
    } else {
      navigate(item.path);
    }
    setActiveTab(item.id);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.3
      }}
      className="fixed bottom-6 left-0 right-0 mx-auto w-fit z-50 lg:hidden"
    >
      {/* Runde, fliegende Navigation wie auf dem Bild */}
      <div className="bg-gray-600/30 backdrop-blur-xl rounded-full shadow-2xl px-4 py-3">
        
        <div className="flex items-center gap-3 relative">
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            
            return (
              <motion.div 
                key={item.id} 
                className="relative"
                animate={{
                  width: isActive ? "auto" : "48px",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Kapsel für aktive Items */}
                {isActive ? (
                  <motion.div
                    layoutId="activeTabCapsula"
                    className="bg-black rounded-full px-4 py-3 flex items-center gap-2"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => handleNavClick(item)}
                  >
                    <motion.span 
                      key={activeTab}
                      className="text-white text-sm font-medium capitalize whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label.toLowerCase()}
                    </motion.span>
                    <motion.div 
                      key={`capsule-icon-${activeTab}`}
                      className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* Normale Icon-Buttons für inaktive Items */
                  <motion.button
                    onClick={() => handleNavClick(item)}
                    className="flex items-center justify-center transition-all duration-300"
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-white/80 text-gray-600 hover:bg-white transition-all duration-300"
                    >
                      {item.icon}
                    </motion.div>
                  </motion.button>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNavigation; 