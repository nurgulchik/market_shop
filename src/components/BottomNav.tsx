import { Home, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const { t } = useTranslation();
  const location = useLocation();
  const { totalItems, setIsOpen } = useCartStore();

  const navItems = [
    { icon: Home, path: '/', label: t('home') },
    { icon: Search, path: '#search', label: t('search'), isSearch: true },
    { icon: ShoppingBag, path: '/checkout', label: t('cart'), isCart: true },
    { icon: Heart, path: '/wishlist', label: t('wishlist') },
    { icon: User, path: '/profile', label: t('profile') },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-color)]/95 backdrop-blur-xl border-t border-[var(--border-color)] px-4 pb-safe">
      <div className="flex items-center justify-between h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={() => setIsOpen(true)}
                className="relative flex flex-col items-center justify-center w-full gap-1"
              >
                <div className={`p-1 transition-colors ${isActive ? 'text-emerald-500' : 'text-[var(--muted-text)]'}`}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>

                  <span className="absolute top-0 right-1/2 translate-x-4 -mt-1 w-4 h-4 bg-emerald-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border border-[var(--bg-color)]">
                    {totalItems}
                  </span>

                <span className="text-[10px] font-black uppercase tracking-widest leading-none scale-75 origin-top">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full gap-1 transition-all ${isActive ? 'text-emerald-500' : 'text-[var(--muted-text)]'}`}
            >
              <div className="p-1">
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none scale-75 origin-top">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
