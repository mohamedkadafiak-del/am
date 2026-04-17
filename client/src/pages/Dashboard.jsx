import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Navigation,
  Shield,
  AlertTriangle,
  Info,
  Map as MapIcon,
  Layers,
  Activity,
  Zap
} from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const [center] = useState([40.7128, -74.0060]); // New York City
  const [safetyScore, setSafetyScore] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [crimes, setCrimes] = useState([]);
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCrimes();
  }, []);

  const fetchCrimes = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/crime-data');
      setCrimes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For demo, we use fixed coordinates if search matches certain terms, or just use center
      const lat = 40.7128;
      const lng = -74.0060;

      const [scoreRes, predictRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/safety/score?lat=${lat}&lng=${lng}`),
        axios.get(`http://localhost:5000/api/safety/predict?lat=${lat}&lng=${lng}`)
      ]);

      setSafetyScore(scoreRes.data);
      setPrediction(predictRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSafeRoute = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/safe-route/calculate', {
        start: { lat: 40.7128, lng: -74.0060 },
        end: { lat: 40.7200, lng: -74.0100 }
      });
      setRoute(data.originalPath);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 h-screen flex flex-col md:flex-row overflow-hidden bg-slate-950">
      {/* Sidebar Controls */}
      <div className="w-full md:w-96 bg-slate-900 border-r border-slate-800 p-6 overflow-y-auto z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MapIcon className="text-indigo-500" />
            Safe Navigator
          </h2>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search area or destination..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              Analyze Safety
            </button>
          </form>
        </div>

        {safetyScore && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm font-medium">Safety Score</span>
                <Shield className={safetyScore.safetyScore > 70 ? 'text-emerald-400' : safetyScore.safetyScore > 40 ? 'text-amber-400' : 'text-red-400'} size={20} />
              </div>
              <div className="text-5xl font-bold text-white mb-2">{safetyScore.safetyScore}</div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${safetyScore.safetyScore > 70 ? 'bg-emerald-500' : safetyScore.safetyScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${safetyScore.safetyScore}%` }}
                ></div>
              </div>
              <p className="text-slate-500 text-xs mt-3 italic">Based on {safetyScore.crimeCount} nearby incidents</p>
            </div>

            {prediction && (
              <div className="glass-card p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm font-medium">Risk Prediction</span>
                  <Activity className="text-indigo-400" size={20} />
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${prediction.riskLevel === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                    {prediction.riskLevel} Risk
                  </div>
                  <span className="text-2xl font-bold text-white">{prediction.probability}%</span>
                </div>
                <p className="text-slate-500 text-xs mt-3 leading-relaxed">Probability of incident in next 4 hours.</p>
              </div>
            )}

            <button
              onClick={getSafeRoute}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
            >
              <Navigation size={20} />
              Generate Safest Route
            </button>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Legend</h4>
          <div className="space-y-3">
            <LegendItem color="bg-red-500" label="Danger Zone (< 40)" />
            <LegendItem color="bg-amber-500" label="Caution Area (40-70)" />
            <LegendItem color="bg-emerald-500" label="Safe Haven (> 70)" />
          </div>
        </div>

        <button className="mt-12 w-full bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all">
          <Zap size={20} fill="currentColor" />
          SOS EMERGENCY
        </button>
      </div>

      {/* Map View */}
      <div className="flex-1 relative z-0">
        <MapContainer center={center} zoom={14} className="h-full w-full">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {crimes.map(crime => (
            <React.Fragment key={crime._id}>
              {/* Heatmap-like outer glow */}
              <Circle
                center={[crime.location.coordinates[1], crime.location.coordinates[0]]}
                radius={400}
                pathOptions={{
                  color: 'transparent',
                  fillColor: crime.type === 'Theft' ? '#f59e0b' : '#ef4444',
                  fillOpacity: 0.1,
                  weight: 0
                }}
              />
              <Circle
                center={[crime.location.coordinates[1], crime.location.coordinates[0]]}
                radius={150}
                pathOptions={{
                  color: crime.type === 'Theft' ? '#f59e0b' : '#ef4444',
                  fillColor: crime.type === 'Theft' ? '#f59e0b' : '#ef4444',
                  fillOpacity: 0.4,
                  weight: 1
                }}
              >
                <Popup>
                  <div className="text-slate-900 font-bold">{crime.type}</div>
                  <div className="text-slate-600 text-xs">{new Date(crime.timestamp).toLocaleDateString()}</div>
                  <div className="text-slate-500 text-[10px] mt-1">{crime.description || 'No additional details.'}</div>
                </Popup>
              </Circle>
            </React.Fragment>
          ))}

          {route && (
            <Polyline
              positions={route.map(p => [p.lat, p.lng])}
              pathOptions={{ color: '#6366f1', weight: 6, opacity: 0.8 }}
            />
          )}

          {route && route.length > 0 && (
            <>
              <Marker position={[route[0].lat, route[0].lng]} />
              <Marker position={[route[route.length-1].lat, route[route.length-1].lng]} />
            </>
          )}

          <MapUpdater center={center} />
        </MapContainer>
      </div>
    </div>
  );
};

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-3 text-sm text-slate-400">
    <div className={`w-3 h-3 rounded-full ${color}`}></div>
    {label}
  </div>
);

export default Dashboard;
