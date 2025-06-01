import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestShell from '../TestShell';
import { useTestStore } from '@/store/testStore';

// Mock the store
vi.mock('@/store/testStore');

const mockUseTestStore = vi.mocked(useTestStore);

const mockTestStore = {
  currentQuestionIndex: 0,
  answers: [],
  questions: [
    {
      id: 'test_1',
      phase: 'spot' as const,
      prompt: 'Test question 1?',
      options: [
        { id: 'opt_1', text: 'Option 1', score: 1, feedback: 'Feedback 1' },
        { id: 'opt_2', text: 'Option 2', score: 3, feedback: 'Feedback 2' },
      ]
    },
    {
      id: 'test_2',
      phase: 'stop' as const,
      prompt: 'Test question 2?',
      options: [
        { id: 'opt_3', text: 'Option 3', score: 2, feedback: 'Feedback 3' },
        { id: 'opt_4', text: 'Option 4', score: 1, feedback: 'Feedback 4' },
      ]
    }
  ],
  isTestStarted: false,
  isTestCompleted: false,
  startTest: vi.fn(),
  nextQuestion: vi.fn(),
  previousQuestion: vi.fn(),
  answerQuestion: vi.fn(),
  completeTest: vi.fn(),
  loadQuestions: vi.fn(),
};

describe('TestShell', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTestStore.mockReturnValue(mockTestStore);
  });

  it('shows start screen when test is not started', () => {
    render(<TestShell />);
    
    expect(screen.getByText('Ready to Test Your Knowledge?')).toBeInTheDocument();
    expect(screen.getByText('Start Test')).toBeInTheDocument();
  });

  it('starts test when start button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestShell />);
    
    const startButton = screen.getByText('Start Test');
    await user.click(startButton);
    
    expect(mockTestStore.startTest).toHaveBeenCalled();
  });

  it('displays current question when test is started', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
    });

    render(<TestShell />);
    
    expect(screen.getByText('Test question 1?')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('shows correct phase indicator', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
    });

    render(<TestShell />);
    
    expect(screen.getByText('SPOT IT')).toBeInTheDocument();
  });

  it('updates progress bar correctly', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
      currentQuestionIndex: 1,
    });

    render(<TestShell />);
    
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument();
    expect(screen.getByText('100% complete')).toBeInTheDocument();
  });

  it('handles option selection', async () => {
    const user = userEvent.setup();
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
    });

    render(<TestShell />);
    
    const option = screen.getByText('Option 2');
    await user.click(option);
    
    expect(mockTestStore.answerQuestion).toHaveBeenCalledWith({
      questionId: 'test_1',
      selectedOptionId: 'opt_2',
      score: 3,
    });
  });

  it('enables next button when option is selected', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
      answers: [{ questionId: 'test_1', selectedOptionId: 'opt_2', score: 3 }],
    });

    render(<TestShell />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  it('shows complete button on last question', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
      currentQuestionIndex: 1, // Last question
      answers: [{ questionId: 'test_2', selectedOptionId: 'opt_3', score: 2 }],
    });

    render(<TestShell />);
    
    expect(screen.getByText('Complete Test')).toBeInTheDocument();
  });

  it('completes test when complete button is clicked', async () => {
    const user = userEvent.setup();
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
      currentQuestionIndex: 1,
      answers: [{ questionId: 'test_2', selectedOptionId: 'opt_3', score: 2 }],
    });

    render(<TestShell />);
    
    const completeButton = screen.getByText('Complete Test');
    await user.click(completeButton);
    
    expect(mockTestStore.completeTest).toHaveBeenCalled();
  });

  it('shows previous button when not on first question', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
      currentQuestionIndex: 1,
    });

    render(<TestShell />);
    
    const previousButton = screen.getByText('Previous');
    expect(previousButton).not.toBeDisabled();
  });

  it('handles accessibility correctly', () => {
    mockUseTestStore.mockReturnValue({
      ...mockTestStore,
      isTestStarted: true,
    });

    render(<TestShell />);
    
    // Check for proper radio button structure
    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(2);
    
    // Check for proper labels
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
