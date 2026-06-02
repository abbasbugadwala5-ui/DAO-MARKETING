import CinematicHero from '@/components/home/CinematicHero';
import ApproachCircle from '@/components/home/ApproachCircle';
import WorkShowcase from '@/components/home/WorkShowcase';
import VideoChapter from '@/components/home/VideoChapter';

import Services from '@/components/Services';
import Cases from '@/components/Cases';

import CircleSeal from '@/components/CircleSeal';
import DAOMethod from '@/components/DAOMethod';
import WhatHappensNext from '@/components/home/WhatHappensNext';

import About from './about/page';

export default function HomePage() {
  return (
    <>
      {/* ── CHAPTER 01 — HOME ────────────────────────── */}
      <section id="home">
        <CinematicHero />
        <VideoChapter />
        <DAOMethod />
        <ApproachCircle />
        <WorkShowcase />
      </section>

      {/* ── SEAL → ABOUT ─────────────────────────────── */}
      <CircleSeal label="A young agency · with senior taste" center="I" />
      <section id="about">
        <About showDAO={false} />
      </section>

      {/* ── SEAL → SERVICES ──────────────────────────── */}
      <section id="services">
        <CircleSeal label="Brand · Web · Film · Strategy" center="II" />
        <Services />
        <Cases />
      </section>

      {/* ── SEAL → PROCESS + CTA ─────────────────────── */}
      <section id="contact">
        <CircleSeal label="Reply · Discovery · Proposal" center="III" />
        <WhatHappensNext />
      </section>

    </>
  );
}
