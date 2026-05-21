import CinematicHero from '@/components/home/CinematicHero';
import ApproachCircle from '@/components/home/ApproachCircle';
import WorkShowcase from '@/components/home/WorkShowcase';
import VideoChapter from '@/components/home/VideoChapter';
import FloatingWork from '@/components/home/FloatingWork';

import Services from '@/components/Services';
import Cases from '@/components/Cases';

import OurStorySection from '@/components/home/OurStorySection';
import OurServicesIntro from '@/components/home/OurServicesIntro';
import WhatHappensNext from '@/components/home/WhatHappensNext';

import About from './about/page';

export default function HomePage() {
  return (
    <>
      {/* ── CHAPTER 01 — HOME ────────────────────────── */}
      <section id="home">
        <CinematicHero />
        <VideoChapter />
        <ApproachCircle />
        <WorkShowcase />
      </section>

      {/* ── OUR STORY → ABOUT ────────────────────────── */}
      <OurStorySection />
      <section id="about">
        <About />
      </section>

      {/* ── OUR SERVICES → SERVICES ──────────────────── */}
      <section id="services">
        <OurServicesIntro />
        <Services />
        <Cases />
      </section>

      {/* ── WHAT HAPPENS NEXT + CTA → /contact ─────── */}
      <section id="contact">
        <WhatHappensNext />
      </section>

      <FloatingWork />
    </>
  );
}
