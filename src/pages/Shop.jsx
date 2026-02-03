import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Filter, X, Star, SlidersHorizontal, Smartphone, RefreshCcw } from 'lucide-react';

import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSync } from '../context/SyncContext';
import StaticCart from '../components/StaticCart';

const categories = ['All', 'Evening', 'Bridal', 'Ready-to-Wear', 'Custom', 'Accessories'];

export default function Shop() {
  const { visibleProducts } = useData();
  const { formatPrice, currency } = useCurrency();
  const { isSynced, generateSyncCode } = useSync();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = visibleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || product.category === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-[var(--bg-primary)]">
         <div className="w-12 h-12 border-4 border-[var(--border-color)] border-t-[var(--accent-color)] rounded-full animate-spin mb-8" />
         <p className="font-black tracking-[0.6em] text-[12px] uppercase text-[var(--accent-color)] animate-pulse">Synchronizing Boutique...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[var(--bg-primary)]">
      {/* Shop Header */}
      <section className="bg-black border-b border-[var(--border-color)] overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--accent-color)] rounded-full blur-[150px]" />
        </div>
        <div className="container-custom py-24 md:py-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block">MAISON ÉLITE BOUTIQUE</span>
            <h1 className="text-6xl md:text-9xl uppercase tracking-tighter mb-10 text-white font-serif">CURATED <br/><span className="gradient-text">VOLUMES</span></h1>
            
            {isSynced && (
              <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest mb-8">
                <RefreshCcw size={14} className="animate-spin-slow" /> Synced with your active session
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
               <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Live Crypto Rates Active</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-12">
              <div className="sticky top-32">
                <h3 className="text-[12px] font-black uppercase tracking-[0.5em] mb-10 border-b border-[var(--border-color)] pb-6 flex items-center gap-3 text-[var(--accent-color)]">
                  <SlidersHorizontal size={16} /> COLLECTIONS
                </h3>
                <div className="space-y-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`block w-full text-left text-[11px] font-black uppercase tracking-[0.3em] transition-all group relative ${
                        filter === cat 
                          ? 'text-[var(--accent-color)]' 
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {cat}
                      {filter === cat && (
                        <motion.div 
                          layoutId="category-dot"
                          className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--accent-color)] rounded-full shadow-[0_0_10px_var(--accent-color)]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Device Sync CTA in Sidebar */}
                <div className="mt-20 p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] group hover:border-[var(--accent-color)] transition-all">
                   <Smartphone className="text-[var(--accent-color)] mb-6" size={32} />
                   <h4 className="text-[12px] font-black uppercase tracking-widest mb-4">CONTINUE ON MOBILE</h4>
                   <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mb-8 uppercase tracking-tighter">Sync your current cart and preferences to any mobile device in seconds.</p>
                   <button 
                    onClick={() => {
                        const code = generateSyncCode();
                        alert(`Your session sync code: ${code}\nUse this on another device to continue.`);
                    }}
                    className="w-full py-4 bg-[var(--accent-color)]/10 text-[var(--accent-color)] border border-[var(--accent-color)]/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-xl shadow-[var(--accent-color)]/5"
                   >
                     LINK PHONE
                   </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Mobile Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-6 mb-16 items-center justify-between">
                <div className="relative w-full sm:max-w-xl group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-color)] transition-colors" size={20} />
                  <input 
                    type="text"
                    placeholder="QUERY THE ARCHIVES..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-color)] outline-none text-[12px] uppercase font-black tracking-[0.2em] transition-all rounded-2xl shadow-sm placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <div className="flex items-center gap-6 w-full sm:w-auto shrink-0">
                   <div className="text-[11px] text-[var(--text-muted)] font-black uppercase tracking-[0.4em] hidden md:block">
                     {filteredProducts.length} ARTICLES EXHIBITED
                   </div>
                   <button 
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-3 bg-[var(--accent-color)] py-5 px-10 text-[11px] font-black uppercase tracking-[0.3em] w-full sm:w-auto justify-center text-white rounded-2xl shadow-xl shadow-[var(--accent-color)]/20"
                   >
                     <Filter size={18} /> FILTERS
                   </button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg group-hover:border-[var(--accent-color)] transition-all duration-700">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                        />
                        
                        {/* Overlay Controls */}
                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-700 delay-75">
                           <button 
                            onClick={() => addToCart(product)}
                            className="w-full bg-white text-black py-5 text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-[var(--accent-color)] hover:text-white transition-all rounded-2xl"
                           >
                             ADD TO BAG
                           </button>
                        </div>

                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-xl transition-all duration-500 ${
                            wishlist.includes(product.id) 
                              ? 'bg-[var(--accent-color)] text-white' 
                              : 'bg-black/20 text-white border border-white/10 hover:bg-[var(--accent-color)]'
                          }`}
                        >
                          <Heart size={20} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                        </button>

                        <div className="absolute top-6 left-6">
                           <div className="flex flex-col gap-2">
                             <span className="bg-black/30 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-[0.5em] px-4 py-2 border border-white/10 rounded-full w-fit">
                               {product.category}
                             </span>
                             <div className="bg-[var(--accent-color)] text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter w-fit shadow-lg shadow-[var(--accent-color)]/20">
                                {formatPrice(product.price)}
                             </div>
                           </div>
                        </div>
                      </div>

                      <div className="mt-8 px-2">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-black uppercase tracking-[0.1em] text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors duration-500 font-serif">{product.name}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                    key={i} 
                                    size={10} 
                                    fill={i < product.rating ? "var(--accent-color)" : "none"} 
                                    className={i < product.rating ? "text-[var(--accent-color)]" : "text-[var(--text-muted)]"} 
                                    />
                                ))}
                            </div>
                            <span className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">{product.stock} IN STOCK</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-48 bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-color)] rounded-[3rem]">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">ARCHIVE EMPTY</h3>
                  <p className="text-[var(--text-secondary)] mb-12 font-medium max-w-sm mx-auto uppercase tracking-tighter text-sm">Your search did not yield any results from our current collections.</p>
                  <button onClick={() => {setFilter('All'); setSearch('');}} className="btn-primary">RESET SEARCH</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[var(--bg-primary)] p-12 shadow-2xl border-l border-[var(--border-color)]"
            >
              <div className="flex justify-between items-center mb-16">
                <h3 className="text-xs font-black tracking-[0.6em] uppercase text-[var(--accent-color)] pt-1">FILTERS</h3>
                <button onClick={() => setShowFilters(false)} className="p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full hover:bg-[var(--accent-color)] hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-16">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)] mb-10 border-b border-[var(--border-color)] pb-4">COLLECTIONS</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {setFilter(cat); setShowFilters(false);}}
                        className={`block w-full text-left py-5 px-8 text-[11px] font-black uppercase tracking-[0.3em] transition-all rounded-2xl border-2 ${
                          filter === cat 
                            ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)] shadow-xl shadow-[var(--accent-color)]/20' 
                            : 'text-[var(--text-primary)] border-[var(--border-color)] bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <StaticCart />
    </div>
  );
}
