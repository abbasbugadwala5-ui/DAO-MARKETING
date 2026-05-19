'use client';
import Link from 'next/link';

export default function FloatingWork() {
  return (
    <Link href="/services" className="float-work">
      View work <span aria-hidden>↗</span>
    </Link>
  );
}