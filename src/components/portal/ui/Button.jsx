'use client';
// src/components/portal/ui/Button.jsx

import { forwardRef } from 'react';

const base = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 ease-out disabled:opacity-40 disabled:cursor-not-allowed select-none whitespace-nowrap';

const sizes = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-9 px-4 text-[14px]',
  lg: 'h-10 px-5 text-[14px]',
};

const variants = {
  primary: 'bg-[#D4B27A] text-[#0A0A0B] hover:bg-[#E5BB5C]',
  secondary: 'border border-[#27272A] text-[#FAFAFA] bg-transparent hover:bg-[#1C1C20] hover:border-[#3F3F46]',
  ghost: 'text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#1C1C20]',
  danger: 'border border-[#27272A] text-[#EF4444] bg-transparent hover:bg-[#EF4444]/10 hover:border-[#EF4444]/40',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
