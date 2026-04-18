import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-6 px-4 md:px-12 group">
      <h2 className="text-xl md:text-2xl font-bold mb-4 ml-2">{title}</h2>

      <div className="relative flex items-center">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 z-20 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black transition-all"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
        >
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 z-20 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-black transition-all"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
