import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, LogOut, User as UserIcon, LayoutDashboard, BarChart3, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-500">
        <ShieldAlert size={28} />
        <span>SafeRoute</span>
      </Link>

      <div className="flex items-center gap-8">
        {user && (
          <div className="hidden md:flex gap-6">
            <Link to="/dashboard" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link to="/insights" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <BarChart3 size={18} />
              Insights
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin-dashboard" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-semibold">
                <ShieldCheck size={18} />
                Admin
              </Link>
            )}
          </div>
        )}

        {user ? (
          <div className="flex items-center gap-6 border-l border-slate-800 pl-6">
            <span className="flex items-center gap-2 text-slate-300">
              <UserIcon size={18} />
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-slate-300 hover:text-white px-4 py-2">Login</Link>
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full transition-all shadow-lg shadow-indigo-500/20 font-medium text-sm">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
