export const metadata = {
  title: 'About — The Studio Behind DAO',
  description:
    'DAO Marketing is a Dubai-based studio of strategists, designers, developers and storytellers. We define brands, amplify their reach and help them own their category.',
  keywords: [
    'about DAO Marketing',
    'Dubai marketing studio',
    'luxury digital agency team',
    'creative agency Dubai',
    'brand strategy team Dubai',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — DAO Marketing',
    description:
      'A Dubai studio of strategists, designers, developers and storytellers. Define. Amplify. Own.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — DAO Marketing',
    description:
      'A Dubai studio of strategists, designers, developers and storytellers.',
  },
};

export default function AboutLayout({ children }) {
  return children;
}
