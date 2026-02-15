import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Target, BarChart, 
  ArrowRight, Zap, Megaphone,
  PenTool, LineChart, Globe, Sparkles,
  PieChart, Rocket, ShieldCheck, Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SpotlightCard from '../components/SpotlightCard';

const Marketing = () => {
  const { t } = useTranslation();

  const marketingServices = [
    {
      icon: <Users size={32} />,
      title: t('whyMe.items.systems.label'), // Using existing keys where possible or mapped
      desc: t('whyMe.items.systems.desc'),
      color: "rgba(59, 130, 246, 0.2)"
    },
    {
      icon: <PenTool size={32} />,
      title: "Content & Copywriting",
      desc: "High-conversion copy and storytelling that resonates with your audience and builds authority.",
      color: "rgba(139, 92, 246, 0.2)"
    },
    {
      icon: <Target size={32} />,
      title: "Performance Marketing",
      desc: "Data-driven ad campaigns (Meta, Google) designed to maximize ROI and scale customer acquisition.",
      color: "rgba(239, 68, 68, 0.2)"
    },
    {
      icon: <PieChart size={32} />,
      title: "Brand Strategy",
      desc: "Defining your unique value proposition and positioning your brand to dominate its niche.",
      color: "rgba(34, 197, 94, 0.2)"
    }
  ];

  const processSteps = [
    { title: "Audit", desc: "Analyzing your current presence and competitors." },
    { title: "Strategy", desc: "Defining clear KPIs and growth roadmap." },
    { title: "Creative", desc: "Developing high-impact visual and text assets." },
    { title: "Execution", desc: "Launching campaigns and content cycles." },
    { title: "Analytics", desc: "Deep-dive tracking and performance reporting." },
    { title: "Scale", desc: "Optimizing winning strategies for maximum reach." }
  ];

  return (
    <div className="min-h-screen pb-20 bg-transparent text-white">
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">{t('marketing.heroTag')}</span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase">
              {t('marketing.heroTitle1')} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('marketing.heroTitle2')}</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
              {t('marketing.heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                {t('marketing.cta1')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#services" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-bold">
                {t('marketing.cta2')}
              </a>
            </div>
          </motion.div>
        </section>

        {/* Core Services */}
        <section id="services" className="container mx-auto px-6 py-24 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketingServices.map((service, i) => (
              <SpotlightCard
                key={i}
                spotlightColor={service.color}
                className="flex flex-col h-full border border-white/10 hover:border-primary/30 transition-colors !bg-transparent"
              >
                <div className="text-primary mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* The Growth Methodology */}
        <section className="container mx-auto px-6 py-24 border-t border-white/5">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{t('marketing.methodology').split(' ').map((word, index) => (index === 1 ? <><br />{word}</> : word))}</h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                {t('marketing.methodologyDesc')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary"><Zap size={20} /></div>
                  <span className="font-bold">AI Automation</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary"><LineChart size={20} /></div>
                  <span className="font-bold">Data Analysis</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary"><Users size={20} /></div>
                  <span className="font-bold">Human Centric</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary"><Globe size={20} /></div>
                  <span className="font-bold">Global Scale</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between aspect-square lg:aspect-auto h-40"
                >
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Step 0{i + 1}</span>
                  <div>
                    <h4 className="text-xl font-bold">{step.title}</h4>
                    <p className="text-gray-500 text-xs mt-1">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-600/20 to-orange-600/20 p-12 md:p-20 rounded-[3rem] text-center border border-red-500/20 relative overflow-hidden backdrop-blur-xl"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">{t('marketing.ctaTitle')}</h2>
              <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                {t('marketing.ctaSubtitle')}
              </p>
              <Link to="/contact" className="px-12 py-6 bg-white text-black font-black rounded-full hover:bg-gray-100 transition-all inline-flex items-center gap-3 shadow-2xl transform hover:scale-105 active:scale-95">
                {t('marketing.ctaBtn')} <Mail size={20} />
              </Link>
            </div>
            <Megaphone className="absolute -right-20 -bottom-20 w-96 h-96 text-white/5 -rotate-12" />
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Marketing;
