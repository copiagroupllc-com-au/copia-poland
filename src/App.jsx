import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home       from "./pages/Home";
import About      from "./pages/About";
import Services   from "./pages/Services";
import Team       from "./pages/Team";
import Insight    from "./pages/Insight";
import Blog       from "./pages/Blog";
import BlogPost   from "./pages/BlogPost";
import Career     from "./pages/Career";
import Apply      from "./pages/Apply";
import Contact    from "./pages/Contact";
import NotFound   from "./pages/NotFound";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/services"    element={<Services />} />
          <Route path="/team"        element={<Team />} />
          <Route path="/insight"     element={<Insight />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/blog/:slug"  element={<BlogPost />} />
          <Route path="/career"      element={<Career />} />
          <Route path="/apply/:role" element={<Apply />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
