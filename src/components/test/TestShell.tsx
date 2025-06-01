import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';


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
  const [showLevelSelection, setShowLevelSelection] = useState<boolean>(false);

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

  // If not started, and not loading/error, show start screen
  // This part might need adjustment if TestShell is meant to show a phase selection first
  if (!isTestStarted) {
    if (showLevelSelection) {
      // Display Level Selection UI for 'spot' phase
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-navy mb-4">Erkennungstest - Level wählen</h2>
          <p className="text-lg text-gray-600 mb-8">Wähle den Schwierigkeitsgrad für den Erkennungstest.</p>
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => { startTest('spot', 1); setShowLevelSelection(false); }}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 w-full max-w-xs"
            >
              Level 1: Grundlagen-Sensibilisierung
            </Button>
            <Button
              onClick={() => { startTest('spot', 2); setShowLevelSelection(false); }}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 w-full max-w-xs"
            >
              Level 2: Manipulation erkennen
            </Button>
            <Button
              onClick={() => { startTest('spot', 3); setShowLevelSelection(false); }}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 w-full max-w-xs"
            >
              Level 3: Eskalationsmuster erkennen
            </Button>
            <Button
              onClick={() => setShowLevelSelection(false)} // Go back to phase selection
              variant="ghost"
              size="sm"
              className="mt-4 text-gray-600"
            >
              Zurück zur Testauswahl
            </Button>
          </div>
        </motion.div>
      );
    }
    // Display Initial Phase Selection UI
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-navy mb-6">
          Wähle einen Testbereich
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Teste dein Wissen und lerne, wie du sexualisierte Gewalt im Sport erkennen und aktiv dagegen vorgehen kannst. Wähle einen der beiden Bereiche, um zu starten.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Button
            onClick={() => setShowLevelSelection(true)} // Show level selection for 'spot'
            variant="cta"
            size="lg"
            className="text-lg px-8 py-4 w-full sm:w-auto"
          >
            ERKENNEN Test (SEE IT)
          </Button>
          <Button
            onClick={() => startTest('end')} // Directly start 'end' phase
            variant="cta"
            size="lg"
            className="text-lg px-8 py-4 w-full sm:w-auto"
          >
            STOPPEN Test (END IT)
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h3 className="text-xl font-semibold text-navy mb-6">
            {currentQuestion.prompt}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options && currentQuestion.options.map((option) => (
              <label
                key={option.id}
                className={`block p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-orange/50 ${
                  selectedOption === option.id
                    ? 'border-orange bg-orange/10'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionSelect(option.id)}
                  className="sr-only"
                />
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      selectedOption === option.id
                        ? 'border-orange bg-orange'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </label>
            ))}
          </div>
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
