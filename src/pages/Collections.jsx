import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Globe, History } from 'lucide-react';

const collections = [
  {
    title: "L'Aube Indigo",
    season: "Spring/Summer 2026",
    desc: 'Meticulously crafted using heritage solar-dried silks and indigo-thread embroidery. A tribute to modern horizons and celestial symmetry.',
    image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=1200',
    category: 'Latest Series',
    link: '/portfolio'
  },
  {
    title: 'Bridal Couture',
    season: "Private Decree",
    desc: 'Hand-sewn Chantilly lace meets architectural liquid satin for the discerning bride seeking elite-standard perfection in every structural stitch.',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=1200',
    category: 'Bespoke',
    link: '/portfolio'
  },
  {
    title: 'Ombre Noire',
    season: "Autumn/Winter 2025",
    desc: 'Deepest shades of structural velvet accented with cold-forged indigo filigree for sophisticated gala nights and digital age sovereignty.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    category: 'Evening',
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
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-black border-b border-white/5">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <span className="text-[var(--accent-color)] tracking-[0.8em] font-black uppercase text-[12px] mb-8 block">
              HERITAGE ARCHIVES
            </span>
            <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter mb-12 text-white font-serif leading-none">
                SEASONAL <br/><span className="gradient-text">VOLUMES</span>
              </h1>
            <p className="text-white/50 text-xl font-light leading-relaxed max-w-3xl mx-auto">
              Every volume represents a structural revolution in the Modern Elite design language. Explore our archived chronological developments.
            </p>

            <div className="mt-16 flex items-center justify-center gap-12">
               <div className="flex flex-col items-center">
                  <span className="text-white font-black text-3xl mb-2">12</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Volumes</span>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div className="flex flex-col items-center">
                  <span className="text-white font-black text-3xl mb-2">1984</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Origin</span>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div className="flex flex-col items-center">
                  <span className="text-[var(--accent-color)] font-black text-3xl mb-2">INDIGO</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Standard</span>
               </div>
            </div>
          </motion.div>
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[var(--accent-color)]/5 blur-[180px] pointer-events-none" />
      </section>

      {/* Collections Grid */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <div className="space-y-32">
            {collections.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`group flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}
              >
                <Link to={item.link} className="flex-1 w-full block">
                  <div className="relative aspect-[4/5] lg:aspect-[16/11] overflow-hidden rounded-[3.5rem] border-2 border-white/5 group-hover:border-[var(--accent-color)]/40 transition-all duration-700 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/40 transition-all duration-700" />
                    
                    <div className="absolute top-10 left-10">
                      <div className="px-8 py-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl">
                         <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-[0.5em]">
                            {item.category}
                         </span>
                      </div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12">
                       <div className="flex justify-between items-end">
                          <div className="space-y-4">
                             <p className="text-[var(--accent-color)] text-[12px] uppercase tracking-[0.6em] font-black">{item.season}</p>
                             <h3 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter font-serif leading-none">
                                {item.title}
                             </h3>
                          </div>
                       </div>
                    </div>
                  </div>
                </Link>

                <div className="flex-1 space-y-12">
                   <div className="p-1 w-20 h-20 rounded-3xl bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center text-[var(--accent-color)] mb-8">
                      {idx % 2 === 0 ? <Globe size={40} /> : <History size={40} />}
                   </div>
                   <h4 className="text-4xl text-white font-black uppercase tracking-tighter font-serif">A REVOLUTION IN <br/>{item.category}</h4>
                   <p className="text-[var(--text-secondary)] text-xl font-light leading-relaxed max-w-xl">
                      {item.desc}
                   </p>
                   <Link to={item.link} className="inline-flex items-center gap-6 group/btn">
                      <span className="text-[12px] font-black uppercase tracking-[0.5em] text-white group-hover/btn:text-[var(--accent-color)] transition-colors">STUDY THIS VOLUME</span>
                      <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center text-white group-hover/btn:bg-[var(--accent-color)] group-hover/btn:border-[var(--accent-color)] transition-all">
                         <ArrowRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Meta Section */}
      <section className="py-48 bg-black relative overflow-hidden text-center border-y border-white/5">
        <div className="container-custom relative z-10">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
           >
              <Sparkles className="text-[var(--accent-color)] mx-auto mb-16 opacity-30" size={80} />
              <h2 className="text-5xl md:text-[6.5rem] font-black uppercase tracking-tighter text-white font-serif leading-none mb-16">
                 THE PERMANENCE <br/>OF <span className="gradient-text">ELEGANCE</span>
              </h2>
              <p className="text-white/40 text-xl font-light max-w-4xl mx-auto leading-relaxed mb-20 uppercase tracking-[0.1em]">
                 Maison Élite garments are engineered as lifelong digital and physical assets. Each archival acquisition increases in structural value as our heritage legacy expands globally.
              </p>
              <div className="flex flex-wrap justify-center gap-12">
                 <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-[var(--accent-color)]/30 transition-all group">
                    <p className="text-5xl font-black text-white mb-4 group-hover:text-[var(--accent-color)] transition-colors">100%</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Archival Verified</p>
                 </div>
                 <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-[var(--accent-color)]/30 transition-all group">
                    <p className="text-5xl font-black text-white mb-4 group-hover:text-[var(--accent-color)] transition-colors">24K</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Gold Component</p>
                 </div>
                 <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-[var(--accent-color)]/30 transition-all group">
                    <p className="text-5xl font-black text-white mb-4 group-hover:text-[var(--accent-color)] transition-colors">01</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Unique Decree</p>
                 </div>
              </div>
           </motion.div>
        </div>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--accent-color)]/10 blur-[200px] pointer-events-none" />
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-black">
        <div className="container-custom">
           <div className="bg-gradient-to-br from-[#0a0a0a] to-black rounded-[5rem] p-20 md:p-32 border-2 border-white/5 text-center relative overflow-hidden group hover:border-[var(--accent-color)]/30 transition-all duration-1000 shadow-3xl">
              <div className="relative z-10">
                <h2 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter mb-16 text-white font-serif leading-[0.9]">READY FOR <br/>A <span className="gradient-text">BESPOKE</span> VOYAGE?</h2>
                <div className="flex flex-wrap justify-center gap-10">
                   <Link to="/contact" className="btn-primary h-20 px-16 rounded-2xl text-[11px] font-black tracking-[0.6em]">REQUEST DECREE</Link>
                   <Link to="/shop" className="btn-outline h-20 px-16 rounded-2xl text-[11px] font-black tracking-[0.6em]">BROWSE BOUTIQUE</Link>
                </div>
             </div>
             {/* Background flow */}
             <div className="absolute inset-0 bg-[var(--accent-color)]/5 blur-[150px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           </div>
        </div>
      </section>
    </div>
  );
}
