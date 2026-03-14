import './globals.css';

export const metadata = {
  metadataBase: new URL('https://poojawavdara.vercel.app'),
  title: {
    default: 'Pooja Wavdara | Full Stack Developer',
    template: '%s | Pooja Wavdara',
  },
  description: 'Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building elegant digital experiences from India. Open to opportunities.',
  keywords: ['Pooja Wavdara', 'Full Stack Developer', 'React Developer', 'Next.js Developer', 'Node.js Developer', 'Web Developer India', 'JavaScript Developer', 'Frontend Developer', 'Backend Developer', 'Portfolio'],
  authors: [{ name: 'Pooja Wavdara' }],
  creator: 'Pooja Wavdara',
  publisher: 'Pooja Wavdara',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  openGraph: {
    title: 'Pooja Wavdara | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building elegant digital experiences from India.',
    url: 'https://poojawavdara.vercel.app',
    siteName: 'Pooja Wavdara Portfolio',
    locale: 'en_US',
    type: 'website',
    alternateLocale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pooja Wavdara | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB.',
    creator: '@poojawavdara',
    site: '@poojawavdara',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pooja Wavdara',
    jobTitle: 'Full Stack Developer',
    url: 'https://poojawavdara.vercel.app',
    sameAs: [
      'https://github.com/Poojax21',
      'https://www.linkedin.com/in/pooja-wavdara',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    nationality: {
      '@type': 'Country',
      name: 'India',
    },
    knowsAbout: [
      'React',
      'Next.js',
      'Node.js',
      'MongoDB',
      'TypeScript',
      'JavaScript',
      'Full Stack Development',
      'Web Development',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {/* Grain overlay for premium texture */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
