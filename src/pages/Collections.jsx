import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, History, Layers, ShieldCheck } from 'lucide-react';

const collections = [
  {
    title: "L'Aube Indigo",
    season: "Spring/Summer 2026",
    desc: 'Meticulously crafted using heritage solar-dried silks and indigo-thread embroidery. A tribute to modern horizons and celestial symmetry.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    category: 'Evening',
    link: '/portfolio'
  },
  {
    title: 'Digital Ivory',
    season: "Autumn/Winter 2025",
    desc: 'An exploration of monochromatic textures, where physical weaving meets algorithmic precision. The height of structural minimalism.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
    category: 'Ready-to-Wear',
    link: '/portfolio'
  },
  {
    title: 'Monarque Private',
    season: "Bespoke Series",
    desc: 'Exclusively commissioned pieces for the House’s most dedicated collectors. Each garment is a unique historical document.',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=1200',
    category: 'Custom',
    link: '/portfolio'
  },
  {
    title: 'Heritage Classics',
    season: "Permanent Collection",
    desc: 'The essential core pieces that define the structural language of the House. Permanent assets for the modern archival collector.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200',
    category: 'Archives',
    link: '/shop'
  }
];

export default function Collections() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 overflow-hidden">
      {/* Header */}
      <section className="container-custom mb-24">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl"
         >
           <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block">THE ARCHIVAL LEDGER</span>
           <h1 className="text-6xl md:text-[9rem] leading-[0.8] font-serif uppercase tracking-tighter text-white mb-10">THE <br/><span className="gradient-text">VOLUMES</span></h1>
           <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl">
             Explore our chronological registry of creative excellence. Each collection is a verified asset in the Maison Élite heritage network.
           </p>
         </motion.div>
      </section>

      {/* Grid */}
      <section className="container-custom">
        <div className="grid md:grid-cols-2 gap-12">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all duration-700 shadow-2xl">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div className="max-w-md">
                       <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{col.season}</span>
                       <h2 className="text-4xl font-serif text-white uppercase tracking-tight mb-6 group-hover:translate-x-4 transition-transform duration-700">{col.title}</h2>
                       <p className="text-white/60 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                         {col.desc}
                       </p>
                    </div>
                    <Link 
                      to={col.link}
                      className="w-16 h-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all group/btn"
                    >
                      <ArrowRight size={24} className="group-hover/btn:rotate-[-45deg] transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-8 left-8 flex gap-3">
                   <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                      <Layers size={14} className="text-[var(--accent-color)]" />
                      <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">{col.category}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-32 bg-black border-y border-white/5 mt-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/20 rounded-full animate-spin-slow" />
        </div>
        <div className="container-custom relative z-10 text-center">
           <div className="max-w-2xl mx-auto">
              <Sparkles className="text-[var(--accent-color)] mx-auto mb-10" size={48} />
              <h3 className="text-3xl font-serif text-white uppercase tracking-widest mb-8">VERIFIED PROVENANCE</h3>
              <div className="h-px w-24 bg-[var(--accent-color)] mx-auto mb-10" />
              <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed">
                Every collection is cataloged in the House's permanent registry. We provide cryptographic proof of authenticity for every volume released since MMVIII.
              </p>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 text-center">
         <div className="container-custom">
            <h2 className="text-5xl md:text-8xl uppercase tracking-tighter mb-16">SEEKING <br/><span className="gradient-text">CUSTOMIZATIONS?</span></h2>
            <div className="flex justify-center flex-wrap gap-8">
               <Link to="/contact" className="btn-primary">START PRIVATE DECREE</Link>
               <Link to="/portfolio" className="btn-outline">VIEW MASTERPIECES</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
