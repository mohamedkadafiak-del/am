import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { User, Phone, Mail, Shield, ShieldCheck, Settings, Bell, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState(user?.emergencyContacts || []);

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary rounded-full flex items-center justify-center border-4 border-white/10 shadow-2xl relative overflow-hidden group">
                <User size={64} className="text-white" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change</span>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-black font-poppins">{user?.name}</h1>
                <p className="text-slate-500 font-medium">Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1">
                        <ShieldCheck size={12} /> Verified Profile
                    </span>
                    <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-[10px] font-bold uppercase tracking-wider border border-secondary/20">
                        {user?.role}
                    </span>
                </div>
            </div>
        </div>
        <button onClick={logout} className="bg-danger/10 text-danger border border-danger/20 px-8 py-3 rounded-2xl font-bold hover:bg-danger hover:text-white transition-all">
            Log out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Settings Links */}
        <div className="space-y-4">
            <ProfileLink icon={<User />} label="Personal Information" active />
            <ProfileLink icon={<Shield />} label="Security & Privacy" />
            <ProfileLink icon={<Bell />} label="Notifications" />
            <ProfileLink icon={<Settings />} label="Account Settings" />
        </div>

        {/* Center/Right: Details */}
        <div className="lg:col-span-2 space-y-12">
            <section>
                <h3 className="text-2xl font-bold mb-6 font-poppins flex items-center gap-3">
                    <Mail className="text-primary" /> Contact Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoCard label="Email Address" value={user?.email} icon={<Mail />} />
                    <InfoCard label="Phone Number" value={user?.phone} icon={<Phone />} />
                </div>
            </section>

            <section>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold font-poppins flex items-center gap-3">
                        <Shield className="text-secondary" /> Emergency Contacts
                    </h3>
                    <button className="text-secondary flex items-center gap-2 text-sm font-bold hover:underline">
                        <Plus size={16} /> Add New
                    </button>
                </div>
                <div className="space-y-4">
                    {contacts.map((contact, idx) => (
                        <div key={idx} className="glass p-6 rounded-3xl border-white/5 flex justify-between items-center group hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center">
                                    <User size={24} className="text-slate-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{contact.name}</h4>
                                    <p className="text-xs text-slate-500 font-medium italic">{contact.relationship} • {contact.phone}</p>
                                </div>
                            </div>
                            <button className="p-2 text-slate-600 hover:text-danger opacity-0 group-hover:opacity-100 transition-all">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    {contacts.length === 0 && (
                        <p className="text-center py-12 glass rounded-3xl text-slate-500 font-medium italic">No emergency contacts added yet.</p>
                    )}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

const ProfileLink = ({ icon, label, active }) => (
    <button className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
        {React.cloneElement(icon, { size: 20 })}
        <span>{label}</span>
    </button>
);

const InfoCard = ({ label, value, icon }) => (
    <div className="glass p-6 rounded-3xl border-white/5 space-y-1">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
            {React.cloneElement(icon, { size: 12, className: 'text-primary' })}
            {label}
        </p>
        <p className="text-lg font-bold text-white">{value}</p>
    </div>
);

export default Profile;
