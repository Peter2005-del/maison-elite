import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Coins, ShieldCheck, Globe, ShoppingCart, RefreshCcw } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSync } from '../context/SyncContext';

export default function Home() {
  const { visibleProducts } = useData();
  const { formatPrice, currency } = useCurrency();
  const { isSynced, generateSyncCode } = useSync();

  const featuredProducts = visibleProducts.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
        {/* Background Image - Absolute Positioning */}
        <div className="absolute inset-0 z-0 opacity-70">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Maison Élite Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent " />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="inline-block text-[var(--accent-color)] tracking-[0.8em] uppercase text-[12px] font-black mb-6">
              REDEFINING LUXURY COMMERCE
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] mb-8 leading-[0.85] uppercase tracking-tighter text-white font-serif">
              FUTURE <br />
              <span className="gradient-text">ATELIER</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl font-light leading-relaxed">
              Experience the convergence of heritage craftsmanship and decentralized finance. Shop with <span className="text-white font-bold">USD</span> or <span className="text-[var(--accent-color)] font-bold">Crypto</span>. Sync your journey across any device.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/shop" className="btn-primary btn-large group shadow-2xl">
                SHOP THE COLLECTION <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
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
            </div>

            {/* Sync Status Overlay */}
            {isSynced && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 w-fit"
              >
                <RefreshCcw className="text-green-400 animate-spin-slow" size={20} />
                <span className="text-sm text-white font-medium">Session Synced: Continuing from your last activity.</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-[var(--bg-primary)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[var(--accent-color)] tracking-[0.4em] uppercase text-[11px] font-black mb-4 block">CURATED PIECES</span>
              <h2 className="text-4xl md:text-6xl uppercase tracking-tighter">FEATURED <br/><span className="gradient-text">SELECTIONS</span></h2>
            </div>
            <Link to="/shop" className="text-[var(--text-primary)] font-black tracking-[0.2em] uppercase text-[11px] flex items-center gap-2 hover:text-[var(--accent-color)] transition-all">
              BROWSE ALL <ArrowRight size={14} />
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Quick Action Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    <button className="w-full py-3 bg-[var(--accent-color)] text-[var(--accent-contrast)] font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl flex items-center justify-center gap-2">
                       <ShoppingCart size={14} /> ADD TO CART
                    </button>
                  </div>

                  {/* Dual Currency Tag */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1">
                    <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">
                      {formatPrice(product.price)}
                    </div>
                    {currency.code !== 'USD' && (
                       <div className="bg-[var(--accent-color)]/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-bold border border-white/10 uppercase tracking-tighter">
                         ≈ ${(product.price).toLocaleString()} USD
                       </div>
                    )}
                  </div>
                </div>
                <div>
                   <h3 className="text-sm font-black uppercase tracking-widest mb-1">{product.name}</h3>
                   <p className="text-[var(--text-muted)] text-[11px] uppercase tracking-[0.2em]">{product.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Crypto Integration Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent-color)]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <div className="w-20 h-20 bg-[var(--accent-color)]/10 rounded-3xl flex items-center justify-center border border-[var(--accent-color)]/20 mb-10">
                  <Coins className="text-[var(--accent-color)]" size={40} />
               </div>
               <h2 className="text-4xl md:text-7xl uppercase tracking-tighter text-white mb-8 leading-[0.9]">CRYPTO <br/><span className="gradient-text">NATIVE</span> PAYMENT</h2>
               <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
                 We embrace the future of finance. Pay with Bitcoin, Ethereum, or USDT instantly. Secure, decentralized, and borderless transactions for the modern connoisseur.
               </p>
               <div className="flex gap-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                     <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 font-bold">₿</div>
                     <span className="text-sm font-bold text-white">BTC</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">Ξ</div>
                     <span className="text-sm font-bold text-white">ETH</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                     <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">₮</div>
                     <span className="text-sm font-bold text-white">USDT</span>
                  </div>
               </div>
            </div>
            
            <div className="relative">
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
                     <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-black mb-1">Estimated Value</p>
                     <div className="text-5xl text-white font-bold tracking-tighter">24.50 <span className="text-[var(--accent-color)]">ETH</span></div>
                  </div>
               </motion.div>
               {/* Decorative Circles */}
               <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/10 rounded-full animate-pulse" />
               <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Sync CTA */}
      <section className="section-padding bg-[var(--bg-secondary)] border-y border-[var(--border-color)]">
        <div className="container-custom text-center">
            <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block">UNINTERRUPTED EXPERIENCE</span>
            <h2 className="text-5xl md:text-[5rem] uppercase tracking-tighter mb-12 leading-tight">CONTINUE <br/><span className="gradient-text">ANYWHERE</span></h2>
            <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
              Scanning a QR code or entering a sync key allows you to transfer your basket and preferences to your mobile device instantly.
            </p>
            <div className="flex justify-center flex-wrap gap-6">
                <button 
                  onClick={() => generateSyncCode()}
                  className="btn-primary group"
                >
                    GENERATE SYNC KEY <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                </button>
                <button className="btn-outline group">
                    ENTER SYNC CODE <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </div>
      </section>
    </div>
  );
}
