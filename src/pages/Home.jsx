import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe, ShoppingCart, Sparkles, Star, Users, Award, Zap, Heart, Bookmark } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { useRef } from 'react';

export default function Home() {
  const { featuredProducts, newArrivals } = useData();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const displayProducts = featuredProducts.slice(0, 4);

  const stats = [
    { icon: Users, label: 'Global Collectors', value: '12K+' },
    { icon: Award, label: 'Heritage Pieces', value: '450+' },
    { icon: Star, label: 'Bespoke Rating', value: '5.0' },
    { icon: Globe, label: 'Atelier Studios', value: '08' },
  ];

  return (
    <div className="bg-[#FDFCF8] selection:bg-[var(--accent-color)] selection:text-white">
      {/* Hero Section - Minimal & High-End */}
      <section ref={heroRef} className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#FDFCF8]">
        <motion.div 
          style={{ scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
            alt="Maison Élite Atelier" 
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF8] via-[#FDFCF8]/60 to-transparent" />
        </motion.div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="container-custom relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 text-[var(--accent-color)] tracking-[0.6em] uppercase text-[10px] font-black mb-12 border-b border-[var(--accent-color)]/20 pb-2"
            >
              ESTABLISHED IN PARIS MMVIII
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-7xl md:text-[10rem] mb-12 leading-[0.8] uppercase tracking-tighter text-black font-serif"
            >
              ROYAL <br />
              <span className="italic font-normal opacity-70">MAISON</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-3xl text-black/60 mb-16 max-w-2xl font-light leading-snug"
            >
              The pinnacle of architectural couture and heirloom craftsmanship. Discover a legacy curated for the modern connoisseur of fine elegance.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-8"
            >
              <Link to="/shop" className="bg-black text-white h-20 px-12 flex items-center justify-center text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[var(--accent-color)] transition-all shadow-2xl">
                ENTER THE BOUTIQUE <ArrowRight size={20} className="ml-4" />
              </Link>
              <Link to="/portfolio" className="border border-black/10 text-black h-20 px-12 flex items-center justify-center text-[11px] font-black tracking-[0.5em] uppercase hover:bg-black hover:text-white transition-all">
                VIEW LEGACIES
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-12"
        >
          <div className="w-px h-24 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Stats - Ultra Clean */}
      <section className="py-32 bg-white border-y border-black/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center md:text-left"
              >
                <h3 className="text-5xl font-serif text-black mb-3 leading-none">{stat.value}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles - Professional & Clean */}
      <section className="py-40">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[10px] font-black mb-6 block">The Current Selection</span>
              <h2 className="text-6xl md:text-8xl font-normal uppercase tracking-tighter leading-none text-black">
                CURATED <br/><span className="italic font-serif opacity-70 text-8xl md:text-9xl">ARTICLES</span>
              </h2>
            </div>
            <Link to="/shop" className="text-[11px] font-black uppercase tracking-[0.5em] text-black border-b border-black/10 pb-2 hover:border-black transition-all">
              VIEW ENTIRE LEDGER <ArrowRight size={16} className="ml-2 inline" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {displayProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4.5] overflow-hidden bg-[#F8F7F2] mb-10 border border-black/5 group-hover:border-[var(--accent-color)] transition-all duration-700">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Clean Transition Action - No Icon */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-10">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-5 bg-black text-white font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-[var(--accent-color)] transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                    >
                       ACQUIRE ARTICLE
                    </button>
                  </div>
                </div>
                <div className="text-center">
                   <span className="text-[9px] font-black tracking-[0.4em] uppercase text-black/30 mb-2 block">{product.category}</span>
                   <h3 className="text-2xl font-serif text-black mb-3 group-hover:text-[var(--accent-color)] transition-colors line-clamp-1">{product.name}</h3>
                   <p className="text-sm font-black tracking-tight text-black">{formatPrice(product.price)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Philosophy */}
      <section className="py-64 bg-white border-y border-black/5 relative overflow-hidden">
        <div className="container-custom relative z-10">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                 <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[11px] font-black mb-12 block px-4 border-l-2 border-[var(--accent-color)]">THE ATELIER VISION</span>
                 <h2 className="text-6xl md:text-9xl font-serif uppercase tracking-tighter mb-14 leading-[0.8]">STRUCTURAL <br/><span className="italic font-normal opacity-70">INTEGRITY</span></h2>
                 <p className="text-xl md:text-2xl text-black/60 font-light leading-relaxed mb-16 max-w-xl">
                   Each Maison Élite article is a certified masterpiece of structural couture. We merge traditional atelier techniques with modern silhouettes to ensure a legacy of excellence.
                 </p>
                 <Link to="/about" className="text-[11px] font-black uppercase tracking-[0.5em] text-black border-b-2 border-black pb-2 hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all">
                    OUR MANIFESTO
                 </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square md:aspect-[4/5.5] overflow-hidden"
              >
                 <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-110" alt="Atelier" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                 <div className="absolute bottom-16 left-16 p-12 bg-white/95 backdrop-blur-md shadow-2xl max-w-sm">
                    <p className="text-sm font-serif italic text-black/60 leading-relaxed">"The silhouette is a mathematical document of elegance."</p>
                    <div className="mt-8 h-px w-16 bg-[var(--accent-color)]" />
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-80 text-center bg-[#FDFCF8] relative overflow-hidden">
        <div className="container-custom relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <h2 className="text-7xl md:text-[11rem] uppercase tracking-tighter mb-24 font-serif leading-none text-black">JOIN THE <br/><span className="italic font-normal opacity-40">LEGACY</span></h2>
              <div className="flex justify-center flex-wrap gap-12">
                 <Link to="/contact" className="bg-black text-white px-16 py-8 text-[11px] font-black tracking-[0.6em] uppercase hover:bg-[var(--accent-color)] transition-all shadow-3xl transform hover:scale-105 active:scale-95">
                   INITIATE BESPOKE DECREE
                 </Link>
              </div>
           </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
           <span className="text-[20rem] font-serif italic text-black/[0.02] -rotate-12 block">Maison Elite</span>
        </div>
      </section>
    </div>
  );
}
