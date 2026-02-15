import React from 'react';
import { createPortal } from 'react-dom';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, Globe, CheckCircle2, 
  Target, Settings, Layout as LayoutIcon, Code2, X 
} from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [selectedImg, setSelectedImg] = React.useState(null);
  const project = projects.find(p => p.id === id);
  const trans = t(`projectData.${id}`, { returnObjects: true });

  // Lock scroll when modal is open
  React.useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImg]);

  if (!project || !trans) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        <Link to="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 pt-32 md:pt-40">
      {/* Header / Hero */}
      <section className="container mx-auto px-6 mb-20">
        <Link to={-1} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> {t('projectDetail.back')}
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
              {trans.category}
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase">
              {trans.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              {project.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-x-8 gap-y-6 border-l border-white/10 pl-8"
          >
            {project.details.map((detail, index) => (
              <div key={index}>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{detail.label}</div>
                <div className="text-sm md:text-base font-bold">{detail.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Image */}
      <section className="container mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center ${project.isLogo ? 'bg-white/[0.02]' : ''}`}
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={trans.title} 
              className={project.isLogo ? 'w-1/3 h-auto object-contain' : 'w-full h-full object-cover'} 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Globe size={120} className="text-white/5" />
            </div>
          )}
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-32">
          
          {/* Overview & Goal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-8 uppercase tracking-widest flex items-center gap-3">
                <LayoutIcon className="text-primary" /> {t('projectDetail.overview')}
              </h2>
              <p className="text-gray-400 text-xl leading-relaxed">
                {trans.fullDesc}
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 h-fit">
              <h2 className="text-sm font-bold mb-6 uppercase tracking-widest text-primary flex items-center gap-2">
                <Target size={18} /> {t('projectDetail.clientGoal')}
              </h2>
              <p className="text-white font-medium leading-relaxed italic">
                "{trans.clientGoal}"
              </p>
            </div>
          </div>

          {/* Process Section - Hidden for Photography */}
          {project.category !== "Photography" && trans.process && (
            <div>
              <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest text-center">{t('projectDetail.process')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {trans.process.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-all group"
                  >
                    <div className="text-primary font-black text-4xl mb-4 opacity-20 group-hover:opacity-100 transition-opacity">
                      0{i + 1}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Decisions & Tech */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-3">
                <Settings className="text-primary" /> {t('projectDetail.decisions')}
              </h2>
              <ul className="space-y-4">
                {trans.designDecisions.map((decision, i) => (
                  <li key={i} className="flex items-start gap-4 text-gray-400">
                    <div className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    <span>{decision}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl font-bold uppercase tracking-widest flex items-center gap-3">
                <Code2 className="text-primary" /> {t('projectDetail.setup')}
              </h2>
              <div className="flex flex-wrap gap-2">
                {trans.technicalImplementation.map((tech, i) => (
                  <div key={i} className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium flex items-center gap-3 w-full">
                    <CheckCircle2 size={18} className="text-primary" />
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Project Gallery - For Photography Projects */}
          {project.category === "Photography" && project.gallery && (
            <div className="pt-20 border-t border-white/5">
              <h2 className="text-3xl font-bold mb-12 uppercase tracking-widest text-center">{t('projectDetail.gallery')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => setSelectedImg(img)}
                    className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                  >
                    <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Full Screen Modal via Portal */}
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
                  alt="Project Fullscreen"
                  className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Bottom Navigation */}
      <section className="container mx-auto px-6 mt-32 pt-20 border-t border-white/5 flex justify-between items-center">
        <button 
          onClick={() => window.history.back()} 
          className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 font-bold cursor-pointer"
        >
          <ArrowLeft size={20} /> {t('projectDetail.backToProjects')}
        </button>
        <Link to="/contact" className="px-8 py-4 bg-primary text-white font-black rounded-full hover:scale-105 transition-all">
          {t('projectDetail.cta')}
        </Link>
      </section>
    </div>
  );
};

export default ProjectDetail;
