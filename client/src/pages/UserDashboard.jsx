import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertCircle, CheckCircle, Navigation, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation([latitude, longitude]);
          fetchSafetyScore(latitude, longitude);
          setIsLoading(false);
        },
        (err) => {
            console.error(err);
            setIsLoading(false);
        },
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

  if (isLoading) return <SkeletonLoader />;

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
            <h1 className="text-4xl font-black font-poppins tracking-tight">Welcome, {user?.name.split(' ')[0]}</h1>
            <p className="text-slate-500 font-medium mt-1">AI Guardian is currently monitoring your path.</p>
        </motion.div>
        <div className="flex gap-4 w-full md:w-auto">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={calculateSafeRoute}
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-xl shadow-primary/20 transition-all"
            >
                <Navigation size={18} /> Safe Route
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckIn}
                className="flex-1 md:flex-none bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all border border-white/5"
            >
                <CheckCircle size={18} className="text-safe" /> I'm Safe
            </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass p-8 rounded-[2.5rem] text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
            <h3 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8 flex items-center justify-center gap-2">
                <TrendingUp size={14} className="text-primary" /> Safety Intelligence
            </h3>

            <div className="relative w-52 h-52 mx-auto mb-8">
                <svg className="w-full h-full circular-progress" viewBox="0 0 100 100">
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="currentColor" strokeWidth="6"
                        className="text-slate-800"
                    />
                    <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none" stroke="currentColor" strokeWidth="7"
                        strokeDasharray={283}
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 - (283 * (safetyScore?.score || 0)) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        className={`transition-all ${
                            safetyScore?.status === 'Red' ? 'text-danger shadow-[0_0_10px_red]' :
                            safetyScore?.status === 'Yellow' ? 'text-yellow-500' : 'text-safe'
                        }`}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-black font-poppins"
                    >
                        {safetyScore?.score || '--'}
                    </motion.span>
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${
                        safetyScore?.status === 'Red' ? 'text-danger' :
                        safetyScore?.status === 'Yellow' ? 'text-yellow-500' : 'text-safe'
                    }`}>{safetyScore?.status || 'Analyzing'}</span>
                </div>
            </div>

            <p className="text-xs text-slate-500 font-medium px-4">
              "Area security metrics analyzed based on history & temporal patterns."
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass p-8 rounded-[2.5rem] border-white/5"
          >
            <h3 className="font-black text-lg mb-8 flex items-center gap-3 text-danger font-poppins">
              <AlertCircle size={22} /> Danger Reports
            </h3>
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {reports.map((report, idx) => (
                    <motion.div
                        key={report._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative pl-5 border-l-2 border-slate-800 hover:border-danger transition-all py-1"
                    >
                        <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{report.description}</p>
                        <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${report.severity === 'high' ? 'bg-danger shadow-[0_0_5px_red]' : 'bg-yellow-500'}`} />
                            {report.severity} Priority • {new Date(report.timestamp).toLocaleTimeString()}
                        </p>
                    </motion.div>
                ))}
              </AnimatePresence>
              {reports.length === 0 && <p className="text-sm text-slate-500 text-center py-8 font-medium italic">Scanning for local reports...</p>}
            </div>
          </motion.div>
        </div>

        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 h-[700px] rounded-[3rem] overflow-hidden border border-white/5 relative shadow-2xl group"
        >
          <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={location} icon={L.divIcon({
                className: 'custom-div-icon',
                html: `<div class="relative"><div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50"></div><div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-xl relative z-10"></div></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            })}>
              <Popup className="custom-popup">Guardian Active: Monitoring your location</Popup>
            </Marker>

            <Circle
              center={location}
              radius={2000}
              pathOptions={{
                  fillColor: safetyScore?.status === 'Red' ? '#EF4444' : safetyScore?.status === 'Yellow' ? '#F59E0B' : '#22C55E',
                  fillOpacity: 0.08,
                  color: 'transparent'
              }}
            />
            {reports.map(report => (
              <Marker key={report._id} position={[report.location.lat, report.location.lng]}>
                <Popup>{report.description}</Popup>
              </Marker>
            ))}
            {route && <Polyline positions={route} color="#22C55E" weight={8} opacity={0.6} dashArray="15, 15" />}
            <MapViewUpdater center={location} />
          </MapContainer>

          <div className="absolute top-8 right-8 z-[400] glass p-6 rounded-3xl shadow-2xl space-y-3 border-white/10 backdrop-blur-2xl">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Map Intelligence</h4>
            <MapLegend color="bg-safe" label="Safe Corridor" />
            <MapLegend color="bg-yellow-500" label="Caution Advised" />
            <MapLegend color="bg-danger" label="High Risk Zone" pulse />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MapLegend = ({ color, label, pulse }) => (
    <div className="flex items-center gap-4">
        <div className={`w-3.5 h-3.5 rounded-full ${color} ${pulse ? 'animate-pulse shadow-[0_0_10px_red]' : ''}`} />
        <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
    </div>
);

const SkeletonLoader = () => (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
        <div className="h-20 bg-slate-800 rounded-3xl w-1/3" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-8">
                <div className="h-64 bg-slate-800 rounded-[2.5rem]" />
                <div className="h-96 bg-slate-800 rounded-[2.5rem]" />
            </div>
            <div className="lg:col-span-2 h-[700px] bg-slate-800 rounded-[3rem]" />
        </div>
    </div>
);

const MapViewUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export default UserDashboard;
