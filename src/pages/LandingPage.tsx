import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronDown, Shield, Users, Target } from 'lucide-react'; // Removed Menu, X
import AnimatedMenuIcon from '@/components/ui/AnimatedMenuIcon';
import NewLogo from '@/assets/logo.png'; // Import the new logo
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <img src={NewLogo} alt="Watch Act Protect Logo" className="h-10 md:h-12" /> {/* Logo on the left */}
        
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
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sichere Räume im Sport schaffen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unser interaktiver Test hilft dir, die Warnsignale von 
              sexualisierter Gewalt zu verstehen und bietet praktische Interventionsmöglichkeiten.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#fcc424]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#fcc424]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#fcc424] mb-4">SPOT IT</h3>
              <p className="text-gray-600">
                Lerne, Warnsignale und unangemessenes Verhalten zu erkennen, 
                die auf sexualisierte Gewalt im Sportumfeld hindeuten können.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#dd4d22]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#dd4d22]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#dd4d22] mb-4">STOP IT</h3>
              <p className="text-gray-600">
                Entdecke praktische Strategien für sichere Intervention und 
                Unterstützung von Betroffenen bei der Schaffung schützender Umgebungen.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-[#1e8b88]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#1e8b88]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#1e8b88] mb-4">SHARE IT</h3>
              <p className="text-gray-600">
                Teile deine Ergebnisse und hilf dabei, das Bewusstsein zu schärfen, um 
                sicherere Sportumgebungen für alle zu schaffen.
              </p>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-[#1e8b88] rounded-2xl p-12"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Bereit, etwas zu verändern?
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Schließe dich tausenden Athleten, Trainern und Sportprofis an, 
              die daran arbeiten, sexualisierte Gewalt aus dem Sport zu eliminieren.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/test')}
                size="lg"
                className="text-lg px-8 bg-[#fcc424] hover:bg-[#fcc424]/90 text-black"
              >
                Test starten
              </Button>
              <Button
                onClick={() => navigate('/story')}
                variant="outline"
                size="lg"
                className="text-lg px-8 text-white border-white hover:bg-white/10"
              >
                Mehr erfahren
              </Button>
            </div>
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
              Unser Team
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Eine engagierte Gruppe von Forschern, Athleten und Pädagogen, die sich
              für die Schaffung sicherer Sportumgebungen für alle einsetzen.
            </p>
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => navigate('/team')}
              variant="outline"
              size="lg"
              className="text-lg px-8 text-white border-white hover:bg-white/10"
            >
              Ganzes Team kennenlernen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-2xl md:text-3xl font-mono italic mb-6 max-w-4xl mx-auto text-gray-800">
              "Jeder Athlet verdient es, seiner Leidenschaft in einer sicheren,
              respektvollen Umgebung ohne Belästigung und Missbrauch nachzugehen."
            </p>
            <footer className="text-[#dd4d22] font-semibold">
              — Leitbild der Kampagne
            </footer>
          </motion.blockquote>
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
                <li><a href="/franchise" className="hover:text-[#fcc424] transition-colors">Franchise Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Hilfe-Center</a></li>
                <li><a href="#" className="hover:text-[#fcc424] transition-colors">Kontakt</a></li>
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
