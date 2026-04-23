import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, setIsOpen, items, updateQuantity, removeItem, totalValue } = useCartStore();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[var(--bg-color)] shadow-2xl z-[70] flex flex-col border-l border-[var(--border-color)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b-2 border-[var(--border-color)] border-dashed">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <ShoppingBag size={24} strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-black text-[var(--text-color)] tracking-tighter uppercase">
                  {t('cart')}
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[var(--card-bg)] hover:bg-red-500 hover:text-white text-[var(--text-color)] transition-all border-2 border-[var(--border-color)] active:scale-90"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-32 h-32 bg-emerald-50 rounded-[3rem] flex items-center justify-center text-emerald-500 mb-8"
                  >
                    <ShoppingBag size={64} opacity={0.3} strokeWidth={1} />
                  </motion.div>
                  <h3 className="text-2xl font-black text-[var(--text-color)] uppercase tracking-tighter mb-4">{t('cart_empty')}</h3>
                  <p className="text-[var(--muted-text)] font-semibold text-sm mb-10 leading-relaxed uppercase tracking-widest">{t('cart_empty_desc')}</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-[var(--text-color)] text-[var(--bg-color)] font-black py-5 rounded-[2rem] hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] shadow-2xl shadow-black/10"
                  >
                    {t('back_to_shop')}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      key={item.id} 
                      className="group flex gap-5 bg-[var(--card-bg)] p-4 rounded-[2.5rem] border-2 border-[var(--border-color)] hover:border-emerald-500/30 transition-all shadow-xl shadow-black/5"
                    >
                      <div className="w-24 h-24 shrink-0 rounded-[1.5rem] overflow-hidden bg-[var(--bg-color)]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-black text-[var(--text-color)] line-clamp-2 uppercase tracking-tight leading-[1.2]">{item.name}</h4>
                            <button onClick={() => removeItem(item.id)} className="text-red-500/40 hover:text-red-500 transition-colors p-1">
                               <X size={16} strokeWidth={3} />
                            </button>
                          </div>
                          <span className="text-[10px] font-black text-[var(--muted-text)] uppercase tracking-widest">{item.weight}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-black text-xl text-emerald-600">${(item.price * item.quantity).toFixed(2)}</span>
                          
                          <div className="flex items-center gap-4 bg-[var(--bg-color)] rounded-2xl px-3 py-2 border-2 border-[var(--border-color)]">
                             <button 
                               onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                               className="w-8 h-8 flex items-center justify-center rounded-xl text-emerald-500 hover:bg-emerald-50 transition-colors"
                             >
                               <Minus size={16} strokeWidth={3} />
                             </button>
                             <span className="text-base font-black w-6 text-center">{item.quantity}</span>
                             <button 
                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
                               className="w-8 h-8 flex items-center justify-center rounded-xl text-emerald-500 hover:bg-emerald-50 transition-colors"
                             >
                               <Plus size={16} strokeWidth={3} />
                             </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-[var(--card-bg)] border-t-2 border-[var(--border-color)] border-dashed space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[var(--text-color)]">
                    <span className="text-[var(--muted-text)] font-black uppercase tracking-widest text-xs">Subtotal</span>
                    <span className="font-black text-xl">${totalValue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-500 font-black uppercase tracking-widest text-xs">
                    <span>Delivery</span>
                    <span className="text-xs">FREE</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-emerald-500 text-white p-6 rounded-[2.5rem] font-black shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 text-xl uppercase tracking-tighter hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  {t('checkout')} • ${totalValue.toFixed(2)}
                  <ArrowRight size={28} strokeWidth={3} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
