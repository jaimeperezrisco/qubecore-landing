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
import { useState, useEffect } from 'react';

const STORAGE_KEYS = {
  theme: 'qubecore-theme',
  colorMode: 'qubecore-color-mode',
};

function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(window.location.pathname.startsWith('/admin'));
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);
    return savedTheme ? savedTheme === 'dark' : true;
  });
  const [isColorblindMode, setIsColorblindMode] = useState(() => {
    return window.localStorage.getItem(STORAGE_KEYS.colorMode) === 'colorblind';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname.startsWith('/admin'));
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    window.localStorage.setItem(STORAGE_KEYS.theme, isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dataset.colorMode = isColorblindMode ? 'colorblind' : 'default';
    window.localStorage.setItem(
      STORAGE_KEYS.colorMode,
      isColorblindMode ? 'colorblind' : 'default'
    );
  }, [isColorblindMode]);

  if (isAdminRoute) {
    return <AdminPanel />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Particles Background - Fixed across all sections */}
      <ParticlesBackground />
      
      {/* Header - Fixed navigation */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((current) => !current)}
        isColorblindMode={isColorblindMode}
        onToggleColorblindMode={() => setIsColorblindMode((current) => !current)}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <ProblemSolution />
        <Offer />
        <WhyUs />
        <HardwareDeepDive />
        <Team isColorblindMode={isColorblindMode} />
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
