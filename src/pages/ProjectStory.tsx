import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Users2 } from 'lucide-react';

const ProjectStory = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Project Story - SPOT IT. STOP IT.</title>
        <meta name="description" content="Learn about the mission and vision behind the SPOT IT. STOP IT. campaign." />
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
                Our Mission: Safer Sport for Everyone
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The SPOT IT. STOP IT. campaign was born from a simple but powerful belief: 
                every athlete deserves to pursue their passion in a safe, respectful environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Problem Statement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-navy mb-6">The Challenge</h2>
                <div className="bg-gray-50 rounded-lg p-8">
                  <p className="text-lg text-gray-700 mb-4">
                    Sexualised violence in sport is a widespread problem that affects athletes 
                    of all ages, genders, and levels of competition. Research shows that:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>1 in 8 athletes experience some form of sexual harassment or abuse</li>
                    <li>Many incidents go unreported due to fear, shame, or lack of awareness</li>
                    <li>Current prevention programs often lack interactive, engaging approaches</li>
                    <li>Athletes, coaches, and support staff need better tools to identify and respond to abuse</li>
                  </ul>
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-navy mb-6">Our Solution</h2>
                <p className="text-lg text-gray-700 mb-8">
                  The SPOT IT. STOP IT. campaign combines education with action through 
                  an innovative, interactive approach that makes learning about prevention 
                  engaging and memorable.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-orange" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-3">Interactive Learning</h3>
                    <p className="text-gray-600">
                      Engaging test format that helps users learn through real scenarios and immediate feedback.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-navy/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-navy" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-3">Evidence-Based</h3>
                    <p className="text-gray-600">
                      Content developed with experts in sport psychology, safeguarding, and abuse prevention.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users2 className="w-8 h-8 text-orange" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-3">Community-Driven</h3>
                    <p className="text-gray-600">
                      Embeddable widgets allow sports organizations to integrate the campaign into their own platforms.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <blockquote className="bg-navy text-white rounded-lg p-8 text-center">
                  <p className="text-2xl font-mono italic mb-4">
                    "Prevention is not just about stopping abuse—it's about creating 
                    a culture where respect, safety, and wellbeing are the foundation 
                    of every sporting experience."
                  </p>
                  <footer className="text-orange font-semibold">
                    — Campaign Vision Statement
                  </footer>
                </blockquote>
              </motion.div>

              {/* Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold text-navy mb-6">Our Impact</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-4">What We've Achieved</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-orange mr-2">•</span>
                        Developed evidence-based content with leading safeguarding experts
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange mr-2">•</span>
                        Created an accessible, WCAG 2.2 AA compliant platform
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange mr-2">•</span>
                        Designed embeddable widgets for widespread adoption
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange mr-2">•</span>
                        Built multi-language support for global reach
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-4">What's Next</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-navy mr-2">•</span>
                        Partnership with major sports organizations
                      </li>
                      <li className="flex items-start">
                        <span className="text-navy mr-2">•</span>
                        Expansion to additional languages and regions
                      </li>
                      <li className="flex items-start">
                        <span className="text-navy mr-2">•</span>
                        Development of advanced training modules
                      </li>
                      <li className="flex items-start">
                        <span className="text-navy mr-2">•</span>
                        Integration with existing safeguarding systems
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center bg-gray-50 rounded-2xl p-12"
              >
                <h3 className="text-3xl font-bold text-navy mb-6">
                  Join the Movement
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Whether you're an athlete, coach, parent, or sports administrator, 
                  you can help create safer sporting environments.
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
                    onClick={() => navigate('/franchise')}
                    variant="outline"
                    size="lg"
                  >
                    Get Franchise Kit
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectStory;
