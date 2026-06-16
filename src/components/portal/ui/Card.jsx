'use client';
// src/components/portal/ui/Card.jsx

export default function Card({
  children,
  hover = false,
  padded = true,
  className = '',
  as: Tag = 'div',
  ...props
}) {
  const base = 'rounded-lg bg-[#131316] border border-[#27272A] transition-colors duration-200';
  const hoverStyles = hover ? 'hover:border-[#3F3F46] hover:bg-[#1C1C20] cursor-pointer' : '';
  const padding = padded ? 'p-5 md:p-6' : '';

  return (
    <Tag className={`${base} ${hoverStyles} ${padding} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
