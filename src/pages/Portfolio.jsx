import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, ShieldCheck, Globe, Star, Camera, PenTool, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'The Indigo Gown',
    client: 'Private Collection, Geneva',
    year: '2025',
    category: 'Bespoke Evening',
    desc: 'A hand-woven masterpiece featuring 2.4km of silk-wrapped indigo thread. 400 hours of atelier labor.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1200',
    stats: { craftsmanship: '400 hrs', precision: '99.9%', registry: 'IVL-001' }
  },
  {
    title: 'Digital Ivory Suit',
    client: 'Meta-Gala Premiere',
    year: '2026',
    category: 'Hyper-Minimalist',
    desc: 'An exploration of silhouette using structural bone-white linens and cryptographic asset tracking.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    stats: { craftsmanship: '150 hrs', precision: '100%', registry: 'IVL-042' }
  },
  {
    title: 'Solar Chiffon Wrap',
    client: 'Heritage Archive',
    year: '2024',
    category: 'Accessories',
    desc: 'UV-reactive chiffon that changes hue based on solar intensity. The intersection of nature and fashion.',
    image: 'https://images.unsplash.com/photo-1549439602-43ebcb23281f?auto=format&fit=crop&q=80&w=1200',
    stats: { craftsmanship: '85 hrs', precision: '98.5%', registry: 'ACC-102' }
  },
  {
    title: 'The Obsidian Cloak',
    client: 'Bespoke Decree',
    year: '2026',
    category: 'Custom Outerwear',
    desc: 'Constructed from rare volcanic basalt-fiber fabric. Designed to withstand the elements while maintaining perfect drapery.',
    image: 'https://images.unsplash.com/photo-1591360236630-349f70d58548?auto=format&fit=crop&q=80&w=1200',
    stats: { craftsmanship: '320 hrs', precision: '99.8%', registry: 'OUT-009' }
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 overflow-hidden">
      {/* Editorial Header */}
      <section className="container-custom mb-32">
         <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block">CURATED MASTERPIECES</span>
              <h1 className="text-6xl md:text-[8rem] font-serif uppercase tracking-tighter text-white mb-10 leading-[0.85]">GALLERY OF <br/><span className="gradient-text">LEGACIES</span></h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:pb-8"
            >
               <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-lg mb-8">
                 A documented registry of our most ambitious private commissions. Each entry represents a pinnacle of structural and digital integration.
               </p>
               <div className="flex gap-10">
                  <div className="flex items-center gap-3">
                     <Camera size={16} className="text-[var(--accent-color)]" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/50">4K ARCHIVE</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <ShieldCheck size={16} className="text-[var(--accent-color)]" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-white/50">VERIFIED ASSETS</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Projects List */}
      <section className="container-custom space-y-48">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Visual Part */}
            <div className="lg:w-3/5 group relative">
               <div className="absolute inset-0 bg-[var(--accent-color)]/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[3rem] overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all duration-1000 shadow-3xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white">
                        <Eye size={32} />
                     </div>
                  </div>
               </div>
               {/* Floating Tag */}
               <div className={`absolute bottom-[-20px] ${i % 2 === 1 ? 'right-[-20px]' : 'left-[-20px]'} hidden md:block`}>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-6 rounded-3xl shadow-2xl backdrop-blur-xl bg-opacity-80">
                     <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-widest mb-2 block">REGISTRY KEY</span>
                     <p className="font-mono text-xs text-white tracking-widest">{project.stats.registry}</p>
                  </div>
               </div>
            </div>

            {/* Content Part */}
            <div className="lg:w-2/5 space-y-10">
               <div>
                  <div className="flex items-center gap-4 mb-6">
                     <span className="bg-black border border-white/10 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                        {project.year}
                     </span>
                     <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-widest underline underline-offset-8 decoration-white/20">
                        {project.category}
                     </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-tighter mb-8 leading-none">{project.title}</h2>
                  <p className="text-lg text-[var(--text-secondary)] font-light leading-relaxed mb-10">
                     {project.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-8 py-10 border-y border-white/5">
                     <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">CRAFTSMANSHIP</p>
                        <p className="text-xl font-black text-white">{project.stats.craftsmanship}</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">PRECISION</p>
                        <p className="text-xl font-black text-white">{project.stats.precision}</p>
                     </div>
                  </div>
               </div>

               <div className="flex gap-6 items-center pt-4">
                  <div className="flex-1">
                     <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">CLIENT ASSIGNMENT</p>
                     <p className="text-sm font-bold text-white uppercase tracking-widest">{project.client}</p>
                  </div>
                  <Link to="/contact" className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white transition-all">
                     <ArrowRight size={24} />
                  </Link>
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Philosophy Section */}
      <section className="py-48 mt-48 bg-black">
        <div className="container-custom grid lg:grid-cols-2 gap-24 items-center">
           <div className="relative">
              <div className="w-full aspect-[4/5] rounded-[4rem] border border-white/10 overflow-hidden relative group">
                 <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="Process" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              {/* Overlay Badges */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs space-y-6">
                 {[
                   { icon: PenTool, label: 'Architectural Sketch' },
                   { icon: LayoutTemplate, label: '3D Silhouette Modeling' }
                 ].map(item => (
                   <div key={item.label} className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-6 group cursor-crosshair">
                      <div className="w-12 h-12 bg-[var(--accent-color)]/20 rounded-2xl flex items-center justify-center text-[var(--accent-color)]">
                         <item.icon size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.label}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div>
              <span className="text-[var(--accent-color)] tracking-[0.5em] uppercase text-[12px] font-black mb-10 block">THE ATELIER PHILOSOPHY</span>
              <h2 className="text-5xl md:text-8xl font-serif text-white uppercase tracking-tighter mb-12 leading-[0.8]">BEYOND <br/><span className="gradient-text">GARMENTS.</span></h2>
              <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-16">
                 We don't just dress; we architect identities. Every project in this portfolio is a testament to our commitment to structural integrity and digital permanence.
              </p>
              <div className="space-y-8">
                 <div className="flex gap-6 items-center">
                    <Star className="text-[var(--accent-color)]" size={32} />
                    <div>
                       <h4 className="text-white text-lg font-black uppercase tracking-widest">Global Recognition</h4>
                       <p className="text-[var(--text-muted)] text-sm">Winner of the Archival Heritage Prize 2025.</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-center">
                    <Globe className="text-[var(--accent-color)]" size={32} />
                    <div>
                       <h4 className="text-white text-lg font-black uppercase tracking-widest">Interstellar Delivery</h4>
                       <p className="text-[var(--text-muted)] text-sm">Secure logistics across all Earth-based coordinate systems.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-48 text-center bg-[var(--bg-secondary)] border-t border-white/5">
         <div className="container-custom">
            <h2 className="text-5xl md:text-[9rem] uppercase tracking-tighter mb-16 font-serif">READY TO <br/><span className="gradient-text">COMMISSION?</span></h2>
            <Link to="/contact" className="btn-primary btn-large group">
               INITIATE BESPOKE PROJECT <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </section>
    </div>
  );
}
