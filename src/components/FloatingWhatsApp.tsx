import { motion } from 'motion/react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/996777777777"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[100] w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 cursor-pointer group"
    >
      <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
      <WhatsAppIcon size={32} className="relative z-10" />
      <div className="absolute right-full mr-4 bg-white dark:bg-black text-[var(--text-color)] px-4 py-2 rounded-2xl shadow-xl text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border-color)]">
        Жардам керекпи?
      </div>
    </motion.a>
  );
}
