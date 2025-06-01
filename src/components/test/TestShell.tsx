import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';
import { Button } from '@/components/ui/Button';
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
    isLoadingQuestions, // Added for loading state
    errorLoadingQuestions, // Added for error state
    currentPhase // Added to know which phase is active or to select one
  } = useTestStore();

  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    // Only call loadQuestions if allQuestions is empty to avoid redundant fetches
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

  // Find existing answer for current question
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
        score: selectedOptionData.score || 0, // Provide default for score
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

    // Handle loading and error states first
  if (isLoadingQuestions) {
    return <div className="text-center p-10">Fragen werden geladen...</div>;
  }

  if (errorLoadingQuestions) {
    return <div className="text-center p-10 text-red-600">Fehler beim Laden der Fragen: {errorLoadingQuestions}</div>;
  }

  // Wenn der Test nicht gestartet ist, zeigen wir die Level-Auswahl
  if (!isTestStarted) {
    if (isLoadingQuestions) {
      return <div className="text-center p-10">Fragen werden geladen...</div>;
    }
    
    // Zeige direkt die Level-Auswahl
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-navy mb-4">Wähle einen Schwierigkeitsgrad</h2>
        <p className="text-lg text-gray-600 mb-8">Wähle den Level, mit dem du beginnen möchtest.</p>
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => startTest('spot', 1)}
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 w-full max-w-xs"
          >
            Level 1: Grundlagen-Sensibilisierung
          </Button>
          <Button
            onClick={() => startTest('spot', 2)}
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 w-full max-w-xs"
          >
            Level 2: Manipulation erkennen
          </Button>
          <Button
            onClick={() => startTest('spot', 3)}
            variant="outline"
            size="lg"
            className="text-lg px-8 py-4 w-full max-w-xs"
          >
            Level 3: Eskalationsmuster erkennen
          </Button>
        </div>
      </motion.div>
    );
  }

    // This check might be redundant if isLoadingQuestions is handled, 
  // but good as a fallback if questions array is empty for the started phase.
  if (!currentQuestion && isTestStarted) {
    return <div className="text-center p-10">Keine Fragen für diesen Testabschnitt verfügbar oder Test nicht korrekt gestartet.</div>;
  }
  // If test is not started, the start screen is shown above. If currentQuestion is null but test *is* started, it means an issue.
  // If currentQuestion is null and test is NOT started, it's fine, the start screen handles it.
  if (!currentQuestion && !isTestStarted) {
      // This case should ideally be caught by the !isTestStarted block above which returns the start button.
      // If somehow reached, it means questions might not be loaded yet or no phase selected.
      return <div className="text-center p-10">Test initialisieren...</div>;
  }
  // Ensure currentQuestion is not null before proceeding to render the test UI
  if (!currentQuestion) {
    // This should ideally not be reached if the above conditions are met.
    // It's a safeguard.
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
                    <h2 className="text-2xl sm:text-3xl font-semibold text-navy mb-6 sm:mb-8 leading-tight">
                      {currentQuestion.prompt}
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                      {currentQuestion.options?.map((option) => (
                        <motion.div
                          key={option.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            variant={selectedOption === option.id ? 'cta' : 'outline'}
                            size="lg"
                            onClick={() => handleOptionSelect(option.id)}
                            className={`w-full text-left justify-start h-auto py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg whitespace-normal break-words ${selectedOption === option.id ? 'ring-2 ring-orange ring-offset-2' : ''
                              }`}
                          >
                            {option.text}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                    {selectedOption && currentQuestion.options?.find(opt => opt.id === selectedOption)?.feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 sm:p-4 bg-sky-100 border border-sky-300 rounded-md text-sky-800 text-sm sm:text-base"
                      >
                        {currentQuestion.options?.find(opt => opt.id === selectedOption)?.feedback}
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

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Zurück
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          variant={isLastQuestion ? "cta" : "orange"}
          className="flex items-center"
        >
          {isLastQuestion ? 'Test beenden' : 'Weiter'}
          {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default TestShell;
