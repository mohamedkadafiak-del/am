import React from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-white">{movie.title}</h1>
        <p className="text-lg text-slate-300 line-clamp-3 md:line-clamp-none">
          {movie.description}
        </p>

        <div className="flex gap-4 pt-4">
          <Link
            to={`/movie/${movie._id}`}
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold text-lg hover:bg-slate-200 transition"
          >
            <Play className="fill-black" /> Play Now
          </Link>
          <Link
            to={`/movie/${movie._id}`}
            className="flex items-center gap-2 bg-slate-600/50 text-white px-8 py-3 rounded font-bold text-lg hover:bg-slate-600/80 transition backdrop-blur-sm"
          >
            <Info /> More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
