import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { getSiteSettings } from '../utils/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getSiteSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  const navItems = settings?.navItems?.sort((a, b) => a.order - b.order) || [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Get a Quote', href: '/quote' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${isScrolled ? 'pt-2' : 'pt-2'}`}>
      <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-full border ${isScrolled
        ? 'bg-matteBlack/90 backdrop-blur-lg shadow-[0_0_30px_rgba(0,255,128,0.3)] border-neonAqua/50 py-0'
        : 'bg-transparent border-transparent py-2'
        }`}>
        <div className="flex justify-between items-center h-16 md:h-20 px-4 md:px-8">
          {/* Logo - Far Left */}
          <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="DeployPrime" className="h-20 md:h-24 max-h-24 object-contain" />
              ) : (
                <span className="text-xl md:text-2xl font-bold text-primary drop-shadow-lg">DeployPrime</span>
              )}
            </motion.div>
          </Link>

          {/* Desktop Menu - Far Right */}
          <div className="hidden md:flex items-center space-x-6 transition-all duration-500">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
              >
                <Link
                  to={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-primary ${location.pathname === item.href
                    ? 'text-primary'
                    : 'text-white/80'
                    }`}
                >
                  {item.label}
                  {location.pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#bf00ff]"></span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary p-2 hover:bg-white/5 rounded-full transition-colors z-50 relative"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay & Content */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden h-screen"
              />

              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mx-4 mt-2 md:hidden border border-primary/20 bg-matteBlack/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl z-50"
              >
                <div className="px-4 py-6 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${location.pathname === item.href
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-white hover:text-primary hover:bg-white/5'
                        }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
