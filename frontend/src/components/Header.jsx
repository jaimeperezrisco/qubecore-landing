import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Lock, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSinFondo from '../assets/logos/logo-sf.png';

const Header = ({
  isDark,
  onToggleTheme,
  isColorblindMode,
  onToggleColorblindMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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
        <a href="#hero" className="flex items-center">
          <img
            src={logoSinFondo}
            alt="QubeCore"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
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

          <button
            onClick={onToggleColorblindMode}
            className={`p-2 rounded-full glass-card transition-all ${
              isColorblindMode ? 'glow' : 'hover:glow'
            }`}
            aria-label="Toggle colorblind-friendly palette"
            aria-pressed={isColorblindMode}
            title={isColorblindMode ? 'Colorblind mode enabled' : 'Enable colorblind mode'}
          >
            <Eye size={20} className="text-[var(--accent-magenta)]" />
          </button>

          {/* Admin Login */}
          <a
            href="/admin"
            className="p-2 rounded-full glass-card hover:glow transition-all"
            aria-label="Admin Login"
          >
            <Lock size={20} className="text-[var(--accent-gold)]" />
          </a>

          {/* Hamburger Menu - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full glass-card hover:glow transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-[var(--accent-cyan)]" />
            ) : (
              <Menu size={20} className="text-[var(--accent-cyan)]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-header"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
