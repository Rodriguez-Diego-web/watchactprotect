import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

import AnimatedMenuIcon from '@/components/ui/AnimatedMenuIcon';
import NewLogo from '@/assets/logo.png';
import { useState } from 'react';

const Team = () => {
  const navigate = useNavigate();
  
  // State für das Menü-Overlay
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const teamMembers = [
    {
      name: "Annika",
      role: "Kampagnenleitung",
      bio: "Sportpsychologin mit Fokus auf Prävention von Gewalt im Sport. Leitet das WATCH. ACT. PROTECT. Projekt mit Leidenschaft und Expertise.",
      image: "https://images.unsplash.com/photo-1581824043583-6904b080a19c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Caro",
      role: "Kampagnenleitung",
      bio: "Spezialistin für Sportsicherheit und Präventionsstrategien. Setzt sich für sichere Trainingsumgebungen für Athleten aller Altersgruppen ein.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Diego",
      role: "Web Experte", 
      bio: "Entwickler mit Fokus auf interaktive Lernplattformen. Bringt die Präventionskampagne mit modernster Webtechnologie zum Leben.",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Nicola",
      role: "Web Expertin",
      bio: "Designspezialistin mit Erfahrung in der Entwicklung von nutzerfreundlichen Bildungsplattformen. Gestaltet die visuelle Identität der Kampagne.",
      image: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Unser Team - WATCH. ACT. PROTECT.</title>
        <meta name="description" content="Lernen Sie das Team hinter der WATCH. ACT. PROTECT. Kampagne kennen." />
      </Helmet>

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

      <div className="min-h-screen bg-white pt-24"> {/* Extra padding-top für den fixed Header */}
        {/* Hero */}
        <section className="py-20 bg-gradient-to-r from-[#1e8b88] to-[#1e8b88]/90 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl font-bold mb-6">
                Unser Team
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Eine engagierte Gruppe von Experten, vereint durch das gemeinsame Ziel, 
                sichere Sportumgebungen für Athleten aller Altersgruppen zu schaffen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-[#1e8b88] mb-2">
                        {member.name}
                      </h3>
                      <p className="text-[#dd4d22] font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-[#1e8b88] mb-6">
                Unsere gemeinsame Mission
              </h2>
              <blockquote className="text-xl text-gray-700 italic mb-8 font-mono">
                "Wir glauben, dass jeder Athlet es verdient, seinen Sport in einer Umgebung 
                auszuüben, die frei von Belästigung, Missbrauch und Diskriminierung ist. 
                Durch Aufklärung, Bewusstsein und Aktion arbeiten wir daran, diese Vision 
                Wirklichkeit werden zu lassen."
              </blockquote>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-[#1e8b88] mb-3">Forschungsbasiert</h3>
                  <p className="text-gray-600 text-sm">
                    Jeder Aspekt unserer Kampagne stützt sich auf die neuesten Erkenntnisse 
                    zu Präventions- und Interventionsstrategien.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1e8b88] mb-3">Athletenzentriert</h3>
                  <p className="text-gray-600 text-sm">
                    Die Stimmen und Erfahrungen von Athleten leiten unseren Ansatz, 
                    um sicherzustellen, dass unsere Lösungen praxistauglich sind.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1e8b88] mb-3">Zugänglich</h3>
                  <p className="text-gray-600 text-sm">
                    Wir entwickeln Ressourcen, die für alle zugänglich sind, unabhängig 
                    von Hintergrund, Alter oder Fähigkeitsniveau.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16 bg-[#fcc424]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-navy mb-6">
                Join Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Interested in contributing to safer sport? We're always looking for 
                passionate individuals to join our cause.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/test')}
                  variant="cta"
                  size="lg"
                >
                  Take the Test
                </Button>
                <Button
                  onClick={() => window.location.href = 'mailto:team@spotitstopit.org'}
                  variant="outline"
                  size="lg"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  <span className="text-[#fcc424]">WATCH.</span> <span className="text-[#dd4d22]">ACT.</span> <span className="text-[#1e8b88]">PROTECT.</span>
                </h4>
                <p className="text-gray-400 text-sm">
                  Eine Kampagne zur Beseitigung sexualisierter Gewalt im Sport.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Ressourcen</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><button onClick={() => navigate('/story')} className="hover:text-[#fcc424] transition-colors">Projektgeschichte</button></li>
                  <li><button onClick={() => navigate('/team')} className="hover:text-[#fcc424] transition-colors">Unser Team</button></li>
                  <li><button onClick={() => navigate('/franchise')} className="hover:text-[#fcc424] transition-colors">Franchise Kit</button></li>
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
      </div>
    </>
  );
};

export default Team;
