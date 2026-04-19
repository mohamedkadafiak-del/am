const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join-room', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    socket.on('send-location', (data) => {
      // data: { userId, location: { lat, lng }, emergency: boolean, name: string }
      if (data.emergency) {
        io.emit('emergency-alert', data);
      }
      io.emit('location-update', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = socketHandler;
