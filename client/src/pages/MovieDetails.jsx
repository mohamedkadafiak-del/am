import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Play, Users, Star, Clock, Calendar } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!movie) return <div className="h-screen flex items-center justify-center">Movie not found</div>;

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[60vh]">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex-none">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl border border-slate-800"
            />
          </div>

          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-black">{movie.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>{movie.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.releaseDate).getFullYear() || '2024'}</span>
              </div>
              <div className="flex gap-2">
                {movie.genre.map((g) => (
                  <span key={g} className="px-2 py-1 bg-slate-800 rounded">{g}</span>
                ))}
              </div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to={`/player/${movie._id}`}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-slate-200 transition"
              >
                <Play className="fill-black" /> Watch Now
              </Link>
              <Link
                to={`/player/${movie._id}?party=true`}
                className="flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded font-bold text-lg hover:bg-purple-700 transition shadow-lg shadow-purple-900/20"
              >
                <Users /> Watch Party
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
