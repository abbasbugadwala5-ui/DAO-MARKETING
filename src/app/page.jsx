import CinematicHero from '@/components/home/CinematicHero';
import ApproachCircle from '@/components/home/ApproachCircle';
import WorkShowcase from '@/components/home/WorkShowcase';
import VideoChapter from '@/components/home/VideoChapter';
import EditorialCTA from '@/components/home/EditorialCTA';
import FloatingWork from '@/components/home/FloatingWork';

export default function HomePage() {
  return (
    <main>
      <CinematicHero />
      <VideoChapter />
      <ApproachCircle />
      <WorkShowcase />
     
      <EditorialCTA />
      <FloatingWork />
    </main>
  );
}