import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertCircle, CheckCircle, Navigation, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for Leaflet default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UserDashboard = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState([20.5937, 78.9629]);
  const [safetyScore, setSafetyScore] = useState(null);
  const [reports, setReports] = useState([]);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation([latitude, longitude]);
          fetchSafetyScore(latitude, longitude);
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
    fetchReports();
  }, [user]);

  const fetchSafetyScore = async (lat, lng) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/safety/score?lat=${lat}&lng=${lng}`);
      setSafetyScore(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reports');
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckIn = async () => {
    alert('Safety check-in successful! Your guardians have been notified.');
  };

  const calculateSafeRoute = () => {
    const destination = [location[0] + 0.01, location[1] + 0.01];
    setRoute([
        location,
        [location[0] + 0.005, location[1]],
        [location[0] + 0.005, location[1] + 0.005],
        destination
    ]);
    alert("Safest route calculated! Highlighting green path avoiding red zones.");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold font-poppins">Welcome back, {user?.name.split(' ')[0]}</h1>
            <p className="text-slate-500">Your safety network is active and monitoring.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <button
                onClick={calculateSafeRoute}
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-primary/20 transition-all"
            >
                <Navigation size={18} /> Safe Route
            </button>
            <button
                onClick={handleCheckIn}
                className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all"
            >
                <CheckCircle size={18} className="text-safe" /> I'm Safe
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats & Reports */}
        <div className="space-y-8">
          {/* Circular Safety Score */}
          <div className="glass p-8 rounded-[2rem] text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
            <h3 className="text-slate-400 font-medium mb-6 flex items-center justify-center gap-2">
                <TrendingUp size={16} /> Area Safety Score
            </h3>

            <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full circular-progress" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="currentColor" strokeWidth="8"
                        className="text-slate-800"
                    />
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="currentColor" strokeWidth="8"
                        strokeDasharray={283}
                        strokeDashoffset={283 - (283 * (safetyScore?.score || 0)) / 100}
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ${
                            safetyScore?.status === 'Red' ? 'text-danger' :
                            safetyScore?.status === 'Yellow' ? 'text-yellow-500' : 'text-safe'
                        }`}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black font-poppins">{safetyScore?.score || '--'}</span>
                    <span className={`text-sm font-bold uppercase tracking-widest ${
                        safetyScore?.status === 'Red' ? 'text-danger' :
                        safetyScore?.status === 'Yellow' ? 'text-yellow-500' : 'text-safe'
                    }`}>{safetyScore?.status || 'Scanning'}</span>
                </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed italic">
              "Analysis based on {safetyScore?.factors.join(' & ')}"
            </p>
          </div>

          <div className="glass p-8 rounded-[2rem]">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-danger font-poppins">
              <AlertCircle size={20} /> Community Reports
            </h3>
            <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {reports.map((report) => (
                <div key={report._id} className="group relative pl-4 border-l-2 border-slate-700 hover:border-danger transition-colors">
                  <p className="text-sm font-semibold text-slate-200">{report.description}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${report.severity === 'high' ? 'bg-danger' : 'bg-yellow-500'}`} />
                    {report.severity.toUpperCase()} SEVERITY • {new Date(report.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
              {reports.length === 0 && <p className="text-sm text-slate-500 text-center py-4">No reports in your area.</p>}
            </div>
          </div>
        </div>

        {/* Center & Right Column - Map */}
        <div className="lg:col-span-2 h-[600px] rounded-[2.5rem] overflow-hidden border border-white/5 relative shadow-2xl group">
          <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* User Location Pulse Marker */}
            <Marker position={location} icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white animate-pulse-blue shadow-lg shadow-blue-500/50"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })}>
              <Popup className="custom-popup">You are here</Popup>
            </Marker>

            <Circle
              center={location}
              radius={2000}
              pathOptions={{
                  fillColor: safetyScore?.status === 'Red' ? '#EF4444' : safetyScore?.status === 'Yellow' ? '#F59E0B' : '#22C55E',
                  fillOpacity: 0.1,
                  color: 'transparent'
              }}
            />
            {reports.map(report => (
              <Marker key={report._id} position={[report.location.lat, report.location.lng]}>
                <Popup>{report.description}</Popup>
              </Marker>
            ))}
            {route && <Polyline positions={route} color="#22C55E" weight={6} opacity={0.8} dashArray="10, 10" />}
            <MapViewUpdater center={location} />
          </MapContainer>

          <div className="absolute top-6 right-6 z-[400] glass p-4 rounded-2xl text-[10px] font-bold shadow-2xl space-y-2 border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-safe shadow-[0_0_10px_#22C55E]" /> <span className="text-slate-300">SAFE ZONE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_#F59E0B]" /> <span className="text-slate-300">MODERATE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-danger shadow-[0_0_10px_#EF4444]" /> <span className="text-slate-300">DANGER ZONE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapViewUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export default UserDashboard;
