import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Establecer modo oscuro por defecto al cargar
    document.documentElement.classList.add('dark');

    // Detectar scroll para aumentar opacidad del header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Solutions', href: '#offer' },
    { name: 'Hardware', href: '#hardware' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'glass-header-scrolled' : 'glass-header'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center space-x-1">
          <span className="text-xl md:text-2xl font-heading font-light text-[var(--text-primary)]">QUBE</span>
          <span className="text-xl md:text-2xl font-heading font-bold text-gradient">CORE</span>
        </a>

        {/* Navigation Links - Responsive */}
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full glass-card hover:glow transition-all"
          aria-label="Toggle theme"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDark ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Sun size={20} className="text-[var(--accent-cyan)]" />
            ) : (
              <Moon size={20} className="text-[var(--accent-cyan)]" />
            )}
          </motion.div>
        </button>
      </nav>
    </motion.header>
  );
};

export default Header;
