import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOSButton = ({ onTrigger }) => {
  const [isAlerting, setIsAlerting] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer;
    if (isAlerting && countdown > 0) {
      timer = setInterval(() => setCountdown(c => c - 1), 1000);
    } else if (isAlerting && countdown === 0) {
      onTrigger();
      setIsAlerting(false);
      setCountdown(3);
    }
    return () => clearInterval(timer);
  }, [isAlerting, countdown, onTrigger]);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-32 right-8 md:bottom-12 md:right-12 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAlerting(true)}
          className="w-20 h-20 md:w-24 md:h-24 bg-danger rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.5)] animate-pulse border-4 border-white/20"
        >
          <AlertTriangle size={40} className="text-white fill-white/20" />
        </motion.button>
      </div>

      {/* Full Screen SOS Mode */}
      <AnimatePresence>
        {isAlerting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-danger flex flex-col items-center justify-center text-white overflow-hidden"
          >
            {/* Flashing Background Effect */}
            <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="absolute inset-0 bg-red-800"
            />

            <div className="relative z-10 text-center px-6">
                <AlertTriangle size={120} className="mx-auto mb-8 animate-bounce fill-white/10" />
                <h1 className="text-6xl md:text-8xl font-black mb-4 font-poppins tracking-tighter">SOS ACTIVATED</h1>
                <p className="text-xl md:text-2xl mb-12 font-medium opacity-90">Sending emergency alerts in...</p>

                <div className="text-9xl font-black mb-16 font-poppins">{countdown}</div>

                <button
                    onClick={() => {
                        setIsAlerting(false);
                        setCountdown(3);
                    }}
                    className="bg-white text-danger px-12 py-5 rounded-full text-2xl font-black hover:bg-slate-100 transition-all flex items-center gap-4 mx-auto shadow-2xl"
                >
                    <X size={32} /> CANCEL
                </button>
            </div>

            {/* Side animations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-white/20 animate-progress" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
