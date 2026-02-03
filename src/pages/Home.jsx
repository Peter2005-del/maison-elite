import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Coins, ShieldCheck, Globe, ShoppingCart, RefreshCcw, Sparkles, Star, Users, Award, Zap } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSync } from '../context/SyncContext';
import { useCart } from '../context/CartContext';
import { useRef } from 'react';

export default function Home() {
  const { visibleProducts } = useData();
  const { formatPrice, currency } = useCurrency();
  const { isSynced, generateSyncCode } = useSync();
  const { addToCart } = useCart();
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const featuredProducts = visibleProducts.slice(0, 4);
  const trendingProducts = visibleProducts.filter(p => p.sales > 20).slice(0, 3);

  const stats = [
    { icon: Users, label: 'Global Clients', value: '50K+' },
    { icon: Award, label: 'Curated Pieces', value: '2,500+' },
    { icon: Star, label: 'Customer Rating', value: '4.9/5' },
    { icon: Globe, label: 'Countries Served', value: '120+' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Animated Background */}
        <motion.div 
          style={{ scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Maison Élite Hero" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--accent-color)]/10 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity }}
          className="container-custom relative z-10 pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 text-[var(--accent-color)] tracking-[0.5em] uppercase text-[11px] font-black mb-8 bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10"
            >
              <Sparkles size={14} />
              REDEFINING LUXURY COMMERCE
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-[9rem] mb-8 leading-[0.85] uppercase tracking-tighter text-white font-serif"
            >
              FUTURE <br />
              <span className="gradient-text">ATELIER</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl font-light leading-relaxed"
            >
              Experience the convergence of heritage craftsmanship and modern commerce. 
              Shop with <span className="text-white font-medium">USD</span> or <span className="text-[var(--accent-color)] font-medium">Crypto</span>. 
              Sync your journey across any device.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/shop" className="btn-primary btn-large group shadow-2xl shadow-[var(--accent-color)]/20">
                EXPLORE COLLECTION <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <button 
                onClick={() => {
                  const code = generateSyncCode();
                  alert(`Your session sync code: ${code}\nUse this on another device to continue.`);
                }}
                className="btn-outline btn-large group"
              >
                LINK DEVICE <Smartphone size={20} className="group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>

            {/* Sync Status */}
            {isSynced && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center gap-3 bg-green-500/10 backdrop-blur-md p-4 rounded-2xl border border-green-500/20 w-fit"
              >
                <RefreshCcw className="text-green-400 animate-spin-slow" size={20} />
                <span className="text-sm text-green-400 font-medium">Session Synced: Continuing from your last activity.</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[var(--accent-color)] rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-t border-b border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center border border-[var(--accent-color)]/20 group-hover:scale-110 group-hover:bg-[var(--accent-color)]/20 transition-all">
                  <stat.icon className="text-[var(--accent-color)]" size={28} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[var(--accent-color)] tracking-[0.4em] uppercase text-[11px] font-black mb-4 block"
              >
                CURATED PIECES
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl uppercase tracking-tighter"
              >
                FEATURED <br/><span className="gradient-text">SELECTIONS</span>
              </motion.h2>
            </div>
            <Link to="/shop" className="text-[var(--text-primary)] font-black tracking-[0.2em] uppercase text-[11px] flex items-center gap-2 hover:text-[var(--accent-color)] transition-all group">
              BROWSE ALL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Quick Action */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-[var(--accent-color)] hover:text-white transition-all"
                    >
                       <ShoppingCart size={14} /> ADD TO CART
                    </button>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-[11px] font-bold border border-white/10">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
                <div>
                   <h3 className="text-sm font-bold uppercase tracking-wider mb-1 group-hover:text-[var(--accent-color)] transition-colors">{product.name}</h3>
                   <p className="text-[var(--text-muted)] text-[11px] uppercase tracking-widest">{product.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products Banner */}
      {trendingProducts.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-[var(--accent-color)]/10 via-purple-500/10 to-[var(--accent-color)]/10 border-y border-[var(--border-color)]">
          <div className="container-custom">
            <div className="flex items-center gap-6 overflow-x-auto pb-4 no-scrollbar">
              <div className="shrink-0 flex items-center gap-3 pr-6 border-r border-[var(--border-color)]">
                <Zap className="text-[var(--accent-color)]" size={24} />
                <span className="text-[12px] font-black uppercase tracking-widest whitespace-nowrap">TRENDING NOW</span>
              </div>
              {trendingProducts.map((product) => (
                <Link 
                  key={product.id}
                  to="/shop"
                  className="shrink-0 flex items-center gap-4 bg-[var(--bg-card)] p-3 pr-6 rounded-2xl border border-[var(--border-color)] hover:border-[var(--accent-color)] transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold group-hover:text-[var(--accent-color)] transition-colors">{product.name}</h4>
                    <p className="text-[var(--accent-color)] text-sm font-bold">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Crypto Integration Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-color)]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <div className="w-20 h-20 bg-[var(--accent-color)]/10 rounded-3xl flex items-center justify-center border border-[var(--accent-color)]/20 mb-10">
                 <Coins className="text-[var(--accent-color)]" size={40} />
               </div>
               <h2 className="text-4xl md:text-7xl uppercase tracking-tighter text-white mb-8 leading-[0.9]">CRYPTO <br/><span className="gradient-text">NATIVE</span> PAYMENT</h2>
               <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                 We embrace the future of finance. Pay with Bitcoin, Ethereum, or USDT instantly. Secure, decentralized, and borderless transactions.
               </p>
               <div className="flex gap-4 flex-wrap">
                  {[
                    { symbol: '₿', name: 'BTC', color: 'orange' },
                    { symbol: 'Ξ', name: 'ETH', color: 'blue' },
                    { symbol: '₮', name: 'USDT', color: 'green' },
                  ].map((crypto) => (
                    <div key={crypto.name} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4 hover:border-white/30 transition-all cursor-pointer">
                       <div className={`w-10 h-10 bg-${crypto.color}-500/20 rounded-full flex items-center justify-center text-${crypto.color}-${crypto.color === 'orange' ? '500' : '400'} font-bold text-lg`}>
                         {crypto.symbol}
                       </div>
                       <span className="text-sm font-bold text-white">{crypto.name}</span>
                    </div>
                  ))}
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
               <motion.div 
                 animate={{ y: [0, -20, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 p-10 flex flex-col justify-between shadow-2xl"
               >
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-black mb-2">Digital Asset Wallet</p>
                        <h4 className="text-2xl text-white font-serif tracking-widest">0x00...MAISON</h4>
                     </div>
                     <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <ShieldCheck className="text-white" size={24} />
                     </div>
                  </div>
                  <div className="mt-20">
                     <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-black mb-1">Available Balance</p>
                     <div className="text-5xl text-white font-bold tracking-tighter">24.50 <span className="text-[var(--accent-color)]">ETH</span></div>
                  </div>
               </motion.div>
               {/* Decorative Circles */}
               <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
               <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-white/10 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block"
            >
              SEAMLESS EXPERIENCE
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl uppercase tracking-tighter mb-8 leading-tight"
            >
              CONTINUE <br/><span className="gradient-text">ANYWHERE</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto"
            >
              Sync your cart and preferences across all your devices with a simple code. Start on desktop, finish on mobile.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center flex-wrap gap-4"
            >
                <button 
                  onClick={() => generateSyncCode()}
                  className="btn-primary group"
                >
                    GENERATE SYNC KEY <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                </button>
                <Link to="/shop" className="btn-outline group">
                    START SHOPPING <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
