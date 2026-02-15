import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, Maximize2, Camera } from 'lucide-react';

const FullGallery = () => {
  const { t } = useTranslation();
  const [selectedImg, setSelectedImg] = useState(null);
  const [filter, setFilter] = useState('All');

  const galleryImages = [
    // Wildlife Hub
    { src: '/images/projects/wildlifehub/DSC_0003.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_1266.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_1978.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2235.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2283.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2302.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2342.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2414.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2417.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2425.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2435.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_2449.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_3860-2.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_4375-2.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_4591-2.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_4752-2.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_5401.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_6356.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_6518.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_7071.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_7241.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_7640.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_8056.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_8100.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_8248-2.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_9425.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_9759.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_9800-2.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/DSC_9882.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/Ještěrka better.webp', category: 'Wildlife' },
    { src: '/images/projects/wildlifehub/AUTO-1.webp', category: 'Wildlife' },

    // Veronika Kavanova
    { src: '/images/projects/veronika/DSC_0073-2.jpg', category: 'Portraits' },
    { src: '/images/projects/veronika/DSC_0281.jpg', category: 'Portraits' },
    { src: '/images/projects/veronika/DSC_0401.jpg', category: 'Portraits' },
    { src: '/images/projects/veronika/DSC_0472.jpg', category: 'Portraits' },
    { src: '/images/projects/veronika/DSC_0504.jpg', category: 'Portraits' },
    { src: '/images/projects/veronika/DSC_9288.jpg', category: 'Portraits' },
    { src: '/images/projects/veronika/DSC_9892.jpg', category: 'Portraits' },
    { src: '/images/gallery/veronica_rainbow.jpg', category: 'Portraits' },

    // General Library (Excluding Paska)
    { src: '/images/gallery/Angry_cat.webp', category: 'Pets' },
    { src: '/images/gallery/mourek.webp', category: 'Pets' },
    { src: '/images/gallery/mourek2.webp', category: 'Pets' },
    { src: '/images/gallery/Motorka1Vodoznak.webp', category: 'Commercial' },
    { src: '/images/gallery/Motorka3Vodoznak.webp', category: 'Commercial' },
    { src: '/images/gallery/Motorka5Vodoznak.webp', category: 'Commercial' },
    { src: '/images/gallery/Motorka6Vodoznak.webp', category: 'Commercial' },
    { src: '/images/gallery/Motorka7Vodoznak.webp', category: 'Commercial' },
    { src: '/images/gallery/MotorkaDetail3Vodoznak.webp', category: 'Commercial' },
    { src: '/images/gallery/double_vasek.webp', category: 'Lifestyle' },
    { src: '/images/gallery/vasek_sax.webp', category: 'Lifestyle' },
    { src: '/images/gallery/vasek_sax_2.webp', category: 'Lifestyle' },
    { src: '/images/gallery/richasti.webp', category: 'Lifestyle' },
    { src: '/images/gallery/luckajda.webp', category: 'Lifestyle' },
    { src: '/images/gallery/goose.webp', category: 'Wildlife' },
    { src: '/images/gallery/goose1.webp', category: 'Wildlife' },
    { src: '/images/gallery/small_goose.webp', category: 'Wildlife' },
    { src: '/images/gallery/THIS IS MAX.webp', category: 'Pets' }
  ];

  const categories = ['All', 'Wildlife', 'Portraits', 'Commercial', 'Lifestyle', 'Pets'];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Lock body scroll
  React.useEffect(() => {
    if (selectedImg) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImg]);

  return (
    <div className="min-h-screen pb-32 pt-10">
      {/* Header */}
      <section className="container mx-auto px-6 mb-16">
        <Link to="/photography" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group font-bold">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t('projectDetail.back')}
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Archive</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">
            The Full <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Collection</span>
          </h1>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-6 mb-16 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all border ${
                filter === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30'
              }`}
            >
              {cat === 'All' ? t('nav.home').replace('Home', 'All') : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-6">
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImg(img.src)}
                className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-zoom-in border border-white/5 bg-white/5"
              >
                <img 
                  src={img.src} 
                  alt={`Gallery item ${i}`}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="text-white" size={32} />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest text-primary border border-white/10">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out h-screen w-screen"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImg(null);
                }}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[10000] p-2"
              >
                <X size={40} />
              </motion.button>
              
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImg}
                  alt="Gallery Fullscreen"
                  className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default FullGallery;
