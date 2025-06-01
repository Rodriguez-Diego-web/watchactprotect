import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Question as TestQuestion } from '../types/test';

// Types TestAnswer and TestResult remain locally defined as they are specific to the store's state.
// Other types (TestQuestion, QuestionOption, EmergencyContact, DownloadableResource, QuestionType) are now imported from ../types/test.

export interface TestAnswer {
  questionId: string;
  selectedOptionId: string; // ID of the option chosen
  score: number;          // Score obtained for this answer
}

export interface TestResult {
  totalScore: number;
  maxScore: number;
  spotScore: number;
  endScore: number;
  feedback: string;
  shareableCardUrl?: string;
}

interface TestState {
  allQuestions: TestQuestion[]; // Holds all questions from questions.json
  questions: TestQuestion[]; // Questions for the current active test/phase
  currentQuestionIndex: number;
  currentPhase: 'spot' | 'end' | null; // Tracks the active test phase
  currentLevel: 1 | 2 | 3 | null; // Tracks the active level for 'spot' phase
  answers: TestAnswer[];
  isTestStarted: boolean;
  isTestCompleted: boolean;
  result: TestResult | null;
  isLoadingQuestions: boolean;
  errorLoadingQuestions: string | null;

  // Actions
  loadQuestions: () => Promise<void>; // Fetches questions from JSON
  startTest: (phase: 'spot' | 'end', level?: 1 | 2 | 3) => void; // Starts a test for a specific phase and optional level
  nextQuestion: () => void;
  previousQuestion: () => void;
  answerQuestion: (answer: TestAnswer) => void;
  completeTest: () => void;
  resetTest: () => void;
  calculateResult: () => TestResult;
  generateShareableCard: (result: TestResult) => string;
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      // Initial state
      allQuestions: [],
      questions: [],
      currentQuestionIndex: 0,
      currentPhase: null,
      currentLevel: null,
      answers: [],
      isTestStarted: false,
      isTestCompleted: false,
      result: null,
      isLoadingQuestions: false,
      errorLoadingQuestions: null,

      // Actions
      startTest: (phase: 'spot' | 'end', level?: 1 | 2 | 3) => {
        const { allQuestions } = get();
        let questionsForPhaseOrLevel = allQuestions.filter(q => q.phase === phase);

        if (phase === 'spot' && level) {
          questionsForPhaseOrLevel = questionsForPhaseOrLevel.filter(q => q.level === level);
        }

        if (questionsForPhaseOrLevel.length === 0) {
          console.warn(`No questions found for phase: ${phase}` + (level ? ` and level: ${level}` : ''));
          set({
            questions: [],
            currentPhase: phase,
            currentLevel: phase === 'spot' ? level || null : null,
            currentQuestionIndex: 0,
            answers: [],
            isTestStarted: false, 
            isTestCompleted: false,
            result: null,
          });
          return;
        }

        set({
          questions: questionsForPhaseOrLevel,
          currentPhase: phase,
          currentLevel: phase === 'spot' ? level || null : null,
          isTestStarted: true,
          isTestCompleted: false,
          currentQuestionIndex: 0,
          answers: [],
          result: null,
        });
      },

      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
          set({ currentQuestionIndex: currentQuestionIndex + 1 });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({ currentQuestionIndex: currentQuestionIndex - 1 });
        }
      },

      answerQuestion: (answer: TestAnswer) => {
        const { answers } = get();
        const existingAnswerIndex = answers.findIndex(
          (a) => a.questionId === answer.questionId
        );
        
        let newAnswers;
        if (existingAnswerIndex >= 0) {
          newAnswers = [...answers];
          newAnswers[existingAnswerIndex] = answer;
        } else {
          newAnswers = [...answers, answer];
        }
        
        set({ answers: newAnswers });
      },

      completeTest: () => {
        const result = get().calculateResult();
        const shareableCardUrl = get().generateShareableCard(result);
        set({ 
          isTestCompleted: true, 
          result: { ...result, shareableCardUrl } 
        });
      },

      resetTest: () =>
      set({
        currentQuestionIndex: 0,
        answers: [],
        isTestStarted: false,
        isTestCompleted: false,
        result: null,
        currentPhase: null,
        currentLevel: null, // Reset currentLevel as well
        // questions: [], // Optionally reset questions to empty or keep allQuestions loaded
      }),

      loadQuestions: async () => {
        set({ isLoadingQuestions: true, errorLoadingQuestions: null });
        try {
          // In a Vite/React project, you can directly import JSON files.
          // The import path is relative to the current file (src/store/testStore.ts)
          const testDataModule = await import('../data/questions.json');
          
          // Assuming questions.json has a structure like { "questions": [...] }
          // or is directly an array of questions.
          const rawData = testDataModule.default || testDataModule;
          let questionsArray: TestQuestion[];

          if (rawData && Array.isArray((rawData as { questions: TestQuestion[] }).questions)) {
            questionsArray = (rawData as { questions: TestQuestion[] }).questions;
          } else if (Array.isArray(rawData)) {
            questionsArray = rawData as TestQuestion[]; // Fallback if questions.json is directly an array
          } else {
            console.error('Invalid questions.json structure:', rawData);
            throw new Error('Invalid questions.json structure. Expected an object with a "questions" array or an array of questions.');
          }

          set({ allQuestions: questionsArray, isLoadingQuestions: false });
        } catch (error) {
          console.error('Failed to load questions:', error);
          set({
            errorLoadingQuestions: error instanceof Error ? error.message : 'Unknown error loading questions',
            isLoadingQuestions: false,
          });
        }
      },

      calculateResult: (): TestResult => {
        const { answers, questions } = get();
        
        const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
        const maxScore = questions.reduce((sum, question) => {
          // If a question has no options, or options have no scores, it contributes 0 to maxScore
          if (!question.options || question.options.length === 0) {
            return sum;
          }
          const maxOptionScore = Math.max(
            ...question.options.map(opt => opt.score || 0) // Use 0 if score is undefined
          );
          return sum + (maxOptionScore > 0 ? maxOptionScore : 0); // Add only if there's a positive max score
        }, 0);
        
        const spotAnswers = answers.filter(answer => {
          const question = questions.find(q => q.id === answer.questionId);
          return question?.phase === 'spot';
        });
        
        const endAnswers = answers.filter(answer => {
          const question = questions.find(q => q.id === answer.questionId);
          return question?.phase === 'end';
        });
        
        const spotScore = spotAnswers.reduce((sum, answer) => sum + answer.score, 0);
        const endScore = endAnswers.reduce((sum, answer) => sum + answer.score, 0);
        
        const percentage = (totalScore / maxScore) * 100;
        
        let feedback = '';
        if (percentage >= 80) {
          feedback = 'Excellent! You have a strong understanding of how to identify and stop sexualised violence in sport.';
        } else if (percentage >= 60) {
          feedback = 'Good awareness! There are still some areas where you can improve your knowledge.';
        } else if (percentage >= 40) {
          feedback = 'You have some knowledge, but there\'s room for significant improvement in recognizing warning signs.';
        } else {
          feedback = 'This is an important learning opportunity. We encourage you to explore our resources to better understand the signs.';
        }
        
        return {
          totalScore,
          maxScore,
          spotScore,
          endScore,
          feedback,
        };
      },

      generateShareableCard: (result: TestResult): string => {
        const percentage = Math.round((result.totalScore / result.maxScore) * 100);
        
        // Generate Cloudinary URL for shareable card
        const baseUrl = 'https://res.cloudinary.com/demo/image/upload';
        const textOverlay = `l_text:Inter_60_bold:I%20scored%20${percentage}%25%20on%20the%20SPOT%20IT%20STOP%20IT%20test`;
        const positioning = 'g_center,y_-50';
        const background = 'c_fill,w_1200,h_630,b_rgb:0A1E3F';
        
        return `${baseUrl}/${background}/${textOverlay},${positioning}/spot-it-stop-it-card.png`;
      },
    }),
    {
      name: 'test-progress',
      partialize: (state) => ({
        answers: state.answers,
        currentQuestionIndex: state.currentQuestionIndex,
        isTestStarted: state.isTestStarted,
        isTestCompleted: state.isTestCompleted,
        result: state.result,
      }),
    }
  )
);
