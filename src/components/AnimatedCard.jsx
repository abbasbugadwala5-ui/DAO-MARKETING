'use client';

import { forwardRef } from 'react';

/**
 * One card in the sticky service stack. `i` is the 0-based position —
 * it drives the stacked sticky offset via the --i CSS variable.
 */
const AnimatedCard = forwardRef(function AnimatedCard(
  { i = 0, tag, index, kicker, title, body, bg, light = false, media },
  ref
) {
  return (
    <article
      ref={ref}
      data-stack-card
      className={`svc-card${light ? ' is-light' : ''}`}
      style={{ background: bg, '--i': i }}
    >
      <div className="svc-head">
        <span className="svc-tag">{tag}</span>
        <span className="svc-num">{index}</span>
      </div>

      <div className="svc-body">
        <div className="svc-copy">
          {kicker && <span className="svc-kicker">{kicker}</span>}
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
        <div className="svc-media">{media}</div>
      </div>
    </article>
  );
});

export default AnimatedCard;