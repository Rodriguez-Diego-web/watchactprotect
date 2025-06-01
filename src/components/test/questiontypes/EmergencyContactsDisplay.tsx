import React from 'react';
import type { Question, EmergencyContact as EmergencyContactType } from '@/types/test';
import { Button } from '@/components/ui/Button';
import { PhoneOutgoing } from 'lucide-react';

interface EmergencyContactsDisplayProps {
  question: Question;
}

const EmergencyContactsDisplay: React.FC<EmergencyContactsDisplayProps> = ({ question }) => {
  if (question.type !== 'information_contacts' || !question.emergency_contacts) {
    return <p className="text-red-500">Fehler: Ungültige Frage für Notfallkontakte.</p>;
  }

  return (
    <div className="w-full max-w-lg mx-auto shadow-lg bg-white rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-navy">
          {question.prompt}
        </h3>
        <p className="text-gray-600">Hier findest du wichtige Anlaufstellen:</p>
      </div>
      <div className="space-y-4">
        {question.emergency_contacts.map((contact: EmergencyContactType, index: number) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border">
            <h3 className="font-semibold text-lg text-orange mb-1">{contact.name}</h3>
            <p className="text-gray-700 text-sm mb-2">{contact.details}</p>
            {contact.url && (
              <Button 
                variant="link" 
                className="p-0 h-auto text-sm text-teal hover:text-teal-dark"
                onClick={() => window.open(contact.url, '_blank')}
              >
                Website besuchen <PhoneOutgoing className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContactsDisplay;
