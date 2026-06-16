'use client';
// src/components/portal/ui/Logo.jsx

import Image from 'next/image';

export function LogoMark({ size = 32, className = '' }) {
  return (
    <Image
      src="/logo/logo-mark.svg"
      alt="DAO"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function LogoFull({ height = 28, className = '' }) {
  return (
    <Image
      src="/logo/logo.svg"
      alt="DAO Marketing"
      width={height * 3}
      height={height}
      className={className}
      style={{ height: `${height}px`, width: 'auto' }}
      priority
    />
  );
}
