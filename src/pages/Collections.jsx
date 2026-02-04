import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

const collections = [
  {
    title: "L'Aube Dorée",
    season: "Spring/Summer 2026",
    desc: 'Meticulously crafted using golden silks and heritage hand-embroidery. A tribute to modern horizons and celestial symmetry.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    category: 'Evening',
    link: '/portfolio'
  },
  {
    title: 'Ivory Structural',
    season: "Autumn/Winter 2025",
    desc: 'An exploration of monochromatic textures, where architectural lines meet algorithmic precision. The height of structural minimalism.',
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
    title: 'Heritage Archives',
    season: "Permanent Collection",
    desc: 'The essential core pieces that define the structural language of the House. Permanent assets for the modern collector.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1200',
    category: 'Archives',
    link: '/shop'
  }
];

export default function Collections() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-40 pb-20 overflow-hidden">
      {/* Header */}
      <section className="container-custom mb-32">
         <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-5xl"
         >
           <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[11px] font-black mb-10 block">THE ARCHIVAL REGISTRY</span>
           <h1 className="text-6xl md:text-[9rem] leading-[0.8] font-serif uppercase tracking-tighter text-black mb-12">THE <br/><span className="gradient-text italic font-normal">VOLUMES</span></h1>
           <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed max-w-3xl">
             Explore our chronological chronicle of creative excellence. Each collection is a certified asset in the Maison Élite heritage lineage.
           </p>
         </motion.div>
      </section>

      {/* Grid - Brighter & More Spaced */}
      <section className="container-custom">
        <div className="grid md:grid-cols-2 gap-16">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/11] rounded-[3.5rem] overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all duration-1000 shadow-sm hover:shadow-2xl">
                <img 
                  src={col.image} 
                  alt={col.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div className="max-w-md">
                       <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">{col.season}</span>
                       <h2 className="text-4xl md:text-5xl font-serif text-white uppercase tracking-tight mb-8 group-hover:translate-x-4 transition-transform duration-700 leading-none">{col.title}</h2>
                       <p className="text-white/80 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000">
                         {col.desc}
                       </p>
                    </div>
                    <Link 
                      to={col.link}
                      className="w-20 h-20 bg-white/20 backdrop-blur-2xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all group/btn"
                    >
                      <ArrowRight size={28} className="group-hover/btn:rotate-[-45deg] transition-transform duration-500" />
                    </Link>
                  </div>
                </div>

                <div className="absolute top-10 left-10">
                   <div className="bg-white/90 backdrop-blur-md border border-[var(--border-color)] px-6 py-2.5 rounded-full flex items-center gap-3">
                      <Layers size={14} className="text-[var(--accent-color)]" />
                      <span className="text-[10px] font-black text-black uppercase tracking-widest">{col.category}</span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Callout - Brighter */}
      <section className="py-40 bg-white border-y border-[var(--border-color)] mt-48 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
           <div className="max-w-3xl mx-auto">
              <Sparkles className="text-[var(--accent-color)] mx-auto mb-12 shadow-2xl" size={64} />
              <h3 className="text-4xl font-serif text-black uppercase tracking-[0.2em] mb-10 leading-none">CERTIFIED PROVENANCE</h3>
              <div className="h-0.5 w-32 bg-[var(--accent-color)] mx-auto mb-12" />
              <p className="text-[var(--text-secondary)] text-xl font-light leading-relaxed mb-12">
                Every collection is cataloged in the House's permanent registry. We provide certified archival documentation for every volume released since our founding.
              </p>
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
                 <ShieldCheck className="text-[var(--accent-color)]" size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Authorized Maison Verification</span>
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-64 text-center">
         <div className="container-custom">
            <h2 className="text-6xl md:text-[8rem] uppercase tracking-tighter mb-20 text-black leading-none">SEEKING <br/><span className="gradient-text italic font-serif">BESPOKE?</span></h2>
            <div className="flex justify-center flex-wrap gap-10">
               <Link to="/contact" className="btn-primary h-20 px-12 text-[11px] shadow-2xl">INITIATE CONSULTATION</Link>
               <Link to="/portfolio" className="btn-outline h-20 px-12 text-[11px]">VIEW MASTERPIECES</Link>
            </div>
         </div>
      </section>
    </div>
  );
}
