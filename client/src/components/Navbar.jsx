import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Home, Map as MapIcon, Zap, Users, MessageCircle, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
        <Shield size={32} className="fill-primary/10" />
        <span className="tracking-tighter font-poppins text-white">SHE SHIELD <span className="text-secondary font-extrabold italic">AI</span></span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink to="/" active={isActive('/')} icon={<Home size={18} />} label="Home" />
        <NavLink to="/dashboard" active={isActive('/dashboard')} icon={<MapIcon size={18} />} label="Live Map" />
        <NavLink to="/dashboard" active={false} icon={<Zap size={18} />} label="Safety Score" />
        <NavLink to="/dashboard" active={false} icon={<Users size={18} />} label="Community" />
        <NavLink to="/dashboard" active={false} icon={<MessageCircle size={18} />} label="AI Assistant" />
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/10 hover:bg-slate-700 transition-all">
                <UserIcon size={16} className="text-secondary" />
                <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
            </Link>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-danger transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <Link to="/dashboard" className="hidden lg:block bg-danger hover:bg-red-600 px-4 py-2 rounded-full font-bold text-sm animate-pulse shadow-lg shadow-danger/30">
                🚨 EMERGENCY
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-slate-300 hover:text-white px-4 font-medium transition-colors">Login</Link>
            <Link to="/register" className="bg-primary hover:bg-primary/80 px-6 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20 font-semibold text-sm">
                Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, active, icon, label }) => (
    <Link
        to={to}
        className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-secondary ${active ? 'text-secondary' : 'text-slate-400'}`}
    >
        {icon}
        {label}
    </Link>
);

export default Navbar;
