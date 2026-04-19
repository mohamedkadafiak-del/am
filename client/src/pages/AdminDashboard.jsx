import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, AlertCircle, TrendingUp, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 156, activeAlerts: 0, unsafeZones: 12 });

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Poll for alerts
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/alerts/active', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAlerts(res.data);
      setStats(prev => ({ ...prev, activeAlerts: res.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  const resolveAlert = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/alerts/${id}/resolve`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchAlerts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Secure Admin Portal</h1>
        <div className="bg-pink-600/10 text-pink-500 px-4 py-2 rounded-full border border-pink-500/20 text-sm font-medium">
          Live Monitoring Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users />} label="Total Users" value={stats.totalUsers} color="blue" />
        <StatCard icon={<AlertCircle />} label="Active Alerts" value={stats.activeAlerts} color="red" />
        <StatCard icon={<MapIcon />} label="Unsafe Zones" value={stats.unsafeZones} color="yellow" />
        <StatCard icon={<TrendingUp />} label="Safety Index" value="92%" color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Alerts List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="text-red-500" /> Recent Alerts
          </h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {alerts.map((alert) => (
              <div key={alert._id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{alert.userId?.name}</h3>
                  <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full uppercase">Emergency</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{alert.userId?.phone}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => resolveAlert(alert._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 rounded-lg transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                No active emergency alerts.
              </div>
            )}
          </div>
        </div>

        {/* Real-time Map Monitoring */}
        <div className="lg:col-span-2 h-[600px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {alerts.map(alert => (
              <Marker key={alert._id} position={[alert.location.lat, alert.location.lng]}>
                <Popup>
                  <div className="text-slate-900">
                    <p className="font-bold">{alert.userId?.name}</p>
                    <p className="text-xs">Emergency Alert!</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    red: 'text-red-500 bg-red-500/10 border-red-500/20',
    yellow: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    green: 'text-green-500 bg-green-500/10 border-green-500/20',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[color]}`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
};

export default AdminDashboard;
