import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Youtube, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Links = () => {
  const { t } = useTranslation();

  const links = [
    { name: t('nav.home'), url: "/", icon: <Globe size={20} /> },
    { name: t('nav.photography'), url: "/photography", icon: <Globe size={20} /> },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/filip-ln%C4%9Bni%C4%8Dka-724a0127b/", icon: <Linkedin size={20} /> },
    { name: "Instagram", url: "https://www.instagram.com/filiplnenicka/", icon: <Instagram size={20} /> },
    { name: "YouTube", url: "https://www.youtube.com/@filiplnenicka", icon: <Youtube size={20} /> },
    { name: t('nav.contact'), url: "/contact", icon: <Mail size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 text-center mb-8"
      >
        <img src="/images/profile.jpg" alt="Filip Lněnička" className="w-24 h-24 rounded-full border-4 border-white/10 mx-auto mb-4 object-cover" />
        <h1 className="text-2xl font-bold">Filip Lněnička</h1>
        <p className="text-gray-400">Digital Creator & Developer</p>
      </motion.div>

      <div className="w-full max-w-md z-10 space-y-4">
        {links.map((link, i) => {
          const isInternal = link.url.startsWith('/');
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl backdrop-blur-sm transition-all hover:scale-105"
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </motion.div>
          );

          return isInternal ? (
            <Link to={link.url} key={i} className="block">
              {content}
            </Link>
          ) : (
            <a href={link.url} key={i} target="_blank" rel="noopener noreferrer" className="block">
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Links;
