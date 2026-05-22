'use client';
import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setAtTop(scrollTop < 32);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const label = atTop ? 'Scroll' : `${Math.round(progress)}%`;

  return (
    <div className="scroll-ind" aria-hidden>
      <div className="scroll-ind-label">{label}</div>
      <div className="scroll-ind-track">
        <span
          className="scroll-ind-fill"
          style={{ height: `${progress}%` }}
        />
        <span
          className="scroll-ind-dot"
          style={{ top: `calc(${progress}% - 4px)` }}
        />
      </div>
      <div className="scroll-ind-tick">↓</div>
    </div>
  );
}
