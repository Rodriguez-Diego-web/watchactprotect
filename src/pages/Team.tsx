import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Linkedin, Twitter, Mail } from 'lucide-react';

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Lead Researcher",
      bio: "Sports psychology expert with 15+ years in athlete safeguarding research.",
      image: "https://images.unsplash.com/photo-1494790108755-2616c5c1b97c?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah.mitchell@example.com"
      }
    },
    {
      name: "Marcus Johnson",
      role: "Campaign Director",
      bio: "Former Olympic athlete turned advocate for safe sport environments.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marcus.johnson@example.com"
      }
    },
    {
      name: "Elena Rodriguez",
      role: "Education Specialist",
      bio: "Curriculum developer specializing in interactive learning experiences.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        email: "elena.rodriguez@example.com"
      }
    },
    {
      name: "Dr. James Chen",
      role: "Technology Lead",
      bio: "Accessibility expert ensuring inclusive design for all users.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james.chen@example.com"
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Team - SPOT IT. STOP IT.</title>
        <meta name="description" content="Meet the dedicated team behind the SPOT IT. STOP IT. campaign." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-10 border-b">
          <div className="container mx-auto px-4 py-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-20 bg-gradient-to-r from-navy to-navy/90 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl font-bold mb-6">
                Meet Our Team
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A diverse group of experts united by a shared commitment to creating 
                safer sporting environments for athletes everywhere.
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
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-navy mb-2">
                        {member.name}
                      </h3>
                      <p className="text-orange font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                      <div className="flex space-x-3">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="text-gray-400 hover:text-navy transition-colors"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="text-gray-400 hover:text-navy transition-colors"
                            aria-label={`${member.name} Twitter`}
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {member.social.email && (
                          <a
                            href={`mailto:${member.social.email}`}
                            className="text-gray-400 hover:text-navy transition-colors"
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                      </div>
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
              <h2 className="text-3xl font-bold text-navy mb-6">
                Our Shared Mission
              </h2>
              <blockquote className="text-xl text-gray-700 italic mb-8 font-mono">
                "We believe that every athlete deserves to pursue their dreams in an 
                environment free from harassment, abuse, and discrimination. Through 
                education, awareness, and action, we're working to make that vision a reality."
              </blockquote>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">Research-Driven</h3>
                  <p className="text-gray-600 text-sm">
                    Every aspect of our campaign is grounded in the latest research 
                    on prevention and intervention strategies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">Athlete-Centered</h3>
                  <p className="text-gray-600 text-sm">
                    Athletes' voices and experiences guide our approach, ensuring 
                    our solutions meet real-world needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">Accessible</h3>
                  <p className="text-gray-600 text-sm">
                    We're committed to creating resources that are accessible to 
                    athletes and organizations of all sizes and backgrounds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16">
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
      </div>
    </>
  );
};

export default Team;
