import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Ambulance, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="glass fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-red-500">
        <Ambulance size={28} />
        <span>LifeLine</span>
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
            <Link to="/login" className="text-slate-300 hover:text-white">Login</Link>
            <Link to="/register" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
