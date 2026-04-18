import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import GuardianDashboard from './pages/GuardianDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import SOSButton from './components/SOSButton';
import AIChat from './components/AIChat';
import FakeCall from './components/FakeCall';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const GlobalSafetyUI = () => {
  const { user } = useAuth();
  const [isFakeCallOpen, setIsFakeCallOpen] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (user && user.role === 'user' && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lng: longitude });
          socket.emit('send-location', { userId: user._id, location: { lat: latitude, lng: longitude } });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [user]);

  const handleSOS = async () => {
    if (!user) return;
    try {
      const loc = location || { lat: 0, lng: 0 };
      await axios.post('http://localhost:5000/api/alerts', {
        location: loc
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      socket.emit('send-location', { userId: user._id, location: loc, emergency: true });

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), 10000);
        console.log("Emergency audio recording started...");
      } catch (err) {
        console.error("Audio recording failed:", err);
      }

      alert('SOS Alert Sent! Emergency contacts and nearby users have been notified.');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'user') return null;

  return (
    <>
      <SOSButton onTrigger={handleSOS} />
      <AIChat />
      <div className="fixed bottom-48 right-8 z-40 hidden md:block">
        <button
          onClick={() => setIsFakeCallOpen(true)}
          className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center shadow-xl text-pink-500 hover:bg-slate-700 transition-colors"
          title="Trigger Fake Call"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </button>
      </div>
      <FakeCall isOpen={isFakeCallOpen} onClose={() => setIsFakeCallOpen(false)} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background text-slate-100 font-inter">
          <Navbar />
          <GlobalSafetyUI />
          <main className="pb-24 md:pb-0">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/secure-admin-portal" element={<Login role="admin" />} />
              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={
                <PrivateRoute role="user">
                  <UserDashboard />
                </PrivateRoute>
              } />

              <Route path="/guardian-dashboard" element={
                <PrivateRoute role="guardian">
                  <GuardianDashboard />
                </PrivateRoute>
              } />

              <Route path="/admin-dashboard" element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
