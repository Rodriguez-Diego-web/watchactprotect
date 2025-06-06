import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';
import { Button } from '@/components/ui/Button';
import { RotateCcw, Home, Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const ResultPage = () => {
  const navigate = useNavigate();
  const { result, resetTest, isTestCompleted, clearTestData } = useTestStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isTestCompleted || !result) {
      navigate('/');
    }
  }, [isTestCompleted, result, navigate]);

  if (!result) {
    return null;
  }

  const percentage = Math.round((result.totalScore / result.maxScore) * 100);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Ausgezeichnet';
    if (score >= 60) return 'Gut';
    if (score >= 40) return 'Ausreichend';
    return 'Verbesserungsbedarf';
  };

  const getFeedbackText = (score: number) => {
    if (score >= 80) {
      return 'Hervorragend! Du hast ein ausgezeichnetes Verständnis dafür, wie man sexualisierte Gewalt im Sport erkennt und verhindert. Mit deinem Wissen kannst du einen wichtigen Beitrag zu einem sicheren Sportumfeld leisten.';
    }
    if (score >= 60) {
      return 'Gut gemacht! Du hast ein gutes Verständnis der wichtigsten Konzepte zur Prävention von sexualisierter Gewalt im Sport. Mit etwas mehr Wissen könntest du noch besser werden.';
    }
    if (score >= 40) {
      return 'Du hast grundlegende Kenntnisse über sexualisierte Gewalt im Sport. Es gibt aber noch Bereiche, in denen du dein Wissen vertiefen könntest, um Warnsignale früher zu erkennen.';
    }
    return 'Es gibt noch einige Lücken in deinem Verständnis über sexualisierte Gewalt im Sport. Wir empfehlen dir, mehr über dieses wichtige Thema zu lernen, um ein sicheres Sportumfeld zu fördern.';
  };


  
  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht! Mach ihn selbst: ${window.location.origin}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht!`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Meine Ergebnisse im ERKENNEN. STOPPEN. Test');
    const body = encodeURIComponent(`Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht! Mach ihn selbst: ${window.location.origin}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const copyToClipboard = () => {
    const text = `Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht! Mach ihn selbst: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetakeTest = () => {
    resetTest();
    navigate('/test');
  };

  return (
    <>
      <Helmet>
        <title>Deine Ergebnisse - ERKENNEN. STOPPEN.</title>
        <meta name="description" content={`Test mit ${percentage}% abgeschlossen. ${result.feedback}`} />
        <meta property="og:title" content={`Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht.`} />
        <meta property="og:description" content="Teste dein Wissen zur Prävention von sexualisierter Gewalt im Sport." />
        {result.shareableCardUrl && (
          <meta property="og:image" content={result.shareableCardUrl} />
        )}
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Results Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-6"
                >
                  <div className={`text-6xl font-bold ${getScoreColor(percentage)} mb-2`}>
                    {percentage}%
                  </div>
                  <div className={`text-xl font-semibold ${getScoreColor(percentage)}`}>
                    {getScoreLabel(percentage)}
                  </div>
                </motion.div>

                <h1 className="text-3xl font-bold text-navy mb-4">
                  Test abgeschlossen!
                </h1>
                
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {getFeedbackText(percentage)}
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange mb-2">
                    {result.spotScore}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    ERKENNEN Punktzahl
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Warnsignale erkennen
                  </div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-navy mb-2">
                    {result.endScore}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    STOPPEN Punktzahl
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Maßnahmen ergreifen
                  </div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700 mb-2">
                    {result.totalScore}/{result.maxScore}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Gesamtpunktzahl
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Gesamtleistung
                  </div>
                </div>
              </div>

              {/* Shareable Card Preview */}
              {result.shareableCardUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-semibold text-navy mb-4 text-center">
                    Teile deine Ergebnisse
                  </h3>
                  <div className="flex justify-center">
                    <img
                      src={result.shareableCardUrl}
                      alt="Teilbare Ergebniskarte"
                      className="max-w-md w-full rounded-lg shadow-md"
                    />
                  </div>
                </motion.div>
              )}

              {/* Social Sharing */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-navy mb-4 text-center">
                  Teile deine Ergebnisse
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
                  <button
                    onClick={shareViaWhatsApp}
                    className="flex flex-col items-center justify-center p-4 bg-[#25D366] text-white rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </button>
                  
                  <button
                    onClick={shareViaFacebook}
                    className="flex flex-col items-center justify-center p-4 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  
                  <button
                    onClick={shareViaTwitter}
                    className="flex flex-col items-center justify-center p-4 bg-[#1DA1F2] text-white rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59l-.047-.02z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  
                  <button
                    onClick={shareViaEmail}
                    className="flex flex-col items-center justify-center p-4 bg-gray-700 text-white rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                        <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">E-Mail</span>
                  </button>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center justify-center px-6 py-3 rounded-lg border ${copied ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'} transition-all`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Link kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Link kopieren
                      </>
                    )}
                  </button>
                </div>
              </div>
                
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleRetakeTest}
                  variant="orange"
                  size="lg"
                  className="flex items-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Test wiederholen
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Zur Startseite
                </Button>
              </div>
              
              {/* Reset Demo Data */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-2">Probleme mit der Anzeige? Demo-Daten zurücksetzen:</p>
                <button 
                  onClick={clearTestData}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Alle Testdaten löschen und neu starten
                </button>
              </div>
            </div>

            {/* Resources Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-navy mb-6 text-center">
                Weitere Informationen
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-orange/20 rounded-lg hover:border-orange/40 transition-colors">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Ressourcen herunterladen
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Hol dir umfassende Anleitungen und Materialien für deine Sportorganisation.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Kit
                  </Button>
                </div>
                
                <div className="p-6 border-2 border-navy/20 rounded-lg hover:border-navy/40 transition-colors">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Mehr erfahren
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Erfahre mehr über die Geschichte hinter dieser Kampagne und wie du dich beteiligen kannst.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/story')}
                  >
                    Projektgeschichte
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
