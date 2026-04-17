import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'user';
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${role}/register`, data);
      login(response.data);
      navigate(role === 'driver' ? '/driver-dashboard' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <GlassCard className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="bg-red-500/10 p-4 rounded-full text-red-500">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold capitalize">{role} Registration</h1>
          <p className="text-slate-400">Join the LifeLine network</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" name="name" placeholder="John Doe" register={register} errors={errors} />
          <Input label="Email Address" name="email" type="email" placeholder="john@example.com" register={register} errors={errors} />
          <Input label="Phone Number" name="phone" placeholder="+1 (555) 000-0000" register={register} errors={errors} />
          <Input label="Password" name="password" type="password" placeholder="••••••••" register={register} errors={errors} />

          {role === 'driver' && (
            <>
              <Input label="License Number" name="licenseNumber" placeholder="ABC12345" register={register} errors={errors} />
              <Input label="Vehicle Number" name="vehicleNumber" placeholder="XYZ-9876" register={register} errors={errors} />
            </>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full mt-4">
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?{' '}
          <Link to={`/login?role=${role}`} className="text-red-500 hover:underline">
            Login here
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Register;
