import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Player from './pages/Player';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Pages with Navbar */}
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <div className="pt-16">
                    <Routes>
                      <Route path="/" element={
                        <PrivateRoute>
                          <Home />
                        </PrivateRoute>
                      } />
                      <Route path="/movie/:id" element={
                        <PrivateRoute>
                          <MovieDetails />
                        </PrivateRoute>
                      } />
                      <Route path="/profile" element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      } />
                      <Route path="/admin-cinestream-9090" element={
                        <PrivateRoute role="admin">
                          <AdminPanel />
                        </PrivateRoute>
                      } />
                    </Routes>
                  </div>
                </>
              }
            />

            {/* Fullscreen Player (No Navbar) */}
            <Route path="/player/:id" element={
              <PrivateRoute>
                <Player />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
