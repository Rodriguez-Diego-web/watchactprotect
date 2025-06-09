import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';
import { Progress } from '@/components/ui/Progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InformationGuideDisplay from './questiontypes/InformationGuideDisplay';
import EmergencyContactsDisplay from './questiontypes/EmergencyContactsDisplay';
import DownloadResourceDisplay from './questiontypes/DownloadResourceDisplay';

interface TestShellProps {
  embedded?: boolean;
}

const TestShell = ({ embedded = false }: TestShellProps) => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    answers,
    questions, // These are now the questions for the current phase
    isTestStarted,
    isTestCompleted,
    startTest,
    nextQuestion,
    previousQuestion,
    answerQuestion,
    completeTest,
    loadQuestions,
    isLoadingQuestions, 
    errorLoadingQuestions, 
    currentPhase 
  } = useTestStore();

  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    if (useTestStore.getState().allQuestions.length === 0) {
      loadQuestions();
    }
  }, [loadQuestions]);

  useEffect(() => {
    if (isTestCompleted && !embedded) {
      navigate('/result');
    }
  }, [isTestCompleted, navigate, embedded]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = selectedOption !== '';
  const canGoPrevious = currentQuestionIndex > 0;

  useEffect(() => {
    const existingAnswer = answers.find(
      (answer) => answer.questionId === currentQuestion?.id
    );
    setSelectedOption(existingAnswer?.selectedOptionId || '');
  }, [currentQuestion?.id, answers]);

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion || !currentQuestion.options) return;
    
    setSelectedOption(optionId);
    const selectedOptionData = currentQuestion.options.find(opt => opt.id === optionId);
    
    if (selectedOptionData) {
      answerQuestion({
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
        score: selectedOptionData.score || 0,
      });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      completeTest();
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  if (isLoadingQuestions) {
    return <div className="text-center p-10">Fragen werden geladen...</div>;
  }

  if (errorLoadingQuestions) {
    return <div className="text-center p-10 text-red-600">Fehler beim Laden der Fragen: {errorLoadingQuestions}</div>;
  }

  if (!isTestStarted) {
    if (isLoadingQuestions) {
      return <div className="text-center p-10">Fragen werden geladen...</div>;
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-4 py-8"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-navy mb-4">Wähle einen Schwierigkeitsgrad</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Wähle das Level, mit dem du beginnen möchtest.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Level 1 Karte */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-blue-200 hover:border-blue-400 h-full"
            onClick={() => startTest('spot', 1)}
          >
            <div className="px-6 py-8 flex flex-col h-full">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold text-blue-800 text-center mb-3">Grundlagen-Sensibilisierung</h3>
              <p className="text-blue-700 text-center mb-4 flex-grow">
                Grundlegende Erkennungszeichen von sexualisierter Gewalt kennenlernen und verstehen.  
              </p>
              <div className="bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg text-center mt-4">
                Level 1 starten
              </div>
            </div>
          </motion.div>

          {/* Level 2 Karte */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-purple-200 hover:border-purple-400 h-full"
            onClick={() => startTest('spot', 2)}
          >
            <div className="px-6 py-8 flex flex-col h-full">
              <div className="bg-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold text-purple-800 text-center mb-3">Manipulation erkennen</h3>
              <p className="text-purple-700 text-center mb-4 flex-grow">
                Lerne subtile Manipulationstechniken zu erkennen und zu durchschauen.
              </p>
              <div className="bg-purple-500 hover:bg-purple-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg text-center mt-4">
                Level 2 starten
              </div>
            </div>
          </motion.div>

          {/* Level 3 Karte */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-lg overflow-hidden cursor-pointer border-2 border-emerald-200 hover:border-emerald-400 h-full"
            onClick={() => startTest('spot', 3)}
          >
            <div className="px-6 py-8 flex flex-col h-full">
              <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold text-emerald-800 text-center mb-3">Eskalationsmuster erkennen</h3>
              <p className="text-emerald-700 text-center mb-4 flex-grow">
                Verstehe wie Situationen eskalieren können und erkenne frühzeitig die Warnsignale.
              </p>
              <div className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white font-semibold py-3 px-6 rounded-lg text-center mt-4">
                Level 3 starten
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion && isTestStarted) {
    return <div className="text-center p-10">Keine Fragen für diesen Testabschnitt verfügbar oder Test nicht korrekt gestartet.</div>;
  }
 
  if (!currentQuestion && !isTestStarted) {
      
      return <div className="text-center p-10">Test initialisieren...</div>;
  }
  
  if (!currentQuestion) {
    
    
    return <div className="text-center p-10">Ein unerwarteter Fehler ist aufgetreten. Aktuelle Frage nicht gefunden.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Frage {currentQuestionIndex + 1} von {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progress)}% abgeschlossen
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Phase indicator */}
      {currentPhase && (
        <div className="flex justify-center mb-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              currentPhase === 'spot'
                ? 'bg-orange/20 text-orange'
                : 'bg-navy/20 text-navy'
            }`}
          >
            {currentPhase === 'spot' ? 'ERKENNEN' : 'STOPPEN'}
          </span>
        </div>
      )}

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {(() => {
            switch (currentQuestion.type) {
              case 'multiple_choice_score':
              case 'multiple_choice_action':
                return (
                  <>
                    <div className="mb-8 pb-4 border-b border-gray-200">
                      {/* Dynamischer Badge je nach Level */}
                      <div className={`text-white text-sm font-medium rounded-full px-4 py-1 inline-block mb-3 ${
                        currentPhase === 'spot' && useTestStore.getState().currentLevel === 1 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        currentPhase === 'spot' && useTestStore.getState().currentLevel === 2 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                        currentPhase === 'spot' && useTestStore.getState().currentLevel === 3 
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                        'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}>
                        {currentPhase === 'spot' ? 'ERKENNEN' : 
                         currentPhase === 'end' ? 'HANDELN' : 'ERKENNEN'}
                        {currentPhase === 'spot' ? ` - LEVEL ${useTestStore.getState().currentLevel}` : ''}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-navy leading-tight">
                        {currentQuestion.prompt}
                      </h2>
                    </div>
                    <div className="space-y-4 sm:space-y-5 mt-6">
                      {currentQuestion.options?.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`rounded-xl overflow-hidden cursor-pointer transition-all ${
                            selectedOption === option.id 
                              ? currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
                                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 shadow-md'
                                : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                                  ? 'bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-400 shadow-md'
                                  : 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-400 shadow-md'
                              : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                          }`}
                          onClick={() => handleOptionSelect(option.id)}
                        >
                          <div className={`w-full text-left py-4 px-5 flex items-center ${
                            selectedOption === option.id 
                              ? currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
                                ? 'text-blue-800'
                                : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                                  ? 'text-purple-800'
                                  : 'text-emerald-800'
                              : 'text-gray-800'
                          }`}>
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full mr-4 flex items-center justify-center ${
                              selectedOption === option.id 
                                ? currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
                                  ? 'bg-blue-500 text-white'
                                  : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-emerald-500 text-white'
                                : 'border-2 border-gray-300'
                            }`}>
                              {selectedOption === option.id && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <span className="text-base sm:text-lg font-medium whitespace-normal break-words">{option.text}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    {selectedOption && currentQuestion.options?.find(opt => opt.id === selectedOption)?.feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-6 p-5 rounded-xl shadow-sm text-sm sm:text-base ${
                          currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
                            ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 text-blue-800'
                            : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                              ? 'bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-300 text-purple-800'
                              : 'bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-300 text-emerald-800'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className={`text-white p-1 rounded-full mr-3 mt-0.5 ${
                            currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
                              ? 'bg-blue-500'
                              : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                                ? 'bg-purple-500'
                                : 'bg-emerald-500'
                          }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>{currentQuestion.options?.find(opt => opt.id === selectedOption)?.feedback}</div>
                        </div>
                      </motion.div>
                    )}
                  </>
                );
              case 'information_guide':
                return <InformationGuideDisplay question={currentQuestion} />;
              case 'information_contacts':
                return <EmergencyContactsDisplay question={currentQuestion} />;
              case 'download_resource':
                return <DownloadResourceDisplay question={currentQuestion} />;
              default:
                return <p className="text-red-500">Unbekannter Fragetyp: {currentQuestion.type}</p>;
            }
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation mit verbessertem Design */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          whileHover={canGoPrevious ? { scale: 1.05 } : {}}
          whileTap={canGoPrevious ? { scale: 0.95 } : {}}
          className={`flex items-center px-5 py-3 rounded-lg ${canGoPrevious 
            ? currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
              ? 'bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors'
              : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                ? 'bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Zurück
        </motion.button>

        <motion.button
          onClick={handleNext}
          disabled={!canGoNext}
          whileHover={canGoNext ? { scale: 1.05 } : {}}
          whileTap={canGoNext ? { scale: 0.95 } : {}}
          className={`flex items-center px-5 py-3 rounded-lg font-medium transition-colors ${!canGoNext 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : isLastQuestion 
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : currentPhase === 'spot' && useTestStore.getState().currentLevel === 1
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : currentPhase === 'spot' && useTestStore.getState().currentLevel === 2
                  ? 'bg-purple-500 hover:bg-purple-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
        >
          {isLastQuestion ? 'Test beenden' : 'Weiter'}
          {!isLastQuestion && <ChevronRight className="w-5 h-5 ml-2" />}
        </motion.button>
      </div>
    </div>
  );
};

export default TestShell;
