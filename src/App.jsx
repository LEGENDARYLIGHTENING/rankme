import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

/* Pages */
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Certifications from './pages/Certifications';
import Process from './pages/Process';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FreeAudit from './pages/FreeAudit';
import Contact from './pages/Contact';
import Philosophy from './pages/Philosophy';
import ThankYou from './pages/ThankYou';

/* Niche Template */
import NichePage from './pages/NichePage';

/* Niche Data */
import { nicheData } from './data/nicheData';

import { Helmet } from 'react-helmet-async';
import './App.css';

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.rankursite.com/#organization",
      "name": "Rankur",
      "url": "https://www.rankursite.com",
      "logo": "https://www.rankursite.com/Copilot_20260621_183745.png",
      "sameAs": [
        "https://www.linkedin.com/company/moksh-productions"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.rankursite.com/#service",
      "name": "Rankur | B2B Growth Infrastructure Studio",
      "url": "https://www.rankursite.com",
      "parentOrganization": {
        "@id": "https://www.rankursite.com/#organization"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.rankursite.com/#founder",
      "name": "Moksh Parjapati",
      "jobTitle": "Founder, Rankur",
      "url": "https://www.rankursite.com/about",
      "sameAs": [
        "https://linkedin.com/in/moksh-parjapati"
      ],
      "worksFor": {
        "@id": "https://www.rankursite.com/#organization"
      }
    }
  ]
};

function App() {
  const location = useLocation();
  const canonicalUrl = `https://www.rankursite.com${location.pathname === '/' ? '' : location.pathname}`;

  return (
    <div className="app-container">
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(globalSchema)}
        </script>
      </Helmet>
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
