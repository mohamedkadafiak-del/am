import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { Smile, Frown, Zap, Heart, Ghost, Laugh } from 'lucide-react';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [moodMovies, setMoodMovies] = useState([]);
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [loading, setLoading] = useState(true);

  const moods = [
    { name: 'Happy', icon: Smile, color: 'text-yellow-400' },
    { name: 'Sad', icon: Frown, color: 'text-blue-400' },
    { name: 'Action', icon: Zap, color: 'text-red-400' },
    { name: 'Love', icon: Heart, color: 'text-pink-400' },
    { name: 'Thriller', icon: Ghost, color: 'text-purple-400' },
    { name: 'Comedy', icon: Laugh, color: 'text-green-400' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [trendRes, recRes, moodRes] = await Promise.all([
          axios.get('/api/movies/trending', config),
          axios.get('/api/recommendations', config),
          axios.get(`/api/movies/mood/${selectedMood}`, config)
        ]);

        setTrending(trendRes.data);
        setRecommendations(recRes.data);
        setMoodMovies(moodRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedMood]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="pb-20">
      <Hero movie={trending[0]} />

      <div className="mt-8 px-4 md:px-12">
        <h2 className="text-2xl font-bold mb-6">How are you feeling today?</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                selectedMood === mood.name
                  ? 'bg-white text-black border-white'
                  : 'bg-slate-900 text-white border-slate-700 hover:border-white'
              }`}
            >
              <mood.icon className={`w-5 h-5 ${selectedMood === mood.name ? 'text-black' : mood.color}`} />
              <span className="font-semibold">{mood.name}</span>
            </button>
          ))}
        </div>
      </div>

      <MovieRow title={`Because you're feeling ${selectedMood}`} movies={moodMovies} />

      {trending.length > 0 && (
        <MovieRow title="Trending Now" movies={trending} />
      )}

      {recommendations?.forYou?.length > 0 && (
        <MovieRow title="AI Recommendations For You" movies={recommendations.forYou} />
      )}

      {recommendations?.timeBased?.movies?.length > 0 && (
        <MovieRow title={`Night Vibes: ${recommendations.timeBased.mood}`} movies={recommendations.timeBased.movies} />
      )}

      {recommendations?.becauseYouWatched && (
        <MovieRow
          title={`Because you watched ${recommendations.becauseYouWatched.title}`}
          movies={recommendations.becauseYouWatched.movies}
        />
      )}
    </div>
  );
};

export default Home;
