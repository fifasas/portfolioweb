import React from 'react';
import { Linkedin, Instagram, Youtube, Mail, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-2">FILIP LNĚNIČKA</h3>
          <p className="text-gray-400 text-sm">{t('footer.desc')}</p>
          <div className="mt-4">
            <Link to="/links" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
              <Share2 size={16} /> {t('nav.links')}
            </Link>
          </div>
        </div>
        
        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/filip-ln%C4%9Bni%C4%8Dka-724a0127b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Linkedin size={24} />
          </a>
          <a href="https://www.instagram.com/filiplnenicka/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Instagram size={24} />
          </a>
          <a href="https://www.youtube.com/@filiplnenicka" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Youtube size={24} />
          </a>
          <a href="mailto:filip.lnenicka@filiplnenicka.cz" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Mail size={24} />
          </a>
        </div>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Filip Lněnička. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
