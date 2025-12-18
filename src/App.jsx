import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormStore } from './features/registration/store/useFormStore';
import { Layout } from './components/Layout';
import { Progress } from './components/ui/Progress';

// Import Step Components
import PersonalInfo from './features/registration/components/PersonalInfo';
import AddressInfo from './features/registration/components/AddressInfo';
import AccountSetup from './features/registration/components/AccountSetup';
import ReviewSummary from './features/registration/components/ReviewSummary';

const App = () => {
  const { currentStep } = useFormStore();

  // Map step numbers to components
  const steps = [
    <PersonalInfo />,
    <AddressInfo />,
    <AccountSetup />,
    <ReviewSummary />
  ];

  // Animation settings for smooth transitions
  const variants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <Layout>
      <Progress currentStep={currentStep} totalSteps={steps.length} />
      
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {steps[currentStep]}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default App;