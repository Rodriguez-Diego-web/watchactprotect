import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import AnimatedMenuIcon from '@/components/ui/AnimatedMenuIcon';
import NewLogo from '@/assets/logo.png';

import { useMenu } from '@/contexts/MenuContext';

const ContactPage = () => {
  const navigate = useNavigate();
  const { isMenuOpen, setIsMenuOpen } = useMenu();

  return (
    <>
      <Helmet>
        <title>Kontakt - WATCH. ACT. PROTECT.</title>
        <meta name="description" content="Nehmen Sie Kontakt mit dem Team von WATCH. ACT. PROTECT. auf. Ein Projekt der Hochschule Bremerhaven." />
      </Helmet>

      {/* Header with Logo and Navigation Menu */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white p-4 flex justify-between items-center shadow-md" style={{ paddingTop: `calc(1rem + env(safe-area-inset-top, 0px))` }}>
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

      <div className="min-h-screen bg-gray-50 pt-20"> {/* Added pt-20 for header offset */}
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1e8b88] via-[#dd4d22] to-[#fcc424] text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Nehmen Sie Kontakt auf
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
            >
              Wir freuen uns auf Ihre Nachricht! Ob Fragen, Anregungen oder Kooperationsanfragen – zögern Sie nicht, uns zu kontaktieren.
            </motion.p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-xl"
            >
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" id="name" autoComplete="name" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#1e8b88] focus:border-[#1e8b88] sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
                  <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#1e8b88] focus:border-[#1e8b88] sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
                  <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#1e8b88] focus:border-[#1e8b88] sm:text-sm"></textarea>
                </div>
                <div>
                  <Button type="submit" variant="cta" className="w-full">
                    Nachricht senden
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Hochschule Bremerhaven Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">Ein Projekt der</h3>
              <p className="text-xl text-gray-600 font-medium">
                Hochschule Bremerhaven
              </p>
              {/* Optional: Logo der Hochschule hier einfügen, falls vorhanden */}
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

export default ContactPage;
