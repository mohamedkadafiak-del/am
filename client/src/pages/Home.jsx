import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Compass, ShieldAlert, ArrowRight, Activity, Users, Lock } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-sm font-medium mb-8">
            <ShieldCheck size={16} />
            <span>Advanced Crime Prediction AI</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Navigate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Confidence</span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            SafeRoute uses real-time crime data and predictive analytics to ensure you always take the safest path home, no matter the time of day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20">
              Get Started for Free
              <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 rounded-2xl font-semibold transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="text-indigo-400" />}
              title="Area Safety Score"
              description="Get instant safety ratings from 0-100 for any location based on live crime reports and time of day."
            />
            <FeatureCard
              icon={<Compass className="text-purple-400" />}
              title="Safe Navigator"
              description="Our Dijkstra-based algorithm avoids high-risk zones to suggest the safest possible walking or driving route."
            />
            <FeatureCard
              icon={<Activity className="text-emerald-400" />}
              title="Risk Prediction"
              description="Stay ahead with predictive analytics that estimate the probability of crime in the next few hours."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card rounded-3xl p-12 border border-slate-800 flex flex-col md:flex-row gap-12 items-center justify-around">
            <StatItem count="98%" label="Safe Routes Found" />
            <div className="w-px h-12 bg-slate-800 hidden md:block"></div>
            <StatItem count="24/7" label="Real-time Monitoring" />
            <div className="w-px h-12 bg-slate-800 hidden md:block"></div>
            <StatItem count="15k+" label="Community Reports" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>© 2025 SafeRoute Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass-card p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6 border border-slate-800 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{description}</p>
  </div>
);

const StatItem = ({ count, label }) => (
  <div className="text-center">
    <div className="text-4xl font-bold text-white mb-2">{count}</div>
    <div className="text-slate-500 font-medium uppercase tracking-wider text-xs">{label}</div>
  </div>
);

export default Home;
