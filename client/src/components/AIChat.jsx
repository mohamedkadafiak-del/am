import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Mic, Paperclip } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your She Shield AI assistant. How can I help you stay safe today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, {
        role: 'user',
        content: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // AI logic
    setTimeout(() => {
      let response = "I'm here to help. If you feel unsafe, please use the SOS button or share your location with a guardian.";

      const text = input.toLowerCase();
      if (text.includes('unsafe') || text.includes('scared') || text.includes('follow')) {
        response = "I'm sorry you feel that way. Please find a well-lit area with people. I've alerted your guardians. Would you like me to trigger a fake call for you?";
      } else if (text.includes('safe route')) {
        response = "I can help you find the safest route. Click the 'Safe Route' button on your dashboard.";
      }

      setMessages([...newMessages, {
        role: 'ai',
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-32 right-8 md:bottom-12 md:right-40 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, type: "spring", damping: 20 }}
            className="glass-morphism w-[350px] md:w-[400px] h-[550px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden mb-6 border-white/10"
          >
            {/* Header */}
            <div className="bg-primary p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <ShieldIcon size={20} className="text-white" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm font-poppins">She Shield AI</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-[10px] text-white/70 font-medium">Active Assistant</span>
                    </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/40 custom-scrollbar">
              {messages.map((msg, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-none shadow-primary/20'
                      : 'bg-card text-slate-200 rounded-tl-none border border-white/5'
                  }`}>
                    <p className="text-[13px] leading-relaxed font-inter">{msg.content}</p>
                    <span className={`text-[9px] mt-1 block text-right opacity-50 ${msg.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                        {msg.time}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                >
                    <div className="bg-card px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card/80 border-t border-white/5 flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask for safety advice..."
                  className="w-full bg-background/50 border border-white/10 rounded-full pl-4 pr-10 py-3.5 text-sm focus:ring-2 focus:ring-primary/50 text-white outline-none transition-all"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors">
                    <Mic size={18} />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className={`p-3.5 rounded-full transition-all ${input.trim() ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-800 text-slate-500'}`}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)] text-white border-4 border-white/10 relative z-[101]"
      >
        <MessageCircle size={28} />
        {!isOpen && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold">1</motion.span>}
      </motion.button>
    </div>
  );
};

const ShieldIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

export default AIChat;
