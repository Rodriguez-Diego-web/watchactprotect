import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense, useState, useEffect } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ChatBot from './components/ChatBot';
import PWAUpdatePrompt from './components/PWAUpdatePrompt';
import NetworkStatusBanner from './components/NetworkStatusBanner';
import BottomNavigationWrapper from './components/navigation/BottomNavigationWrapper';
import OnboardingOverlay from './components/OnboardingOverlay';
import LoadingAnimation from './components/LoadingAnimation';
import { MenuProvider } from './contexts/MenuContext';

// Lazy load route components for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TestFlow = lazy(() => import('./pages/TestFlow'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const ProjectStory = lazy(() => import('./pages/ProjectStory'));
const Team = lazy(() => import('./pages/Team'));
const FranchiseKit = lazy(() => import('./pages/FranchiseKit'));
const WidgetApp = lazy(() => import('./pages/WidgetApp'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is first visit
    const hasVisited = localStorage.getItem('hasVisited');
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (!hasVisited) {
      // First time visitor - show loading then onboarding
      localStorage.setItem('hasVisited', 'true');
    } else {
      // Returning visitor - just show loading briefly
      setTimeout(() => setShowLoading(false), 1500);
    }

    if (!onboardingCompleted && hasVisited) {
      // Don't show onboarding until loading is done
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingClose = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  return (
    <MenuProvider>
      <Helmet>
        <title>SPOT IT. STOP IT. - Campaign Against Sexualised Violence in Sport</title>
        <meta name="description" content="An interactive campaign helping athletes of all ages identify and counteract sexualised violence in sport." />
        <meta property="og:title" content="SPOT IT. STOP IT. - Campaign Against Sexualised Violence in Sport" />
        <meta property="og:description" content="An interactive campaign helping athletes of all ages identify and counteract sexualised violence in sport." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SPOT IT. STOP IT." />
        <meta name="twitter:description" content="Campaign Against Sexualised Violence in Sport" />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <NetworkStatusBanner />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestFlow />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/project-story" element={<ProjectStory />} />
            <Route path="/team" element={<Team />} />
            <Route path="/franchise-kit" element={<FranchiseKit />} />
            <Route path="/widget" element={<WidgetApp />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
        <ChatBot />
        <BottomNavigationWrapper />
        <PWAUpdatePrompt />
        
        {/* Loading Animation */}
        {showLoading && (
          <LoadingAnimation onComplete={handleLoadingComplete} />
        )}
        
        {/* Onboarding Overlay */}
        {showOnboarding && (
          <OnboardingOverlay onClose={handleOnboardingClose} />
        )}
      </div>
    </MenuProvider>
  );
}

export default App;
