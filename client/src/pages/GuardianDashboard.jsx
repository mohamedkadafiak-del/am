import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, MapPin, AlertCircle, Eye, Phone, MessageSquare } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const GuardianDashboard = () => {
  const { user } = useAuth();
  const [trackedUsers, setTrackedUsers] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.emit('join-room', user._id);

    socket.on('location-update', (data) => {
      setTrackedUsers(prev => {
        const index = prev.findIndex(u => u.userId === data.userId);
        if (index > -1) {
          const updated = [...prev];
          updated[index] = data;
          return updated;
        }
        return [...prev, data];
      });
    });

    socket.on('emergency-alert', (data) => {
      setAlerts(prev => [data, ...prev]);
      // In a real app, play a loud sound or send notification
      alert(`EMERGENCY: SOS received from a user!`);
    });

    return () => {
      socket.off('location-update');
      socket.off('emergency-alert');
    };
  }, [user]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Guardian Dashboard</h1>
          <p className="text-slate-400">Monitoring your loved ones' safety</p>
        </div>
        <div className="bg-green-500/10 text-green-500 px-4 py-2 rounded-full border border-green-500/20 text-sm font-medium flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Connection
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tracked Users List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UsersIcon /> Monitored Users
            </h2>
            <div className="space-y-4">
              {trackedUsers.map((u, idx) => (
                <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-sm">User ID: {u.userId.slice(-6)}</h3>
                    <p className="text-[10px] text-slate-500">Last updated: {new Date().toLocaleTimeString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <Phone size={14} />
                    </button>
                    <button className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
                      <MessageSquare size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {trackedUsers.length === 0 && (
                <p className="text-center py-6 text-slate-500 text-sm">No users currently broadcasting location.</p>
              )}
            </div>
          </div>

          {/* Emergency Alerts */}
          {alerts.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 text-red-500 flex items-center gap-2">
                <AlertCircle /> Active Emergencies
              </h2>
              <div className="space-y-4">
                {alerts.map((alert, idx) => (
                  <div key={idx} className="bg-red-500 text-white p-4 rounded-xl animate-pulse">
                    <p className="font-bold">SOS TRIGERRED</p>
                    <p className="text-xs">Location: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Tracking Map */}
        <div className="lg:col-span-2 h-[600px] bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {trackedUsers.map((u, idx) => (
              <Marker key={idx} position={[u.location.lat, u.location.lng]}>
                <Popup>
                  <div className="text-slate-900 p-1">
                    <p className="font-bold">User {u.userId.slice(-6)}</p>
                    <p className="text-[10px]">{u.emergency ? 'EMERGENCY' : 'Safe'}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
            {trackedUsers.length > 0 && <MapViewUpdater center={[trackedUsers[0].location.lat, trackedUsers[0].location.lng]} />}
          </MapContainer>

          <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] font-bold text-pink-500 uppercase tracking-wider">
            Live Feed
          </div>
        </div>
      </div>
    </div>
  );
};

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const MapViewUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
  };

export default GuardianDashboard;
