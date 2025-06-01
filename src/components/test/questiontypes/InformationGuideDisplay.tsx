import React from 'react';
import type { Question } from '@/types/test';

interface InformationGuideDisplayProps {
  question: Question;
}

const InformationGuideDisplay: React.FC<InformationGuideDisplayProps> = ({ question }) => {
  if (question.type !== 'information_guide' || !question.step_by_step_guide) {
    return <p className="text-red-500">Fehler: Ungültige Frage für Informationsleitfaden.</p>;
  }

  return (
    <div className="w-full max-w-lg mx-auto shadow-lg bg-white rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-navy">
          {question.prompt}
        </h3>
      </div>
      <div>
        <div className="h-[300px] w-full p-4 border rounded-md bg-slate-50 overflow-y-auto">
          <ul className="list-decimal list-inside space-y-3 text-gray-700">
            {question.step_by_step_guide.map((step, index) => (
              <li key={index} className="text-base leading-relaxed">
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InformationGuideDisplay;