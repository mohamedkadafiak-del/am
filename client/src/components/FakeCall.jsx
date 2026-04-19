import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, User, Mic, Grid, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FakeCall = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('Incoming...');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (status === '00:00') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-between py-20 text-white font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center">
          <User size={48} />
        </div>
        <h2 className="text-3xl font-medium">Dad</h2>
        <p className="text-slate-400 text-lg">
          {status === 'Incoming...' ? 'Mobile' : formatTime(timer)}
        </p>
      </div>

      {status === 'Incoming...' ? (
        <div className="flex gap-20">
          <button
            onClick={onClose}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <PhoneOff size={32} />
            </div>
            <span className="text-xs">Decline</span>
          </button>
          <button
            onClick={() => setStatus('00:00')}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-bounce">
              <Phone size={32} />
            </div>
            <span className="text-xs">Accept</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center"><Mic size={24} /></div><span className="text-xs">Mute</span></div>
          <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center"><Grid size={24} /></div><span className="text-xs">Keypad</span></div>
          <div className="flex flex-col items-center gap-2"><div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center"><Video size={24} /></div><span className="text-xs">Video</span></div>
          <div className="col-span-3 flex justify-center mt-10">
            <button
                onClick={onClose}
                className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center"
            >
                <PhoneOff size={32} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FakeCall;
