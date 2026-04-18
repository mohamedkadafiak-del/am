import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Mic, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your She Shield AI assistant. How can I help you stay safe today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, {
        role: 'user',
        content: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    setMessages(newMessages);
    setInput('');

    // AI logic
    setTimeout(() => {
      let response = "I'm here to help. If you feel unsafe, please use the SOS button or share your location with a guardian.";

      const text = input.toLowerCase();
      if (text.includes('unsafe') || text.includes('scared') || text.includes('follow')) {
        response = "I'm sorry you feel that way. Please find a well-lit area with people. I've alerted your guardians to watch your live location. Would you like me to trigger a fake call for you?";
      } else if (text.includes('safe route')) {
        response = "I can help you find the safest route. Click the 'Safe Route' button on your dashboard to see the recommended path avoiding red zones.";
      } else if (text.includes('help')) {
        response = "Emergency options available: 1. SOS Button (Top Right) 2. Fake Call (Bottom Right) 3. I'm Safe Check-in. Stay calm, I'm monitoring your status.";
      }

      setMessages([...newMessages, {
        role: 'ai',
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-32 right-8 md:bottom-12 md:right-40 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="glass-morphism w-[350px] md:w-[400px] h-[550px] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden mb-6 border-white/10"
          >
            {/* Header */}
            <div className="bg-primary p-5 flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ShieldIcon size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm font-poppins">She Shield AI</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-white/70 font-medium">Online Assistant</span>
                    </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/40">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-card text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    <p className="text-[13px] leading-relaxed font-inter">{msg.content}</p>
                    <span className={`text-[9px] mt-1 block text-right opacity-50 ${msg.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                        {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card/80 border-t border-white/5 flex items-center gap-3">
              <button className="text-slate-500 hover:text-primary transition-colors">
                <Paperclip size={20} />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for safety advice..."
                  className="w-full bg-background/50 border border-white/10 rounded-full pl-4 pr-10 py-3 text-sm focus:ring-2 focus:ring-primary/50 text-white outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary">
                    <Mic size={18} />
                </button>
              </div>
              <button
                onClick={handleSend}
                className={`p-3 rounded-full transition-all ${input.trim() ? 'bg-primary text-white' : 'bg-slate-800 text-slate-500'}`}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] text-white border-4 border-white/10 relative"
      >
        <MessageCircle size={28} />
        {!isOpen && <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold">1</span>}
      </motion.button>
    </div>
  );
};

const ShieldIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export default AIChat;
