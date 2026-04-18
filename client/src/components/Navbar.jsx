import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-slate-800">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-pink-500">
        <Shield size={28} />
        <span className="tracking-tight">SHE SHIELD AI</span>
      </Link>

      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="flex items-center gap-2 text-slate-300">
              <UserIcon size={18} />
              {user.name || 'Admin'}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="text-slate-300 hover:text-white py-2">Login</Link>
            <Link to="/register" className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-full transition-all shadow-lg shadow-pink-600/20 font-medium">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
