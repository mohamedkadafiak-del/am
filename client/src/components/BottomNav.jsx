import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Shield, MessageCircle, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2 pointer-events-none">
      <div className="glass h-16 rounded-2xl flex items-center justify-around px-2 border-t border-white/10 pointer-events-auto shadow-2xl">
        <MobileNavLink to="/" active={isActive('/')} icon={<Home size={22} />} />
        <MobileNavLink to="/dashboard" active={isActive('/dashboard')} icon={<MapIcon size={22} />} />

        <div className="relative -top-6">
            <Link to="/dashboard" className="w-16 h-16 bg-danger rounded-full flex items-center justify-center shadow-xl shadow-danger/40 border-4 border-background animate-pulse">
                <Shield size={28} className="text-white fill-white/20" />
            </Link>
        </div>

        <MobileNavLink to="/dashboard" active={false} icon={<MessageCircle size={22} />} />
        <MobileNavLink to="/dashboard" active={isActive('/profile')} icon={<User size={22} />} />
      </div>
    </div>
  );
};

const MobileNavLink = ({ to, active, icon }) => (
  <Link to={to} className={`p-2 transition-all ${active ? 'text-secondary scale-110' : 'text-slate-500 hover:text-slate-300'}`}>
    {icon}
  </Link>
);

export default BottomNav;
