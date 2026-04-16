import Header from './components/Header';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import ProblemSolution from './components/ProblemSolution';
import Scalability from './components/Scalability';
import Offer from './components/Offer';
import WhyUs from './components/WhyUs';
import HardwareDeepDive from './components/HardwareDeepDive';
import Team from './components/Team';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { useState, useEffect } from 'react';

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname.startsWith('/admin'));

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname.startsWith('/admin'));
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Initialize dyslexic mode preference from localStorage
  useEffect(() => {
    const isDyslexicMode = localStorage.getItem('dyslexic-mode') === 'true';
    if (isDyslexicMode) {
      document.documentElement.classList.add('dyslexic-mode');
    }
  }, []);

  if (isAdminRoute) {
    return <AdminPanel />;
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
        <Scalability />
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
        </div>
      </footer>
    </div>
  );
}

export default App;
