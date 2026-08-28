import '../src/styles/global.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'B2B Web Design & Lead Generation for Founders | Rankur',
  description: 'I build fast, custom B2B websites that rank on Google and turn visitors into leads - most live in about 7 days, backed by a 100% money-back guarantee.',
  openGraph: {
    title: 'B2B Web Design & Lead Generation for Founders | Rankur',
    url: 'https://rankursite.com',
    siteName: 'Rankur',
    images: [
      {
        url: 'https://rankursite.com/og-image.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@moksh_rankur',
    images: ['https://rankursite.com/twitter-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/Copilot_20260621_183745.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L49CTLKWYS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){ dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', 'G-L49CTLKWYS');
            `,
          }}
        />
      </head>
      <body>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
        <script src="https://assets.calendly.com/assets/external/widget.js" async></script>
      </body>
    </html>
  );
}
