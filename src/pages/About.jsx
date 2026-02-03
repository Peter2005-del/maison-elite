import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Sparkles, Fingerprint, Globe, ShieldCheck, Cpu, ArrowRight, History } from 'lucide-react';

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
    title: 'Digital Sovereignty', 
    desc: 'Integrating future-finance and cross-device synchronization into the heart of the luxury experience.',
    icon: Cpu 
  },
];

const timeline = [
  { year: '2018', title: 'The Genesis', desc: 'Maison Élite was founded as a private atelier in Saint-Honoré, Paris.' },
  { year: '2021', title: 'Global Expansion', desc: 'Opening of the flagship "Digital Ivory" galleries in New York and Tokyo.' },
  { year: '2024', title: 'Cryptographic Era', desc: 'First luxury house to fully integrate blockchain-verified asset tracking for every piece.' },
  { year: '2026', title: 'The Future Atelier', desc: 'Launch of the unified e-commerce portal with cross-device synchronization and dual-currency settlement.' },
];

export default function About() {
  return (
    <div className="bg-[var(--bg-primary)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            alt="Atelier" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[var(--bg-primary)]" />
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block"
          >
            ESTABLISHED MMVIII
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-serif uppercase tracking-tighter text-white mb-10"
          >
            THE <span className="gradient-text">MAISON</span> STORY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed px-4"
          >
            A legacy of architectural luxury, redefining the boundaries between couture, art, and the digital frontier.
          </motion.p>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
           <motion.div 
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-px h-20 bg-gradient-to-b from-[var(--accent-color)] to-transparent"
           />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 md:py-48 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl uppercase tracking-tighter mb-10 leading-tight">ARCHITECTS OF <br/><span className="gradient-text">ETERNITY</span></h2>
              <p className="text-xl text-[var(--text-secondary)] mb-12 leading-relaxed">
                At Maison Élite, we believe that a garment is more than just fabric—it is a structural statement. Each volume we release is the result of thousands of hours of research, development, and heritage craftsmanship.
              </p>
              <div className="space-y-8">
                {values.map((v, i) => (
                  <motion.div 
                    key={v.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-12 h-12 bg-[var(--accent-color)]/10 rounded-xl flex items-center justify-center text-[var(--accent-color)] shrink-0 border border-[var(--accent-color)]/20">
                      <v.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">{v.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden border border-[var(--border-color)] shadow-3xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl max-w-xs">
                 <Sparkles className="text-[var(--accent-color)] mb-4" />
                 <p className="text-xs text-white/80 font-medium uppercase tracking-widest leading-loose">
                   "Precision is not an option; it is our only language."
                 </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-color)]/5 rounded-full blur-[120px]" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-24">
            <span className="text-[var(--accent-color)] tracking-[0.4em] uppercase text-[11px] font-black mb-4 block">OUR JOURNEY</span>
            <h2 className="text-4xl md:text-7xl uppercase tracking-tighter">THE <span className="gradient-text">ERA</span> SCALE</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />
            
            <div className="space-y-24 md:space-y-0">
               {timeline.map((item, i) => (
                 <motion.div 
                   key={item.year}
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className={`flex flex-col md:flex-row gap-12 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                 >
                    <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 group">
                       <div className={`md:text-right ${i % 2 === 1 ? 'md:text-left md:pl-12' : ''}`}>
                          <span className="text-6xl md:text-8xl font-serif font-black text-white/5 group-hover:text-[var(--accent-color)]/20 transition-colors duration-700">{item.year}</span>
                          <h3 className="text-xl font-black uppercase tracking-widest text-white mt-[-2rem]">{item.title}</h3>
                          <p className="text-[var(--text-muted)] text-sm max-w-md mt-4 leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                    
                    <div className="relative flex items-center justify-center shrink-0">
                       <div className="w-4 h-4 rounded-full bg-[var(--accent-color)] shadow-[0_0_20px_var(--accent-color)] z-10" />
                       <div className="absolute w-12 h-12 rounded-full border border-[var(--accent-color)]/20 animate-ping" />
                    </div>
                    
                    <div className="md:w-1/2" />
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-48 text-center bg-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
             <Globe className="text-[var(--accent-color)] mx-auto mb-10" size={64} />
             <h2 className="text-5xl md:text-8xl uppercase tracking-tighter mb-10">BORN IN PARIS. <br/><span className="gradient-text">BEYOND BORDERS.</span></h2>
             <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-16 px-4">
               With studios in Paris, flagship galleries in New York and Tokyo, and a global distribution network, Maison Élite serves the world’s most discerning collectors.
             </p>
             <Link to="/contact" className="btn-primary group">
                RESERVE AN APPOINTMENT <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Certifications Bar */}
      <div className="bg-black py-16 border-t border-white/5">
        <div className="container-custom flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-crosshair">
              <ShieldCheck size={20} /> <span className="text-[10px] font-black uppercase tracking-[0.4em]">VERIFIED ATHENTIC</span>
           </div>
           <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-crosshair">
              <History size={20} /> <span className="text-[10px] font-black uppercase tracking-[0.4em]">LEDGER PROVENANCE</span>
           </div>
           <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-crosshair">
              <Award size={20} /> <span className="text-[10px] font-black uppercase tracking-[0.4em]">ISO-9001 CRAFT</span>
           </div>
        </div>
      </div>
    </div>
  );
}
