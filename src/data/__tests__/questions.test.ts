import { describe, it, expect } from 'vitest';
import questionsData from '../questions.json';
import type { Question, Option } from '../../types/test';

// Typisieren des JSON-Formats und Zugriff auf die Fragen
interface QuestionsData {
  questions: Question[];
}

// Zugriff auf die Fragen mit korrektem Typ
const questions = ((questionsData as QuestionsData).questions);

describe('Questions Data', () => {
  it('should have valid structure', () => {
    expect(Array.isArray(questions)).toBe(true);
    expect(questions.length).toBeGreaterThan(0);
  });

  it('should have questions for both phases', () => {
    const spotQuestions = questions.filter((q: Question) => q.phase === 'spot');
    const stopQuestions = questions.filter((q: Question) => q.phase === 'end');
    
    expect(spotQuestions.length).toBeGreaterThan(0);
    expect(stopQuestions.length).toBeGreaterThan(0);
  });

  it('should have valid question structure', () => {
    questions.forEach((question: Question) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('phase');
      expect(question).toHaveProperty('prompt');
      
      expect(typeof question.id).toBe('string');
      expect(['spot', 'end']).toContain(question.phase);
      expect(typeof question.prompt).toBe('string');
      
      // Überprüfe nur bei Fragen mit Multiple-Choice-Optionen
      if (question.type === 'multiple_choice_score' || question.type === 'multiple_choice_action') {
        expect(question).toHaveProperty('options');
        expect(Array.isArray(question.options)).toBe(true);
        if (question.options) {
          expect(question.options.length).toBeGreaterThan(1);
        }
      }
    });
  });

  it('should have valid option structure', () => {
    // Filtere zuerst nur Fragen mit Optionen (Multiple-Choice)
    const questionsWithOptions = questions.filter(
      (q): q is Question & { options: Option[] } => {
        return (
          (q.type === 'multiple_choice_score' || q.type === 'multiple_choice_action') && 
          Array.isArray(q.options) && 
          q.options !== undefined
        );
      }
    );
    
    // Jetzt sind alle Fragen garantiert mit options
    questionsWithOptions.forEach((question) => {      
      // TypeScript weiß jetzt, dass options definiert ist
      question.options.forEach((option: Option) => {
        expect(option).toHaveProperty('id');
        expect(option).toHaveProperty('text');
        expect(option).toHaveProperty('score');
        
        expect(typeof option.id).toBe('string');
        expect(typeof option.text).toBe('string');
        expect(typeof option.score).toBe('number');
        
        // Nur prüfen, wenn feedback vorhanden ist
        if (typeof option.feedback !== 'undefined') {
          expect(typeof option.feedback).toBe('string');
        }
        
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
    const questionsWithOptions = questions.filter(
      (q): q is Question & { options: Option[] } => 
        (q.type === 'multiple_choice_score' || q.type === 'multiple_choice_action') && 
        Array.isArray(q.options)
    );
    questionsWithOptions.forEach(question => {
      const optionIds = question.options.map(o => o.id);
      const uniqueOptionIds = new Set(optionIds);
      expect(uniqueOptionIds.size).toBe(optionIds.length);
    });
  });

  it('should have meaningful prompts and feedback', () => {
    questions.forEach(question => {
      expect(question.prompt.length).toBeGreaterThan(10);
      
      if (question.options && (question.type === 'multiple_choice_score' || question.type === 'multiple_choice_action')) {
        question.options.forEach(option => {
          expect(option.text.length).toBeGreaterThan(3);
          if (option.feedback) { // Check if feedback exists
            expect(option.feedback.length).toBeGreaterThan(10);
          }
        });
      }
    });
  });
});
