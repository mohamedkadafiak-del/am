import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOSButton = ({ onTrigger }) => {
  const [isAlerting, setIsAlerting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isShaking, setIsShaking] = useState(false);

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

  const handleTrigger = () => {
    setIsShaking(true);
    setTimeout(() => {
        setIsShaking(false);
        setIsAlerting(true);
    }, 500);
  };

  return (
    <>
      {/* Floating Button with Multiple Ripple Rings */}
      <div className="fixed bottom-32 right-8 md:bottom-12 md:right-12 z-[100]">
        <motion.div
            animate={isShaking ? { x: [-5, 5, -5, 5, 0], y: [-2, 2, -2, 2, 0] } : {}}
            transition={{ duration: 0.1, repeat: 5 }}
            className="relative"
        >
            {/* Infinite Ripple Rings */}
            {!isAlerting && [0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        delay: i * 0.8,
                        ease: "easeOut"
                    }}
                    className="absolute inset-0 bg-danger rounded-full -z-10"
                />
            ))}

            <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 1.3 }}
                animate={!isAlerting ? {
                    scale: [1, 1.1, 1],
                    boxShadow: [
                        "0 0 20px rgba(239,68,68,0.3)",
                        "0 0 60px rgba(239,68,68,0.6)",
                        "0 0 20px rgba(239,68,68,0.3)"
                    ]
                } : {}}
                transition={!isAlerting ? { repeat: Infinity, duration: 2 } : {}}
                onClick={handleTrigger}
                className="w-20 h-20 md:w-24 md:h-24 bg-danger rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl relative z-10"
            >
                <AlertTriangle size={44} className="text-white fill-white/20" />
            </motion.button>
        </motion.div>
      </div>

      {/* Full Screen SOS Mode - HIGH INTENSITY */}
      <AnimatePresence>
        {isAlerting && (
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center text-white overflow-hidden"
          >
            {/* Pulsing Gradient Flash */}
            <motion.div
                animate={{
                    background: [
                        "radial-gradient(circle, #EF4444 0%, #000 100%)",
                        "radial-gradient(circle, #DB2777 0%, #000 100%)",
                        "radial-gradient(circle, #EF4444 0%, #000 100%)"
                    ]
                }}
                transition={{ repeat: Infinity, duration: 0.4 }}
                className="absolute inset-0"
            />

            <div className="relative z-10 text-center px-6">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        filter: ["drop-shadow(0 0 0px #fff)", "drop-shadow(0 0 30px #fff)", "drop-shadow(0 0 0px #fff)"]
                    }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                >
                    <AlertTriangle size={140} className="mx-auto mb-10 fill-white/10" />
                </motion.div>

                <motion.h1
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className="text-7xl md:text-9xl font-black mb-6 font-poppins tracking-tighter drop-shadow-2xl"
                >
                    SOS ACTIVATED
                </motion.h1>

                <p className="text-2xl md:text-3xl mb-12 font-bold opacity-80 uppercase tracking-[0.5em]">Emergency Protocol Initiated</p>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={countdown}
                        initial={{ scale: 4, opacity: 0, filter: "blur(20px)" }}
                        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                        exit={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="text-[12rem] font-black mb-20 font-poppins leading-none"
                    >
                        {countdown}
                    </motion.div>
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setIsAlerting(false);
                        setCountdown(3);
                    }}
                    className="bg-white text-danger px-16 py-6 rounded-full text-3xl font-black hover:bg-slate-100 transition-all flex items-center gap-4 mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                    <X size={36} /> ABORT
                </motion.button>
            </div>

            {/* Side Vibrating Bars */}
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ x: i % 2 === 0 ? [-5, 5, -5] : [5, -5, 5] }}
                    transition={{ repeat: Infinity, duration: 0.1 }}
                    className={`absolute ${i < 2 ? 'left-0' : 'right-0'} top-0 h-full w-2 bg-white/20`}
                />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSButton;
