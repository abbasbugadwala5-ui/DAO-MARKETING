import CinematicHero from '@/components/home/CinematicHero';
import LogoMarquee from '@/components/home/LogoMarquee';
import ApproachCircle from '@/components/home/ApproachCircle';
import VideoChapter from '@/components/home/VideoChapter';
import EditorialCTA from '@/components/home/EditorialCTA';
import FloatingWork from '@/components/home/FloatingWork';

export default function HomePage() {
  return (
    <main>
      <CinematicHero />
      <LogoMarquee />
      <ApproachCircle />
      <VideoChapter />
      <EditorialCTA />
      <FloatingWork />
    </main>
  );
}