import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import { MapPin, Clock, History, Ambulance } from 'lucide-react';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.get('http://localhost:5000/api/users/bookings', config);
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const onBook = async (data) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/users/book', data, config);
      reset();
      fetchBookings();
      alert('Ambulance requested successfully!');
    } catch (err) {
      alert('Booking failed');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Quick Actions */}
      <div className="lg:col-span-1 space-y-6">
        <GlassCard>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Ambulance className="text-red-500" />
            Book Ambulance
          </h2>
          <form onSubmit={handleSubmit(onBook)} className="space-y-4">
            <Input
              label="Pickup Location"
              name="pickupLocation"
              placeholder="Your current location"
              register={register}
              errors={errors}
            />
            <Input
              label="Drop Location"
              name="dropLocation"
              placeholder="Hospital name or address"
              register={register}
              errors={errors}
            />
            <Button type="submit" className="w-full">
              Request Now
            </Button>
            <Button variant="danger" className="w-full" onClick={() => onBook({ pickupLocation: 'Current GPS', dropLocation: 'Nearest Emergency' })}>
              EMERGENCY BOOK
            </Button>
          </form>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
              <span>National Emergency</span>
              <span className="font-bold text-red-500">911</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
              <span>Local Ambulance</span>
              <span className="font-bold">108</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Booking History & Status */}
      <div className="lg:col-span-2 space-y-6">
        <GlassCard>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <History className="text-blue-500" />
            Recent Bookings
          </h2>

          {loading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-800/50 rounded-xl" />)}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              No bookings found. Request your first ambulance.
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={booking._id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 gap-4"
                >
                  <div className="flex gap-4">
                    <div className={`p-3 rounded-full h-fit ${booking.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="font-semibold">{booking.dropLocation}</div>
                      <div className="text-sm text-slate-400">From: {booking.pickupLocation}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {new Date(booking.requestedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      booking.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      booking.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {booking.status}
                    </span>
                    {booking.driver && (
                      <div className="text-xs text-slate-400">
                        Driver: {booking.driver.name} ({booking.driver.vehicleNumber})
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default UserDashboard;
