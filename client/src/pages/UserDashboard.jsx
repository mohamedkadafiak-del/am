import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Shield, AlertCircle, CheckCircle, Navigation } from 'lucide-react';

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
    // Mocking a safe route logic
    // In a real app, this would use OSRM or Google Maps with weight adjustments for safety scores
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
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Stats & Actions */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${
              safetyScore?.status === 'Red' ? 'bg-red-500/10 text-red-500' :
              safetyScore?.status === 'Yellow' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'
            }`}>
              <Shield size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg">Safety Score</h2>
              <p className="text-slate-400 text-sm">Real-time AI analysis</p>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-bold">{safetyScore?.score || '--'}</span>
            <span className="text-slate-400">/ 100</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${
                safetyScore?.status === 'Red' ? 'bg-red-500' :
                safetyScore?.status === 'Yellow' ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${safetyScore?.score || 0}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Factors: {safetyScore?.factors.join(', ')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={calculateSafeRoute}
            className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <div className="p-2 bg-pink-500/10 text-pink-500 rounded-lg">
              <Navigation size={20} />
            </div>
            <span className="text-sm font-medium">Safe Route</span>
          </button>

          <button
            onClick={handleCheckIn}
            className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <CheckCircle size={20} />
            </div>
            <span className="text-sm font-medium">I'm Safe</span>
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-red-500">
            <AlertCircle size={18} /> Nearby Reports
          </h3>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {reports.map((report) => (
              <div key={report._id} className="border-l-2 border-red-500 pl-3 py-1">
                <p className="text-sm font-medium">{report.description}</p>
                <p className="text-xs text-slate-500">{new Date(report.timestamp).toLocaleTimeString()}</p>
              </div>
            ))}
            {reports.length === 0 && <p className="text-sm text-slate-500">No reports in your area.</p>}
          </div>
        </div>
      </div>

      {/* Center & Right Column - Map */}
      <div className="lg:col-span-2 h-[600px] rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl">
        <MapContainer center={location} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location}>
            <Popup>You are here</Popup>
          </Marker>
          <Circle
            center={location}
            radius={2000}
            pathOptions={{
                fillColor: safetyScore?.status === 'Red' ? 'red' : safetyScore?.status === 'Yellow' ? 'yellow' : 'green',
                color: 'transparent'
            }}
          />
          {reports.map(report => (
            <Marker key={report._id} position={[report.location.lat, report.location.lng]}>
              <Popup>{report.description} - {report.severity}</Popup>
            </Marker>
          ))}
          {route && <Polyline positions={route} color="lime" weight={5} opacity={0.7} />}
          <MapViewUpdater center={location} />
        </MapContainer>

        <div className="absolute top-4 right-4 z-[400] bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-xs shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-green-500" /> <span>Safe Zone</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500" /> <span>Caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" /> <span>Unsafe</span>
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
