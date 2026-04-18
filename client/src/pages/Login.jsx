import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Film, LogIn } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/auth/login', data);
      login(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-slate-900 p-10 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-xl mb-2">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400">Stream your favorite content on CineStream AI</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition text-white"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition text-white"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? "Signing in..." : <><LogIn className="w-5 h-5" /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-500 hover:underline font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
