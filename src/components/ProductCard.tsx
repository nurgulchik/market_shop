import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../data/mockData';
import { useCartStore } from '../store/useCartStore';
import { ShoppingCart, Star, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  key?: any;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { t } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const [isAdded, setIsAdded] = useState(false);

  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="product-card group relative flex flex-col rounded-[2.5rem] p-4 sm:p-5 overflow-hidden h-full shadow-xl shadow-black/5 hover:shadow-emerald-500/10 active:scale-[0.98] transition-all">
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {product.discount && (
          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/30">
            -{product.discount}%
          </span>
        )}
        {product.isPopular && (
          <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30">
            777 Hot
          </span>
        )}
      </div>

      {/* Image Container */}
      <div 
        className="relative aspect-square w-full rounded-[2rem] overflow-hidden mb-6 bg-[var(--bg-color)] cursor-pointer"
        onClick={() => onQuickView?.(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Quick View Overlay (Desktop) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center backdrop-blur-sm">
          <span className="text-white font-black text-xs uppercase tracking-widest bg-white/20 px-6 py-3 rounded-full border border-white/40 backdrop-blur-md">
            {t('quick_view')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--muted-text)] text-[10px] font-black uppercase tracking-[0.2em]">{product.weight}</span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
              <Star size={12} className="fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>
          
          <h3 
            className="font-black text-[var(--text-color)] text-sm sm:text-lg leading-tight mb-3 line-clamp-2 cursor-pointer hover:text-emerald-500 transition-colors uppercase tracking-tight"
            onClick={() => onQuickView?.(product)}
          >
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto pt-5 border-t-2 border-[var(--border-color)] border-dashed">
          <div className="flex flex-col">
            <span className="font-black text-xl text-[var(--text-color)]">${discountedPrice.toFixed(2)}</span>
            {product.discount && (
              <span className="text-xs text-[var(--muted-text)] line-through font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <button 
            onClick={handleAdd}
            className={`relative w-14 h-14 rounded-2xl transition-all flex items-center justify-center active:scale-90 shadow-2xl shadow-emerald-500/20 overflow-hidden ${isAdded ? 'bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                >
                  <Check size={24} className="text-white" strokeWidth={4} />
                </motion.div>
              ) : isInCart ? (
                <motion.div
                  key="quantity"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center justify-center font-black text-white text-lg"
                >
                  {quantity}+
                </motion.div>
              ) : (
                <motion.div
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <ShoppingCart size={24} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
