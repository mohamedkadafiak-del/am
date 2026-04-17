import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { LogIn } from 'lucide-react';

const Login = ({ role = 'user' }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const endpoint = role === 'admin' ? '/api/auth/admin/login' : `/api/auth/${role}/login`;
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      login(response.data);
      navigate(role === 'admin' ? '/admin-dashboard' : role === 'driver' ? '/driver-dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="bg-red-500/10 p-4 rounded-full text-red-500">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold capitalize">{role} Login</h1>
          <p className="text-slate-400">Welcome back to LifeLine</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            register={register}
            errors={errors}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            register={register}
            errors={errors}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {role !== 'admin' && (
          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{' '}
            <Link to={`/register?role=${role}`} className="text-red-500 hover:underline">
              Register here
            </Link>
          </p>
        )}
      </GlassCard>
    </div>
  );
};

export default Login;
