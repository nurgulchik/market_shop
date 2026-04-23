import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/useCartStore';
import { MapPin, CreditCard, Banknote, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, totalValue, clearCart } = useCartStore();

  const [deliveryTime, setDeliveryTime] = useState('today');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPlacing, setIsPlacing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    apt: ''
  });

  // Logic for total weight (mocking base weight if format is missing)
  const totalWeightStr = items.reduce((acc, item) => {
    const w = parseFloat(item.weight) || 1; 
    return acc + (w * item.quantity);
  }, 0);

  const finalTotal = totalValue - 5 + (deliveryTime === 'today' ? 2.99 : 0);

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    
    // Generate WhatsApp Message
    const orderItems = items.map(item => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const message = encodeURIComponent(
      `🛒 *777 MARKET - БУЙРУТМА*\n\n` +
      `👤 *Кардар:* ${formData.fullName}\n` +
      `📞 *Телефон:* ${formData.phone}\n` +
      `📍 *Дарек:* ${formData.address}, ${formData.apt}\n` +
      `🕒 *Убакыт:* ${deliveryTime === 'today' ? 'Бүгүн' : 'Эртең'}\n` +
      `💳 *Төлөм:* ${paymentMethod === 'card' ? 'Карта' : 'Накталай'}\n\n` +
      `📦 *Продукциялар:*\n${orderItems}\n\n` +
      `💰 *Жалпы сумма:* $${finalTotal.toFixed(2)}\n\n` +
      `Сураныч, буйрутманы кабыл алыңыз!`
    );
    
    const whatsappUrl = `https://wa.me/996777777777?text=${message}`;

    // Simulate a brief API call for effect
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      clearCart();
      navigate('/tracking');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">{t('empty_cart')}</h2>
        <button onClick={() => navigate('/')} className="text-emerald-500 font-black underline uppercase tracking-widest text-xs">{t('back_to_shop')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-[var(--text-color)] tracking-tighter uppercase">{t('checkout')}</h1>
        <p className="text-[var(--muted-text)] mt-2 font-bold">777 Premium Fresh Delivery.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <section className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-xl shadow-black/5">
            <h2 className="text-2xl font-black flex items-center gap-2 mb-6 uppercase tracking-tighter">
              <MapPin className="text-emerald-500" /> {t('delivery_address')}
            </h2>
            <div className="space-y-4">
              <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-3xl mb-4 flex items-center justify-center border border-[var(--border-color)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Bishkek&zoom=13&size=800x400&sensor=false')] opacity-50 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all"></div>
                <div className="relative z-10 bg-white dark:bg-black px-6 py-3 rounded-full shadow-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 border-2 border-emerald-500/20 cursor-pointer hover:border-emerald-500 transition-all">
                  <MapPin size={16} className="text-emerald-500" /> Select on map
                </div>
              </div>
              <input 
                type="text" 
                placeholder={t('full_name')} 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full p-4 rounded-2xl bg-[var(--bg-color)] border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-gray-400" 
              />
              <input 
                type="text" 
                placeholder={t('complete_address')} 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-4 rounded-2xl bg-[var(--bg-color)] border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-gray-400" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Apt / Suite" 
                  value={formData.apt}
                  onChange={(e) => setFormData({...formData, apt: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-[var(--bg-color)] border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-gray-400" 
                />
                <input 
                  type="text" 
                  placeholder={t('phone_number')} 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-4 rounded-2xl bg-[var(--bg-color)] border-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold placeholder:text-gray-400" 
                />
              </div>
            </div>
          </section>

          {/* Delivery Time */}
          <section className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-xl shadow-black/5">
            <h2 className="text-2xl font-black flex items-center gap-2 mb-6 uppercase tracking-tighter">
              <Clock className="text-emerald-500" /> {t('delivery_time')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'today', label: 'Today', desc: '+$2.99 Express' },
                { id: 'tomorrow', label: 'Tomorrow', desc: 'Free Delivery' },
                { id: 'specific', label: 'Specific', desc: 'Schedule' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setDeliveryTime(opt.id)}
                  className={`p-6 rounded-3xl flex flex-col items-center justify-center gap-2 border-4 transition-all ${deliveryTime === opt.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30' : 'border-transparent bg-[var(--bg-color)] hover:border-emerald-500/20'}`}
                >
                  <span className="font-black text-xs uppercase tracking-widest">{opt.label}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${deliveryTime === opt.id ? 'text-emerald-600' : 'text-[var(--muted-text)]'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Payment Method */}
          <section className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-xl shadow-black/5">
            <h2 className="text-2xl font-black flex items-center gap-2 mb-6 uppercase tracking-tighter">
              <CreditCard className="text-emerald-500" /> {t('payment_method')}
            </h2>
             <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-6 rounded-3xl flex items-center justify-center gap-3 border-4 transition-all ${paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-transparent bg-[var(--bg-color)] text-[var(--text-color)]'}`}
                >
                  <CreditCard size={20} className={paymentMethod === 'card' ? 'text-white' : 'text-emerald-500'} /> 
                  <span className="font-black text-xs uppercase tracking-widest">{t('card')}</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-6 rounded-3xl flex items-center justify-center gap-3 border-4 transition-all ${paymentMethod === 'cash' ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-transparent bg-[var(--bg-color)] text-[var(--text-color)]'}`}
                >
                  <Banknote size={20} className={paymentMethod === 'cash' ? 'text-white' : 'text-emerald-500'} /> 
                  <span className="font-black text-xs uppercase tracking-widest">{t('cash')}</span>
                </button>
             </div>
          </section>
        </div>

        {/* Smart Cart Summary */}
        <div className="relative">
          <div className="sticky top-24 bg-[var(--card-bg)] p-8 rounded-[3rem] border border-[var(--border-color)] shadow-2xl shadow-emerald-900/5">
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">{t('summary')}</h2>
            
            <div className="flex flex-col gap-5 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-black text-xs uppercase tracking-tighter line-clamp-1 max-w-[120px]">{item.name}</p>
                      <p className="text-[var(--muted-text)] text-[10px] font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-emerald-600 tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-[var(--border-color)] text-[10px] font-black uppercase tracking-widest mb-8">
              <div className="flex justify-between text-[var(--muted-text)]">
                <span>Total Items</span>
                <span className="text-[var(--text-color)]">{items.reduce((a,c) => a + c.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-[var(--muted-text)]">
                 <span>Total Weight est.</span>
                 <span className="text-[var(--text-color)]">~{totalWeightStr.toFixed(1)} kg</span>
              </div>
              <div className="flex justify-between text-[var(--muted-text)]">
                <span>Subtotal</span>
                <span className="text-[var(--text-color)]">${totalValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-500">
                <span>777 Discount</span>
                <span>-$5.00</span>
              </div>
              {deliveryTime === 'today' && (
                <div className="flex justify-between text-amber-500">
                  <span>{t('express')}</span>
                  <span>$2.99</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-[var(--border-color)] mb-10">
              <span className="font-black text-xl uppercase tracking-tighter">Total Payable</span>
              <span className="font-black text-3xl text-emerald-500 tracking-tighter">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

             <button 
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95 transition-all py-6 rounded-3xl font-black shadow-2xl shadow-emerald-500/40 flex items-center justify-center gap-3 text-xl disabled:opacity-50 uppercase tracking-tighter"
            >
              {isPlacing ? t('processing') : (
                <>
                  <WhatsAppIcon size={24} />
                  {t('place_order')} • 777 
                  <ArrowRight size={24} />
                </>
              )}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600/50">
               <ShieldCheck size={16} />
               <span className="text-[8px] font-black uppercase tracking-[0.2em]">Verified 777 Secure Portal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
