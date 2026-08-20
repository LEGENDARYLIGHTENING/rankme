import { usePathname } from 'next/navigation';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

/* Pages */
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const About = lazy(() => import('./pages/About'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Process = lazy(() => import('./pages/Process'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FreeAudit = lazy(() => import('./pages/FreeAudit'));
const Contact = lazy(() => import('./pages/Contact'));
const Philosophy = lazy(() => import('./pages/Philosophy'));
const ThankYou = lazy(() => import('./pages/ThankYou'));

/* Niche Template */
const NichePage = lazy(() => import('./pages/NichePage'));

/* 404 Page */
const NotFound = lazy(() => import('./pages/NotFound'));

/* Niche Data */
import { nicheData } from './data/nicheData';
import { cityData } from './data/cityData';
import { countryData } from './data/countryData';


import './App.css';

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rankursite.com/#organization",
      "name": "Rankur",
      "url": "https://rankursite.com",
      "logo": "https://rankursite.com/Copilot_20260621_183745.png",
      "sameAs": [
        "https://www.linkedin.com/company/moksh-productions"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://rankursite.com/#service",
      "name": "Rankur | B2B Growth Infrastructure Studio",
      "url": "https://rankursite.com",
      "parentOrganization": {
        "@id": "https://rankursite.com/#organization"
      }
    },
    {
      "@type": "Person",
      "@id": "https://rankursite.com/#founder",
      "name": "Moksh Parjapati",
      "jobTitle": "Founder, Rankur",
      "url": "https://rankursite.com/about",
      "sameAs": [
        "https://linkedin.com/in/moksh-parjapati"
      ],
      "worksFor": {
        "@id": "https://rankursite.com/#organization"
      }
    }
  ]
};

function App() {
  const location = usePathname();
  const actualPath = pathname === '/home' ? '/' : pathname;
  const canonicalUrl = `https://rankursite.com${actualPath === '/' ? '/' : actualPath}`;

  return (
    <div className="app-container">
      
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Suspense fallback={<div className="section container text-center" style={{ padding: '100px 0' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/process" element={<Process />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/free-audit" element={<FreeAudit />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          
          {/* Niche Routes */}
          {Object.keys(nicheData).map((key) => (
            <Route 
              key={key} 
              path={nicheData[key].path} 
              element={<NichePage {...nicheData[key].props} />} 
            />
          ))}

          {/* Programmatic SEO Hubs (Cities & Countries) */}
          {[...Object.values(cityData), ...Object.values(countryData)].map((region, idx) => (
            <Route key={`region-${idx}`} path={region.path}>
              <Route index element={<NichePage {...region.props} />} />
              <Route path="services" element={<Services />} />
              <Route path="case-studies" element={<CaseStudies />} />
              <Route path="about" element={<About />} />
              <Route path="philosophy" element={<Philosophy />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="process" element={<Process />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="free-audit" element={<FreeAudit />} />
              <Route path="contact" element={<Contact />} />
              <Route path="thank-you" element={<ThankYou />} />
            </Route>
          ))}

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
