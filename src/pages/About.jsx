import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Sparkles, Fingerprint, Globe, ShieldCheck, ArrowRight, History, Heart, Star } from 'lucide-react';

const values = [
  { 
    title: 'Architectural precision', 
    desc: 'Every garment is engineered with the rigor of structural architecture, ensuring a silhouette that transcends time.',
    icon: Fingerprint 
  },
  { 
    title: 'Heritage Narrative', 
    desc: 'We don’t just create fashion; we weave historical documents. Each piece tells the story of its provenance.',
    icon: History 
  },
  { 
    title: 'Artisan Custody', 
    desc: 'Ensuring the highest standard of sustainable handcrafted heritage through audited atelier networks.',
    icon: Heart 
  },
];

const timeline = [
  { year: '2008', title: 'The Genesis', desc: 'Maison Élite was founded as a private bespoke atelier in Saint-Honoré, Paris.' },
  { year: '2015', title: 'Global expansion', desc: 'Opening of flagship Maison galleries in Milan, New York, and Tokyo.' },
  { year: '2022', title: 'The Archive Ledger', desc: 'Launched the first verified digital archive tracing the lineage of every commissioned piece.' },
  { year: '2026', title: 'Modern Renaissance', desc: 'Unifying timeless craftsmanship with a seamless global e-commerce experience.' },
];

export default function About() {
  return (
    <div className="bg-[#FDFCF8] overflow-hidden">
      {/* Hero Section - Brighter & More Ethereal */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#FDFCF8]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Atelier" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FDFCF8]/20 via-transparent to-[#FDFCF8]" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[10px] font-black mb-10 block"
          >
            A PURE LEGACY OF EXCELLENCE
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-[9rem] font-serif uppercase tracking-tighter text-black mb-12 leading-[0.85]"
          >
            AUTHENTIC <br/><span className="gradient-text italic font-normal">HERITAGE</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto font-light leading-relaxed px-4"
          >
            Redefining the boundaries between high couture and structural art. We are the stewards of a multi-generational legacy in elegance.
          </motion.p>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
           <motion.div 
             animate={{ y: [0, 15, 0] }}
             transition={{ duration: 2.5, repeat: Infinity }}
             className="w-px h-24 bg-gradient-to-b from-[var(--accent-color)] to-transparent"
           />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 relative bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl uppercase tracking-tighter mb-12 leading-none text-black">CUSTODIANS OF <br/><span className="gradient-text italic font-serif">ARTISTRY</span></h2>
              <p className="text-xl text-[var(--text-secondary)] mb-16 leading-relaxed font-light">
                At Maison Élite, we believe that a garment is a calculated structural statement. Our philosophy merges the mathematical precision of modern architecture with the visceral beauty of classical Parisian couture.
              </p>
              <div className="space-y-12">
                {values.map((v, i) => (
                  <motion.div 
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 items-start group"
                  >
                    <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] shrink-0 border border-[var(--border-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-500">
                      <v.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-black mb-3">{v.title}</h4>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5.5] rounded-[4rem] overflow-hidden border border-[var(--border-color)] shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 p-10 backdrop-blur-2xl bg-white/90 border border-[var(--border-color)] rounded-[2.5rem] max-w-sm shadow-2xl">
                 <Star className="text-[var(--accent-color)] mb-6" fill="#C5A227" />
                 <p className="text-sm text-black font-semibold uppercase tracking-widest leading-loose">
                   "We do not build for the season, we build for the century."
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Brighter & More Elegant */}
      <section className="py-48 bg-[#FDFCF8] relative overflow-hidden border-y border-[var(--border-color)]">
        <div className="container-custom relative z-10">
          <div className="text-center mb-32">
            <span className="text-[var(--accent-color)] tracking-[0.4em] uppercase text-[10px] font-black mb-6 block">HISTORY IN THE MAKING</span>
            <h2 className="text-5xl md:text-8xl uppercase tracking-tighter text-black">THE <span className="gradient-text italic font-serif">CHRONICLE</span></h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-color)] hidden md:block" />
            
            <div className="space-y-32 md:space-y-0">
               {timeline.map((item, i) => (
                 <motion.div 
                   key={item.year}
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className={`flex flex-col md:flex-row gap-20 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                 >
                    <div className="md:w-1/2 flex justify-center md:justify-end md:pr-20">
                       <div className={`md:text-right ${i % 2 === 1 ? 'md:text-left md:pl-20' : ''}`}>
                          <span className="text-7xl md:text-[10rem] font-serif font-black text-[var(--accent-color)]/10 block mb-[-2rem]">{item.year}</span>
                          <h3 className="text-2xl font-black uppercase tracking-widest text-black relative z-10">{item.title}</h3>
                          <p className="text-[var(--text-secondary)] text-lg max-w-md mt-6 font-light leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                    
                    <div className="relative flex items-center justify-center shrink-0">
                       <div className="w-5 h-5 rounded-full bg-white border-4 border-[var(--accent-color)] shadow-2xl z-10" />
                       <div className="absolute w-16 h-16 rounded-full border border-[var(--accent-color)]/20 animate-ping" />
                    </div>
                    
                    <div className="md:w-1/2" />
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Section */}
      <section className="py-48 text-center bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
             <Globe className="text-[var(--accent-color)] mx-auto mb-12" size={80} />
             <h2 className="text-6xl md:text-9xl uppercase tracking-tighter mb-12 text-black leading-none">BORN IN PARIS. <br/><span className="gradient-text italic font-serif">UNIVERSAL LEGACY.</span></h2>
             <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed mb-20 px-4">
               Our ateliers span the globe, from the historic streets of Saint-Honoré to the modern heights of Ginza. Maison Élite is a borderless house for the discerning collector.
             </p>
             <Link to="/contact" className="btn-primary btn-large shadow-2xl">
                RESERVE A CONSULTATION <ArrowRight size={20} className="ml-3" />
             </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Certifications Bar - Refined */}
      <div className="bg-[#FDFCF8] py-20 border-t border-[var(--border-color)]">
        <div className="container-custom flex flex-wrap justify-center gap-16 md:gap-32 opacity-40 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-4 text-black">
              <ShieldCheck size={24} className="text-[var(--accent-color)]" /> <span className="text-[10px] font-black uppercase tracking-[0.5em]">CERTIFIED HERITAGE</span>
           </div>
           <div className="flex items-center gap-4 text-black">
              <History size={24} className="text-[var(--accent-color)]" /> <span className="text-[10px] font-black uppercase tracking-[0.5em]">AUDITED PROVENANCE</span>
           </div>
           <div className="flex items-center gap-4 text-black">
              <Award size={24} className="text-[var(--accent-color)]" /> <span className="text-[10px] font-black uppercase tracking-[0.5em]">GLOBAL EXCELLENCE</span>
           </div>
        </div>
      </div>
    </div>
  );
}
