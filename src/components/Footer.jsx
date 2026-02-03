import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, ArrowUpRight, Globe, Languages, ShieldCheck, Sparkles, Smartphone } from 'lucide-react';

const footerLinks = {
  Atelier: [
    { name: 'Latest Volumes', path: '/collections' },
    { name: 'Bespoke Private Decree', path: '/collections' },
    { name: 'High Archival Pieces', path: '/shop' },
    { name: 'Identity Membership', path: '/login' },
  ],
  Experience: [
    { name: 'Cross-Device Sync', path: '/profile' },
    { name: 'Virtual Architecture', path: '/services' },
    { name: 'Concierge Direct', path: '/contact' },
    { name: 'House Chronology', path: '/about' },
  ],
  Boutiques: [
    { name: 'Paris Saint-Honoré', path: '#' },
    { name: 'New York Fifth Ave', path: '#' },
    { name: 'Tokyo Ginza', path: '#' },
    { name: 'London Mayfair', path: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram', url: '#' },
  { icon: Facebook, label: 'Facebook', url: '#' },
  { icon: Twitter, label: 'Twitter', url: '#' },
  { icon: Mail, label: 'Email', url: 'mailto:atelier@maisonelite.com' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-32">
      {/* Upper Footer - Newsletter */}
      <div className="container-custom pb-32">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
               <Sparkles className="text-[var(--accent-color)]" size={32} />
               <span className="text-[var(--accent-color)] tracking-[0.6em] font-black uppercase text-[12px]">INNER CIRCLE</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white font-serif leading-none mb-8">THE <span className="gradient-text">ARCHIVE</span> LIST</h3>
            <p className="text-white/40 text-lg font-light max-w-lg leading-relaxed">
              Join our global heritage network for priority access to seasonal volumes and Indigo-tier private commissions.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[var(--accent-color)]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative flex flex-col sm:flex-row gap-6">
              <input 
                type="email" 
                placeholder="YOUR DIGITAL ADDRESS" 
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white text-[11px] tracking-[0.4em] font-black uppercase focus:border-[var(--accent-color)] outline-none transition-all placeholder:text-white/20"
              />
              <button className="bg-white text-black px-12 py-6 rounded-2xl text-[11px] font-black tracking-[0.5em] hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-2xl">SUBSCRIBE</button>
            </div>
            <div className="mt-6 flex items-center gap-3">
               <ShieldCheck className="text-green-500/50" size={14} />
               <span className="text-[9px] text-white/20 uppercase tracking-widest font-black">Encrypted via RSA Hybrid Cryptosystem</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-custom py-32 border-y border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-12">
            <Link to="/" className="group inline-block">
               <span className="font-serif text-3xl tracking-[0.4em] text-[var(--accent-color)] uppercase block group-hover:scale-105 transition-transform duration-700">
                  MAISON ÉLITE
               </span>
               <div className="h-0.5 w-full bg-gradient-to-r from-[var(--accent-color)] to-transparent mt-2" />
            </Link>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-sm">
              Defining the elite standard of architectural luxury. Every thread is a verified historical asset.
            </p>
            <div className="flex gap-6">
               {socialLinks.map(({ icon: Icon, label, url }) => (
                 <a 
                   key={label}
                   href={url}
                   className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all duration-500 hover:-translate-y-2 group shadow-xl"
                   aria-label={label}
                 >
                   <Icon size={24} className="group-hover:rotate-12 transition-transform" />
                 </a>
               ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-10">
              <h4 className="text-[12px] font-black uppercase tracking-[0.6em] text-white">
                {title}
              </h4>
              <ul className="space-y-6">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-white/30 hover:text-[var(--accent-color)] transition-all text-[11px] font-black uppercase tracking-widest flex items-center gap-3 group"
                    >
                      {link.name}
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#050505] py-12">
        <div className="container-custom flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-10 text-white/30 overflow-x-auto w-full lg:w-auto pb-4 lg:pb-0 no-scrollbar">
             <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer shrink-0">
                <Globe size={16} /> <span className="text-[10px] font-black tracking-[0.4em] uppercase">GLOBAL NETWORK</span>
             </div>
             <div className="w-px h-6 bg-white/10 shrink-0" />
             <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer shrink-0">
                <Smartphone size={16} /> <span className="text-[10px] font-black tracking-[0.4em] uppercase">DEVICE SYNC ACTIVE</span>
             </div>
          </div>

          <p className="text-white/20 text-[10px] uppercase font-black tracking-[0.6em] text-center lg:text-left order-3 lg:order-2">
            © {new Date().getFullYear()} MAISON ÉLITE ATELIER. ALL RIGHTS INDEXED.
          </p>

          <div className="flex flex-wrap justify-center gap-10 order-2 lg:order-3">
             {['Privacy', 'Legal', 'Ledger'].map(item => (
                <a key={item} href="#" className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-[var(--accent-color)] transition-colors">
                  {item}
                </a>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
