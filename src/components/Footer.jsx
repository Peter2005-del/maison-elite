import { Link } from 'react-router-dom';
import { Mail, Github, Instagram, Twitter, MapPin, Phone, Award, ShieldCheck, History, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  enterprise: [
    { name: 'Collections', path: '/collections' },
    { name: 'Atelier Portfolio', path: '/portfolio' },
    { name: 'Boutique Shop', path: '/shop' },
    { name: 'Private Services', path: '/services' },
  ],
  support: [
    { name: 'The Maison Story', path: '/about' },
    { name: 'Contact Concierge', path: '/contact' },
    { name: 'Shipping Policy', path: '#' },
    { name: 'Terms of Service', path: '#' },
  ],
  legal: [
    { name: 'Privacy Protocol', path: '#' },
    { name: 'Authentication', path: '#' },
    { name: 'Sustainability', path: '#' },
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden">
      <div className="container-custom pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
               <div className="w-12 h-12 border-2 border-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-500">
                  <span className="font-serif text-2xl font-bold italic">M</span>
               </div>
               <span className="font-serif text-3xl tracking-[0.3em] pt-1 font-semibold">MAISON ÉLITE</span>
            </Link>
            
            <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed max-w-md">
              A legacy of architectural luxury and heritage craftsmanship. We redefine the boundaries between couture, art, and modern lifestyle.
            </p>

            <div className="flex gap-6">
               {[Instagram, Twitter, Github].map((Icon, i) => (
                 <a key={i} href="#" className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] transition-all">
                    <Icon size={20} />
                 </a>
               ))}
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-[var(--border-color)] shadow-sm relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)] mb-4">Newsletter Dispatch</h4>
                  <div className="flex gap-4">
                     <input type="email" placeholder="Concierge@client.com" className="flex-1 bg-[var(--bg-secondary)] border-none px-6 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[var(--accent-color)] transition-all" />
                     <button className="w-12 h-12 bg-[var(--accent-color)] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform">
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)]">Enterprise</h4>
            <ul className="space-y-4">
              {footerLinks.enterprise.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)]">House</h4>
            <ul className="space-y-4">
              {footerLinks.support.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-10">
             <div className="bg-[var(--accent-color)] text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-20 rotate-[-15deg]">
                   <Award size={100} />
                </div>
                <div className="relative z-10">
                   <h4 className="text-[10px] font-black tracking-[0.4em] uppercase mb-4 opacity-70">Contact Office</h4>
                   <p className="text-xl font-bold mb-6">30 Avenue Montaigne, Paris</p>
                   <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase">
                      <Phone size={14} /> +33 1 44 11 00 00
                   </div>
                </div>
             </div>
             
             <div className="flex flex-wrap gap-4 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <ShieldCheck size={24} />
                <History size={24} />
                <Award size={24} />
                <MapPin size={24} />
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} MAISON ÉLITE ATELIER. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
             {['TERMS', 'PRIVACY', 'COOKIES'].map(item => (
               <a key={item} href="#" className="text-[10px] font-black tracking-widest text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-colors">{item}</a>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
