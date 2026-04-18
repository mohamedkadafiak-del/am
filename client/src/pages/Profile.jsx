import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import { User, History, Settings, Heart } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/watch-history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Header */}
      <div className="flex items-center gap-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-4xl font-bold">
          {user.name[0]}
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-slate-400">{user.email}</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 uppercase tracking-wider">{user.role}</span>
          </div>
        </div>
      </div>

      {/* Watch History */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <History className="text-purple-500" /> Continue Watching
        </h2>
        {history.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {history.map((item) => (
              <div key={item._id} className="space-y-2">
                <MovieCard movie={item.movie} />
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full"
                    style={{ width: `${(item.progress / 3600) * 100}%` }} // Simplified progress
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/30 border border-dashed border-slate-800 rounded-xl p-12 text-center text-slate-500">
            You haven't watched anything yet.
          </div>
        )}
      </div>

      {/* Preferences Section (Placeholder) */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Heart className="text-pink-500" /> Favorite Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.preferredGenres?.length > 0 ? user.preferredGenres.map(g => (
              <span key={g} className="px-3 py-1 bg-slate-800 rounded-full text-sm">{g}</span>
            )) : (
              <p className="text-slate-500 text-sm italic">Set your favorite genres to get better recommendations.</p>
            )}
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Settings className="text-slate-400" /> Account Settings
          </h3>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition underline">
            Change Password
          </button>
          <br />
          <button className="text-sm text-red-400 hover:text-red-300 transition underline">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
