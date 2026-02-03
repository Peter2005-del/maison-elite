import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Sparkles, Star, Check, ShieldCheck, Cpu, Smartphone } from 'lucide-react';

const services = [
  {
    title: 'Liquid Bridal Series',
    desc: 'Bespoke bridal engineering that prioritizes structural perfection and monochromatic elegance. Every commission is a unique collaboration between architect and muse, verified via blockchain heritage.',
    icon: Sparkles,
    features: ['Archival Fabric Sourcing', 'Structural Lookboards', 'Hand-Stitched Reinforcement', '5 Private Fittings'],
    price: '$5,000+',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Executive Gala Systems',
    desc: 'Formal silhouettes designed for absolute authority at global summits. We specialize in sharp, architectural draping that command presence in both physical and digital boardrooms.',
    icon: Star,
    features: ['Indigo-Thread Embroidery', 'Bespoke Corsetry', 'Reinforced Silhouettes', 'Global Express Logistics'],
    price: '$3,500+',
    image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Heritage Consultation',
    desc: 'Private digital advisory sessions to define your aesthetic legacy. Our master stylists analyze heritage profiles to curate a wardrobe of unwavering permanence across all devices.',
    icon: Cpu,
    features: ['Anatomical Analysis', 'Permanent Palette Selection', 'Inventory Appraisal', 'Sync-Ready Profiles'],
    price: '$450+',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Structural Tailoring',
    desc: 'Precision adjustments and restoration for heritage garments. Our master tailors ensure every piece in your personal archive adheres to the Élite standard of fit and material integrity.',
    icon: Scissors,
    features: ['Structural Recutting', 'Luxury Restoration', 'Hardware Replacement', 'Archival Preservation'],
    price: '$250+',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="pt-48 pb-32 bg-black border-b border-white/5 overflow-hidden relative">
        <div className="container-custom relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[var(--accent-color)] tracking-[0.8em] font-black uppercase text-[12px] mb-8 block">
               ATELIER PROVISIONS
            </span>
            <h1 className="text-7xl md:text-[9rem] font-black uppercase tracking-tighter mb-12 text-white font-serif leading-none">
              SYSTEM <br/><span className="gradient-text">MODALITIES</span>
            </h1>
            <p className="text-white/50 text-xl font-light max-w-3xl mx-auto leading-relaxed">
              "Precision is the absolute prerequisite for luxury. Every service we provide is a rigorous engineering exercise in aesthetic permanence."
            </p>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[var(--accent-color)]/5 blur-[180px] pointer-events-none" />
      </section>

      {/* Services List */}
      <section className="section-padding bg-black">
        <div className="container-custom space-y-48 lg:space-y-72">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col gap-16 lg:gap-32 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
            >
              {/* Content Side */}
              <div className="lg:w-1/2 space-y-12">
                <div className="w-24 h-24 bg-[var(--accent-color)]/10 rounded-[2rem] flex items-center justify-center text-[var(--accent-color)] border border-[var(--accent-color)]/20 shadow-[0_20px_40px_rgba(201,162,39,0.1)]">
                  <service.icon size={44} />
                </div>
                <div>
                   <span className="text-[var(--accent-color)] font-black text-[12px] tracking-[0.6em] mb-4 uppercase block">MODALITY 0{idx+1}</span>
                   <h2 className="text-5xl md:text-6xl text-white font-serif tracking-tighter uppercase leading-none mb-8">{service.title}</h2>
                   <p className="text-white/60 text-xl font-light leading-relaxed mb-12">{service.desc}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-color)] group-hover:border-[var(--accent-color)] transition-all">
                        <Check size={18} className="text-white" />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest text-white/50">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-12">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-2 block">PROJECTED VALUATION</span>
                    <span className="text-4xl font-black tracking-tighter text-[var(--accent-color)]">{service.price}</span>
                  </div>
                  <Link to="/contact" className="btn-primary h-20 px-14 rounded-2xl shadow-3xl text-[11px] font-black tracking-[0.5em]">
                    INITIATE COMMISSION
                  </Link>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/2 w-full group">
                <div className="relative rounded-[5rem] overflow-hidden aspect-[3.5/5] shadow-[0_60px_100px_rgba(0,0,0,0.8)] border-2 border-white/5 group-hover:border-[var(--accent-color)]/30 transition-all duration-1000">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 grayscale group-hover:grayscale-0 shadow-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  <div className="absolute top-10 right-10 bg-black/80 backdrop-blur-3xl border border-white/10 p-6 rounded-3xl flex items-center gap-4 shadow-3xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/10 flex items-center justify-center border border-[var(--accent-color)]/20 animate-pulse">
                        <Smartphone size={20} className="text-[var(--accent-color)]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Remote Ready</p>
                        <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">Sync-Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 bg-black relative border-y border-white/5 text-center overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <ShieldCheck className="text-[var(--accent-color)] mx-auto mb-16 opacity-30" size={80} />
            <h2 className="text-5xl md:text-[7rem] font-black uppercase tracking-tighter mb-16 text-white font-serif leading-[0.85]">
              UNWAVERING <br/><span className="gradient-text">SOVEREIGNTY</span>
            </h2>
            <p className="text-white/40 text-xl font-light mb-20 max-w-4xl mx-auto leading-relaxed">
              Our atelier operates beyond the boundaries of seasonal trends. Every provision is a long-term investment in your personal visual estate, managed through our unified heritage network.
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <Link to="/contact" className="btn-primary h-20 px-16 text-[11px] font-black tracking-[0.5em] rounded-2xl">
                BOOK DIAGNOSTIC SESSION
              </Link>
              <Link to="/portfolio" className="btn-outline h-20 px-16 text-[11px] font-black tracking-[0.5em] rounded-2xl">
                STUDY RECENT OEUVRES
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[var(--accent-color)]/5 blur-[200px] pointer-events-none" />
      </section>
    </div>
  );
}
