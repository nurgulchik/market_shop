import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, X } from 'lucide-react';

export default function SpinWheel() {
  const [isOpen, setIsOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [won, setWon] = useState<string | null>(null);

  useEffect(() => {
    // Show spinner after 5 seconds on first visit
    const shown = sessionStorage.getItem('spinWheelShown');
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('spinWheelShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const segments = ['777 OFF', 'Free Ship', '7% OFF', 'Try Again', '27% OFF', '$7 Coupon'];
  const segmentColors = [
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#059669', 
    '#d97706',
    '#064e3b', 
    '#b45309'
  ];

  const spin = () => {
    if (spinning || won) return;
    setSpinning(true);
    
    // Random segment (0-5)
    // We want it to spin a lot (e.g., 5 full rotations + some segment)
    const randomSegment = Math.floor(Math.random() * segments.length);
    const extraDegrees = 360 - (randomSegment * 60 + 30); // Center of segment
    const totalRotation = rotation + 360 * 5 + extraDegrees;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setWon(segments[randomSegment]);
    }, 4000); // 4s animation
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--card-bg)] p-8 rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 shadow-xl shadow-emerald-500/20">
                   <Gift size={32} />
                </div>
                <h2 className="text-3xl font-black text-[var(--text-color)] uppercase tracking-tighter">
                  {won ? 'Jackpot!' : '777 Spin!'}
                </h2>
                <p className="text-[var(--muted-text)] mt-2 font-bold">
                  {won ? `You hit the ${won}! Check your account.` : 'Unlock premium 777 discounts today.'}
                </p>
              </div>

              {!won ? (
                <div className="relative w-64 h-64 mx-auto my-8">
               {/* Pointer */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-emerald-600">
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-current drop-shadow-md"></div>
                  </div>

                  {/* Wheel */}
                  <div 
                    className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden relative transition-transform duration-[4000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {segments.map((seg, i) => {
                       const angle = i * 60;
                       return (
                         <div 
                           key={i} 
                           className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center"
                           style={{
                             transform: `rotate(${angle}deg) skewY(30deg)`,
                             backgroundColor: segmentColors[i],
                             boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
                           }}
                         />
                       );
                    })}
                    {/* Text overlays (done with absolute positioning above the wheel structure) */}
                    {segments.map((seg, i) => {
                       const angle = i * 60 + 30; // Center of the slice
                       return (
                         <div 
                           key={i} 
                           className="absolute inset-0 flex items-start justify-center pt-8 text-white font-bold text-sm"
                           style={{ transform: `rotate(${angle}deg)` }}
                         >
                           <span className="w-20 text-center" style={{ transform: 'rotate(-90deg)' }}>{seg}</span>
                         </div>
                       );
                    })}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay opacity-30"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-gray-800 shadow-xl border-4 border-gray-100 z-10">
                        <Gift size={20} className="text-orange-500" />
                     </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 flex items-center justify-center">
                   <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                      {won}
                   </div>
                </div>
              )}

              {!won && (
                <button 
                  onClick={spin}
                  disabled={spinning}
                  className="w-full mt-4 bg-[var(--text-color)] text-[var(--bg-color)] py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 uppercase tracking-wider"
                >
                  {spinning ? 'Spinning...' : 'Spin Now'}
                </button>
              )}
              {won && (
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="w-full mt-4 bg-[var(--color-primary-500)] text-white py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform uppercase tracking-wider"
                 >
                   Claim Reward
                 </button>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
