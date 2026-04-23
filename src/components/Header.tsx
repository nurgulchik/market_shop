import { ShoppingCart, Menu, Search, Mic, Moon, Sun, User, Globe, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import { useAppStore } from '../store/useAppStore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { totalItems, setIsOpen } = useCartStore();
  const { isDarkMode, toggleDarkMode, isVoiceSearchActive, setVoiceSearchActive, searchQuery, setSearchQuery } = useAppStore();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser.');
      return;
    }
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = i18n.language === 'kg' ? 'ky-KG' : i18n.language === 'ru' ? 'ru-RU' : 'en-US';
    recognition.continuous = false;
    
    recognition.onstart = () => setVoiceSearchActive(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
    recognition.onend = () => setVoiceSearchActive(false);
    
    recognition.start();
  };

  return (
    <>
      {/* Top Discount Bar */}
      <div className="bg-black text-[10px] py-1 text-center font-black uppercase tracking-[0.3em] text-emerald-400 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="inline-block"
        >
          {t('fast_delivery_desc')} • FREE SHIPPING ON ORDERS OVER $50 • FAST DELIVERY • {t('fresh_organic_desc')} • 
        </motion.div>
      </div>

      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--bg-color)]/80 border-b border-[var(--border-color)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-24">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center">
              <button className="md:hidden p-2 mr-1 text-[var(--muted-text)] hover:text-[var(--text-color)]">
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/40 transform hover:rotate-6 transition-transform">
                  <span className="text-white font-black text-2xl leading-none italic">7</span>
                </div>
                <span className="text-xl md:text-3xl font-black tracking-tighter text-[var(--text-color)] leading-none">
                  777<span className="text-emerald-500">MARKET</span>
                </span>
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xl px-8">
              <div className="relative w-full group">
                <div className={`absolute inset-0 bg-gradient-to-r from-emerald-100 to-transparent rounded-full blur transition-opacity opacity-0 group-focus-within:opacity-100 ${isDarkMode ? 'opacity-0 from-emerald-900' : ''}`}></div>
                <div className="relative flex items-center w-full h-14 rounded-full border-2 border-[var(--border-color)] bg-[var(--card-bg)] shadow-inner focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent transition-all">
                  <div className="pl-5 pr-2 text-emerald-500">
                    <Search size={22} strokeWidth={2.5} />
                  </div>
                  <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-transparent outline-none text-[var(--text-color)] placeholder-[var(--muted-text)] font-bold text-base"
                  />
                  <button 
                    onClick={handleVoiceSearch}
                    className={`pr-5 pl-2 border-l border-[var(--border-color)] transition-colors ${isVoiceSearchActive ? 'text-red-500 animate-pulse' : 'text-[var(--muted-text)] hover:text-emerald-500'}`}
                    title={t('voice_search_hint')}
                  >
                    <Mic size={22} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-4">
              {/* Mobile Search Toggle */}
              <button 
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="md:hidden p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--muted-text)]"
              >
                <Search size={22} />
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="p-2 rounded-full hover:bg-[var(--border-color)] transition-colors flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--text-color)]"
                >
                  <Globe size={20} />
                  <span className="ml-1 text-[10px] font-black uppercase tracking-widest">{i18n.language}</span>
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute right-0 mt-3 w-40 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[1.5rem] shadow-2xl overflow-hidden py-2 z-50"
                    >
                      {[
                        { code: 'en', name: 'English' },
                        { code: 'ru', name: 'Русский' },
                        { code: 'kg', name: 'Кыргызча' }
                      ].map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-5 py-3 text-xs uppercase tracking-widest font-black transition-colors ${i18n.language === lang.code ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950' : 'text-[var(--text-color)] hover:bg-[var(--border-color)]'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-[var(--border-color)] transition-colors flex items-center justify-center text-[var(--muted-text)] hover:text-[var(--text-color)]"
              >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              {/* User Profile */}
              <Link to="/profile" className="hidden sm:flex p-2 rounded-full hover:bg-[var(--border-color)] transition-colors items-center justify-center text-[var(--muted-text)] hover:text-[var(--text-color)]">
                <User size={22} />
              </Link>

              {/* Cart Button */}
              <button 
                onClick={() => setIsOpen(true)}
                className="relative w-12 h-12 md:w-14 md:h-14 ml-2 rounded-2xl bg-[var(--text-color)] text-[var(--bg-color)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center group shadow-xl"
              >
                <ShoppingCart size={24} className="transition-transform group-hover:-rotate-12" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-emerald-500 text-white text-[10px] font-black rounded-full border-2 border-[var(--bg-color)]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[var(--border-color)] overflow-hidden bg-[var(--bg-color)]"
            >
              <div className="p-4">
                <div className="relative flex items-center w-full h-12 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                  <div className="pl-4 pr-2 text-emerald-500">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    autoFocus
                    placeholder={t('search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-transparent outline-none text-[var(--text-color)] placeholder-[var(--muted-text)] text-sm font-bold"
                  />
                  <button onClick={() => setMobileSearchOpen(false)} className="pr-4 pl-2 text-[var(--muted-text)]">
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
