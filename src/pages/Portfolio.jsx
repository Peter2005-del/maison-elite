import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Sparkles, Fingerprint, ArrowRight, ShieldCheck, Globe } from 'lucide-react';

const portfolio = [
  { id: 1, title: 'Archival Ivory Gown', category: 'Evening', image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Bespoke Satin Bridal', category: 'Bridal', image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Structural Daywear', category: 'Ready-to-Wear', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Monolithic Power Suit', category: 'Custom', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Gilded Gala Piece', category: 'Evening', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'Textural Sculpture', category: 'Custom', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800' },
  { id: 7, title: 'Intricate Gold Detail', category: 'Accessories', image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800' },
  { id: 8, title: 'High-Altitude Evening', category: 'Evening', image: 'https://images.unsplash.com/photo-1537835063801-9097e1713444?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'Evening', 'Bridal', 'Ready-to-Wear', 'Custom', 'Accessories'];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' 
    ? portfolio 
    : portfolio.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="pt-48 pb-32 bg-black border-b border-white/5 overflow-hidden relative">
        <div className="container-custom relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[var(--accent-color)] tracking-[0.8em] font-black uppercase text-[12px] mb-8 block">
              VISUAL CHRONICLES
            </span>
            <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter mb-12 text-white font-serif leading-none">
              SELECTED <br/><span className="gradient-text">OEUVRES</span>
            </h1>
            <p className="text-white/50 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              An archival ledger of structural masterpieces, curated to showcase the uncompromising global standards of the House.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[var(--accent-color)]/5 blur-[180px] pointer-events-none" />
      </section>

      {/* Filter & Gallery */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-6 mb-32">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-700 relative overflow-hidden group ${
                  filter === cat 
                  ? 'text-white' 
                  : 'text-white/30 hover:text-white hover:border-white/20'
                } border border-white/5`}
              >
                {filter === cat && (
                   <motion.div 
                    layoutId="filter-bg"
                    className="absolute inset-0 bg-[var(--accent-color)] -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                   />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative aspect-[3.2/4] overflow-hidden rounded-[3rem] border-2 border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0 shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12">
                    <span className="text-[var(--accent-color)] text-[11px] font-black uppercase tracking-[0.5em] mb-4">
                      {item.category}
                    </span>
                    <h3 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tighter font-serif leading-none">
                      {item.title}
                    </h3>
                    <div className="h-1 w-0 group-hover:w-full bg-[var(--accent-color)] mt-8 transition-all duration-1000" />
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-10 right-10 w-12 h-12 bg-black/80 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-4 group-hover:translate-y-0">
                    <Fingerprint size={22} className="text-[var(--accent-color)]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-48 bg-white/5 border-2 border-dashed border-white/10 rounded-[4rem]">
              <Camera className="mx-auto text-[var(--accent-color)] opacity-20 mb-10" size={80} />
              <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">No Archives Found</h4>
              <p className="text-white/30 text-[11px] font-black uppercase tracking-[0.5em]">The selected sector is currently under development.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-32 bg-black border-y border-white/5">
         <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
               <div className="space-y-4">
                  <p className="text-5xl font-black text-white font-serif">842</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.5em]">Commissions</p>
               </div>
               <div className="space-y-4 text-[var(--accent-color)]">
                  <p className="text-5xl font-black font-serif">24</p>
                  <p className="text-[10px] uppercase tracking-[0.5em] opacity-60">Global Awards</p>
               </div>
               <div className="space-y-4">
                  <p className="text-5xl font-black text-white font-serif">15k</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.5em]">Members</p>
               </div>
               <div className="space-y-4">
                  <p className="text-5xl font-black text-white font-serif">01</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.5em]">Mission</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 bg-black relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-16 flex justify-center gap-6">
                <Globe className="text-[var(--accent-color)] opacity-40 animate-spin-slow" size={48} />
                <ShieldCheck className="text-[var(--accent-color)] opacity-40" size={48} />
            </div>
            <h2 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter mb-12 text-white font-serif leading-[0.85]">
              ARCHIVE YOUR <br/><span className="gradient-text">LEGACY</span>
            </h2>
            <p className="text-white/40 text-xl font-light mb-16 max-w-2xl mx-auto leading-relaxed">
              Collaborate with our master designers to curate a high-performance fashion asset that transcends borders.
            </p>
            <Link to="/contact" className="btn-primary h-20 px-16 group inline-flex items-center gap-6 rounded-2xl shadow-3xl">
              <span className="text-[11px] font-black tracking-[0.5em]">INITIATE DECREE</span> 
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-[1000px] h-[600px] bg-[var(--accent-color)]/5 blur-[200px] pointer-events-none" />
      </section>
    </div>
  );
}
