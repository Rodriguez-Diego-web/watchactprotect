import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';
import { Button } from '@/components/ui/Button';
import { Share2, RotateCcw, Home, Download } from 'lucide-react';

const ResultPage = () => {
  const navigate = useNavigate();
  const { result, resetTest, isTestCompleted } = useTestStore();

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

  const handleShare = async () => {
    if (navigator.share && result.shareableCardUrl) {
      try {
        await navigator.share({
          title: 'ERKENNEN. STOPPEN. Testergebnisse',
          text: `Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    const text = `Ich habe ${percentage}% im ERKENNEN. STOPPEN. Test erreicht! Mach ihn selbst: ${window.location.origin}`;
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
                  {result.feedback}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleShare}
                  variant="orange"
                  size="lg"
                  className="flex items-center"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Ergebnisse teilen
                </Button>
                
                <Button
                  onClick={handleRetakeTest}
                  variant="outline"
                  size="lg"
                  className="flex items-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Test wiederholen
                </Button>
                
                <Button
                  onClick={() => navigate('/')}
                  variant="ghost"
                  size="lg"
                  className="flex items-center"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Zur Startseite
                </Button>
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
