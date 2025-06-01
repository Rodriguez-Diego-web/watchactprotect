import { describe, it, expect } from 'vitest';
import questionsData from '../questions.json';

// Access the questions array properly
const questions = (questionsData as any).questions || questionsData;

describe('Questions Data', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should have questions for both phases', () => {
    const spotQuestions = questions.filter((q) => q.phase === 'spot');
    const stopQuestions = questions.filter((q) => q.phase === 'stop');
    
    expect(spotQuestions.length).toBeGreaterThan(0);
    expect(stopQuestions.length).toBeGreaterThan(0);
  });

  it('should have valid question structure', () => {
    questions.forEach((question) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('phase');
      expect(question).toHaveProperty('prompt');
      expect(question).toHaveProperty('options');
      
      expect(typeof question.id).toBe('string');
      expect(['spot', 'stop']).toContain(question.phase);
      expect(typeof question.prompt).toBe('string');
      expect(Array.isArray(question.options)).toBe(true);
      expect(question.options.length).toBeGreaterThan(1);
    });
  });

  it('should have valid option structure', () => {
    questions.forEach(question => {
      question.options.forEach((option) => {
        expect(option).toHaveProperty('id');
        expect(option).toHaveProperty('text');
        expect(option).toHaveProperty('score');
        expect(option).toHaveProperty('feedback');
        
        expect(typeof option.id).toBe('string');
        expect(typeof option.text).toBe('string');
        expect(typeof option.score).toBe('number');
        expect(typeof option.feedback).toBe('string');
        expect(option.score).toBeGreaterThanOrEqual(0);
        expect(option.score).toBeLessThanOrEqual(3);
      });
    });
  });

  it('should have unique question IDs', () => {
    const ids = questions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique option IDs within each question', () => {
    questions.forEach(question => {
      const optionIds = question.options.map(o => o.id);
      const uniqueOptionIds = new Set(optionIds);
      expect(uniqueOptionIds.size).toBe(optionIds.length);
    });
  });

  it('should have meaningful prompts and feedback', () => {
    questions.forEach(question => {
      expect(question.prompt.length).toBeGreaterThan(10);
      
      question.options.forEach(option => {
        expect(option.text.length).toBeGreaterThan(3);
        expect(option.feedback.length).toBeGreaterThan(10);
      });
    });
  });
});
