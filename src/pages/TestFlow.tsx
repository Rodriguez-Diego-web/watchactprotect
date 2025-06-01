import { Helmet } from 'react-helmet-async';
import TestShell from '@/components/test/TestShell';
import { motion } from 'framer-motion';

const TestFlow = () => {
  return (
    <>
      <Helmet>
        <title>Interactive Test - WATCH. ACT. PROTECT.</title>
        <meta name="description" content="Test your knowledge on identifying and stopping sexualised violence in sport." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TestShell />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TestFlow;
