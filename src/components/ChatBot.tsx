import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  animated?: boolean; // Flag für bereits animierte Nachrichten
}

// Schreibmaschineneffekt-Komponente
const TypewriterEffect: React.FC<{ content: string; onComplete?: () => void; className?: string }> = ({ 
  content, 
  onComplete,
  className = ""
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const markdownRef = useRef<HTMLDivElement>(null);
  
  // Starte die Animation, wenn das Element sichtbar ist
  useEffect(() => {
    if (!inView) return;
    
    if (currentIndex < content.length) {
      intervalRef.current = setInterval(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15); // Geschwindigkeit des Schreibens
    } else if (onComplete) {
      onComplete();
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, content, inView, onComplete]);
  
  // Stoppe die Animation, wenn die Nachricht vollständig ist
  useEffect(() => {
    if (currentIndex >= content.length && intervalRef.current) {
      clearInterval(intervalRef.current);
      if (onComplete) onComplete();
    }
  }, [currentIndex, content, onComplete]);
  
  return (
    <div ref={ref} className={className}>
      <div ref={markdownRef} className="prose prose-sm max-w-none prose-headings:text-base prose-headings:font-bold prose-p:my-1 prose-p:leading-normal prose-ul:pl-4 prose-ul:my-1 prose-li:my-0 prose-li:leading-normal">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {displayedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hallo! Ich bin WAP, dein digitaler Assistent. Wie kann ich dir bei Fragen zu sexualisierter Gewalt im Sport helfen?', animated: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (activeAnimation) return; // Verhindert Senden während einer laufenden Animation

    setInputMessage('');
    setIsLoading(true);
    setActiveAnimation(false); // Reset animation state
    
    const newUserMessage = { role: 'user' as const, content: inputMessage, animated: true };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    try {
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
      if (!apiKey) throw new Error('API Key ist nicht vorhanden');

      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `Du bist WAP, der präzise und professionelle Assistent der Kampagne WATCH. ACT. PROTECT. gegen sexualisierte Gewalt im Sport. Du wurdest von der Hochschule Bremerhaven unter Leitung von Prof. Ralf C. Schreier entwickelt. Das Team hinter dir besteht aus Annika, Nicole, Caro und Diego.

Du musst folgende Regeln IMMER beachten:
1. Deine Antworten müssen kurz, prägnant und sachlich sein. Verwende maximal 1-2 Sätze pro Antwort.
2. Verzichte auf Floskeln wie "Ich kann verstehen" oder "Es tut mir leid zu hören".
3. Verwende Markdown für die Formatierung, z.B. **Fettdruck** für wichtige Begriffe.
4. Antworte ausschließlich mit Fakten aus diesem Prompt. Wenn du etwas nicht weißt, sage "Dazu habe ich keine Information".
5. Vermeide lange Einleitungen und komme direkt zum Punkt.

### Über die Kampagne WATCH. ACT. PROTECT.
- Ziel: Sensibilisierung für sexualisierte Gewalt im Sport und Handlungsmöglichkeiten aufzeigen
- Drei Kernbotschaften: SPOT IT (Erkenne es), STOP IT (Stoppe es), SHARE IT (Teile es)
- Zielgruppen: Sportler*innen, Trainer*innen, Vereinsmitarbeiter*innen, Eltern, Sportverbände
- Farbkonzept: Orange (#dd4d22), Gelb (#fcc424), Türkisgrün (#1e8b88)
- Dreistufiger Test zur Selbsteinschätzung: Level 1 (Grundlagen), Level 2 (Fortgeschritten), Level 3 (Experte)
- Franchise-Kit mit Postern, Flyern, Social Media-Vorlagen und Schulungsunterlagen
- Online-Plattform: watchactprotect.de

### Projektphasen
1. Konzeption und Entwicklung der Kampagne
2. Dreistufiger Test und Validierung
3. Erstellung des Franchise-Kits für Sportvereine
4. Digitale Umsetzung und Online-Präsenz

### Notfallkontakte (bei akuten Fällen immer nennen)
- Hilfetelefon Sexueller Missbrauch: 0800-22 55 530
- Telefonseelsorge: 0800-111 0 111 oder 0800-111 0 222
- Bei unmittelbarer Gefahr: Polizeinotruf 110
- Hilfetelefon Gewalt gegen Frauen: 08000 116 016`
            },
            ...updatedMessages.map(msg => ({ role: msg.role, content: msg.content })),
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );
      
      // Get assistant response with animation flag
      const assistantMessage = { 
        role: 'assistant' as const, 
        content: response.data.choices[0].message.content,
        animated: true // Dieses Flag markiert, dass die Nachricht animiert werden soll
      };
      setMessages(prev => [...prev, assistantMessage]);
      setActiveAnimation(true); // Aktiviere Animation-Status
    } catch (error: any) {
      console.error('Error calling Deepseek API:', error);
      
      // Log detailed error information
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Entschuldigung, es gab ein Problem bei der Verbindung mit der API (${error.response?.status || 'Unbekannter Fehler'}). Bitte stelle sicher, dass der API-Schlüssel korrekt eingerichtet ist.`,
        animated: true // Auch Fehlermeldungen animieren
      }]);
      setActiveAnimation(true); // Aktiviere Animation-Status
    } finally {
      setIsLoading(false);
      // Animation-Status bleibt aktiv, bis die Animation abgeschlossen ist
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-[#dd4d22] text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-[#dd4d22]/90 transition-all"
        aria-label={isOpen ? "Chat schließen" : "Chat öffnen"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
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
            className="absolute bottom-16 right-0 sm:w-96 w-[calc(100vw-24px)] max-h-[70vh] sm:h-[500px] h-[400px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-[#dd4d22]"
          >
            {/* Chat Header */}
            <div className="p-3 sm:p-4 bg-gradient-to-r from-[#fcc424] via-[#dd4d22] to-[#1e8b88] text-white flex justify-between items-center">
              <div>
                <h3 className="text-base sm:text-lg font-bold">WATCH. ACT. PROTECT.</h3>
                <p className="text-xs sm:text-sm opacity-90">Dein digitaler Assistent</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 p-1 rounded-full"
                aria-label="Chat schließen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-3 bg-gray-50"
            >
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-2 sm:p-3 text-sm sm:text-base rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-[#dd4d22] text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      message.animated ? (
                        <TypewriterEffect 
                          content={message.content} 
                          onComplete={() => setActiveAnimation(false)}
                          className="prose prose-sm max-w-none prose-headings:text-base prose-headings:font-bold prose-p:my-1 prose-p:leading-normal prose-ul:pl-4 prose-ul:my-1 prose-li:my-0 prose-li:leading-normal"
                        />
                      ) : (
                        <div className="prose prose-sm max-w-none prose-headings:text-base prose-headings:font-bold prose-p:my-1 prose-p:leading-normal prose-ul:pl-4 prose-ul:my-1 prose-li:my-0 prose-li:leading-normal">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      )
                    ) : (
                      <div className="break-words">{message.content}</div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 shadow-sm p-3 sm:p-4 rounded-lg rounded-tl-none max-w-[85%]">
                    <div className="flex flex-col space-y-2">
                      <div className="text-sm text-gray-600 mb-1">WAP denkt nach...</div>
                      
                      {/* Fortschrittsanimation mit Kampagnenfarben */}
                      <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full rounded-full" 
                          animate={{
                            width: ["0%", "30%", "60%", "45%", "95%", "80%", "100%"],
                            backgroundColor: [
                              "#fcc424", // gelb
                              "#dd4d22", // orange
                              "#1e8b88", // türkis
                              "#dd4d22", // orange
                              "#fcc424", // gelb
                              "#1e8b88", // türkis
                              "#dd4d22"  // orange
                            ]
                          }}
                          transition={{ 
                            duration: 6.5, 
                            ease: "easeInOut",
                            times: [0, 0.2, 0.4, 0.5, 0.7, 0.9, 1],
                          }}
                        />
                      </div>
                      
                      {/* Wechselnde Hinweise während des Wartens */}
                      <motion.div 
                        className="text-xs text-gray-500 italic mt-1"
                        animate={{ opacity: [0, 1, 1, 0] }}
                        transition={{ 
                          duration: 3.5, 
                          repeat: Infinity, 
                          repeatType: "loop" 
                        }}
                      >
                        <motion.div
                          animate={{ 
                            display: ["block", "block", "none", "none", "none"],
                          }}
                          transition={{ 
                            duration: 10.5, 
                            repeat: Infinity, 
                            repeatType: "loop",
                            times: [0, 0.33, 0.34, 0.66, 1]
                          }}
                        >
                          Durchsuche relevante Informationen...
                        </motion.div>
                        
                        <motion.div
                          animate={{ 
                            display: ["none", "none", "block", "block", "none"],
                          }}
                          transition={{ 
                            duration: 10.5, 
                            repeat: Infinity, 
                            repeatType: "loop",
                            times: [0, 0.33, 0.34, 0.66, 0.67]
                          }}
                        >
                          Formuliere eine hilfreiche Antwort...
                        </motion.div>
                        
                        <motion.div
                          animate={{ 
                            display: ["none", "none", "none", "none", "block"],
                          }}
                          transition={{ 
                            duration: 10.5, 
                            repeat: Infinity, 
                            repeatType: "loop",
                            times: [0, 0.33, 0.34, 0.66, 0.67]
                          }}
                        >
                          Fast fertig...
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="p-2 sm:p-3 border-t border-gray-200">
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
                  className="flex-1 border border-gray-300 rounded-full py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#dd4d22] focus:border-transparent"
                  placeholder="Schreibe eine Nachricht..."
                  disabled={isLoading}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || inputMessage.trim() === ''}
                  className="bg-[#dd4d22] text-white p-1.5 sm:p-2 rounded-full hover:bg-[#dd4d22]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
