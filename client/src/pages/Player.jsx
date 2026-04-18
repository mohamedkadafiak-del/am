import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import io from 'socket.io-client';
import { Send, Users, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Player = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isParty = searchParams.get('party') === 'true';

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [playing, setPlaying] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMovie();

    if (isParty) {
      const newSocket = io();
      setSocket(newSocket);
      newSocket.emit('join-room', id);

      newSocket.on('chat-message', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      newSocket.on('sync-video', ({ state, currentTime }) => {
        if (state === 'playing') setPlaying(true);
        else if (state === 'paused') setPlaying(false);

        if (playerRef.current) {
          const internalTime = playerRef.current.getCurrentTime();
          if (Math.abs(internalTime - currentTime) > 2) {
            playerRef.current.seekTo(currentTime);
          }
        }
      });

      return () => newSocket.close();
    }
  }, [id, isParty]);

  const handlePlay = () => {
    if (isParty && socket) {
      socket.emit('sync-video', {
        roomId: id,
        state: 'playing',
        currentTime: playerRef.current.getCurrentTime()
      });
    }
  };

  const handlePause = () => {
    if (isParty && socket) {
      socket.emit('sync-video', {
        roomId: id,
        state: 'paused',
        currentTime: playerRef.current.getCurrentTime()
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit('chat-message', {
        roomId: id,
        message: newMessage,
        user: user.name
      });
      setNewMessage('');
    }
  };

  const updateProgress = async (state) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/watch-history/update', {
        movieId: id,
        progress: state.playedSeconds
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!movie) return <div className="h-screen flex items-center justify-center">Movie not found</div>;

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      <div className={`flex-1 relative ${isParty ? 'w-3/4' : 'w-full'}`}>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-50 p-2 bg-slate-900/50 rounded-full hover:bg-slate-900 transition"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <ReactPlayer
          ref={playerRef}
          url={movie.videoUrl}
          width="100%"
          height="100%"
          controls
          playing={playing}
          onPlay={() => {
            setPlaying(true);
            handlePlay();
          }}
          onPause={() => {
            setPlaying(false);
            handlePause();
          }}
          onProgress={updateProgress}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              },
              tracks: movie.subtitles ? movie.subtitles.map(s => ({
                kind: 'subtitles',
                src: s.url,
                srcLang: s.language,
                label: s.language,
                default: s.language === 'English'
              })) : []
            }
          }}
        />
      </div>

      {isParty && (
        <div className="w-80 md:w-96 bg-slate-950 border-l border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 flex items-center gap-2">
            <Users className="text-purple-500" />
            <h3 className="font-bold">Watch Party Chat</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-xs font-bold text-purple-400">{msg.user}</span>
                <p className="bg-slate-900 p-3 rounded-lg text-sm">{msg.message}</p>
              </div>
            ))}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-900 border-none rounded-lg px-4 py-2 focus:ring-1 focus:ring-purple-500 outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Player;
