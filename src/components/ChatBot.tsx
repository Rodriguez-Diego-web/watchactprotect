import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hallo! Ich bin WAP, dein digitaler Assistent. Wie kann ich dir bei Fragen zu sexualisierter Gewalt im Sport helfen?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message to chat
    const userMessage = { role: 'user' as const, content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Debug - Log API key format (erster Buchstabe und Länge)
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
      console.log(`API Key check: starts with ${apiKey.charAt(0)}, length: ${apiKey.length}`);
      
      if (!apiKey) {
        throw new Error('API Key is missing');
      }

      // Make API call to Deepseek
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: `Du bist WAP, ein hilfreicher Assistent der Kampagne WATCH. ACT. PROTECT., der Fragen zu sexualisierter Gewalt im Sport beantwortet. Antworte präzise, informativ und empathisch. Deine Antworten sollten immer hilfreich, unterstützend und faktenbasiert sein. Bei akuten Fällen weise immer auf professionelle Hilfsangebote hin.

### Über die Kampagne WATCH. ACT. PROTECT.
WATCH. ACT. PROTECT. ist eine Kampagne gegen sexualisierte Gewalt im Sport. Sie zielt darauf ab, Athlet:innen, Trainer:innen und alle am Sportumfeld Beteiligten zu sensibilisieren und Handlungskompetenzen zu vermitteln. Die Kampagne wurde von der Hochschule Bremerhaven entwickelt.

### Über den Test
Der interaktive Test besteht aus drei Levels mit unterschiedlichen Schwierigkeitsgraden:
Level 1 (Blau): Grundlegende Sensibilisierung und Wissensvermittlung
Level 2 (Lila): Erkennen von Grenzüberschreitungen und Handlungsmöglichkeiten
Level 3 (Grün): Komplexe Szenarien und Interventionsstrategien

Jedes Level enthält Fragen und Fallbeispiele, die Nutzer:innen helfen, Grenzverletzungen zu erkennen und angemessen zu reagieren.

### Das Team
Das Projektteam besteht aus Annika und Caro (Kampagnenleitung), Diego (Web-Experte) sowie weiteren Fachleuten aus den Bereichen Sportpsychologie und Prävention. Alle Teammitglieder vereint das Ziel, den Sport zu einem sicheren Ort für alle zu machen.

### Franchise-Kit
Es ist ein Franchise-Kit verfügbar, das Sportverbänden und -vereinen ermöglicht, die Kampagne an ihre eigenen Bedürfnisse anzupassen und zu implementieren.

### Wichtige Kontakte und Hilfsangebote
- Hilfetelefon Gewalt gegen Frauen: 08000 116 016
- Hilfetelefon Sexueller Missbrauch: 0800 22 55 530
- Hochschule Bremerhaven (Projektträger): Kontakt über die Webseite erreichbar
` },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: inputMessage }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );
      
      console.log('API response status:', response.status);

      // Add assistant response to chat
      const assistantMessage = { 
        role: 'assistant' as const, 
        content: response.data.choices[0].message.content 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error calling Deepseek API:', error);
      
      // Log detailed error information
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Entschuldigung, es gab ein Problem bei der Verbindung mit der API (${error.response?.status || 'Unbekannter Fehler'}). Bitte stelle sicher, dass der API-Schlüssel korrekt eingerichtet ist.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <motion.button
        className="flex items-center justify-center w-16 h-16 rounded-full bg-[#dd4d22] text-white shadow-lg hover:bg-[#dd4d22]/90 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="font-bold text-xl">WAP</div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border-2 border-[#dd4d22]"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-[#fcc424] via-[#dd4d22] to-[#1e8b88] text-white">
              <h3 className="text-lg font-bold">WATCH. ACT. PROTECT.</h3>
              <p className="text-sm opacity-90">Dein digitaler Assistent</p>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
            >
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-[#dd4d22] text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 shadow-sm p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#dd4d22] focus:border-transparent"
                  placeholder="Schreibe eine Nachricht..."
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || inputMessage.trim() === ''}
                  className="bg-[#dd4d22] text-white p-2 rounded-full hover:bg-[#dd4d22]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
