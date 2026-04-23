import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle2, ChevronRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const STATUSES = [
  { id: 'processing', label: 'Processing', icon: Package, time: '10:05 AM' },
  { id: 'packed', label: 'Packed & Ready', icon: Package, time: '10:45 AM' },
  { id: 'delivery', label: 'Out for Delivery', icon: Truck, time: '11:15 AM' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2, time: 'Pending' },
];

export default function LiveTracking() {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  // Simulate status progression
  useEffect(() => {
    if (currentStatusIndex >= STATUSES.length - 1) return;
    const timer = setTimeout(() => {
      setCurrentStatusIndex(prev => prev + 1);
    }, 4000); // Progress every 4 seconds for demo
    return () => clearTimeout(timer);
  }, [currentStatusIndex]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[var(--text-color)]">Live Tracking</h1>
          <p className="text-[var(--muted-text)] mt-2">Order #FRSH-89230 • Estimated arrival: 11:45 AM</p>
        </div>
        <Link to="/" className="text-[var(--color-primary-600)] font-semibold border border-[var(--color-primary-200)] px-4 py-2 rounded-full hover:bg-[var(--color-primary-50)] transition-colors">
           Back Home
        </Link>
      </div>

      <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-xl">
        {/* Mock Map Area */}
        <div className="h-64 relative bg-gray-200 dark:bg-gray-800 w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=800x400&sensor=false&style=feature:all|element:labels|visibility:off')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
          {/* Animated Delivery Truck on Map */}
          {currentStatusIndex >= 2 && currentStatusIndex < 3 && (
             <motion.div 
               initial={{ left: '10%', top: '20%' }}
               animate={{ left: '70%', top: '60%' }}
               transition={{ duration: 10, ease: "linear" }}
               className="absolute z-10 p-2 bg-white rounded-full shadow-lg border-2 border-[var(--color-primary-500)] text-[var(--color-primary-600)]"
             >
               <Truck size={24} />
             </motion.div>
          )}
          {/* Destination Pin */}
          <div className="absolute left-[75%] top-[65%] z-10 p-2 text-red-500 animate-bounce">
             <MapPin size={32} className="drop-shadow-lg" fill="white" />
          </div>
          
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow border border-gray-200 font-semibold text-sm text-gray-800">
             ETA: 18 mins
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="p-8">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-[var(--border-color)]"></div>
            
            {/* Active Line Fill */}
            <motion.div 
               className="absolute left-[23px] top-4 w-0.5 bg-[var(--color-primary-500)]"
               initial={{ height: '0%' }}
               animate={{ height: `${(currentStatusIndex / (STATUSES.length - 1)) * 100}%` }}
               transition={{ duration: 0.5 }}
               style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-10 relative z-10 w-full pl-0">
              {STATUSES.map((status, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isActive = index === currentStatusIndex;
                const Icon = status.icon;

                return (
                  <div key={status.id} className="flex gap-6 items-start w-full relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors z-10 bg-[var(--card-bg)] shrink-0 ${
                      isCompleted 
                        ? 'border-[var(--color-primary-500)] text-[var(--color-primary-600)] shadow-[0_0_0_4px_rgba(90,99,77,0.2)]' 
                        : 'border-[var(--border-color)] text-[var(--muted-text)]'
                    }`}>
                      <Icon size={20} strokeWidth={isCompleted ? 2.5 : 2} />
                    </div>
                    
                    <div className="pt-2 flex-grow">
                      <h3 className={`text-lg font-bold transition-colors ${
                        isCompleted ? 'text-[var(--text-color)]' : 'text-[var(--muted-text)]'
                      }`}>
                        {status.label}
                      </h3>
                      {isActive && index < STATUSES.length - 1 && (
                        <p className="text-sm text-[var(--color-primary-600)] mt-1 font-medium bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)] inline-block px-3 py-1 rounded-full">
                          Currently in progress...
                        </p>
                      )}
                      {status.time && isCompleted && (
                        <p className="text-sm text-[var(--muted-text)] mt-1">{status.time}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Courier Info / Call to Action */}
        {currentStatusIndex >= 2 && currentStatusIndex < 3 && (
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)]/40 p-6 border-t border-[var(--color-primary-100)] dark:border-[var(--color-primary-900)] flex items-center justify-between"
          >
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-sm">
                   <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" alt="Courier" />
                </div>
                <div>
                   <p className="font-bold text-[var(--text-color)]">Alex is on the way!</p>
                   <p className="text-sm text-[var(--muted-text)]">Toyota Prius • ABC 123</p>
                </div>
             </div>
             <button className="bg-white dark:bg-gray-800 text-[var(--text-color)] px-5 py-2 rounded-full font-semibold shadow border border-[var(--border-color)]">
                Contact
             </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
