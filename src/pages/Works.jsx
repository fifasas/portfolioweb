import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowRight, Filter, Globe, Camera, Code2, Zap } from 'lucide-react';

const Works = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web Creation', 'Photography'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pb-32 bg-transparent text-white">
      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Archive</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            A comprehensive collection of my work across development, design, and visual storytelling.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all border ${
                filter === cat 
                  ? 'bg-white text-black border-white shadow-xl shadow-white/10' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat === 'All' ? t('nav.home').replace('Home', 'All') : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-6">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Link to={`/project/${project.id}`} className="group block">
                  <div className="relative h-96 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-primary/10">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`absolute inset-0 w-full h-full ${project.isLogo ? 'object-contain p-20' : 'object-cover'} opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700`}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <Code2 size={60} className="text-white/10" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                    
                    <div className="absolute inset-0 p-10 flex flex-col justify-end text-left translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-2 mb-4">
                        {project.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-black mb-2 tracking-tight group-hover:text-primary transition-colors">{t(`projectData.${project.id}.title`)}</h3>
                      <p className="text-gray-400 text-sm mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {t(`projectData.${project.id}.desc`)}
                      </p>
                      <div className="flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                        {t('works.details')} <ArrowRight size={18} className="text-primary" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-40">
          <Zap className="mx-auto text-primary/20 mb-6" size={60} />
          <h3 className="text-2xl font-bold">No projects found in this category</h3>
          <button onClick={() => setFilter('All')} className="mt-4 text-primary hover:underline">Show all projects</button>
        </div>
      )}

      {/* CTA */}
      <section className="container mx-auto px-6 mt-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-24 rounded-[3rem] bg-white/5 border border-white/10 text-center relative overflow-hidden backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Your project could be next.</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Ready to build something world-class? Let's discuss your vision and turn it into a high-performance reality.
          </p>
          <Link to="/contact" className="px-12 py-6 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all transform hover:scale-105 inline-block shadow-2xl">
            Start a Conversation
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Works;
