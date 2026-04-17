import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Plus,
  Trash2,
  MapPin,
  AlertTriangle,
  Users,
  Database,
  Search,
  X,
  PlusCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReport, setNewReport] = useState({
    type: 'Theft',
    lat: '',
    lng: '',
    description: '',
    timestamp: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/crime-data');
      setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post('http://localhost:5000/api/crime-data', {
        type: newReport.type,
        coordinates: [parseFloat(newReport.lng), parseFloat(newReport.lat)],
        description: newReport.description,
        timestamp: newReport.timestamp
      }, config);

      setShowAddModal(false);
      setNewReport({ type: 'Theft', lat: '', lng: '', description: '', timestamp: new Date().toISOString().slice(0, 16) });
      fetchReports();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding report');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this report?')) return;
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`http://localhost:5000/api/crime-data/${id}`, config);
      fetchReports();
    } catch (err) {
      alert('Error deleting report');
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <ShieldCheck className="text-indigo-500" />
            Admin Intelligence
          </h1>
          <p className="text-slate-400">Securely manage crime data and system integrity.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20"
        >
          <PlusCircle size={20} />
          Report Incident
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={<Database size={24} />} label="Total Incidents" value={reports.length} color="text-indigo-400" />
        <StatCard icon={<AlertTriangle size={24} />} label="Critical Areas" value={Math.ceil(reports.length / 5)} color="text-amber-400" />
        <StatCard icon={<Users size={24} />} label="Active Analysts" value="1" color="text-emerald-400" />
      </div>

      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-xl font-bold text-white">Incident Registry</h3>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Filter incidents..."
              className="bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 text-slate-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Coordinates</th>
                <th className="px-6 py-4 font-semibold">Date & Time</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-slate-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTypeStyles(report.type)}`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-300 text-sm font-mono">
                      <MapPin size={14} className="text-slate-500" />
                      {report.location.coordinates[1].toFixed(4)}, {report.location.coordinates[0].toFixed(4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">
                    {new Date(report.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                    No incident reports found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Log New Incident</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddReport} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Type</label>
                  <select
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                  >
                    <option>Theft</option>
                    <option>Assault</option>
                    <option>Burglary</option>
                    <option>Robbery</option>
                    <option>Vandalism</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Timestamp</label>
                  <input
                    type="datetime-local"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
                    value={newReport.timestamp}
                    onChange={(e) => setNewReport({...newReport, timestamp: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Latitude</label>
                  <input
                    type="number" step="any" required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="40.7128"
                    value={newReport.lat}
                    onChange={(e) => setNewReport({...newReport, lat: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Longitude</label>
                  <input
                    type="number" step="any" required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="-74.0060"
                    value={newReport.lng}
                    onChange={(e) => setNewReport({...newReport, lng: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Description (Optional)</label>
                <textarea
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 min-h-[100px]"
                  placeholder="Details about the incident..."
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
              >
                Submit Incident Report
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="glass-card p-6 rounded-2xl border border-slate-800">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const getTypeStyles = (type) => {
  switch (type) {
    case 'Theft': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'Assault': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'Robbery': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'Burglary': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

export default AdminDashboard;
