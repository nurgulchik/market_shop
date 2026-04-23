import { X, Star, ShieldCheck, Truck, Plus, Minus, Check, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../data/mockData';
import { useCartStore } from '../store/useCartStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: Props) {
  const { t } = useTranslation();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[var(--bg-color)] rounded-[2rem] shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 dark:bg-black/50 backdrop-blur-md flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-black transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image Gallery Side */}
          <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 relative min-h-[300px] md:min-h-[500px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-6 left-6 bg-amber-500 text-white font-black px-3 py-1.5 rounded-full shadow-lg text-[10px] uppercase tracking-widest">
                -{product.discount}%
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--muted-text)]">
               <span>{t(product.category)}</span>
               <span>•</span>
               <span>{product.weight}</span>
            </div>
            
            <h2 className="text-4xl font-black text-[var(--text-color)] leading-tight mb-4 tracking-tighter uppercase">
              {product.name}
            </h2>

            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full font-black text-xs">
                 <Star size={14} className="fill-current" /> {product.rating}
               </div>
               <span className="text-[var(--muted-text)] text-[10px] font-black uppercase tracking-widest underline cursor-pointer">{product.reviews} {t('reviews') || 'reviews'}</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
               <span className="text-5xl font-black text-[var(--text-color)] tracking-tighter">${discountedPrice.toFixed(2)}</span>
               {product.discount && (
                 <span className="text-xl text-[var(--muted-text)] line-through mb-1 font-bold">${product.price.toFixed(2)}</span>
               )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-[9px] font-black uppercase tracking-[0.1em]">
               <div className="flex items-center gap-2 text-[var(--text-color)] bg-[var(--card-bg)] p-4 rounded-2xl border-2 border-[var(--border-color)]">
                  <ShieldCheck className="text-emerald-500" size={18} />
                  <span>{t('fresh_organic')}</span>
               </div>
               <div className="flex items-center gap-2 text-[var(--text-color)] bg-[var(--card-bg)] p-4 rounded-2xl border-2 border-[var(--border-color)]">
                  <Truck className="text-emerald-500" size={18} />
                  <span>{t('fast_delivery')}</span>
               </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
               {/* Quantity Selector */}
               <div className="flex items-center justify-between bg-[var(--card-bg)] rounded-2xl px-2 w-full sm:w-32 h-16 border-2 border-emerald-500/20 shrink-0">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <Minus size={20} className="text-emerald-500" strokeWidth={3} />
                  </button>
                  <span className="font-black text-2xl">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-emerald-50 transition-colors"
                  >
                    <Plus size={20} className="text-emerald-500" strokeWidth={3} />
                  </button>
               </div>

               {/* Add to Cart Button */}
               <button 
                 onClick={handleAdd}
                 disabled={added}
                 className={`flex-1 w-full h-16 rounded-2xl font-black text-lg text-white transition-all shadow-2xl flex items-center justify-center gap-2 uppercase tracking-tighter ${
                   added ? 'bg-green-500 shadow-green-500/20' : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]'
                 }`}
               >
                 {added ? (
                   <><Check size={28} strokeWidth={4} /> {t('added_to_cart') || 'Added!'}</>
                 ) : (
                   <>
                     <ShoppingCart size={24} strokeWidth={3} />
                     {t('add_to_cart')} - ${(discountedPrice * quantity).toFixed(2)}
                   </>
                 )}
               </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
