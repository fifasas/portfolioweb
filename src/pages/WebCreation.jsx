import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, Globe, Code2, 
  Rocket, Search, ShieldCheck, Zap, 
  ArrowRight, MousePointer2,
  Brain, Camera, Palette, Database, CheckCircle2, TrendingUp,
  Sparkles, Layout as LayoutIcon, Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import SpotlightCard from '../components/SpotlightCard';

const WebCreation = () => {
  const { t } = useTranslation();

  const showcaseProjects = [
    {
      id: "matrace-letovice",
      title: t('projectData.matrace-letovice.title'),
      category: t('projectData.matrace-letovice.category'),
      desc: t('projectData.matrace-letovice.desc'),
      image: "/images/gallery/MatraceLetoviceMockup-scaled.webp",
      tags: ["Wordpress", "catalog"]
    },
    {
      id: "jakub-hes",
      title: t('projectData.jakub-hes.title'),
      category: t('projectData.jakub-hes.category'),
      desc: t('projectData.jakub-hes.desc'),
      image: "/images/gallery/JakubHesMockUpt-scaled.webp",
      tags: ["Minimalism", "Portfolio", "Animations"]
    },
    {
      id: "imphreco",
      title: t('projectData.imphreco.title'),
      category: t('projectData.imphreco.category'),
      desc: t('projectData.imphreco.desc'),
      image: "", 
      tags: ["Branding", "Interactive", "Performance"]
    }
  ];

  return (
    <div className="relative min-h-screen bg-transparent">
      <Helmet>
        <title>Web Creation | Filip Lněnička</title>
        <meta name="description" content="Custom web creation and digital ecosystems. Building high-performance business tools optimized for conversion." />
      </Helmet>
      <div className="relative z-10 bg-transparent">
        {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t('webCreation.heroTag')}</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
            {t('webCreation.heroTitle1')} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('webCreation.heroTitle2')}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {t('webCreation.heroDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
              {t('webCreation.cta1')} <MousePointer2 size={18} />
            </a>
            <Link to="/contact" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all flex items-center justify-center gap-2">
              {t('webCreation.cta2')} <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Process Pillars */}
      <section className="container mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6">
                <LayoutIcon size={28} />
              </div>
              <h3 className="text-2xl font-bold">{t('webCreation.pillars.uiux.title')}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t('webCreation.pillars.uiux.desc')}
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(139, 92, 246, 0.2)">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold">{t('webCreation.pillars.dev.title')}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t('webCreation.pillars.dev.desc')}
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(34, 197, 94, 0.2)">
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6">
                <Rocket size={28} />
              </div>
              <h3 className="text-2xl font-bold">{t('webCreation.pillars.launch.title')}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t('webCreation.pillars.launch.desc')}
              </p>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Engagement Models (Project Types & Ownership) */}
      <section className="container mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">{t('webCreation.solutionsTitle')}</h2>
          <p className="text-gray-400">{t('webCreation.solutionsSubtitle')}</p>
        </div>

        {/* Project Types - 2 Columns, 3 Rows */}
        <div className="max-w-6xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-10 text-center md:text-left">{t('webCreation.projectTypes')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { key: 'static', icon: <Monitor size={24} /> },
              { key: 'ecommerce', icon: <Globe size={24} /> },
              { key: 'apps', icon: <Cpu size={24} /> },
              { key: 'cms', icon: <Code2 size={24} /> },
              { key: 'booking', icon: <Zap size={24} /> },
              { key: 'ai', icon: <Brain size={24} /> }
            ].map((type, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group">
                <div className="mt-1 text-primary group-hover:scale-110 transition-transform">{type.icon}</div>
                <div>
                  <h4 className="text-lg font-bold mb-1 text-white">{t(`webCreation.types.${type.key}.title`)}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{t(`webCreation.types.${type.key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ownership Models - 2 Columns, 1 Row */}
        <div className="max-w-6xl mx-auto pt-20 border-t border-white/5">
          <h3 className="text-xl font-bold text-primary uppercase tracking-widest mb-10 text-center md:text-left">{t('webCreation.ownershipModels')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:border-primary/50 transition-all flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={32} /> {t('webCreation.ownership.full.title')}
                </h4>
                <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                  {t('webCreation.ownership.full.desc')}
                </p>
              </div>
              <div className="flex items-end justify-between gap-4 mt-auto">
                <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{t('webCreation.ownership.full.label')}</div>
                <Link to="/contact" className="inline-block w-fit px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-primary hover:text-white transition-all text-sm">
                  {t('webCreation.ownership.full.btn')}
                </Link>
              </div>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 group hover:border-primary/50 transition-all flex flex-col justify-between text-left">
              <div>
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Zap className="text-primary" size={32} /> {t('webCreation.ownership.rent.title')}
                </h4>
                <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                  {t('webCreation.ownership.rent.desc')}
                </p>
              </div>
              <div className="flex items-end justify-between gap-4 mt-auto">
                <div className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{t('webCreation.ownership.rent.label')}</div>
                <Link to="/contact" className="inline-block w-fit px-8 py-3 border border-white/10 text-white font-black rounded-xl hover:bg-white hover:text-black transition-all text-sm">
                  {t('webCreation.ownership.rent.btn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="container mx-auto px-6 py-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-xl text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('works.architecture')}</h2>
            <p className="text-gray-400">{t('works.architectureDesc')}</p>
          </div>
        </div>

        <div className="space-y-32">
          {showcaseProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="flex-1 w-full">
                <Link to={`/project/${p.id}`} className="block group">
                  <div className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 aspect-video">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Globe size={80} className="text-white/10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                </Link>
              </div>
              <div className="flex-1 space-y-6 text-left">
                <div className="flex gap-3">
                  {["Wordpress", "catalog"].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-primary font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-bold">{p.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                  {p.desc}
                </p>
                <div className="pt-4">
                  <Link to={`/project/${p.id}`} className="inline-flex items-center gap-2 text-white font-bold hover:gap-4 transition-all">
                    {t('works.details')} <ArrowRight className="text-primary" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary p-12 md:p-20 rounded-[3rem] text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">{t('webCreation.ownership.full.btn').toUpperCase()}?</h2>
            <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Stop guessing and start building. Let's create a digital experience that actually works for your business.
            </p>
            <Link to="/contact" className="px-12 py-6 bg-white text-primary font-black rounded-full hover:bg-gray-100 transition-all inline-flex items-center gap-3 shadow-2xl">
              Get Started <Zap size={20} fill="currentColor" />
            </Link>
          </div>
          <Globe className="absolute -right-20 -bottom-20 w-96 h-96 text-white/10" />
        </motion.div>
      </section>
      </div>
    </div>
  );
};

export default WebCreation;
