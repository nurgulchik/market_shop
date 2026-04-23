import { User, Heart, Clock, Award, Settings, ChevronRight } from 'lucide-react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center space-x-6 mb-12">
        <div className="w-24 h-24 rounded-full bg-emerald-500 p-1 shadow-xl shadow-emerald-500/20">
          <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-gray-800">
             <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-black text-[var(--text-color)] tracking-tighter uppercase">John Doe</h1>
          <p className="text-[var(--muted-text)] mt-1 font-bold">Premium Member • Joined 2024</p>
          <div className="mt-3 flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest w-max shadow-lg shadow-emerald-500/20">
             <Award size={14} /> 1,240 Loyalty Points
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {[
            { id: 'orders', icon: Clock, label: 'Order History', color: 'text-emerald-500' },
            { id: 'wishlist', icon: Heart, label: 'Wishlist', color: 'text-red-500' },
            { id: 'profile', icon: User, label: 'Personal Info', color: 'text-amber-500' },
            { id: 'settings', icon: Settings, label: 'Settings', color: 'text-slate-500' },
          ].map(menu => (
            <button key={menu.id} className="w-full bg-[var(--card-bg)] p-5 rounded-[2rem] border border-[var(--border-color)] flex items-center justify-between hover:border-emerald-500 transition-all group">
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 ${menu.color} group-hover:scale-110 transition-transform shadow-sm`}>
                     <menu.icon size={20} />
                  </div>
                  <span className="font-black uppercase text-xs tracking-widest">{menu.label}</span>
               </div>
               <ChevronRight size={20} className="text-[var(--muted-text)] group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-6">
           {/* Quick Reorder Widget */}
           <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-xl shadow-black/5">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-black uppercase tracking-tighter">Quick Reorder</h2>
                 <button className="text-xs text-emerald-600 font-black uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                 {/* Mock Past Order Items */}
                 {[
                   { name: 'Organic Bananas', img: 'https://images.unsplash.com/photo-1571501478200-8b1cc9c0c3c6?auto=format&fit=crop&q=80&w=150' },
                   { name: 'Whole Milk', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=150' },
                   { name: 'Sourdough', img: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?auto=format&fit=crop&q=80&w=150' }
                 ].map((item, i) => (
                    <div key={i} className="min-w-[140px] p-4 rounded-[2rem] border border-[var(--border-color)] flex flex-col items-center text-center bg-gray-50/50 dark:bg-gray-800/20">
                       <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-full mb-4 shadow-xl border-4 border-white dark:border-gray-800" />
                       <span className="font-bold text-[10px] uppercase tracking-wide line-clamp-1 w-full">{item.name}</span>
                       <button className="mt-4 w-full bg-emerald-500 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
                          Order
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Recent Orders List */}
           <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-xl shadow-black/5">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Recent Orders</h2>
              <div className="space-y-4">
                 {[
                   { id: '777-89230', date: 'Oct 24, 2024', total: '$42.50', status: 'Delivered', color: 'bg-emerald-100 text-emerald-700' },
                   { id: '777-89102', date: 'Oct 18, 2024', total: '$115.20', status: 'Delivered', color: 'bg-emerald-100 text-emerald-700' },
                   { id: '777-88544', date: 'Oct 02, 2024', total: '$34.00', status: 'Refunded', color: 'bg-amber-100 text-amber-700' }
                 ].map(order => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-3xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all border border-transparent hover:border-emerald-500/20 group">
                       <div className="mb-3 sm:mb-0">
                          <p className="font-black text-sm uppercase tracking-tighter group-hover:text-emerald-500 transition-colors">{order.id}</p>
                          <p className="text-[10px] font-bold text-[var(--muted-text)] uppercase tracking-widest">{order.date}</p>
                       </div>
                       <div className="flex items-center gap-6">
                          <span className="font-black text-lg tracking-tighter">{order.total}</span>
                          <span className={`text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full ${order.color}`}>{order.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
