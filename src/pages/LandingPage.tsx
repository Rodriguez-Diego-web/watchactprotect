import { motion, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronDown, Shield, Users, Target } from 'lucide-react'; // Removed Menu, X
import AnimatedMenuIcon from '@/components/ui/AnimatedMenuIcon';
import NewLogo from '@/assets/logo.png'; // Import the new logo
import { useState, useEffect } from 'react';

// Animierte Textkomponente mit Schreibmaschineneffekt
interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  speed?: number;
  onComplete?: () => void;
  staggerChildren?: number;
}

const TypewriterText: React.FC<TypewriterProps> = ({ 
  text, 
  className = "", 
  delay = 0.2,
  speed = 0.03,
  onComplete,
  staggerChildren = 0.03
}) => {
  // Textanimationen mit staggered Effect
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * speed + delay,
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    })
  };

  const sentenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: staggerChildren,
        delayChildren: delay,
        onComplete: onComplete
      } 
    }
  };

  return (
    <motion.span
      className={className}
      variants={sentenceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          custom={index}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const quotes = [
    {
      text: "Jeder Athlet verdient es, seiner Leidenschaft in einer sicheren, respektvollen Umgebung ohne Belästigung und Missbrauch nachzugehen.",
      author: "Leitbild der Kampagne"
    },
    {
      text: "Prävention beginnt mit Bewusstsein. Wir müssen die Warnsignale erkennen, um sexualisierte Gewalt wirksam zu bekämpfen.",
      author: "Deutscher Olympischer Sportbund"
    },
    {
      text: "Jeder kann zum Schutz beitragen. Sprechen Sie aus, was Sie beobachten, und handeln Sie verantwortungsvoll.",
      author: "Annika, Kampagnenleitung"
    },
    {
      text: "Sichere Sportumgebungen sind kein Zufall. Sie erfordern bewusste Anstrengung, Bildung und klare Grenzen.",
      author: "Sportpsychologischer Dienst"
    },
    {
      text: "Wir können gemeinsam den Sport verändern und ein Umfeld schaffen, das Leistung und Sicherheit gleichermaßen fördert.",
      author: "Caro, Kampagnenleitung"
    }
  ];
  
  // Wechselt das Zitat alle 5 Sekunden
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('content');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const teamMembers = [
    {
      name: "Annika",
      role: "Kampagnenleitung",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.",
    },
    {
      name: "Caro", 
      role: "Kampagnenleitung",
      bio: "Donec et dui auctor, tempus odio in, ornare nisi. Proin eleifend nisi vel eros vehicula, vel bibendum turpis elementum. In consequat nisl vel felis ultricies, at fermentum libero malesuada.",
    },
    {
      name: "Diego",
      role: "Web Experte", 
      bio: "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum.",
    },
    {
      name: "Nicola",
      role: "Web Expertin",
      bio: "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem.",
    }
  ];

  return (
    <>
      <Helmet>
        <title>WATCH. ACT. PROTECT.</title>
        <meta name="description" content="Eine interaktive Kampagne, die Athleten aller Altersgruppen hilft, sexualisierte Gewalt im Sport zu erkennen und zu bekämpfen." />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="min-h-screen text-white flex flex-col justify-center items-center relative overflow-hidden p-4 md:p-8"
        style={{
          background: `linear-gradient(135deg, 
            #fcc424 0%, #fcc424 33.33%, 
            #dd4d22 33.33%, #dd4d22 66.66%, 
            #1e8b88 66.66%, #1e8b88 100%)`
        }}
      >
      {/* Header with Logo and Navigation Menu */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white p-4 flex justify-between items-center shadow-md">
        <img src={NewLogo} alt="Watch Act Protect Logo" className="h-14 md:h-16" /> {/* Logo on the left */}
        
        {/* Navigation Menu Button */}
        <nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-3 transition-all duration-300 flex items-center justify-center w-10 h-10"
            aria-label="Toggle menu"
          >
            <AnimatedMenuIcon isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} color="white" />
          </button>
          
          {/* Vollbild-Menü Overlay */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            >
              <div className="p-8 w-full max-w-4xl">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 text-white p-3 transition-all duration-300 flex items-center justify-center w-10 h-10"
                  aria-label="Menü schließen"
                >
                  <AnimatedMenuIcon isOpen={true} onClick={() => setIsMenuOpen(false)} color="white" />
                </button>
                
                <div className="flex flex-col items-center justify-center space-y-8 text-center">
                  <h2 className="text-4xl font-bold text-white mb-8">WATCH. ACT. PROTECT.</h2>
                  
                  <button
                    onClick={() => {navigate('/story'); setIsMenuOpen(false);}}
                    className="block text-2xl text-white hover:text-orange transition-colors font-medium py-3"
                  >
                    Projektgeschichte
                  </button>
                  <button
                    onClick={() => {navigate('/team'); setIsMenuOpen(false);}}
                    className="block text-2xl text-white hover:text-orange transition-colors font-medium py-3"
                  >
                    Unser Team
                  </button>
                  <button
                    onClick={() => {navigate('/franchise'); setIsMenuOpen(false);}}
                    className="block text-2xl text-white hover:text-orange transition-colors font-medium py-3"
                  >
                    Franchise Kit
                  </button>
                  <div className="pt-6">
                    <button
                      onClick={() => {navigate('/test'); setIsMenuOpen(false);}}
                      className="block bg-orange text-white px-8 py-4 rounded-lg hover:bg-orange/90 transition-colors font-medium text-xl"
                    >
                      Test starten
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </nav>
      </header>

        <div className="relative z-10 text-center flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
                      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight pt-16 md:pt-20" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
            <span className="block">ERKENNEN.</span>
            <span className="block">HANDELN.</span>
            <span className="block">SCHÜTZEN.</span>
          </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.3)'}}>
            Gemeinsam gegen sexualisierte Gewalt im Sport. Starte jetzt den interaktiven Test und lerne, wie du helfen kannst.
          </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
            <Button 
              variant="cta"
              size="lg"
              onClick={() => navigate('/test')}
              className="bg-white text-[#0A1E3F] hover:bg-gray-200 shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <Play className="mr-2 h-6 w-6" /> Test starten
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={scrollToContent}
              className="text-black border-white hover:bg-white/20 hover:text-black shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              Mehr erfahren <ChevronDown className="ml-2 h-6 w-6" />
            </Button>
          </div>

            
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      {/* Content Section */}
      <section id="content" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              <TypewriterText 
                text="Sichere Räume im Sport schaffen" 
                delay={0.3}
                speed={0.04}
                className="bg-gradient-to-r from-[#fcc424] via-[#dd4d22] to-[#1e8b88] inline-block text-transparent bg-clip-text"
              />
            </h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.span 
                initial={{ width: "100%" }} 
                whileInView={{ width: 0 }}
                transition={{ delay: 1.5, duration: 1, ease: "easeInOut" }}
                className="absolute top-0 right-0 h-full bg-white z-10"
                style={{ originX: 1 }}
                viewport={{ once: true }}
              />
              Unser interaktiver Test hilft dir, die Warnsignale von 
              sexualisierter Gewalt zu verstehen und bietet praktische Interventionsmöglichkeiten.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* SPOT IT-Karte mit verbesserten Animationen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(252, 196, 36, 0.3)" }}
              className="text-center p-6 rounded-xl hover:bg-white/90 transition-all cursor-pointer"
            >
              <motion.div 
                className="w-20 h-20 bg-[#fcc424]/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ rotate: -10 }}
                whileInView={{ rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(252, 196, 36, 0.3)" }}
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Target className="w-10 h-10 text-[#fcc424]" />
                </motion.div>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-[#fcc424] mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                SPOT IT
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Lerne, Warnsignale und unangemessenes Verhalten zu erkennen, 
                die auf sexualisierte Gewalt im Sportumfeld hindeuten können.
              </motion.p>
            </motion.div>

            {/* STOP IT-Karte mit verbesserten Animationen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(221, 77, 34, 0.3)" }}
              className="text-center p-6 rounded-xl hover:bg-white/90 transition-all cursor-pointer"
            >
              <motion.div 
                className="w-20 h-20 bg-[#dd4d22]/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(221, 77, 34, 0.3)" }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10, transition: { duration: 0.2 } }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    transition: { repeat: Infinity, repeatDelay: 4, duration: 1.5 }
                  }}
                >
                  <Shield className="w-10 h-10 text-[#dd4d22]" />
                </motion.div>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-[#dd4d22] mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                STOP IT
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Entdecke praktische Strategien für sichere Intervention und 
                Unterstützung von Betroffenen bei der Schaffung schützender Umgebungen.
              </motion.p>
            </motion.div>

            {/* SHARE IT-Karte mit verbesserten Animationen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(30, 139, 136, 0.3)" }}
              className="text-center p-6 rounded-xl hover:bg-white/90 transition-all cursor-pointer"
            >
              <motion.div 
                className="w-20 h-20 bg-[#1e8b88]/20 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0.8, rotate: 10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(30, 139, 136, 0.3)" }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    transition: { repeat: Infinity, repeatDelay: 3, duration: 2.5, ease: "easeInOut" }
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Users className="w-10 h-10 text-[#1e8b88]" />
                </motion.div>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold text-[#1e8b88] mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                SHARE IT
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Teile deine Ergebnisse und hilf dabei, das Bewusstsein zu schärfen, um 
                sicherere Sportumgebungen für alle zu schaffen.
              </motion.p>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 60 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center bg-gradient-to-br from-[#1e8b88] to-[#17706d] rounded-2xl p-12 shadow-xl relative overflow-hidden"
          >
            {/* Animierter Hintergrund-Effekt */}
            <motion.div 
              className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{ 
                x: [0, 40, 0], 
                y: [0, 30, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 8, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
              animate={{ 
                x: [0, -30, 0], 
                y: [0, -40, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 10, 
                ease: "easeInOut" 
              }}
            />
            
            <h3 className="text-3xl font-bold text-white mb-6 relative z-10">
              <TypewriterText 
                text="Bereit, etwas zu verändern?" 
                delay={0.4}
                speed={0.05}
                className="relative"
              />
            </h3>
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Schließe dich tausenden Athleten, Trainern und Sportprofis an, 
              die daran arbeiten, sexualisierte Gewalt aus dem Sport zu eliminieren.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/test')}
                  size="lg"
                  className="text-lg px-8 bg-[#fcc424] hover:bg-[#fcc424]/90 active:bg-[#e5b120] text-black transition-all duration-200 shadow-lg"
                >
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 2, duration: 1 }}
                    className="inline-block mr-2"
                  >
                    <Play className="h-5 w-5 inline-block" />
                  </motion.span>
                  Test starten
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => navigate('/story')}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 text-white border-white bg-transparent hover:bg-white/10 active:bg-white/20 transition-all duration-200 shadow-lg"
                >
                  Mehr erfahren
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 1.2 }}
                    className="inline-block ml-2"
                  >
                    <ChevronDown className="h-5 w-5 inline-block" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About/Team Section */}
      <section className="py-20 bg-[#dd4d22]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <TypewriterText 
                text="Unser Team" 
                delay={0.2}
                speed={0.08}
                className="relative"
              />
              <motion.span
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-[3px] bg-white"
                style={{ marginTop: "8px", display: "inline-block" }}
                viewport={{ once: true }}
              />
            </h2>
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Eine engagierte Gruppe von Forschern, Athleten und Pädagogen, die sich
              für die Schaffung sicherer Sportumgebungen für alle einsetzen.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <h3 className="text-xl font-bold text-[#fcc424] mb-2">{member.name}</h3>
                <p className="text-white/80 font-semibold mb-3">{member.role}</p>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => navigate('/team')}
              variant="outline"
              size="lg"
              className="text-lg px-8 text-black  bg-white hover:bg-yellow-500 hover:text-white"
            >
              Ganzes Team kennenlernen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quote Section - Dynamic Slideshow with Horizontal Animation */}
      <section className="py-14 pb-10 bg-white"> {/* Mehr Padding am unteren Rand */}
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden">
            <div className="flex justify-center">
              {quotes.map((quote, index) => (
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentQuoteIndex === index ? 1 : 0,
                    x: currentQuoteIndex === index ? 0 : index > currentQuoteIndex ? 100 : -100,
                    position: currentQuoteIndex === index ? "relative" : "absolute",
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className={`text-center ${currentQuoteIndex === index ? "" : "absolute top-0 left-0 right-0"} w-full`}
                >
                  <p className="text-2xl md:text-3xl font-mono italic mb-6 max-w-4xl mx-auto text-gray-800">
                    "{quote.text}"
                  </p>
                  <footer className="text-[#dd4d22] font-semibold mb-8">
                    — {quote.author}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
            
            {/* Quote Navigation Dots mit verbessertem Feedback */}
            <div className="flex justify-center gap-3 mt-8 mb-10"> {/* Mehr vertikalen Abstand */}
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    // Visuelles Feedback beim Klicken
                    const button = e.currentTarget;
                    button.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                      button.style.transform = 'scale(1)';
                      setCurrentQuoteIndex(index);
                    }, 150);
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    currentQuoteIndex === index ? "bg-[#dd4d22] scale-110" : "bg-gray-300"
                  }`}
                  aria-label={`Zitat ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-12 md:py-16 bg-[#fcc424]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-semibold text-black">
              Sexualisierte Gewalt im Sport erkennen und stoppen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#fcc424]">WATCH. ACT. PROTECT.</h4>
              <p className="text-gray-400 text-sm">
                Eine Kampagne zur Beseitigung sexualisierter Gewalt im Sport.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Ressourcen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/story" className="hover:text-[#fcc424] transition-colors">Projektgeschichte</a></li>
                <li><a href="/team" className="hover:text-[#fcc424] transition-colors">Unser Team</a></li>
                <li><button onClick={() => navigate('/franchise-kit')} className="hover:text-[#fcc424] transition-colors">Franchise Kit</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Hilfe-Center</a></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-[#fcc424] transition-colors">Kontakt</button></li>
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Missbrauch melden</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Datenschutzrichtlinie</a></li>
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Nutzungsbedingungen</a></li>
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Cookie-Richtlinie</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            2024 WATCH. ACT. PROTECT. Kampagne. Alle Rechte vorbehalten. Developed with ❤️ by Diego Rodriguez
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
