import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Map as MapIcon, Users, ArrowRight, Play, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              AI-Powered Protection 24/7
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] font-poppins">
                Your Safety. <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">Our Priority.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-inter">
                Experience the next generation of women's safety with SHE SHIELD AI. Real-time tracking, predictive safety scores, and instant emergency response.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link to="/register?role=user" className="group relative bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-2xl shadow-primary/30 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="flex items-center gap-3 text-white font-bold hover:text-primary transition-colors group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                        <Play size={18} fill="currentColor" />
                    </div>
                    Live Demo
                </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-poppins">Comprehensive Safety Suite</h2>
            <p className="text-slate-500">Built with advanced AI and community-driven data</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
                icon={<Zap className="text-yellow-500" />}
                title="AI Safety Score"
                desc="Real-time analysis of your area's risk level based on history and time."
            />
            <FeatureCard
                icon={<MapIcon className="text-emerald-500" />}
                title="Safe Navigation"
                desc="Find the safest paths home, avoiding identified high-risk zones."
            />
            <FeatureCard
                icon={<Shield className="text-danger" />}
                title="SOS Emergency"
                desc="One-tap alerts that notify guardians and local authorities instantly."
            />
            <FeatureCard
                icon={<Users className="text-blue-500" />}
                title="Community Support"
                desc="A network of nearby users looking out for each other's safety."
            />
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 font-poppins leading-tight">
                    Smart Tracking for <br />
                    <span className="text-secondary">Peace of Mind.</span>
                </h2>
                <div className="space-y-6">
                    <CheckItem text="Real-time location sharing with trusted guardians" />
                    <CheckItem text="Automatic audio recording during SOS activation" />
                    <CheckItem text="Fake incoming call feature for quick exits" />
                    <CheckItem text="Crowdsourced reports on area lighting and safety" />
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />
                <div className="glass rounded-[2rem] p-4 border-white/10 shadow-2xl rotate-2">
                    <div className="bg-background rounded-2xl h-[400px] relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-30 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.9629,20.5937,5,0/800x600?access_token=none')] bg-cover" />
                        <div className="relative z-10 text-center">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <Shield size={40} className="text-primary" />
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                <p className="text-2xl font-bold text-white">Safety Score: 85%</p>
                                <p className="text-sm text-safe font-medium">Currently in Safe Zone</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                <Shield size={28} />
                <span className="font-poppins text-white">SHE SHIELD AI</span>
            </div>
            <div className="flex gap-8 text-slate-500 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
                <Link to="/secure-admin-portal" className="hover:text-white transition-colors">Admin</Link>
            </div>
            <p className="text-slate-600 text-sm italic">Designed to save lives.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="group"
    >
        <div className="glass h-full p-8 rounded-[2rem] border-white/5 hover:border-primary/50 transition-all hover:glow-purple">
            <div className="bg-slate-800/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-primary/20 transition-colors">
                {React.cloneElement(icon, { size: 32 })}
            </div>
            <h3 className="text-2xl font-bold mb-3 font-poppins">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-inter">{desc}</p>
        </div>
    </motion.div>
);

const CheckItem = ({ text }) => (
    <div className="flex items-center gap-4">
        <div className="bg-safe/10 p-1 rounded-full text-safe">
            <CheckCircle size={20} />
        </div>
        <span className="text-slate-300 font-medium">{text}</span>
    </div>
);

export default LandingPage;
