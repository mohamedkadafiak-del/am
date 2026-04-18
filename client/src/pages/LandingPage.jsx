import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Map as MapIcon, Users, ArrowRight, Play, CheckCircle, Smartphone, Lock, Globe } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  const [safetyText, setSafetyText] = useState('');
  const fullText = "Scanning your area... Safety Score: 85%";

  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setSafetyText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                Stay Safe. Stay Smart.
                </span>
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
                    <Link to="/register?role=user" className="w-full sm:w-auto group relative bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-2">
                        Get Started Free
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button className="flex items-center gap-3 text-white font-bold hover:text-primary transition-colors group">
                        <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors bg-white/5 backdrop-blur-sm">
                            <Play size={20} fill="currentColor" />
                        </div>
                        Watch Demo
                    </button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden lg:block"
            >
                <div className="absolute inset-0 bg-secondary/10 blur-[120px] rounded-full" />
                <div className="glass p-2 rounded-[3rem] border-white/10 shadow-2xl relative z-10">
                    <img
                        src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800"
                        alt="Security Visualization"
                        className="rounded-[2.5rem] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center px-8">
                        <div className="glass p-6 rounded-3xl border-primary/30 shadow-2xl animate-bounce">
                            <Shield size={64} className="text-primary mx-auto mb-4" />
                            <p className="text-2xl font-black text-white">ENCRYPTED SHIELD</p>
                            <p className="text-xs text-slate-400 font-bold tracking-widest uppercase">Real-time AI Guard Active</p>
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            <StatItem count="50K+" label="Active Users" />
            <StatItem count="12K+" label="Emergency Alerts" />
            <StatItem count="98%" label="Safety Index" />
            <StatItem count="24/7" label="AI Monitoring" />
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black mb-6 font-poppins"
            >
                Startup-Level Technology. <br />
                <span className="text-slate-500">Real-World Protection.</span>
            </motion.h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
                icon={<Smartphone />}
                title="Instant SOS"
                desc="One-tap trigger that instantly notifies guardians, authorities, and nearby She Shield users."
            />
            <FeatureCard
                icon={<Globe />}
                title="Safety Heatmaps"
                desc="Visualize unsafe zones in real-time based on live reports and historical crime data analysis."
            />
            <FeatureCard
                icon={<Lock />}
                title="Secure Network"
                desc="End-to-end encrypted location sharing ensures your data is only visible to people you trust."
            />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto glass rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden group border-white/10"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-8 font-poppins">Join the Movement.</h2>
                <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto">Empower yourself with the world's most advanced women's safety AI platform.</p>
                <Link to="/register">
                    <button className="bg-white text-background hover:bg-slate-100 px-12 py-5 rounded-full font-black text-xl transition-all shadow-2xl shadow-white/10 hover:scale-105 active:scale-95">
                        Create Your Shield
                    </button>
                </Link>
            </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3 text-3xl font-black text-white">
                <Shield size={36} className="text-primary" />
                <span className="font-poppins tracking-tighter">SHE SHIELD AI</span>
            </div>
            <div className="flex gap-12 text-slate-500 font-bold text-sm">
                <a href="#" className="hover:text-primary transition-colors">Safety</a>
                <a href="#" className="hover:text-primary transition-colors">Network</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <Link to="/secure-admin-portal" className="hover:text-white transition-colors underline decoration-primary underline-offset-4">Admin</Link>
            </div>
            <p className="text-slate-600 text-sm font-medium">© 2026 SHE SHIELD AI • Confident Everywhere.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -15 }}
        className="group h-full"
    >
        <div className="glass h-full p-10 rounded-[3rem] border-white/5 hover:border-primary/50 transition-all hover:glow-purple relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/20 transition-all" />
            <div className="bg-slate-800/50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-primary/20 transition-colors">
                {React.cloneElement(icon, { size: 36, className: "text-primary group-hover:text-white transition-colors" })}
            </div>
            <h3 className="text-3xl font-black mb-4 font-poppins">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-inter font-medium">{desc}</p>
        </div>
    </motion.div>
);

const StatItem = ({ count, label }) => (
    <div className="text-center">
        <h4 className="text-4xl md:text-5xl font-black text-white mb-2 font-poppins">{count}</h4>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{label}</p>
    </div>
);

export default LandingPage;
