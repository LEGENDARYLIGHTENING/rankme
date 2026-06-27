import { Routes, Route } from 'react-router-dom';
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
  return (
    <div className="app-container">
      <Helmet>
        <link rel="canonical" href="https://rankursite.com" />
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
