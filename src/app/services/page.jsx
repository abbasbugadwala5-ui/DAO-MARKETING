import HashScroll from '@/components/HashScroll';
import Hero from '@/components/Hero';
import ServicesRibbon from '@/components/ServicesRibbon';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';

export default function ServicesPage() {
  return (
    <main>
      <HashScroll />
      <Hero /><ServicesRibbon /><Services /><Cases /><Process /><Testimonials />
    </main>
  );
}
