import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Users, Ambulance, CheckCircle, TrendingUp, ShieldCheck, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({});
  const [usersList, setUsersList] = useState([]);
  const [driversList, setDriversList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [anaRes, userRes, drivRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/analytics', config),
        axios.get('http://localhost:5000/api/admin/users', config),
        axios.get('http://localhost:5000/api/admin/drivers', config)
      ]);
      setAnalytics(anaRes.data);
      setUsersList(userRes.data);
      setDriversList(drivRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const approveDriver = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/admin/drivers/approve/${id}`, {}, config);
      fetchData();
    } catch (err) {
      alert('Approval failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="flex items-center gap-4">
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500"><Users /></div>
          <div><p className="text-slate-400 text-sm">Total Users</p><h3 className="text-2xl font-bold">{analytics.totalUsers || 0}</h3></div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="bg-amber-500/10 p-4 rounded-2xl text-amber-500"><TrendingUp /></div>
          <div><p className="text-slate-400 text-sm">Total Bookings</p><h3 className="text-2xl font-bold">{analytics.totalBookings || 0}</h3></div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-500"><Ambulance /></div>
          <div><p className="text-slate-400 text-sm">Active Drivers</p><h3 className="text-2xl font-bold">{analytics.activeDrivers || 0}</h3></div>
        </GlassCard>
        <GlassCard className="flex items-center gap-4">
          <div className="bg-rose-500/10 p-4 rounded-2xl text-rose-500"><CheckCircle /></div>
          <div><p className="text-slate-400 text-sm">Completed</p><h3 className="text-2xl font-bold">{analytics.completedTrips || 0}</h3></div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Driver Management */}
        <GlassCard>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" />
            Driver Approvals
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="pb-4 font-medium">Name</th>
                  <th className="pb-4 font-medium">Vehicle</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {driversList.map(driver => (
                  <tr key={driver._id}>
                    <td className="py-4">
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-xs text-slate-500">{driver.email}</div>
                    </td>
                    <td className="py-4 text-sm">{driver.vehicleNumber}</td>
                    <td className="py-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${driver.isApproved ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {driver.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {!driver.isApproved && (
                        <Button variant="success" className="py-1 px-3 text-xs" onClick={() => approveDriver(driver._id)}>Approve</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* User List */}
        <GlassCard>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-blue-500" />
            Manage Users
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800">
                  <th className="pb-4 font-medium">User</th>
                  <th className="pb-4 font-medium">Phone</th>
                  <th className="pb-4 font-medium text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {usersList.map(u => (
                  <tr key={u._id}>
                    <td className="py-4">
                      <div className="font-medium">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </td>
                    <td className="py-4 text-sm text-slate-400">{u.phone}</td>
                    <td className="py-4 text-right">
                      <button className="text-rose-500 hover:text-rose-400 transition-colors">
                        <XCircle size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
