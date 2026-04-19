import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { io } from 'socket.io-client';

const LocationContext = createContext();

const socket = io('http://localhost:5000');

export const LocationProvider = ({ children }) => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role === 'user' && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lng: longitude });
          socket.emit('send-location', {
            userId: user._id,
            name: user.name,
            location: { lat: latitude, lng: longitude }
          });
        },
        (err) => {
          console.error(err);
          setError(err.message);
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [user]);

  const triggerSOS = (emergencyLocation) => {
    if (user) {
      socket.emit('send-location', {
        userId: user._id,
        name: user.name,
        location: emergencyLocation || location,
        emergency: true
      });
    }
  };

  return (
    <LocationContext.Provider value={{ location, error, triggerSOS }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
