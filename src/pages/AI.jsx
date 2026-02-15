import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Sparkles, Cpu, 
  ArrowRight, Terminal, 
  MessageSquare, Workflow,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import SpotlightCard from '../components/SpotlightCard';

const AI = () => {
  const { t } = useTranslation();

  const aiSolutions = [
    {
      icon: <MessageSquare size={32} />,
      title: t('ai.solutions.chatbots.title'),
      desc: t('ai.solutions.chatbots.desc'),
      color: "rgba(59, 130, 246, 0.2)"
    },
    {
      icon: <Workflow size={32} />,
      title: t('ai.solutions.workflow.title'),
      desc: t('ai.solutions.workflow.desc'),
      color: "rgba(139, 92, 246, 0.2)"
    },
    {
      icon: <Search size={32} />,
      title: t('ai.solutions.analysis.title'),
      desc: t('ai.solutions.analysis.desc'),
      color: "rgba(34, 197, 94, 0.2)"
    },
    {
      icon: <Sparkles size={32} />,
      title: t('ai.solutions.gen.title'),
      desc: t('ai.solutions.gen.desc'),
      color: "rgba(234, 179, 8, 0.2)"
    }
  ];

  const techStack = [
    { name: "OpenAI / Anthropic", category: "LLMs" },
    { name: "OpenAI", category: t('ai.heroTag').includes('Intelligence') ? "Reasoning" : "Uvažování" }, // Fallback logic or just mapping
    { name: "Stable Diffusion", category: t('ai.heroTag').includes('Intelligence') ? "Visuals" : "Vizuály" },
    { name: "N8N", category: t('ai.heroTag').includes('Intelligence') ? "Automation" : "Automatizace" },
    { name: "Pinecone / Vector DB", category: t('ai.heroTag').includes('Intelligence') ? "Knowledge" : "Znalosti" },
    { name: "Python / Node.js", category: t('ai.heroTag').includes('Intelligence') ? "Integration" : "Integrace" }
  ];

  return (
    <div className="min-h-screen pb-20 bg-transparent text-white">
      <Helmet>
        <title>AI Solutions | Filip Lněnička</title>
        <meta name="description" content="Custom intelligent systems and workflow automation. Integrating cutting-edge AI into your business DNA." />
      </Helmet>
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {t('ai.heroTag')}
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">
              {t('ai.heroTitle1')} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-purple-500">{t('ai.heroTitle2')}</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
              {t('ai.heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-black font-black rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2 group">
                {t('ai.cta1')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#solutions" className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-bold">
                {t('ai.cta2')}
              </a>
            </div>
          </motion.div>
        </section>

        {/* AI Solutions Grid */}
        <section id="solutions" className="container mx-auto px-6 py-24 border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiSolutions.map((solution, i) => (
              <SpotlightCard
                key={i}
                spotlightColor={solution.color}
                className="flex flex-col p-10 border border-white/10 hover:border-primary/30 transition-colors !bg-transparent group"
              >
                <div className="text-primary mb-8 p-4 bg-white/5 w-fit rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{solution.title}</h3>
                <p className="text-gray-400 leading-relaxed">{solution.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Technical Integration Section */}
        <section className="container mx-auto px-6 py-24 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{t('ai.stackTitle').split(' ').map((word, index) => (index === 1 ? <><br />{word}</> : word))}</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {t('ai.stackSubtitle')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">{tech.category}</div>
                    <div className="font-bold text-white text-sm">{tech.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
              <div className="relative bg-black/40 border border-white/10 rounded-[3rem] p-10 backdrop-blur-2xl">
                <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-6 text-gray-500">
                  <Terminal size={18} />
                  <span className="text-xs font-mono uppercase tracking-widest">AI Deployment Console</span>
                </div>
                <div className="space-y-6 font-mono text-[13px]">
                  <div className="flex gap-4">
                    <span className="text-primary font-bold">{">"}</span>
                    <span className="text-gray-300">{t('ai.terminal.line1')}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold">{">"}</span>
                    <span className="text-gray-300">{t('ai.terminal.line2')}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-primary font-bold">{">"}</span>
                    <span className="text-gray-300">{t('ai.terminal.line3')}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold">{">"}</span>
                    <span className="text-gray-300">{t('ai.terminal.line4')}</span>
                  </div>
                  <div className="pt-6">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-primary" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-6 py-20 border-t border-white/5">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/30 via-black to-accent/30 p-12 md:p-24 rounded-[3rem] text-center border border-white/10 relative overflow-hidden backdrop-blur-xl"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase">{t('ai.ctaTitle')}</h2>
              <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                {t('ai.ctaSubtitle')}
              </p>
              <Link to="/contact" className="px-12 py-6 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all inline-flex items-center gap-3 shadow-2xl transform hover:scale-105 active:scale-95">
                {t('ai.ctaBtn')} <Brain size={20} />
              </Link>
            </div>
            <Cpu className="absolute -left-20 -bottom-20 w-96 h-96 text-white/5 animate-spin-slow" />
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default AI;
