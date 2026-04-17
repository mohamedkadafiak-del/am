import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", hover = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" } : {}}
      className={`glass-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
