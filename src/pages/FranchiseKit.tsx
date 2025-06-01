import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Palette, Globe, Code, Check } from 'lucide-react';

const FranchiseKit = () => {
  const navigate = useNavigate();
  const [embedConfig, setEmbedConfig] = useState({
    language: 'en',
    primaryColor: '#FF5A1F',
    secondaryColor: '#0A1E3F',
    theme: 'light'
  });
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    const config = encodeURIComponent(JSON.stringify(embedConfig));
    return `<iframe 
  src="${window.location.origin}/widget?config=${config}"
  width="100%" 
  height="600" 
  frameborder="0"
  title="SPOT IT. STOP IT. Interactive Test"
  aria-label="Interactive test for identifying and stopping sexualised violence in sport">
</iframe>

<script>
  // Optional: Listen for completion events
  window.addEventListener('message', function(event) {
    if (event.data.type === 'SPOT_IT_STOP_IT_COMPLETE') {
      console.log('Test completed:', event.data.result);
      // Handle completion (e.g., redirect, show message)
    }
  });
</script>`;
  };

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadAssets = () => {
    // In a real implementation, this would download a zip file with assets
    alert('Asset download would be implemented here - logos, guidelines, etc.');
  };

  return (
    <>
      <Helmet>
        <title>Franchise Kit - SPOT IT. STOP IT.</title>
        <meta name="description" content="Embed the SPOT IT. STOP IT. test on your website with our franchise kit." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-10 border-b">
          <div className="container mx-auto px-4 py-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-20 bg-gradient-to-r from-navy to-navy/90 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl font-bold mb-6">
                Franchise Kit
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Embed the SPOT IT. STOP IT. test on your website and help spread 
                awareness in your sporting community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Widget Generator */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Configuration Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-navy mb-6 flex items-center">
                      <Palette className="w-6 h-6 mr-3" />
                      Customize Your Widget
                    </h2>

                    <div className="space-y-6">
                      {/* Language Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Globe className="w-4 h-4 inline mr-2" />
                          Language
                        </label>
                        <select
                          value={embedConfig.language}
                          onChange={(e) => setEmbedConfig(prev => ({ ...prev, language: e.target.value }))}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent"
                        >
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                          <option value="fr">Français</option>
                          <option value="es">Español</option>
                        </select>
                      </div>

                      {/* Primary Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color (CTA buttons)
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={embedConfig.primaryColor}
                            onChange={(e) => setEmbedConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={embedConfig.primaryColor}
                            onChange={(e) => setEmbedConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent font-mono"
                          />
                        </div>
                      </div>

                      {/* Secondary Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Color (Headers)
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="color"
                            value={embedConfig.secondaryColor}
                            onChange={(e) => setEmbedConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                            className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={embedConfig.secondaryColor}
                            onChange={(e) => setEmbedConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-transparent font-mono"
                          />
                        </div>
                      </div>

                      {/* Theme */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Theme
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            embedConfig.theme === 'light' ? 'border-orange bg-orange/10' : 'border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              value="light"
                              checked={embedConfig.theme === 'light'}
                              onChange={(e) => setEmbedConfig(prev => ({ ...prev, theme: e.target.value }))}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="w-8 h-8 bg-white border border-gray-300 rounded mx-auto mb-2"></div>
                              <span className="text-sm font-medium">Light</span>
                            </div>
                          </label>
                          <label className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            embedConfig.theme === 'dark' ? 'border-orange bg-orange/10' : 'border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              value="dark"
                              checked={embedConfig.theme === 'dark'}
                              onChange={(e) => setEmbedConfig(prev => ({ ...prev, theme: e.target.value }))}
                              className="sr-only"
                            />
                            <div className="text-center">
                              <div className="w-8 h-8 bg-gray-800 rounded mx-auto mb-2"></div>
                              <span className="text-sm font-medium">Dark</span>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Code Preview */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-navy mb-6 flex items-center">
                      <Code className="w-6 h-6 mr-3" />
                      Embed Code
                    </h2>

                    <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-x-auto">
                      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                        {generateEmbedCode()}
                      </pre>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={copyEmbedCode}
                        variant="orange"
                        className="flex items-center flex-1"
                      >
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? 'Copied!' : 'Copy Code'}
                      </Button>
                    </div>

                    {/* Preview */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-navy mb-4">Preview</h3>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50"
                        style={{
                          '--primary-color': embedConfig.primaryColor,
                          '--secondary-color': embedConfig.secondaryColor
                        } as React.CSSProperties}
                      >
                        <div className="max-w-md mx-auto">
                          <h4 className="text-xl font-bold mb-4" style={{ color: embedConfig.secondaryColor }}>
                            SPOT IT. STOP IT.
                          </h4>
                          <p className="text-gray-600 mb-6">
                            Interactive test preview would appear here
                          </p>
                          <div 
                            className="inline-block px-6 py-3 rounded-lg text-white font-semibold"
                            style={{ backgroundColor: embedConfig.primaryColor }}
                          >
                            Start Test
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-navy mb-12 text-center">
                Additional Resources
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <Download className="w-12 h-12 text-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-3">Brand Assets</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Download logos, color palettes, and brand guidelines.
                  </p>
                  <Button onClick={downloadAssets} variant="outline" size="sm">
                    Download
                  </Button>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <Code className="w-12 h-12 text-navy mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-3">API Documentation</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Advanced integration options and event handling.
                  </p>
                  <Button variant="outline" size="sm">
                    View Docs
                  </Button>
                </div>

                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                  <Globe className="w-12 h-12 text-orange mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-navy mb-3">Support</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get help with implementation and customization.
                  </p>
                  <Button variant="outline" size="sm">
                    Get Support
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-navy mb-8 text-center">
                Implementation Guide
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    1. Copy the Embed Code
                  </h3>
                  <p className="text-gray-600">
                    Use the generator above to customize colors and language, then copy the generated embed code.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    2. Add to Your Website
                  </h3>
                  <p className="text-gray-600">
                    Paste the code into your HTML where you want the test to appear. The iframe will automatically resize to fit your content.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    3. Handle Events (Optional)
                  </h3>
                  <p className="text-gray-600">
                    Listen for completion events to redirect users or show custom messages when they finish the test.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    4. Test and Launch
                  </h3>
                  <p className="text-gray-600">
                    Test the widget on your site to ensure it works correctly, then launch to start helping your community.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FranchiseKit;
