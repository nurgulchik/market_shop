import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, Youtube } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-8 border-t-[16px] border-emerald-500 rounded-t-[4rem] mt-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none select-none">
        <div className="text-[200px] font-black italic leading-none rotate-12">777</div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">
          
          {/* Brand & Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50">
                <span className="text-white font-black text-2xl">7</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-white uppercase">
                777<span className="text-emerald-500">MARKET</span>
              </h2>
            </div>
            <p className="text-gray-400 font-bold leading-relaxed">
              Сиздин эң мыкты онлайн дүкөнүңүз. Сапаттуу азык-түлүктөр, тез жеткирүү жана 777 арзандатуулар.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-gray-800 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">Дарек</span>
                  <span className="font-bold text-gray-300">Бишкек шаары, Чүй проспектиси 77</span>
                </div>
              </div>
              
              <a href="https://wa.me/996777777777" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                <div className="p-3 bg-emerald-500 rounded-2xl text-white group-hover:scale-110 transition-all shadow-xl shadow-emerald-500/20">
                  <WhatsAppIcon size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">WhatsApp (Негизги)</span>
                  <span className="font-black text-white text-xl tracking-tighter">+996 777 777 777</span>
                </div>
              </a>

              <div className="flex items-center gap-4 group pt-2">
                <div className="p-3 bg-gray-800 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500 mb-1">Email</span>
                  <span className="font-bold text-gray-300">info@777market.kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white border-l-4 border-emerald-500 pl-4">
              Биз соц тармактарда
            </h3>
            <p className="text-gray-400 font-bold">
              Биздин баракчаларга жазылып, жаңылыктардан жана акциялардан биринчилерден болуп кабардар болуңуз.
            </p>
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: Instagram, color: 'hover:bg-pink-600', link: '#' },
                { icon: Facebook, color: 'hover:bg-blue-600', link: '#' },
                { icon: Twitter, color: 'hover:bg-sky-500', link: '#' },
                { icon: Youtube, color: 'hover:bg-red-600', link: '#' },
              ].map((social, i) => (
                <a key={i} href={social.link} className={`w-full aspect-square bg-gray-800 rounded-3xl flex items-center justify-center transition-all shadow-xl text-gray-400 hover:text-white ${social.color}`}>
                  <social.icon size={28} />
                </a>
              ))}
            </div>
            
            <div className="pt-6">
               <a href="https://wa.me/996777777777" className="flex items-center justify-center gap-3 bg-emerald-500 text-white font-black uppercase tracking-widest text-xs py-5 rounded-3xl shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all w-full">
                  <WhatsAppIcon size={20} />
                  WhatsApp аркылуу жазуу
               </a>
            </div>
          </div>

          {/* Google Map */}
          <div className="space-y-4 lg:col-span-1 md:col-span-2">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-white border-l-4 border-emerald-500 pl-4">
              Биз кайдабыз?
            </h3>
            <div className="w-full h-80 rounded-[3rem] overflow-hidden border-8 border-gray-800 shadow-2xl shadow-black/50 group">
              <iframe
                src="https://maps.google.com/maps?q=Bishkek&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[40%] contrast-[1.2] group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2026 777 MARKET. Бардык укуктар корголгон.
          </p>
          <div className="flex gap-8 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
