import React from 'react';

const Input = ({ label, type = "text", placeholder, register, name, errors, ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label htmlFor={name} className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`bg-slate-800/50 border ${errors && errors[name] ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-slate-600`}
        {...props}
      />
      {errors && errors[name] && <span className="text-xs text-red-500 ml-1">{errors[name]?.message}</span>}
    </div>
  );
};

export default Input;
