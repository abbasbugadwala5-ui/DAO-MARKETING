'use client';
// src/components/portal/ui/Input.jsx

import { forwardRef } from 'react';

const base = 'w-full rounded-md bg-[#0A0A0B] border border-[#27272A] px-3 text-[14px] text-[#FAFAFA] placeholder:text-[#71717A] transition-colors focus:border-[#D4B27A] focus:outline-none disabled:opacity-50';

export const Input = forwardRef(function Input({ className = '', ...props }, ref) {
  return <input ref={ref} className={`${base} h-9 ${className}`} {...props} />;
});

export const Textarea = forwardRef(function Textarea({ className = '', rows = 4, ...props }, ref) {
  return <textarea ref={ref} rows={rows} className={`${base} py-2 leading-relaxed resize-y ${className}`} {...props} />;
});

export const Select = forwardRef(function Select({ className = '', children, ...props }, ref) {
  return (
    <select ref={ref} className={`${base} h-9 cursor-pointer ${className}`} {...props}>
      {children}
    </select>
  );
});

export const Label = ({ children, className = '', ...props }) => (
  <label className={`block text-[11px] font-medium uppercase tracking-[0.18em] text-[#A1A1AA] mb-1.5 ${className}`} {...props}>
    {children}
  </label>
);
