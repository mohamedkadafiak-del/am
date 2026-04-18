import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Users, BarChart2, Film, PlusCircle } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    genre: '',
    mood: 'Happy',
    duration: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [anaRes, userRes] = await Promise.all([
          axios.get('/api/admin/analytics', config),
          axios.get('/api/admin/users', config)
        ]);

        setAnalytics(anaRes.data);
        setUsers(userRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const movieData = {
        ...formData,
        genre: formData.genre.split(',').map(g => g.trim()),
        mood: [formData.mood]
      };
      await axios.post('/api/admin/upload', movieData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Movie uploaded successfully!');
      setFormData({ title: '', description: '', videoUrl: '', thumbnail: '', genre: '', mood: 'Happy', duration: '' });
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-6 text-purple-500">Admin Console</h2>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'upload' ? 'bg-purple-600' : 'hover:bg-slate-800'}`}
        >
          <PlusCircle className="w-5 h-5" /> Upload Movie
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'analytics' ? 'bg-purple-600' : 'hover:bg-slate-800'}`}
        >
          <BarChart2 className="w-5 h-5" /> Analytics
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'users' ? 'bg-purple-600' : 'hover:bg-slate-800'}`}
        >
          <Users className="w-5 h-5" /> Manage Users
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'upload' && (
          <div className="max-w-2xl bg-slate-900 p-8 rounded-xl border border-slate-800">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Upload className="text-purple-500" /> Upload New Content
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Movie Title</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Duration (e.g., 2h 15m)</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Description</label>
                <textarea
                  required
                  className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500 h-24"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Video URL (S3/Cloudinary)</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Thumbnail URL</label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Genres (comma separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="Action, Sci-Fi"
                    className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">Primary Mood</label>
                  <select
                    className="w-full bg-slate-800 border-none rounded px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                    value={formData.mood}
                    onChange={(e) => setFormData({...formData, mood: e.target.value})}
                  >
                    <option>Happy</option>
                    <option>Sad</option>
                    <option>Action</option>
                    <option>Love</option>
                    <option>Thriller</option>
                    <option>Comedy</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold mt-6 transition">
                Upload Content
              </button>
            </form>
          </div>
        )}

        {activeTab === 'analytics' && analytics && (
          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Total Movies</p>
                <p className="text-3xl font-bold">{analytics.totalMovies}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Registered Users</p>
                <p className="text-3xl font-bold">{analytics.totalUsers}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                <p className="text-slate-400 text-sm">Total Streams</p>
                <p className="text-3xl font-bold">{analytics.totalViews[0]?.total || 0}</p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Film className="text-purple-500" /> Trending Content
              </h3>
              <div className="space-y-3">
                {analytics.trendingMovies.map((m) => (
                  <div key={m._id} className="flex items-center justify-between p-3 bg-slate-800 rounded">
                    <span>{m.title}</span>
                    <span className="text-xs bg-purple-600 px-2 py-1 rounded">{m.views} views</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-800 text-slate-400 text-sm">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-slate-800 hover:bg-slate-800/50 transition">
                    <td className="p-4 font-semibold">{u.name}</td>
                    <td className="p-4 text-slate-400">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-900/40 text-red-400' : 'bg-blue-900/40 text-blue-400'}`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
