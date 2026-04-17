import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Bell, MapPin, CheckCircle, XCircle, DollarSign, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [driverInfo, setDriverInfo] = useState(user);
  const [requests, setRequests] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Poll for new requests
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [reqRes, tripRes] = await Promise.all([
        axios.get('http://localhost:5000/api/drivers/pending-requests', config),
        axios.get('http://localhost:5000/api/drivers/trips', config)
      ]);
      setRequests(reqRes.data);
      setTrips(tripRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.put('http://localhost:5000/api/drivers/status', { status }, config);
      setDriverInfo({ ...driverInfo, status: res.data.status });
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const acceptBooking = async (bookingId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/drivers/accept', { bookingId }, config);
      fetchData();
    } catch (err) {
      alert('Failed to accept booking');
    }
  };

  const completeBooking = async (bookingId) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put('http://localhost:5000/api/drivers/booking-status', { bookingId, status: 'completed' }, config);
      fetchData();
    } catch (err) {
      alert('Failed to complete trip');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Driver Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Online Status</p>
            <h3 className="text-xl font-bold capitalize">{driverInfo.status || 'Offline'}</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updateStatus('available')}
              className={`p-2 rounded-lg transition-colors ${driverInfo.status === 'available' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              <Activity size={20} />
            </button>
            <button
              onClick={() => updateStatus('offline')}
              className={`p-2 rounded-lg transition-colors ${driverInfo.status === 'offline' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              <XCircle size={20} />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="bg-blue-500/10 p-3 rounded-full text-blue-500">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Trips</p>
            <h3 className="text-xl font-bold">{trips.filter(t => t.status === 'completed').length}</h3>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center gap-4">
          <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-500">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Earnings</p>
            <h3 className="text-xl font-bold">${driverInfo.earnings || 0}</h3>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Requests */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell className="text-amber-500" />
            Live Requests
          </h2>
          <div className="space-y-4">
            {requests.length === 0 ? (
              <GlassCard className="text-center py-8 text-slate-500 italic">
                Waiting for incoming requests...
              </GlassCard>
            ) : (
              requests.map(req => (
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} key={req._id}>
                  <GlassCard className="border-l-4 border-amber-500">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-bold">{req.user.name}</div>
                        <div className="text-sm text-slate-400">{req.user.phone}</div>
                      </div>
                      <div className="text-xs text-slate-500">New Request</div>
                    </div>
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex gap-2"><MapPin size={16} className="text-red-500" /> <b>From:</b> {req.pickupLocation}</div>
                      <div className="flex gap-2"><MapPin size={16} className="text-emerald-500" /> <b>To:</b> {req.dropLocation}</div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={() => acceptBooking(req._id)}>Accept</Button>
                      <Button variant="outline" className="flex-1">Decline</Button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Assigned/Ongoing Trips */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Activity className="text-blue-500" />
            My Trips
          </h2>
          <div className="space-y-4">
            {trips.length === 0 ? (
              <GlassCard className="text-center py-8 text-slate-500 italic">
                No active or past trips yet.
              </GlassCard>
            ) : (
              trips.slice().reverse().map(trip => (
                <GlassCard key={trip._id} className={trip.status === 'accepted' ? 'border-l-4 border-blue-500' : ''}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{trip.user.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${
                      trip.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-4">{trip.pickupLocation} → {trip.dropLocation}</div>
                  {trip.status === 'accepted' && (
                    <Button variant="success" className="w-full py-2" onClick={() => completeBooking(trip._id)}>
                      Mark as Completed
                    </Button>
                  )}
                </GlassCard>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
