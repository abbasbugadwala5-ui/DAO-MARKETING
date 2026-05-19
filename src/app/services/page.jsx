import HashScroll from '@/components/HashScroll';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Cases from '@/components/Cases';
import BentoGrid from '@/components/BentoGrid';
import Testimonials from '@/components/Testimonials';

export default function ServicesPage() {
  return (
    <main>
      <HashScroll />
      <Hero /><Services /><Cases /><BentoGrid /><Testimonials />
    </main>
  );
}
