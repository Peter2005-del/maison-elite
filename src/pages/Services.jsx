import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Sparkles, Star, Check, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Bespoke Atelier Bridal',
    desc: 'Bespoke bridal engineering that prioritizes structural perfection and timeless elegance. Every commission is a unique collaboration between architect and muse, ensuring a legacy of grace.',
    icon: Sparkles,
    features: ['Archival Fabric Sourcing', 'Structural Lookboards', 'Hand-Stitched Reinforcement', 'Private Fittings'],
    price: '$5,000+',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Heritage Evening Series',
    desc: 'Formal silhouettes designed for absolute presence at global events. We specialize in sharp, architectural draping that command authority and quiet luxury.',
    icon: Star,
    features: ['Silk-Thread Embroidery', 'Bespoke Corsetry', 'Reinforced Silhouettes', 'Express Logistics'],
    price: '$3,500+',
    image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Private Wardrobe Curation',
    desc: 'Private advisory sessions to define your aesthetic legacy. Our master stylists analyze heritage profiles to curate a wardrobe of unwavering permanence for the modern collector.',
    icon: Heart,
    features: ['Anatomical Analysis', 'Permanent Palette Selection', 'Inventory Appraisal', 'Styling Manifesto'],
    price: '$450+',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Structural Restoration',
    desc: 'Precision adjustments and restoration for legacy garments. Our master tailors ensure every piece in your personal archive adheres to the highest standard of fit and material integrity.',
    icon: Scissors,
    features: ['Structural Recutting', 'Luxury Restoration', 'Hardware Replacement', 'Archival Preservation'],
    price: '$250+',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] selection:bg-[var(--accent-color)] selection:text-white">
      {/* Editorial Header */}
      <section className="pt-48 pb-32 border-b border-black/5 relative overflow-hidden bg-white">
        <div className="container-custom relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[var(--accent-color)] tracking-[0.6em] font-black uppercase text-[10px] mb-10 block">
               ATELIER PROVISIONS
            </span>
            <h1 className="text-7xl md:text-[9.5rem] font-serif uppercase tracking-tighter mb-12 text-black leading-[0.8]">
              HERITAGE <br/><span className="italic font-normal opacity-70">SERVICES</span>
            </h1>
            <p className="text-black/60 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Precision is the absolute prerequisite for luxury. Every provision we offer is a rigorous exercise in aesthetic permanence and structural integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List - Clean Grid */}
      <section className="py-48 bg-[#FDFCF8]">
        <div className="container-custom space-y-64">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col gap-24 lg:gap-40 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
            >
              {/* Content Side */}
              <div className="lg:w-1/2 space-y-12">
                <div className="w-16 h-16 bg-white border border-black/5 shadow-sm rounded-full flex items-center justify-center text-[var(--accent-color)]">
                   <service.icon size={28} />
                </div>
                <div>
                   <span className="text-[var(--accent-color)] font-black text-[10px] tracking-[0.6em] mb-6 uppercase block">PROVISION 0{idx+1}</span>
                   <h2 className="text-5xl md:text-7xl text-black font-serif tracking-tighter uppercase leading-none mb-10">{service.title}</h2>
                   <p className="text-black/60 text-xl font-light leading-relaxed mb-14">{service.desc}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--accent-color)] group-hover:border-[var(--accent-color)] group-hover:text-white transition-all">
                        <Check size={14} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-16 flex flex-col sm:flex-row items-baseline gap-12 border-t border-black/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">VALUATION FROM</span>
                    <span className="text-4xl font-black tracking-tighter text-black">{service.price}</span>
                  </div>
                  <Link to="/contact" className="bg-black text-white px-12 h-20 flex items-center justify-center text-[10px] font-black tracking-[0.5em] uppercase hover:bg-[var(--accent-color)] transition-all shadow-2xl">
                    INITIATE COMMISSION <ArrowRight size={18} className="ml-4" />
                  </Link>
                </div>
              </div>

              {/* Image Side - Clean Treatments */}
              <div className="lg:w-1/2 w-full group">
                <div className="relative rounded-[4rem] overflow-hidden aspect-[3.5/5] border border-black/5 shadow-2xl">
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-1000" />
                  <div className="absolute bottom-12 left-12 p-8 bg-white/95 backdrop-blur-xl border border-black/5 shadow-2xl max-w-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                     <p className="text-[10px] font-black text-black uppercase tracking-[0.3em] leading-relaxed">
                       "Every movement is an achievement in structural grace."
                     </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Legacy Callout */}
      <section className="py-64 bg-white border-y border-black/5 text-center relative overflow-hidden">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <ShieldCheck className="text-[var(--accent-color)] mx-auto mb-16 opacity-40" size={64} />
            <h2 className="text-6xl md:text-[8rem] font-serif uppercase tracking-tighter mb-16 text-black leading-none">
              ABSOLUTE <br/><span className="italic font-normal opacity-50">CUSTODY</span>
            </h2>
            <p className="text-black/60 text-xl font-light mb-24 max-w-4xl mx-auto leading-relaxed">
              Our atelier operates beyond the boundaries of seasonal trends. Every provision is a long-term investment in your personal visual estate, managed with absolute discretion.
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              <Link to="/contact" className="bg-black text-white px-16 py-8 text-[11px] font-black tracking-[0.6em] uppercase hover:bg-[var(--accent-color)] transition-all shadow-3xl">
                BOOK CONSULTATION
              </Link>
              <Link to="/portfolio" className="border border-black/10 text-black px-16 py-8 text-[11px] font-black tracking-[0.6em] uppercase hover:bg-black hover:text-white transition-all">
                STUDY THE ARCHIVE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
