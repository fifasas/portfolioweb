import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Camera, Brain, Send, Home, Megaphone, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = async (lng) => {
    if (i18n.language === lng) {
      setIsOpen(false);
      return;
    }

    window.dispatchEvent(new CustomEvent('app-language-switch-start'));
    try {
      await i18n.changeLanguage(lng);
    } finally {
      window.dispatchEvent(new CustomEvent('app-language-switch-finish'));
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: t('nav.home'), path: '/', icon: <Home size={20} /> },
    { name: t('nav.webCreation'), path: '/web-creation', icon: <Code size={20} /> },
    { name: t('nav.marketing'), path: '/marketing', icon: <Megaphone size={20} /> },
    { name: t('nav.photography'), path: '/photography', icon: <Camera size={20} /> },
    { name: t('nav.ai'), path: '/ai', icon: <Brain size={20} /> },
    { name: t('nav.contact'), path: '/contact', icon: <Send size={20} /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 group">
          <img src="/images/logo_white.png" alt="Logo" className="h-24 w-auto group-hover:scale-110 transition-transform duration-300" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="relative group">
              <span className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-primary' : 'text-gray-300 group-hover:text-white'}`}>
                {link.name}
              </span>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-white/10 pl-6 ml-2">
            <button 
              onClick={() => changeLanguage('en')}
              className={`text-xs font-bold transition-colors ${i18n.language === 'en' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
            >
              EN
            </button>
            <span className="text-gray-700 text-xs">/</span>
            <button 
              onClick={() => changeLanguage('cz')}
              className={`text-xs font-bold transition-colors ${i18n.language === 'cz' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
            >
              CZ
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-2 mr-2">
            <button onClick={() => changeLanguage('en')} className={`text-xs font-bold ${i18n.language === 'en' ? 'text-primary' : 'text-gray-500'}`}>EN</button>
            <button onClick={() => changeLanguage('cz')} className={`text-xs font-bold ${i18n.language === 'cz' ? 'text-primary' : 'text-gray-500'}`}>CZ</button>
          </div>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 text-lg font-medium p-2 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-white/10 text-primary' : 'text-gray-300'}`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
