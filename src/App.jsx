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

/* Niche Template */
import NichePage from './pages/NichePage';

/* Niche Data */
import { nicheData } from './data/nicheData';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
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
