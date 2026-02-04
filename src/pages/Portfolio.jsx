import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, ShieldCheck, Globe, Star, Camera, PenTool, LayoutTemplate, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: 'The Aureate Gown',
    client: 'Private Collection, Geneva',
    year: '2025',
    category: 'Bespoke Evening',
    desc: 'A hand-woven masterpiece featuring 2.4km of silk-wrapped gold thread. 400 hours of dedicated atelier labor.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1200',
    stats: { craftsmanship: '400 hrs', precision: '99.9%', registry: 'AUR-001' }
  },
  {
    title: 'Ivory Silk Suit',
    client: 'Heritage Gala Premiere',
    year: '2026',
    category: 'Structural Minimalist',
    desc: 'An exploration of silhouette using structural bone-white silks and documented archival provenance.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200',
    stats: { craftsmanship: '150 hrs', precision: '100%', registry: 'IVR-042' }
  },
  {
    title: 'Solar Chiffon Wrap',
    client: 'Heritage Archive',
    year: '2024',
    category: 'Accessories',
    desc: 'UV-reactive chiffon that changes hue based on solar intensity. The intersection of nature and classical fashion.',
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
    <div className="min-h-screen bg-[#FDFCF8] pt-40 pb-20 overflow-hidden">
      {/* Editorial Header */}
      <section className="container-custom mb-40">
         <div className="grid lg:grid-cols-2 gap-20 items-end">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[11px] font-black mb-10 block">CURATED MASTERPIECES</span>
              <h1 className="text-6xl md:text-[9.5rem] font-serif uppercase tracking-tighter text-black mb-12 leading-[0.8]">GALLERY OF <br/><span className="gradient-text italic font-normal">LEGACIES</span></h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:pb-12"
            >
               <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed max-w-lg mb-12">
                 A meticulously documented registry of our most ambitious private commissions. Each entry represents a pinnacle of structural couture.
               </p>
               <div className="flex gap-12">
                  <div className="flex items-center gap-4">
                     <Camera size={20} className="text-[var(--accent-color)]" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">4K Visual Archive</span>
                  </div>
                  <div className="flex items-center gap-4">
                     <ShieldCheck size={20} className="text-[var(--accent-color)]" />
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Verified Artisan Assets</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* Projects List */}
      <section className="container-custom space-y-64">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className={`flex flex-col lg:flex-row gap-24 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* Visual Part */}
            <div className="lg:w-3/5 group relative">
               <div className="absolute inset-0 bg-[var(--accent-color)]/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-[4rem] overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all duration-1000 shadow-xl">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                     <div className="w-24 h-24 rounded-full bg-white/90 backdrop-blur-md text-[var(--accent-color)] flex items-center justify-center shadow-3xl">
                        <Eye size={32} />
                     </div>
                  </div>
               </div>
               
               <div className={`absolute bottom-[-30px] ${i % 2 === 1 ? 'right-[-30px]' : 'left-[-30px]'} hidden lg:block`}>
                  <div className="bg-white border border-[var(--border-color)] p-8 rounded-[2.5rem] shadow-3xl">
                     <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-widest mb-3 block">REGISTRY ID</span>
                     <p className="font-serif italic text-2xl text-black tracking-tight">{project.stats.registry}</p>
                  </div>
               </div>
            </div>

            {/* Content Part */}
            <div className="lg:w-2/5 space-y-12">
               <div>
                  <div className="flex items-center gap-6 mb-8">
                     <span className="bg-white border border-[var(--border-color)] text-black text-[10px] font-black uppercase tracking-[0.4em] px-6 py-2 rounded-full shadow-sm">
                        {project.year}
                     </span>
                     <span className="text-[var(--accent-color)] text-[11px] font-black uppercase tracking-[0.4em]">
                        {project.category}
                     </span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-serif text-black uppercase tracking-tighter mb-10 leading-none">{project.title}</h2>
                  <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed mb-12">
                     {project.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-10 py-12 border-y border-[var(--border-color)]">
                     <div>
                        <p className="text-[10px] text-[var(--accent-color)] font-black uppercase tracking-[0.4em] mb-3">ATELIER LABOR</p>
                        <p className="text-2xl font-black text-black uppercase tracking-tighter">{project.stats.craftsmanship}</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-[var(--accent-color)] font-black uppercase tracking-[0.4em] mb-3">PRECISION</p>
                        <p className="text-2xl font-black text-black uppercase tracking-tighter">{project.stats.precision}</p>
                     </div>
                  </div>
               </div>

               <div className="flex gap-10 items-center">
                  <div className="flex-1">
                     <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-[0.4em] mb-3">PATRON IDENTITY</p>
                     <p className="text-sm font-bold text-black uppercase tracking-widest">{project.client}</p>
                  </div>
                  <Link to="/contact" className="w-20 h-20 bg-white border border-[var(--border-color)] rounded-3xl flex items-center justify-center text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white hover:border-[var(--accent-color)] transition-all shadow-xl">
                     <ArrowRight size={32} />
                  </Link>
               </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Global Section - Brighter */}
      <section className="py-48 mt-48 bg-white border-y border-[var(--border-color)]">
        <div className="container-custom grid lg:grid-cols-2 gap-32 items-center">
           <div className="relative group">
              <div className="w-full aspect-[4/5] rounded-[4rem] border border-[var(--border-color)] overflow-hidden relative">
                 <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" alt="Process" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs space-y-8">
                 {[
                   { icon: PenTool, label: 'Architectural Sketch' },
                   { icon: LayoutTemplate, label: 'Structural Modeling' }
                 ].map(item => (
                   <div key={item.label} className="bg-white/95 backdrop-blur-xl border border-[var(--border-color)] p-8 rounded-[2.5rem] flex items-center gap-8 shadow-3xl hover:translate-x-4 transition-transform">
                      <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--accent-color)]">
                         <item.icon size={28} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">{item.label}</span>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="space-y-12">
              <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[11px] font-black mb-10 block">HOUSE PROTOCOL</span>
              <h2 className="text-6xl md:text-[9rem] font-serif text-black uppercase tracking-tighter mb-12 leading-[0.8]">BEYOND <br/><span className="gradient-text italic font-normal">APPAREL.</span></h2>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed mb-16">
                 We do not merely dress; we architect identities. Every project in this registry is a testament to our commitment to structural integrity.
              </p>
              <div className="grid gap-12">
                 <div className="flex gap-8 items-start">
                    <Star className="text-[var(--accent-color)] shrink-0" size={40} fill="#C5A227" />
                    <div>
                       <h4 className="text-black text-xl font-bold uppercase tracking-widest mb-2">Heritage Prize 2025</h4>
                       <p className="text-[var(--text-secondary)] text-sm font-medium">Winner of the International Archive Achievement.</p>
                    </div>
                 </div>
                 <div className="flex gap-8 items-start">
                    <Globe className="text-[var(--accent-color)] shrink-0" size={40} />
                    <div>
                       <h4 className="text-black text-xl font-bold uppercase tracking-widest mb-2">Authenticated Sovereignty</h4>
                       <p className="text-[var(--text-secondary)] text-sm font-medium">Verified provenance for every commissioned article.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-64 text-center">
         <div className="container-custom">
            <h2 className="text-6xl md:text-[10rem] uppercase tracking-tighter mb-20 text-black font-serif leading-none">INITIATE <br/><span className="gradient-text italic font-normal">DECREE.</span></h2>
            <Link to="/contact" className="btn-primary btn-large h-24 px-16 text-xs shadow-2xl">
               BESPOKE COMMISSION REQUEST <ArrowRight size={28} className="ml-4" />
            </Link>
         </div>
      </section>
    </div>
  );
}
