import React, { useState } from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOSButton = ({ onTrigger }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      setTimeout(() => setIsConfirming(false), 5000);
    } else {
      onTrigger();
      setIsConfirming(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isConfirming && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 right-0 bg-red-600 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap mb-2"
          >
            Click again to confirm SOS!
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
          isConfirming ? 'bg-red-700 animate-pulse' : 'bg-red-600'
        }`}
      >
        <AlertTriangle size={40} className="text-white" />
      </motion.button>
    </div>
  );
};

export default SOSButton;
