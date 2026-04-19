import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Map as MapIcon, Users, ArrowRight, Play, CheckCircle, Smartphone, Lock, Globe } from 'lucide-react';
import CountUp from '../components/CountUp';

const LandingPage = () => {
  const [safetyText, setSafetyText] = useState('');
  const fullText = "Scanning your area... Safety Score: 85%";
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorX = useSpring(0, { damping: 20, stiffness: 100 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 100 });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setSafetyText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);

    const handleMouseMove = (e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        clearInterval(interval);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background cursor-none">
      {/* Premium Cursor Glow */}
      <motion.div
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-[9999] hidden md:block"
      />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Floating Particles Mockup */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                />
            ))}
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
                >
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                Stay Safe. Stay Smart.
                </motion.span>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] font-poppins text-white">
                    Protecting <br />
                    <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent italic">Every Step.</span>
                </h1>

                <div className="h-12 flex items-center mb-10">
                    <p className="text-2xl font-mono text-secondary font-bold">
                        {safetyText}<span className="animate-pulse">|</span>
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <Link to="/register?role=user" className="w-full sm:w-auto group relative bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                        />
                        <span className="relative z-10">Get Started Free</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="flex items-center gap-3 text-white font-bold hover:text-primary transition-colors group">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors bg-white/5 backdrop-blur-sm"
                        >
                            <Play size={20} fill="currentColor" />
                        </motion.div>
                        Watch Demo
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden lg:block"
            >
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="glass p-2 rounded-[3.5rem] border-white/10 shadow-2xl relative z-10 overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800"
                        alt="Security Visualization"
                        className="rounded-[3rem] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 cursor-pointer"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-8">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="glass p-8 rounded-[2.5rem] border-primary/30 shadow-2xl backdrop-blur-2xl"
                        >
                            <Shield size={64} className="text-primary mx-auto mb-4 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
                            <p className="text-2xl font-black text-white font-poppins">SHIELD ACTIVE</p>
                            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-2">Neural Guard Monitoring</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/5 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem count="50K+" label="Active Users" />
            <StatItem count="12K+" label="Emergency Alerts" />
            <StatItem count="98%" label="Safety Index" />
            <StatItem count="24/7" label="AI Monitoring" />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-black mb-6 font-poppins"
            >
                Future of Safety. <br />
                <span className="text-slate-500">Available Today.</span>
            </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <FeatureCard
                icon={<Smartphone />}
                title="Instant SOS"
                desc="One-tap trigger that instantly notifies guardians, authorities, and nearby She Shield users."
                delay={0}
            />
            <FeatureCard
                icon={<Globe />}
                title="Safety Heatmaps"
                desc="Visualize unsafe zones in real-time based on live reports and historical crime data analysis."
                delay={0.1}
            />
            <FeatureCard
                icon={<Lock />}
                title="Secure Network"
                desc="End-to-end encrypted location sharing ensures your data is only visible to people you trust."
                delay={0.2}
            />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto glass rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden group border-white/10"
        >
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary group-hover:opacity-100 transition-opacity"
            />
            <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black mb-8 font-poppins leading-[1.1]">The Only Shield <br /> You Need.</h2>
                <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium">Join over 50,000 women who trust SHE SHIELD AI for their daily safety and peace of mind.</p>
                <Link to="/register">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-background hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] px-16 py-6 rounded-full font-black text-2xl transition-all"
                    >
                        Secure Your Future
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
            <div className="flex flex-wrap justify-center gap-12 text-slate-500 font-bold text-sm">
                <a href="#" className="hover:text-primary transition-colors">Emergency</a>
                <a href="#" className="hover:text-primary transition-colors">Guardians</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <Link to="/secure-admin-portal" className="hover:text-white transition-colors underline decoration-secondary underline-offset-8">Admin Portal</Link>
            </div>
            <p className="text-slate-600 text-sm font-bold uppercase tracking-widest">© 2026 SHE SHIELD AI</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        whileHover={{ y: -20, scale: 1.02 }}
        className="group h-full"
    >
        <div className="glass h-full p-12 rounded-[4rem] border-white/5 hover:border-primary/50 transition-all hover:shadow-[0_0_60px_rgba(124,58,237,0.15)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-primary/20 transition-all" />
            <div className="bg-slate-800/50 w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:bg-primary/20 transition-all rotate-3 group-hover:rotate-0">
                {React.cloneElement(icon, { size: 40, className: "text-primary group-hover:text-white transition-colors" })}
            </div>
            <h3 className="text-3xl font-black mb-4 font-poppins">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-inter font-medium text-lg">{desc}</p>
        </div>
    </motion.div>
);

const StatItem = ({ count, label }) => (
    <div className="text-center">
        <h4 className="text-4xl md:text-6xl font-black text-white mb-3 font-poppins">
            <CountUp value={count} />
        </h4>
        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">{label}</p>
    </div>
);

export default LandingPage;
