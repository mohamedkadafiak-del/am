import React, { useState } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your She Shield AI assistant. How can I help you stay safe today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simple rule-based AI response
    setTimeout(() => {
      let response = "I'm here to help. If you feel unsafe, please use the SOS button or share your location with a guardian.";

      const text = input.toLowerCase();
      if (text.includes('unsafe') || text.includes('scared')) {
        response = "I'm sorry you feel that way. Please find a well-lit area with people. Would you like me to trigger a fake call for you?";
      } else if (text.includes('safe route')) {
        response = "I can help you find the safest route. Check the map on your dashboard for areas highlighted in green.";
      } else if (text.includes('help')) {
        response = "Emergency options: 1. SOS Button 2. Fake Call 3. Share Location. Stay calm, I'm with you.";
      }

      setMessages([...newMessages, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-32 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-slate-900 border border-slate-700 w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-pink-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-medium flex items-center gap-2">
                <MessageCircle size={18} /> She Shield AI
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:bg-pink-700 rounded-full p-1">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' ? 'bg-pink-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-slate-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-pink-500 text-white"
              />
              <button onClick={handleSend} className="bg-pink-600 p-2 rounded-full text-white hover:bg-pink-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center shadow-xl text-white"
      >
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
};

export default AIChat;
