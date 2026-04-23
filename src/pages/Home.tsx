import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES, MOCK_PRODUCTS, Product } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductQuickView from '../components/ProductQuickView';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, ShieldCheck, Leaf, Headphones, ArrowUp } from 'lucide-react';

import * as icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const { searchQuery } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const dealsRef = useRef<HTMLElement>(null);

  // Daily Deals Timer
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory ? p.category === activeCategory : true;
    return matchesSearch && matchesCat;
  });

  const scrollToDeals = () => {
    dealsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustSignals = [
    { icon: Zap, label: t('fast_delivery'), desc: t('fast_delivery_desc'), color: 'bg-amber-100 text-amber-600' },
    { icon: Leaf, label: t('fresh_organic'), desc: t('fresh_organic_desc'), color: 'bg-emerald-100 text-emerald-600' },
    { icon: ShieldCheck, label: t('safe_payment'), desc: t('safe_payment_desc'), color: 'bg-blue-100 text-blue-600' },
    { icon: Headphones, label: t('support_24'), desc: t('support_24_desc'), color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="pb-24">
      {/* Marquee */}
      <div className="bg-emerald-500 py-3 overflow-hidden whitespace-nowrap border-y-4 border-black/10">
        <div className="inline-block animate-marquee font-black uppercase text-white tracking-[0.2em] text-[10px]">
          {Array(10).fill('777 MARKET • ТЕЗ ЖЕТКИРҮҮ • САПАТТУУ АЗЫКТАР • МЫКТЫ АРЗАНДАТУУЛАР • ').join(' ')}
        </div>
      </div>

      {/* Hero Section / Daily Deals */}
      <section className="relative px-4 sm:px-6 lg:px-8 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-7xl mx-auto bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-[3rem] overflow-hidden relative shadow-2xl shadow-emerald-500/20 group"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
             <div className="text-[120px] font-black leading-none italic group-hover:scale-110 transition-transform duration-700">777</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10 px-8 py-16 md:py-24 md:px-20">
            <div className="text-white">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                {t('fresh_fast')} • {formatTime(timeLeft)}
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black mb-8 leading-[1] tracking-tighter uppercase whitespace-pre-line"
              >
                {t('premium_groceries')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-emerald-50 text-xl mb-12 opacity-90 max-w-lg font-bold leading-relaxed"
              >
                {t('hero_subtitle')}
              </motion.p>
              
              <div className="flex items-center gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToDeals}
                  className="bg-white text-emerald-600 font-black px-12 py-5 rounded-[2rem] hover:shadow-2xl transition-all text-xl shadow-2xl shadow-white/20 uppercase tracking-tighter"
                >
                  {t('shop_now')}
                </motion.button>
              </div>
            </div>
            
            <div className="hidden md:flex justify-end items-center relative h-full">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5, type: 'spring' }}
                 className="relative"
               >
                  <div className="absolute -inset-10 bg-white/30 blur-[80px] rounded-full animate-pulse"></div>
                  <div className="relative text-[280px] leading-none animate-bounce-slow drop-shadow-2xl">
                    🥗
                  </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Signals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustSignals.map((signal, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--border-color)] flex items-center gap-5 group hover:border-emerald-500 transition-all shadow-xl shadow-black/5"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${signal.color}`}>
                <signal.icon size={28} />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xs uppercase tracking-widest text-[var(--text-color)] mb-1">{signal.label}</span>
                <span className="text-[10px] font-bold text-[var(--muted-text)] uppercase leading-tight tracking-wider">{signal.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black text-[var(--text-color)] tracking-tighter uppercase flex items-center gap-4">
             <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
             {t('categories')}
          </h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 snap-x group">
          <button
            onClick={() => setActiveCategory(null)}
            className={`snap-center shrink-0 flex flex-col items-center justify-center p-4 rounded-[2rem] min-w-[100px] transition-all border-4 ${
              activeCategory === null 
                ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xl shadow-emerald-500/40' 
                : 'bg-[var(--card-bg)] text-[var(--text-color)] border-transparent hover:border-emerald-500/30'
            }`}
          >
            <span className="font-black text-xs mt-1 uppercase tracking-widest">{t('all')}</span>
          </button>
          
          {CATEGORIES.map((cat) => {
            const Icon = icons[cat.icon as keyof typeof icons] as LucideIcon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-center shrink-0 flex flex-col items-center justify-center p-5 rounded-[2.5rem] min-w-[120px] transition-all border-4 ${
                  isActive 
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-2xl shadow-emerald-500/40' 
                    : 'bg-[var(--card-bg)] text-[var(--text-color)] border-transparent hover:border-emerald-500/30'
                }`}
              >
                {Icon && <Icon size={28} className={isActive ? 'text-white' : 'text-emerald-500'} strokeWidth={3} />}
                <span className="font-black text-[10px] uppercase mt-3 text-center w-full leading-tight truncate tracking-widest">
                  {t(cat.id)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recommended / Products Grid */}
      <section ref={dealsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24">
         <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-black text-[var(--text-color)] tracking-tighter uppercase flex items-center gap-4">
            <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
            {searchQuery ? t('search_results') : t('fresh_deals')}
            {!searchQuery && <span className="bg-emerald-500 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-500/20">777</span>}
          </h2>
        </div>
        
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} onQuickView={(p) => setQuickViewProduct(p)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-32 text-center bg-[var(--card-bg)] rounded-[3rem] border border-dashed border-[var(--border-color)]">
            <div className="text-6xl mb-4 opacity-30">📦</div>
            <h3 className="text-xl text-[var(--muted-text)] font-black uppercase tracking-tighter">{t('no_products_found')}</h3>
          </div>
        )}
      </section>

      {/* Why 777 Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 mb-16">
        <div className="bg-emerald-500 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none overflow-hidden">
             <div className="text-[300px] font-black italic absolute -top-20 -left-20">777</div>
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">
                   {t('why_777')}
                </h2>
                <div className="space-y-6">
                   {[
                      "Үйгө чейин тез жеткирүү",
                      "Эң жаңы жана таза азыктар",
                      "Күнүмдүк ысык арзандатуулар",
                      "24/7 кардарларды колдоо"
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-white font-bold text-lg md:text-xl">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                           <ShieldCheck size={20} />
                        </div>
                        {item}
                      </div>
                   ))}
                </div>
             </div>
             <div className="flex justify-center md:justify-end">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 flex flex-col items-center justify-center text-white p-8 text-center animate-pulse">
                   <div className="text-5xl md:text-7xl font-black mb-2">10k+</div>
                   <div className="text-sm md:text-base font-black uppercase tracking-widest opacity-80 leading-tight">Берген буйрутмалар</div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-white dark:bg-black text-[var(--text-color)] rounded-full flex items-center justify-center shadow-2xl border border-[var(--border-color)] hover:bg-emerald-500 hover:text-white transition-all"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
