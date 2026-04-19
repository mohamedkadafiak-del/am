# 🛡️ SHE SHIELD AI – Advanced Women's Safety Platform

SHE SHIELD AI is a startup-level, full-stack safety application designed to empower women with real-time protection, AI-driven safety analysis, and instant emergency response systems.

## 🚀 Key Features

- **AI Safety Score:** Real-time predictive analysis of area safety using crime data and time-of-day logic.
- **Instant SOS Alert:** One-tap emergency trigger that notifies guardians and nearby users with live location and audio recording.
- **Safe Route Navigation:** Map-integrated routing that prioritizes well-lit and high-safety-score areas.
- **Fake Call Simulator:** Realistic incoming call UI to help users exit uncomfortable situations discreetly.
- **AI Safety Assistant:** 24/7 intelligent chat guidance for emergency protocols.
- **Guardian Dashboard:** Real-time location tracking for family and friends.
- **Secure Admin Portal:** Hidden monitoring hub for managing unsafe zones and active alerts.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion, Leaflet.js, Lucide Icons.
- **Backend:** Node.js, Express.js, Socket.io (Real-time).
- **Database:** MongoDB (Mongoose ORM).
- **Auth:** JWT, Bcrypt.js password hashing.

## 📦 Project Structure

```text
├── client/          # React (Vite) Frontend
├── server/          # Node.js Express Backend
└── README.md
```

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file based on .env.example
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
# Create .env file based on .env.example
npm run dev
```

## 🔐 Environment Variables

### Server (.env)
- `PORT`: 5000
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your secret key
- `ADMIN_EMAIL`: admin@sheshield.com
- `ADMIN_PASSWORD`: admin123

### Client (.env)
- `VITE_API_URL`: http://localhost:5000

## 🎯 Our Mission
To create a world where every woman feels **Confident Everywhere.**

---
© 2026 SHE SHIELD AI. All rights reserved.
