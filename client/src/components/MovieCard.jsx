import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="relative flex-none w-48 md:w-64 h-72 md:h-96 group overflow-hidden rounded-lg bg-slate-900 shadow-xl transition-all duration-300 hover:scale-105 hover:z-10">
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-lg font-bold truncate">{movie.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-300">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span>{movie.rating}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <Link
              to={`/movie/${movie._id}`}
              className="flex-1 flex items-center justify-center gap-1 bg-white text-black py-2 rounded font-semibold text-sm hover:bg-slate-200 transition"
            >
              <Play className="w-4 h-4 fill-black" /> Play
            </Link>
            <Link
              to={`/movie/${movie._id}`}
              className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition"
            >
              <Info className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
