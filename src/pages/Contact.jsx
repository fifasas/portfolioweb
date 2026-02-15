import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, ShieldCheck, Send, CheckCircle2, AlertCircle, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus(null);

    const formData = new FormData(event.target);
    formData.append("access_key", "256655a5-60eb-46ee-b472-56c37f5026e0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        event.target.reset();
      } else {
        setStatus('error');
        console.error("Error", data);
      }
    } catch (error) {
      setStatus('error');
      console.error("Submit error", error);
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <Helmet>
        <title>Contact | Filip Lněnička</title>
        <meta name="description" content="Get in touch with Filip Lněnička for web creation, AI integration, or photography projects." />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block text-center">{t('contact.tag')}</span>
        <h1 className="text-5xl md:text-7xl font-black mb-20 text-center tracking-tighter uppercase leading-none">
          {t('contact.title1')} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('contact.title2')}</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">{t('contact.subtitle')}</h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              {t('contact.desc')}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 text-gray-300 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Email</div>
                  <div className="text-lg font-bold">filip.lnenicka@filiplnenicka.cz</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-300 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Phone</div>
                  <div className="text-lg font-bold">+420 777 867 380</div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">{t('contact.follow')}</div>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/filip-ln%C4%9Bni%C4%8Dka-724a0127b/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/filiplnenicka/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.youtube.com/@filiplnenicka" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-all">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-300 group pt-8 border-t border-white/5">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-500 group-hover:text-primary transition-all">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Business Registration</div>
                  <div className="text-lg font-bold">IČO: 22028081</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">{t('contact.form.name')}</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-700" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">{t('contact.form.email')}</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-700" 
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-2">{t('contact.form.project')}</label>
                <textarea 
                  required
                  name="message"
                  rows="5" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:border-primary transition-all text-white placeholder:text-gray-700 resize-none" 
                  placeholder={t('contact.form.placeholder')}
                ></textarea>
              </div>
              <button 
                disabled={isSending}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 overflow-hidden group ${
                  isSending ? 'bg-gray-700 cursor-not-allowed' : 'bg-primary hover:bg-blue-600 text-white shadow-xl shadow-primary/20 active:scale-[0.98]'
                }`}
              >
                {isSending ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t('contact.form.btn')} <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Status Feedback */}
            <AnimatePresence>
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`mt-6 p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                    status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {status === 'success' ? (
                    <>
                      <CheckCircle2 size={20} /> {t('contact.form.success')}
                    </>
                  ) : (
                    <>
                      <AlertCircle size={20} /> {t('contact.form.error')}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
