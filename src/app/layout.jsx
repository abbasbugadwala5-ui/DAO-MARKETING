import '@/styles/globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';

export const metadata = {
  title: 'DAO Studio — Luxury Digital Agency',
  description: 'DAO Studio is a Dubai-based digital agency crafting brand, product and commerce experiences.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;0,600;0,700;0,800;0,900;1,600&family=Playfair+Display:wght@500;600;700&family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <ScrollIndicator />
        </SmoothScroll>
      </body>
    </html>
  );
}
