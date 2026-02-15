import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { projects } from '../data/projects';

const photos = [
  'Angry_cat.webp',
  'bird.webp',
  'double_vasek.webp',
  'goose.webp',
  'goose1.webp',
  'luckajda.webp',
  'mourek.webp',
  'mourek2.webp',
  'Motorka1Vodoznak.webp',
  'Motorka3Vodoznak.webp',
  'Motorka5Vodoznak.webp',
  'Motorka6Vodoznak.webp',
  'Motorka7Vodoznak.webp',
  'MotorkaDetail3Vodoznak.webp',
  'richasti.webp',
  'small_goose.webp',
  'THIS IS MAX.webp',
  'vasek_sax_2.webp',
  'vasek_sax.webp',
  'veronica.webp'
];

const GearItem = ({ gear, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
  >
    {/* Levitating Image */}
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 2, 0, -2, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5
      }}
      className="flex-1 flex justify-center relative group/gear"
    >
      <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full opacity-30 group-hover/gear:opacity-50 transition-opacity" />
      <div className="relative z-10 w-full max-w-sm flex items-center justify-center">
        <img 
          src={gear.image} 
          alt={gear.name} 
          className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover/gear:scale-110" 
        />
      </div>
    </motion.div>

    <div className="flex-1 space-y-6 text-center md:text-left">
      <span className="text-sm font-bold uppercase tracking-[0.3em] text-primary">{gear.type}</span>
      <h4 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">{gear.name}</h4>
      <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
        {gear.desc}
      </p>
      <div className="pt-4 flex justify-center md:justify-start">
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full" />
      </div>
    </div>
  </motion.div>
);

const Photography = () => {
  const { t } = useTranslation();

  const photographyGear = [
    {
      name: "Nikon D7500",
      type: "Photography Body",
      desc: "A reliable powerhouse for nature and wildlife photography. Excellent performance in challenging environments.",
      image: "/images/gear/D7500.png"
    },
    {
      name: "Nikkor 70-200mm f/2.8",
      type: "Telephoto Lens",
      desc: "Essential for wildlife. It allows me to stay at a distance while capturing sharp, intimate moments with beautiful compression.",
      image: "/images/gear/70-200mm.png"
    },
    {
      name: "50mm f/1.8 Prime",
      type: "Portrait Lens",
      desc: "The go-to for portraits and product shots. Razor-sharp focus with a shallow depth of field for that professional look.",
      image: "/images/gear/50mm.png"
    }
  ];

  const videographyGear = [
    {
      name: "Sony FX30",
      type: "Cinema Line Body",
      desc: "My primary tool for high-end video production. Professional color science and incredible 4K detail for cinematic storytelling.",
      image: "/images/gear/FX30.png"
    },
    {
      name: "11mm Ultra-Wide",
      type: "Landscape & Video Lens",
      desc: "Capturing the full scale of the world. Perfect for dramatic landscapes and unique architectural perspectives in video.",
      image: "/images/gear/11mm.png"
    },
    {
      name: "18-105mm Zoom",
      type: "Versatile Video Lens",
      desc: "The perfect all-rounder for travel and fast-paced events where swapping lenses isn't an option.",
      image: "/images/gear/18-105mm.png"
    },
    {
      name: "Professional Gimbal",
      type: "Stabilization",
      desc: "Ensuring every cinematic shot is buttery smooth. Crucial for dynamic movement and professional video delivery.",
      image: "/images/gear/Gimbal.png"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <Helmet>
        <title>Photography | Filip Lněnička</title>
        <meta name="description" content="Explore the visual archive of Filip Lněnička. Professional wildlife, portrait, and commercial photography." />
      </Helmet>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t('photography.heroTag')}</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">
            {t('photography.heroTitle1')} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('photography.heroTitle2')}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            {t('photography.heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#gallery" className="px-8 py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
              {t('photography.cta1')} <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
            </a>
            <a href="#arsenal" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-bold">
              {t('photography.cta2')}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Photography Projects Section */}
      <section className="container mx-auto px-6 py-20 border-t border-white/5">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">{t('photography.worksTitle')}</h2>
          <p className="text-gray-400 mt-2">{t('photography.worksSubtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.filter(p => p.category === "Photography").map((project, i) => (
            <Link to={`/project/${project.id}`} key={i} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-80 rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">{t('works.portfolio')}</div>
                  <h4 className="text-2xl font-bold mb-2 text-white">{t(`projectData.${project.id}.title`)}</h4>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-colors">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <div id="gallery" className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">{t('photography.galleryTitle')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            {t('photography.gallerySubtitle')}
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="break-inside-avoid relative group overflow-hidden rounded-xl"
          >
            <img 
              src={`/images/gallery/${photo}`} 
              alt={`Gallery ${index}`} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </motion.div>
        ))}
        </div>

        <div className="mt-20 text-center">
          <Link 
            to="/gallery" 
            className="inline-flex items-center gap-3 px-10 py-5 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all font-black uppercase tracking-widest group"
          >
            Load More <Camera size={20} className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Gear Section */}
      <div id="arsenal" className="mt-32 pb-20 pt-20 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t('photography.kitTag')}</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">{t('photography.kitTitle')}</h2>
          <p className="text-gray-400">{t('photography.kitSubtitle')}</p>
        </motion.div>

        {/* For Photography Subcategory */}
        <div className="mb-40">
          <div className="flex items-center gap-8 mb-20">
            <h3 className="text-2xl font-bold uppercase tracking-[0.4em] whitespace-nowrap text-white/50">{t('photography.photography')}</h3>
            <div className="h-px w-full bg-white/10" />
          </div>
          <div className="max-w-6xl mx-auto space-y-32">
            {photographyGear.map((gear, i) => (
              <GearItem key={gear.name} gear={gear} i={i} />
            ))}
          </div>
        </div>

        {/* For Videography Subcategory */}
        <div>
          <div className="flex items-center gap-8 mb-20">
            <h3 className="text-2xl font-bold uppercase tracking-[0.4em] whitespace-nowrap text-white/50">{t('photography.videography')}</h3>
            <div className="h-px w-full bg-white/10" />
          </div>
          <div className="max-w-6xl mx-auto space-y-32">
            {videographyGear.map((gear, i) => (
              <GearItem key={gear.name} gear={gear} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photography;
