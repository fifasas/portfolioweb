import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, ExternalLink, Plus, Minus,
  Globe, Code, Brain, Zap, CheckCircle2, TrendingUp, Rocket, Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const CircularGallery = React.lazy(() => import('../components/CircularGallery'));
const MotionCarousel = React.lazy(() => import('../components/MotionCarousel'));
const MagicBento = React.lazy(() => import('../components/MagicBento'));

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-primary transition-colors"
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const projects = [
  { id: "matrace-letovice", title: "Matrace Letovice", category: "Product Catalog", desc: "A custom product catalog for a premium mattress manufacturer.", image: "/images/gallery/MatraceLetoviceMockup-scaled.webp", color: "from-blue-600 to-cyan-400" },
  { id: "jakub-hes", title: "Jakub Hes", category: "Web Creation", desc: "Professional portfolio and branding for a visual artist.", image: "/images/gallery/JakubHesMockUpt-scaled.webp", color: "from-purple-600 to-pink-400" },
  { id: "imphreco", title: "Imphreco", category: "Web Creation", desc: "Innovative digital branding and interface design.", image: "/images/projects/imphreco/logo.png", isLogo: true, color: "from-emerald-600 to-teal-400" },
  { id: "veronika-kavanova", title: "Veronika Kavanová", category: "Photography", desc: "Professional portrait and action capture.", image: "/images/gallery/veronica.webp", color: "from-yellow-600 to-amber-400" },
  { id: "product-photoshooting", title: "Product Photoshooting", category: "Photography", desc: "Commercial and detailed product imagery.", image: "/images/gallery/paska.jpg", color: "from-yellow-600 to-amber-400" },
  { id: "wildlife-hub", title: "Wildlife Hub", category: "Photography", desc: "Interactive gallery for nature enthusiasts.", image: "/images/gallery/bird.webp", color: "from-yellow-600 to-amber-400" },
];

let hasPlayedHomeIntro = false;

const Home = ({ isRevealed, preloadReady = false }) => {
  const { t } = useTranslation();
  const photoRef = useRef(null);
  const requestRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [animateHeroOnce] = useState(() => !hasPlayedHomeIntro);
  const [loadHeavySections, setLoadHeavySections] = useState(false);
  const shouldAnimateHero = isRevealed && animateHeroOnce;

  const bentoItems = [
    {
      title: t('whyMe.items.systems.title'),
      description: t('whyMe.items.systems.desc'),
      header: <Globe size={100} className="text-primary/20 absolute -right-4 -bottom-4" />,
      icon: <Code size={24} />,
      label: t('whyMe.items.systems.label'),
      className: "",
    },
    {
      title: t('whyMe.items.ai.title'),
      description: t('whyMe.items.ai.desc'),
      icon: <Brain size={24} />,
      label: t('whyMe.items.ai.label'),
      className: "",
    },
    {
      title: t('whyMe.items.workflow.title'),
      description: t('whyMe.items.workflow.desc'),
      icon: <Zap size={24} />,
      label: t('whyMe.items.workflow.label'),
      className: "",
    },
    {
      title: t('whyMe.items.creative.title'),
      description: t('whyMe.items.creative.desc'),
      header: <Camera size={100} className="text-green-500/20 absolute -right-4 -bottom-4" />,
      icon: <Camera size={24} />,
      label: t('whyMe.items.creative.label'),
      className: "",
    },
    {
      title: t('whyMe.items.experience.title'),
      description: t('whyMe.items.experience.desc'),
      icon: <CheckCircle2 size={24} />,
      label: t('whyMe.items.experience.label'),
      className: "",
    },
    {
      title: t('whyMe.items.scalability.title'),
      description: t('whyMe.items.scalability.desc'),
      icon: <TrendingUp size={24} />,
      label: t('whyMe.items.scalability.label'),
      className: "",
    },
    {
      title: t('whyMe.items.strategy.title'),
      description: t('whyMe.items.strategy.desc'),
      icon: <Rocket size={24} />,
      label: t('whyMe.items.strategy.label'),
      className: "",
    },
  ];

  const galleryItems = [
    { image: '/images/gallery/Angry_cat.webp', text: t('visualStories.items.personality') },
    { image: '/images/gallery/bird.webp', text: t('visualStories.items.wildlife') },
    { image: '/images/gallery/double_vasek.webp', text: t('visualStories.items.moments') },
    { image: '/images/gallery/goose.webp', text: t('visualStories.items.nature') },
    { image: '/images/gallery/mourek.webp', text: t('visualStories.items.captures') },
    { image: '/images/gallery/richasti.webp', text: t('visualStories.items.perspective') },
    { image: '/images/gallery/THIS IS MAX.webp', text: t('visualStories.items.focus') },
    { image: '/images/gallery/vasek_sax.webp', text: t('visualStories.items.music') }
  ];

  const testimonials = t('testimonials.reviews', { returnObjects: true });

  useEffect(() => {
    if (isRevealed && animateHeroOnce && !hasPlayedHomeIntro) {
      hasPlayedHomeIntro = true;
    }
  }, [isRevealed, animateHeroOnce]);

  useEffect(() => {
    if (preloadReady) {
      setLoadHeavySections(true);
      return undefined;
    }

    let timeoutId = null;
    let idleId = null;
    const loadSections = () => setLoadHeavySections(true);

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(loadSections, { timeout: 1400 });
    } else {
      timeoutId = window.setTimeout(loadSections, 700);
    }

    return () => {
      if (idleId !== null && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [preloadReady]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05
      };
    };

    const animate = () => {
      // Smooth easing without React re-renders
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.1;

      if (photoRef.current) {
        photoRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent">
      <Helmet>
        <title>Filip Lněnička | Web Creation & Photography</title>
        <meta name="description" content="Official portfolio of Filip Lněnička. Digital creator specializing in high-end web creation, AI-driven solutions, and professional photography." />
        <meta property="og:title" content="Filip Lněnička | Digital Excellence" />
        <meta property="og:description" content="Creating web experiences and AI-driven solutions for modern businesses." />
        <meta property="og:image" content="/images/profile.jpg" />
      </Helmet>
      <div className="relative z-10 bg-transparent">
        {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center container mx-auto px-6 text-center pointer-events-auto overflow-hidden pt-20 md:pt-24">
        
        <div className="relative flex flex-col items-center pointer-events-auto mt-12">
          {/* Main Name Display Container */}
          <div className="relative flex flex-col gap-0 leading-[0.8] select-none">
            <h1 className="text-[10vw] md:text-[7vw] font-black tracking-tighter text-primary overflow-hidden h-[0.95em]">
              <motion.span 
                initial={shouldAnimateHero ? { y: "110%", opacity: 0 } : false}
                animate={isRevealed ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={shouldAnimateHero ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] } : { duration: 0.2 }}
                className="inline-block"
              >
                {t('hero.title1')}
              </motion.span>
            </h1>
            <h1 className="text-[10vw] md:text-[7vw] font-black tracking-tighter text-primary overflow-hidden h-[0.95em]">
              <motion.span 
                initial={shouldAnimateHero ? { y: "110%", opacity: 0 } : false}
                animate={isRevealed ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={shouldAnimateHero ? { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 } : { duration: 0.2 }}
                className="inline-block"
              >
                {t('hero.title2')}
              </motion.span>
            </h1>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <motion.div
                ref={photoRef}
                initial={shouldAnimateHero ? { opacity: 0, scale: 0.8, rotate: -5 } : false}
                animate={isRevealed ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
                transition={shouldAnimateHero ? { duration: 1, delay: 0.5, ease: "easeOut" } : { duration: 0.2 }}
                style={{ transform: "translate3d(0,0,0)" }}
                className="w-[15vw] h-[22vw] md:w-[5.5vw] md:h-[8.5vw] pointer-events-auto"
              >
                <div className="w-full h-full rounded-[3rem] overflow-hidden border-[0.3vw] border-background shadow-2xl transform">
                  <img 
                    src="/images/profile.jpg" 
                    alt="Filip Lněnička" 
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={shouldAnimateHero ? { opacity: 0, scale: 0 } : false}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={shouldAnimateHero ? { delay: 1, duration: 0.5 } : { duration: 0.2 }}
            className="mt-8 mb-8"
          >
            <Sparkles className="text-primary animate-pulse" size={32} />
          </motion.div>

          <motion.p 
            initial={shouldAnimateHero ? { opacity: 0 } : false}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={shouldAnimateHero ? { delay: 1.2 } : { duration: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            {t('hero.subtitle1')} <br className="hidden md:block" />
            {t('hero.subtitle2')} <br className="hidden md:block" />
            {t('hero.subtitle3')}
          </motion.p>

          <motion.div 
            initial={shouldAnimateHero ? { opacity: 0, y: 20 } : false}
            animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={shouldAnimateHero ? { delay: 1.4 } : { duration: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
          >
            <Link to="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
              {t('hero.cta1')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#works" className="px-8 py-4 border border-white/20 hover:bg-white/10 rounded-full backdrop-blur-sm transition-all">
              {t('hero.cta2')}
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={shouldAnimateHero ? { opacity: 0 } : false}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={shouldAnimateHero ? { delay: 1.8, duration: 1 } : { duration: 0.2 }}
          className="absolute bottom-10 flex flex-col items-center gap-3 pointer-events-auto"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold">{t('hero.scroll')}</span>
        </motion.div>
      </section>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      <section id="works" className="relative z-10 container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl text-left">
            <h3 className="text-4xl font-bold mb-4">{t('works.title')}</h3>
            <p className="text-gray-400">{t('works.subtitle')}</p>
          </div>
          <Link to="/works" className="flex items-center gap-2 text-primary font-bold hover:underline">
            {t('works.browseAll')} <ExternalLink size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Link to={`/project/${project.id}`} key={i} className="block group">
              <motion.div
                whileHover={{ y: -10 }}
                className="relative h-96 rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
              >
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full ${project.isLogo ? 'object-contain p-20' : 'object-cover'} opacity-40 group-hover:opacity-60 transition-opacity duration-500`}
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{project.category}</div>
                  <h4 className="text-3xl font-bold mb-2">{project.title}</h4>
                  <p className="text-gray-400 text-sm mb-6">{project.desc}</p>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-colors">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-24 overflow-hidden h-[600px] md:h-[800px]">
        <div className="container mx-auto px-6 mb-12 text-left">
          <h3 className="text-4xl font-bold">{t('visualStories.title')}</h3>
          <p className="text-gray-400">{t('visualStories.subtitle')}</p>
        </div>
        
        <div className="h-[400px] md:h-[600px] w-full">
          {loadHeavySections ? (
            <React.Suspense fallback={<div className="h-full w-full rounded-3xl bg-white/[0.03]" />}>
              <CircularGallery 
                items={galleryItems}
                bend={3}
                textColor="#ffffff"
                borderRadius={0.05}
              />
            </React.Suspense>
          ) : (
            <div className="h-full w-full rounded-3xl bg-white/[0.03]" />
          )}
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold uppercase tracking-tighter">{t('whyMe.title')}</h3>
          <p className="text-gray-400">{t('whyMe.subtitle')}</p>
        </div>
        {loadHeavySections ? (
          <React.Suspense fallback={<div className="h-[520px] rounded-3xl bg-white/[0.03]" />}>
            <MagicBento items={bentoItems} glowColor="59, 130, 246" textAutoHide={false} />
          </React.Suspense>
        ) : (
          <div className="h-[520px] rounded-3xl bg-white/[0.03]" />
        )}
      </section>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: '100%', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4 uppercase tracking-tighter">{t('testimonials.title')}</h3>
          <p className="text-gray-400">{t('testimonials.subtitle')}</p>
        </div>
        {loadHeavySections ? (
          <React.Suspense fallback={<div className="h-80 rounded-3xl border border-white/10 bg-white/[0.02]" />}>
            <MotionCarousel 
              reviews={testimonials}
            />
          </React.Suspense>
        ) : (
          <div className="h-80 rounded-3xl border border-white/10 bg-white/[0.02]" />
        )}
      </section>

      <section className="relative z-10 container mx-auto px-6 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 text-center uppercase tracking-tighter">{t('faq.title')}</h3>
          <div className="space-y-2">
            <FAQItem 
              question="Who do you usually work with?" 
              answer="I mainly work with service businesses, creators, and growing brands that want performance-focused websites and smart automation — not just visual redesigns."
            />
            <FAQItem 
              question="What do you need from me to start a project?" 
              answer="Basic goals, target audience, existing materials (if any), and a short kickoff call. I guide the rest of the process step by step."
            />
            <FAQItem 
              question="How do you integrate AI into web projects?" 
              answer="I use AI for everything from intelligent content generation and personalized user experiences to backend automation and data analysis. Each project gets a custom AI strategy."
            />
            <FAQItem 
              question="Do you take international projects?" 
              answer="Yes, I work with clients worldwide. My workflow is fully optimized for remote collaboration, ensuring seamless communication across time zones."
            />
            <FAQItem 
              question="What is your typical project timeline?" 
              answer="Timelines vary by complexity. A high-performance landing page usually takes 1-2 weeks, while complex full-stack applications or full brand revamps can take 4-8 weeks."
            />
            <FAQItem 
              question="Can you work with my existing website or stack?" 
              answer="In many cases yes. I can extend, optimize or rebuild existing systems depending on their condition and goals."
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary/20 via-black to-accent/20 p-12 md:p-24 rounded-[3rem] border border-white/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <h2 className="text-4xl md:text-7xl font-bold mb-8 tracking-tighter uppercase">{t('finalCta.title')}</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            {t('finalCta.subtitle')}
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(59,130,246,0.3)]"
          >
            {t('finalCta.btn')} <ArrowRight />
          </Link>
        </motion.div>
      </section>
      </div>
    </div>
  );
};

export default Home;
