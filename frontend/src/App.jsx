import Header from './components/Header';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Offer from './components/Offer';
import WhyUs from './components/WhyUs';
import HardwareDeepDive from './components/HardwareDeepDive';
import Team from './components/Team';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Legal from './components/Legal';
import CookieBanner from './components/CookieBanner';
import { useState, useEffect } from 'react';

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  if (route.startsWith('/admin')) {
    return <AdminPanel />;
  }

  if (route.startsWith('/legal')) {
    return (
      <div className="min-h-screen">
        <ParticlesBackground />
        <Header />
        <div className="pt-16 md:pt-20">
          <Legal />
        </div>
        <CookieBanner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Particles Background - Fixed across all sections */}
      <ParticlesBackground />
      
      {/* Header - Fixed navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <ProblemSolution />
        <Offer />
        <WhyUs />
        <HardwareDeepDive />
        <Team />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            © 2026 QubeCore. Democratizing quantum computing for the enterprise.
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Made with quantum precision
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            <a href="/legal" className="hover:text-[var(--accent-cyan)]">Legal Notices</a> | 
            <a href="/legal" className="hover:text-[var(--accent-cyan)] ml-2">Privacy Policy</a> | 
            <a href="/legal" className="hover:text-[var(--accent-cyan)] ml-2">Cookie Policy</a>
          </p>
        </div>
      </footer>

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;
