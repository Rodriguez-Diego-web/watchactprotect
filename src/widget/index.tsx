import React from 'react';
import ReactDOM from 'react-dom/client';
import TestShell from '@/components/test/TestShell';
import { useTestStore } from '@/store/testStore';
import '../index.css';

// Widget configuration interface
interface WidgetConfig {
  language?: string;
  primaryColor?: string;
  secondaryColor?: string;
  theme?: 'light' | 'dark';
}

// Parse configuration from URL parameters
const getConfigFromUrl = (): WidgetConfig => {
  const urlParams = new URLSearchParams(window.location.search);
  const configParam = urlParams.get('config');
  
  if (configParam) {
    try {
      return JSON.parse(decodeURIComponent(configParam));
    } catch (error) {
      console.warn('Failed to parse widget config:', error);
    }
  }
  
  return {};
};

// Apply custom styling based on configuration
const applyCustomStyling = (config: WidgetConfig) => {
  const root = document.documentElement;
  
  if (config.primaryColor) {
    root.style.setProperty('--widget-primary', config.primaryColor);
  }
  
  if (config.secondaryColor) {
    root.style.setProperty('--widget-secondary', config.secondaryColor);
  }
  
  if (config.theme === 'dark') {
    document.body.classList.add('dark');
  }
};

// Widget wrapper component
const WidgetApp = () => {
  const { result, isTestCompleted } = useTestStore();
  
  // Send completion event to parent window
  React.useEffect(() => {
    if (isTestCompleted && result) {
      const message = {
        type: 'SPOT_IT_STOP_IT_COMPLETE',
        result: {
          score: result.totalScore,
          maxScore: result.maxScore,
          percentage: Math.round((result.totalScore / result.maxScore) * 100),
          feedback: result.feedback
        }
      };
      
      // Send to parent window if in iframe
      if (window.parent !== window) {
        window.parent.postMessage(message, '*');
      }
      
      // Also dispatch as custom event for direct embeds
      window.dispatchEvent(new CustomEvent('spotItStopItComplete', { detail: message.result }));
    }
  }, [isTestCompleted, result]);

  return (
    <div className="widget-container p-4">
      <TestShell embedded={true} />
    </div>
  );
};

// Initialize widget
const initWidget = () => {
  const config = getConfigFromUrl();
  applyCustomStyling(config);
  
  const container = document.getElementById('widget-root') || document.body;
  const root = ReactDOM.createRoot(container);
  
  root.render(
    <React.StrictMode>
      <WidgetApp />
    </React.StrictMode>
  );
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

// Export for manual initialization
export { initWidget, WidgetApp };
