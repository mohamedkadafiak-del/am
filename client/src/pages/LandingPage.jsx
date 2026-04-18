import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, MapPin, PhoneCall, Users, Zap, MessageSquare } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] -z-10" />

          <span className="px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-500 text-sm font-bold tracking-wider uppercase mb-6 inline-block border border-pink-500/20">
            Smart Safety for Women
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-[1.1]">
            SHE SHIELD AI <br />
            <span className="text-3xl md:text-5xl font-bold text-slate-200">Confidence In Every Step.</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Advanced real-time tracking, AI-powered safety scores, and instant SOS emergency systems designed to keep you safe everywhere, anytime.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link to="/register?role=user">
              <button className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-10 py-4 rounded-full transition-all shadow-xl shadow-pink-600/30 font-bold">
                Join She Shield
              </button>
            </Link>
            <Link to="/register?role=guardian">
              <button className="bg-slate-800 hover:bg-slate-700 text-white text-lg px-10 py-4 rounded-full transition-all border border-slate-700 font-bold">
                Join as Guardian
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats/Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="text-yellow-500" />}
            title="AI Safety Score"
            desc="Real-time analysis of your area's safety based on crime data, time of day, and community reports."
          />
          <FeatureCard
            icon={<MapPin className="text-emerald-500" />}
            title="Safe Route Navigation"
            desc="Navigate using the safest routes, not just the shortest, with highlights on high-risk zones."
          />
          <FeatureCard
            icon={<Shield className="text-pink-500" />}
            title="Instant SOS"
            desc="One-tap emergency trigger that notifies guardians and nearby users with your live location."
          />
          <FeatureCard
            icon={<PhoneCall className="text-blue-500" />}
            title="Fake Call System"
            desc="Realistic fake incoming call screen to help you exit uncomfortable or threatening situations."
          />
          <FeatureCard
            icon={<MessageSquare className="text-indigo-500" />}
            title="AI Safety Chatbot"
            desc="Instant safety guidance and emergency protocols available 24/7 via our intelligent assistant."
          />
          <FeatureCard
            icon={<Users className="text-orange-500" />}
            title="Community Network"
            desc="Join a network of thousands of women and guardians looking out for each other."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to feel safer?</h2>
            <p className="text-slate-400 mb-10 text-lg">Join the community today and take control of your safety.</p>
            <Link to="/register">
                <button className="bg-white text-slate-950 hover:bg-slate-200 px-12 py-4 rounded-full font-bold transition-all">
                    Create Free Account
                </button>
            </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-xl font-bold text-pink-500">
                <Shield size={24} />
                <span>SHE SHIELD AI</span>
            </div>
            <p className="text-slate-500 text-sm">
                &copy; 2026 She Shield AI. Empowering Women Safety.
            </p>
            <div className="flex gap-6 text-slate-400 text-sm">
                <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
                <Link to="/secure-admin-portal" className="hover:text-white transition-colors">Admin</Link>
            </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <GlassCard hover className="h-full border-slate-800/50">
            <div className="bg-slate-800/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                {React.cloneElement(icon, { size: 28 })}
            </div>
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{desc}</p>
        </GlassCard>
    </motion.div>
);

export default LandingPage;
