import React from 'react';
import type { Question } from '@/types/test';
import { Button } from '@/components/ui/Button';
import { Download } from 'lucide-react';

interface DownloadResourceDisplayProps {
  question: Question;
}

const DownloadResourceDisplay: React.FC<DownloadResourceDisplayProps> = ({ question }) => {
  if (question.type !== 'download_resource' || !question.downloadable_resource) {
    return <p className="text-red-500">Fehler: Ungültige Frage für Download-Ressource.</p>;
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = question.downloadable_resource?.url || '#';
    link.download = question.downloadable_resource?.fileName || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-lg mx-auto shadow-lg bg-white rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-navy">
          {question.prompt}
        </h3>
        {question.downloadable_resource?.text && 
          <p className="text-gray-600 mt-2">{question.downloadable_resource.text}</p>
        }
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button 
          onClick={handleDownload} 
          variant="cta"
          size="lg"
          className="bg-teal hover:bg-teal-dark text-white"
        >
          <Download className="mr-2 h-5 w-5" /> 
          {question.downloadable_resource?.fileName || 'Datei herunterladen'}
        </Button>
        {question.downloadable_resource?.url && 
            <p className="text-xs text-gray-500 mt-2">Quelle: {question.downloadable_resource.url}</p>
        }
      </div>
    </div>
  );
};

export default DownloadResourceDisplay;
