import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Map as MapIcon, Users, ArrowRight, Play, CheckCircle, Smartphone, Lock, Globe, ChevronDown } from 'lucide-react';
import CountUp from '../components/CountUp';

const LandingPage = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const phrases = ["Scanning your area...", "Analyzing risk...", "Safety Score: 85%"];

  const cursorX = useSpring(0, { damping: 25, stiffness: 120 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 120 });

  useEffect(() => {
    let currentPhrase = phrases[textIndex];
    let i = 0;
    let isDeleting = false;
    let timer;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.slice(0, i + 1));
        i++;
        if (i === currentPhrase.length) {
          isDeleting = true;
          timer = setTimeout(handleTyping, 2000);
        } else {
          timer = setTimeout(handleTyping, 100);
        }
      } else {
        setDisplayText(currentPhrase.slice(0, i - 1));
        i--;
        if (i === 0) {
          isDeleting = false;
          setTextIndex((prev) => (prev + 1) % phrases.length);
        } else {
          timer = setTimeout(handleTyping, 50);
        }
      }
    };

    timer = setTimeout(handleTyping, 500);

    const handleMouseMove = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        clearTimeout(timer);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [textIndex]);

  return (
    <div className="min-h-screen bg-background cursor-none overflow-x-hidden">
      {/* Premium Cursor Glow */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-[9999] hidden md:block"
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 min-h-screen flex items-center justify-center">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 -z-10">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[150px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -50, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[150px]"
            />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -150, 0],
                        opacity: [0, 0.4, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 12,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
                />
            ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-black tracking-[0.3em] uppercase mb-10 backdrop-blur-xl shadow-2xl"
                >
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                Neural Safety Shield Active
                </motion.span>

                <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[1] font-poppins text-white tracking-tighter">
                    Confidence <br />
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_30px_rgba(124,58,237,0.3)]">In Every Step.</span>
                </h1>

                <div className="h-16 flex items-center justify-center mb-12">
                    <p className="text-2xl md:text-3xl font-mono text-secondary font-black tracking-tight bg-slate-900/40 px-8 py-3 rounded-2xl backdrop-blur-md border border-white/5">
                        {displayText}<span className="animate-pulse text-white">_</span>
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-8"
                >
                    <Link to="/register?role=user" className="w-full sm:w-auto group relative bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-full font-black text-xl transition-all shadow-[0_0_40px_rgba(124,58,237,0.4)] flex items-center justify-center gap-3 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        />
                        <span className="relative z-10">Get Protected Now</span>
                        <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    </Link>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-4 text-white font-black text-lg group bg-white/5 px-8 py-5 rounded-full border border-white/10 hover:border-primary/50 transition-all backdrop-blur-md"
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <Play size={20} fill="currentColor" />
                        </div>
                        Watch Intro
                    </motion.button>
                </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Smooth Scroll Indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]"
        >
            <span>Scroll</span>
            <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Feature Grid with Cinematic Scroll Reveal */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
                icon={<Smartphone />}
                title="Instant SOS"
                desc="One-tap trigger that instantly notifies guardians, authorities, and nearby users with high-intensity alerts."
                delay={0}
            />
            <FeatureCard
                icon={<Globe />}
                title="AI Heatmaps"
                desc="Advanced neural analysis of area safety based on real-time crowdsourced reports and crime data."
                delay={0.2}
            />
            <FeatureCard
                icon={<Lock />}
                title="Neural Shield"
                desc="End-to-end military-grade encryption for all location and emergency communication data."
                delay={0.4}
            />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto glass rounded-[5rem] p-20 md:p-32 text-center relative overflow-hidden group border-white/5"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black mb-10 font-poppins leading-tight">Ready to feel <br /> truly safe?</h2>
                <Link to="/register">
                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(255,255,255,0.2)" }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white text-background px-16 py-7 rounded-full font-black text-2xl transition-all"
                    >
                        Create Your Free Account
                    </motion.button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex items-center gap-4 text-3xl font-black text-white">
                <Shield size={40} className="text-primary fill-primary/10" />
                <span className="font-poppins tracking-tighter">SHE SHIELD <span className="text-secondary">AI</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-slate-500 font-bold text-sm uppercase tracking-widest">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <Link to="/secure-admin-portal" className="hover:text-white transition-colors underline decoration-secondary underline-offset-8">Admin Portal</Link>
            </div>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.5em]">Neural Safety Engine v4.0</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        whileHover={{ y: -20 }}
        className="group"
    >
        <div className="glass h-full p-12 rounded-[4rem] border-white/5 hover:border-primary/40 transition-all hover:shadow-[0_0_80px_rgba(124,58,237,0.2)] relative overflow-hidden bg-slate-900/20">
            <div className="bg-slate-800/50 w-24 h-24 rounded-3xl flex items-center justify-center mb-10 shadow-inner group-hover:bg-primary/20 transition-all group-hover:rotate-6">
                {React.cloneElement(icon, { size: 44, className: "text-primary group-hover:text-white transition-colors" })}
            </div>
            <h3 className="text-3xl font-black mb-4 font-poppins">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-inter font-medium text-lg">{desc}</p>
        </div>
    </motion.div>
);

const StatItem = ({ count, label }) => (
    <div className="text-center">
        <h4 className="text-4xl md:text-6xl font-black text-white mb-3 font-poppins tracking-tighter">
            <CountUp value={count} />
        </h4>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">{label}</p>
    </div>
);

export default LandingPage;
