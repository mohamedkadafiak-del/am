import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import DriverDashboard from './pages/DriverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/driver-login" element={<Login role="driver" />} />
              <Route path="/admin-secret-login-portal" element={<Login role="admin" />} />
              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={
                <PrivateRoute role="user">
                  <UserDashboard />
                </PrivateRoute>
              } />

              <Route path="/driver-dashboard" element={
                <PrivateRoute role="driver">
                  <DriverDashboard />
                </PrivateRoute>
              } />

              <Route path="/admin-dashboard" element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
