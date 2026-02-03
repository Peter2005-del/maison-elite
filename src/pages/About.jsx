import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Sparkles, Fingerprint, Globe, ShieldCheck, Cpu } from 'lucide-react';

const values = [
  { 
    title: 'Architectural precision', 
    desc: 'Every structural silhouette is engineered with mathematical exactitude, adhering to the highest standards of heritage fashion.',
    icon: Cpu
  },
  { 
    title: 'Decentralized Heritage', 
    desc: 'Preserving centennial techniques while redefining modern luxury through blockchain-verified authenticity and digital sovereignty.',
    icon: ShieldCheck
  },
  { 
    title: 'Global Authority', 
    desc: 'A borderless atelier network providing structural masterpieces that command attention across all financial ecosystems.',
    icon: Globe
  },
];

const milestones = [
  { year: '1984', title: 'Atelier Inception', desc: 'Maison Élite established in Paris with a focus on gold-standard craftsmanship.' },
  { year: '2005', title: 'Digital Frontier', desc: 'Early adoption of digital couture mapping and virtual fitting protocols.' },
  { year: '2018', title: 'Blockchain Sovereignty', desc: 'Integration of immutable heritage certificates for every haute couture piece.' },
  { year: '2026', title: 'The Future Atelier', desc: 'Launch of the unified e-commerce portal with cross-device synchronization and dual-currency settlement.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="pt-48 pb-32 bg-black overflow-hidden relative border-b border-[var(--border-color)]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[var(--accent-color)] rounded-full blur-[180px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[var(--accent-color)] tracking-[0.8em] font-black uppercase text-[12px] mb-8 block">
                STRUCTURAL FOUNDATION
              </span>
              <h1 className="text-6xl md:text-9xl uppercase tracking-tighter mb-10 leading-[0.85] text-white font-serif">
                THE FUTURE <br />
                <span className="gradient-text">LEGACY</span>
              </h1>
              <div className="space-y-8 text-white/70 text-lg md:text-xl font-light leading-relaxed">
                <p>
                  Maison Élite stands as an architectural authority in the world of high fashion. Our philosophy is rooted in the permanent—creating structural masterpieces that transcend seasonal trends through the fusion of heritage craftsmanship and decentralized technology.
                </p>
                <p className="border-l-4 border-[var(--accent-color)] pl-8 italic">
                  "We do not just create garments; we engineer second skins that empower the modern connoisseur with an aura of absolute digital and physical sovereignty."
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-[3/4] rounded-[4rem] overflow-hidden border-2 border-[var(--accent-color)]/20 shadow-[-50px_50px_100px_rgba(0,0,0,0.5)] group h-full">
                <img 
                  src="https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=1000" 
                  alt="Maison Élite Atelier" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 border-[20px] border-black opacity-10 pointer-events-none" />
              </div>

              {/* Float Stats */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-12 -right-12 bg-black text-white p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] max-w-[300px] border-8 border-[var(--accent-color)]/20 z-20"
              >
                <div className="flex items-center gap-6 mb-4">
                  <p className="text-6xl font-black tracking-tighter text-[var(--accent-color)]">42</p>
                  <div className="h-12 w-px bg-black/10" />
                  <p className="text-[11px] font-black uppercase tracking-widest leading-tight">Elite <br/>Ateliers <br/>Worldwide</p>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Verified Heritage Chain Established 1984</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding bg-[var(--bg-secondary)] relative">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto mb-32">
            <span className="text-[var(--accent-color)] tracking-[0.5em] font-black uppercase text-[12px] mb-8 block">CORE PRINCIPLES</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-10 font-serif">OUR <span className="gradient-text">SYSTEM</span></h2>
            <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed">
              We operate at the intersection of monochromatic elegance and cryptographic security. Our system ensures every piece is a unique architectural asset.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-black p-12 rounded-[3.5rem] border border-white/5 hover:border-[var(--accent-color)]/50 transition-all duration-700 shadow-2xl group text-center"
              >
                <div className="w-24 h-24 bg-[var(--accent-color)]/10 rounded-[2rem] flex items-center justify-center mb-10 text-[var(--accent-color)] mx-auto group-hover:scale-110 group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-700 shadow-xl shadow-[var(--accent-color)]/5">
                  <val.icon size={44} />
                </div>
                 <h3 className="text-2xl uppercase tracking-[0.2em] mb-6 text-white font-serif">{val.title}</h3>
                <p className="text-[var(--text-secondary)] font-light text-lg leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-black overflow-hidden">
        <div className="container-custom">
           <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-10">
              <div className="max-w-2xl">
                 <span className="text-[var(--accent-color)] tracking-[0.6em] font-black uppercase text-[12px] mb-8 block">CHRONOLOGY</span>
                 <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white font-serif leading-none">THE <br/><span className="gradient-text">ASCENSION</span></h2>
              </div>
              <p className="text-xl text-white/50 font-light max-w-sm text-right">Four decades of structural evolution and technological integration.</p>
           </div>

           <div className="relative">
              {/* Central Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

              <div className="space-y-32">
                 {milestones.map((item, idx) => (
                   <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                   >
                      <div className="flex-1 text-center lg:text-right">
                         <div className={`${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                            <span className="text-[var(--accent-color)] text-6xl md:text-8xl font-black tracking-tighter opacity-20 block mb-6">{item.year}</span>
                            <h4 className="text-3xl text-white font-black uppercase tracking-widest mb-6 font-serif">{item.title}</h4>
                            <p className="text-xl text-white/60 font-light leading-relaxed max-w-xl mx-auto lg:mx-0 inline-block">{item.desc}</p>
                         </div>
                      </div>

                      <div className="w-20 h-20 bg-black border-4 border-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--accent-color)] font-black text-xs z-10 shrink-0 shadow-[0_0_30px_rgba(201,162,39,0.3)]">
                         {item.year.slice(-2)}
                      </div>

                      <div className="flex-1 hidden lg:block" />
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-48 bg-[var(--bg-secondary)] relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--accent-color)] rounded-full blur-[150px]" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Sparkles className="text-[var(--accent-color)] mx-auto mb-12 animate-pulse" size={64} />
            <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter mb-12 leading-[0.85] text-white font-serif">
              OWN THE <br/><span className="gradient-text">ARCHITECTURE</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <Link to="/contact" className="btn-primary btn-large shadow-2xl">
                BOOK ATELIER SESSION
              </Link>
              <Link to="/shop" className="btn-outline btn-large">
                BROWSE ARCHIVES
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
