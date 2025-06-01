import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load route components for performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const TestFlow = lazy(() => import('./pages/TestFlow'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
const ProjectStory = lazy(() => import('./pages/ProjectStory'));
const Team = lazy(() => import('./pages/Team'));
const FranchiseKit = lazy(() => import('./pages/FranchiseKit'));
const WidgetApp = lazy(() => import('./pages/WidgetApp'));

function App() {
  return (
    <>
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
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestFlow />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/project-story" element={<ProjectStory />} />
            <Route path="/team" element={<Team />} />
            <Route path="/franchise-kit" element={<FranchiseKit />} />
            <Route path="/widget" element={<WidgetApp />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
