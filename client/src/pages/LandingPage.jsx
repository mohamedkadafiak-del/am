import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ambulance, Shield, Clock, PhoneCall } from 'lucide-react';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 text-sm font-bold tracking-wider uppercase mb-6 inline-block">
            Emergency Response 24/7
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Your Life, Our Priority. <br /> Fast & Reliable.
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed">
            Instant ambulance booking at your fingertips. We connect you with the nearest medical emergency services in seconds.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/register?role=user">
              <Button className="w-full md:w-auto text-lg px-10">Book an Ambulance</Button>
            </Link>
            <Link to="/register?role=driver">
              <Button variant="outline" className="w-full md:w-auto text-lg px-10">Join as Driver</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Shield className="text-blue-500" />, title: "Secure & Trusted", desc: "Verified drivers and medical teams ready for any emergency." },
          { icon: <Clock className="text-amber-500" />, title: "Instant Response", desc: "Our algorithm finds the closest ambulance to your location." },
          { icon: <PhoneCall className="text-emerald-500" />, title: "24/7 Support", desc: "Direct communication with drivers and medical support." }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard hover className="h-full">
              <div className="bg-slate-800/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-900 text-center text-slate-500 text-sm">
        &copy; 2026 LifeLine Ambulance Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
