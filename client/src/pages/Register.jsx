import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import Input from '../components/Input';
import Button from '../components/Button';
import { UserPlus, Plus, Trash2 } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'user';
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      emergencyContacts: [{ name: '', phone: '', relationship: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts"
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/register`, { ...data, role });
      login(response.data);
      if (role === 'guardian') navigate('/guardian-dashboard');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 mt-10">
      <GlassCard className="w-full max-w-lg">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="bg-pink-500/10 p-4 rounded-full text-pink-500">
            <UserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold capitalize">{role} Registration</h1>
          <p className="text-slate-400">Join the She Shield AI network</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Full Name" name="name" placeholder="Jane Doe" register={register} errors={errors} />
          <Input label="Email Address" name="email" type="email" placeholder="jane@example.com" register={register} errors={errors} />
          <Input label="Phone Number" name="phone" placeholder="+1 (555) 000-0000" register={register} errors={errors} />
          <Input label="Password" name="password" type="password" placeholder="••••••••" register={register} errors={errors} />

          {role === 'user' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-slate-300">Emergency Contacts</h3>
                <button
                  type="button"
                  onClick={() => append({ name: '', phone: '', relationship: '' })}
                  className="text-pink-500 text-xs flex items-center gap-1"
                >
                  <Plus size={14} /> Add Contact
                </button>
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="p-3 border border-slate-700 rounded-lg space-y-2 relative">
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <Input
                    label="Name"
                    name={`emergencyContacts.${index}.name`}
                    placeholder="Contact Name"
                    register={register}
                    errors={errors}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Phone"
                      name={`emergencyContacts.${index}.phone`}
                      placeholder="Phone"
                      register={register}
                      errors={errors}
                    />
                    <Input
                      label="Relationship"
                      name={`emergencyContacts.${index}.relationship`}
                      placeholder="Relationship"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full mt-4 bg-pink-600 hover:bg-pink-700">
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?{' '}
          <Link to={`/login?role=${role}`} className="text-pink-500 hover:underline">
            Login here
          </Link>
        </p>
      </GlassCard>
    </div>
  );
};

export default Register;
