import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent text-white px-6 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-2xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="mb-2">
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none leading-none py-4">
              404
            </h1>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-[0.2em] text-primary">
            {t('error404.title')}
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg mb-12 max-w-sm mx-auto leading-relaxed">
            {t('error404.desc')}
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all shadow-2xl uppercase text-xs tracking-widest"
            >
              <Home size={18} /> {t('error404.btn')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles or accents */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] text-primary opacity-10 pointer-events-none"
      >
        <ArrowLeft size={80} className="-rotate-45" />
      </motion.div>
    </div>
  );
};

export default NotFound;
