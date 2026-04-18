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
      const endpoint = role === 'admin' ? '/api/auth/admin/login' : '/api/auth/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);

      const userData = response.data;
      login(userData);

      if (userData.role === 'admin') navigate('/admin-dashboard');
      else if (userData.role === 'guardian') navigate('/guardian-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <GlassCard className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="bg-pink-500/10 p-4 rounded-full text-pink-500">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold capitalize">{role} Login</h1>
          <p className="text-slate-400">Welcome back to She Shield AI</p>
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

          <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
            Login
          </Button>
        </form>

        {role !== 'admin' && (
          <p className="mt-8 text-center text-slate-400">
            Don't have an account?{' '}
            <Link to={`/register?role=${role}`} className="text-pink-500 hover:underline">
              Register here
            </Link>
          </p>
        )}
      </GlassCard>
    </div>
  );
};

export default Login;
