import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
  const variants = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-white",
    outline: "border border-slate-600 hover:bg-slate-800 text-slate-300",
    danger: "bg-rose-600 hover:bg-rose-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
