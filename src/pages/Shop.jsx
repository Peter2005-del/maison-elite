import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Filter, X, Star, SlidersHorizontal, ArrowUpDown, Grid3X3, LayoutGrid, Sparkles, Package, Eye } from 'lucide-react';

import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import StaticCart from '../components/StaticCart';

const categories = ['All', 'Evening', 'Bridal', 'Ready-to-Wear', 'Custom', 'Accessories'];
const sortOptions = [
  { label: 'Featured Selection', value: 'featured' },
  { label: 'Recently Acquired', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Maison Favorites', value: 'sales' },
];
const priceRanges = [
  { label: 'All Valuations', min: 0, max: Infinity },
  { label: 'Under $1,000', min: 0, max: 1000 },
  { label: '$1,000 - $2,500', min: 1000, max: 2500 },
  { label: '$2,500 - $5,000', min: 2500, max: 5000 },
  { label: 'Over $5,000', min: 5000, max: Infinity },
];

export default function Shop() {
  const { visibleProducts } = useData();
  const { formatPrice } = useCurrency();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [gridView, setGridView] = useState('grid'); 
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let products = visibleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                           product.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || product.category === filter;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesFilter && matchesPrice;
    });

    switch (sortBy) {
      case 'price-asc': products.sort((a, b) => a.price - b.price); break;
      case 'price-desc': products.sort((a, b) => b.price - a.price); break;
      case 'sales': products.sort((a, b) => b.sales - a.sales); break;
      case 'newest': products.sort((a, b) => b.id - a.id); break;
      default: break;
    }

    return products;
  }, [visibleProducts, search, filter, priceRange, sortBy]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDFCF8]">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           className="w-12 h-12 border-2 border-[var(--accent-color)] border-t-transparent rounded-full"
         />
         <p className="mt-8 text-sm font-light tracking-[0.4em] uppercase text-[var(--accent-color)] animate-pulse">Refining the Archive...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCF8] selection:bg-[var(--accent-color)] selection:text-white">
      {/* Header - Minimal & Clean */}
      <section className="relative px-6 pt-32 pb-24 border-b border-black/5 bg-white md:px-12 lg:pt-48 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="mb-6 block text-[10px] font-black uppercase tracking-[0.5em] text-[var(--accent-color)]">The Boutique Selection</span>
            <h1 className="mb-8 font-serif text-6xl font-normal uppercase tracking-tighter text-black md:text-8xl lg:text-9xl">
              CURATED <br />
              <span className="italic opacity-80">COLLECTIONS</span>
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mt-12 md:gap-12">
               <div className="flex items-center gap-3">
                 <Package size={16} className="text-[var(--accent-color)]" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">{visibleProducts.length} ARTICLES</span>
               </div>
               <div className="flex items-center gap-3">
                 <Sparkles size={16} className="text-[var(--accent-color)]" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">HERITAGE QUALITY</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          {/* Controls Bar - Minimal */}
          <div className="flex flex-col items-center justify-between gap-8 mb-16 lg:flex-row">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-black/30" size={18} />
              <input 
                type="text"
                placeholder="FIND AN ARTICLE..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-b border-black/10 bg-transparent py-4 pl-10 pr-4 text-[11px] font-bold uppercase tracking-[0.2em] outline-none transition-all focus:border-[var(--accent-color)]"
              />
            </div>

            {/* Categories */}
            <div className="flex w-full gap-8 pb-4 overflow-x-auto lg:w-auto lg:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                    filter === cat 
                      ? 'text-[var(--accent-color)]' 
                      : 'text-black/30 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View & Sort */}
            <div className="flex items-center gap-8 shrink-0">
              <div className="relative">
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[var(--accent-color)] transition-all"
                >
                  <ArrowUpDown size={14} />
                  <span>{sortOptions.find(s => s.value === sortBy)?.label}</span>
                </button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: 10 }} 
                      className="absolute right-0 z-50 mt-4 w-56 border border-black/5 bg-white p-2 shadow-2xl"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                          className={`w-full px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest transition-colors ${
                            sortBy === option.value ? 'bg-[var(--accent-color)] text-white' : 'text-black hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setGridView('grid')} className={`transition-all ${gridView === 'grid' ? 'text-[var(--accent-color)]' : 'text-black/20 hover:text-black'}`}>
                  <Grid3X3 size={18} />
                </button>
                <button onClick={() => setGridView('large')} className={`transition-all ${gridView === 'large' ? 'text-[var(--accent-color)]' : 'text-black/20 hover:text-black'}`}>
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-20 lg:flex-row">
            {/* Sidebar Filters - Clean */}
            <aside className="hidden w-64 lg:block shrink-0">
              <div className="sticky space-y-16 top-32">
                <div>
                  <h3 className="mb-8 text-[11px] font-black uppercase tracking-[0.4em] text-black">Valuation</h3>
                  <div className="space-y-4">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(range)}
                        className={`block w-full text-left text-[10px] uppercase tracking-widest transition-all ${
                          priceRange.label === range.label 
                            ? 'font-black text-[var(--accent-color)]' 
                            : 'font-medium text-black/40 hover:text-black'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-black p-10 text-white">
                   <div className="relative z-10">
                      <h4 className="mb-6 text-[10px] font-black uppercase tracking-widest opacity-60">Privilege Circle</h4>
                      <p className="mb-8 font-serif text-lg leading-tight">Access archival releases before the public premiere.</p>
                      <button className="border-b border-white/30 pb-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:border-white">
                        Join the Maison
                      </button>
                   </div>
                </div>
              </div>
            </aside>

            {/* Product Ledger */}
            <div className="flex-1">
              <div className={`grid gap-y-16 gap-x-8 ${gridView === 'large' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="group"
                    >
                      {/* Product Image Space */}
                      <div className="relative mb-8 overflow-hidden bg-[#F8F7F2] aspect-[3/4]">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                        
                        {/* Minimal Reveal - No Bag Icon in Shop Grid */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 bg-white/10 group-hover:opacity-100">
                           <div className="flex gap-4">
                             <button 
                               onClick={() => addToCart(product)}
                               className="bg-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-black shadow-2xl hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500"
                             >
                               ACQUIRE ARTICLE
                             </button>
                             <button 
                               onClick={() => setQuickViewProduct(product)}
                               className="bg-white/80 p-4 backdrop-blur-md text-black hover:bg-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75"
                             >
                               <Eye size={18} />
                             </button>
                           </div>
                        </div>

                        {/* Minimal Wishlist */}
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute right-6 top-6 transition-all duration-300 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        >
                          <Heart size={20} className={wishlist.includes(product.id) ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-black/40 hover:text-black"} />
                        </button>
                      </div>

                      {/* Product Metadata - Perfectly Aligned */}
                      <div className="text-center">
                        <span className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-black/30">{product.category}</span>
                        <h3 className="mb-3 font-serif text-xl font-normal uppercase tracking-tight text-black transition-colors group-hover:text-[var(--accent-color)]">{product.name}</h3>
                        <div className="flex flex-col items-center gap-4">
                            <span className="text-sm font-black tracking-tighter text-black">{formatPrice(product.price)}</span>
                            <div className="flex items-center gap-1 opacity-20">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={8} fill={i < product.rating ? "black" : "none"} className="text-black" />
                                ))}
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <div className="py-40 text-center border-t border-black/5">
                   <h3 className="font-serif text-3xl uppercase tracking-tight text-black/50">No matches in the archive</h3>
                   <button onClick={() => {setFilter('All'); setSearch(''); setPriceRange(priceRanges[0]);}} className="mt-8 text-[11px] font-black uppercase tracking-[0.4em] text-[var(--accent-color)] border-b border-[var(--accent-color)]/20 pb-1">
                      RESET LEDGER
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal - Professional & Minimal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setQuickViewProduct(null)} className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative grid w-full max-w-6xl overflow-hidden bg-white shadow-2xl md:grid-cols-2">
              <button onClick={() => setQuickViewProduct(null)} className="absolute right-8 top-8 z-10 p-2 text-black hover:bg-gray-100 transition-all">
                <X size={24} />
              </button>
              
              <div className="aspect-[4/5] bg-[#F8F7F2]">
                <img src={quickViewProduct.image} className="h-full w-full object-cover" alt="" />
              </div>
              <div className="flex flex-col justify-center p-12 lg:p-24">
                <span className="mb-6 block text-[10px] font-black uppercase tracking-[0.5em] text-[var(--accent-color)]">{quickViewProduct.category} Collection</span>
                <h2 className="mb-10 font-serif text-5xl font-normal uppercase tracking-tight text-black lg:text-7xl leading-none">{quickViewProduct.name}</h2>
                <div className="mb-12 flex items-baseline gap-6 border-b border-black/5 pb-12">
                   <span className="text-4xl font-black text-black">{formatPrice(quickViewProduct.price)}</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Reference: ME-{quickViewProduct.id}092</span>
                </div>
                <p className="mb-16 text-lg font-light leading-relaxed text-black/60">
                  A definitive statement piece from our curated volumes. Meticulously constructed using heritage techniques and the finest artisanal materials.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }} className="flex-1 bg-black py-6 text-[11px] font-black uppercase tracking-[0.4em] text-white hover:bg-[var(--accent-color)] transition-all">
                    ACQUIRE ARTICLE
                  </button>
                  <button onClick={() => toggleWishlist(quickViewProduct.id)} className="flex items-center justify-center border border-black/10 px-8 py-6 transition-all hover:bg-gray-50">
                    <Heart size={20} fill={wishlist.includes(quickViewProduct.id) ? "var(--accent-color)" : "none"} className={wishlist.includes(quickViewProduct.id) ? "text-[var(--accent-color)]" : "text-black"} />
                  </button>
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
