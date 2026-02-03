import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Search, Filter, X, Star, SlidersHorizontal, Smartphone, RefreshCcw, ArrowUpDown, Grid3X3, LayoutGrid, Sparkles, TrendingUp, Package, Eye } from 'lucide-react';

import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSync } from '../context/SyncContext';
import StaticCart from '../components/StaticCart';

const categories = ['All', 'Evening', 'Bridal', 'Ready-to-Wear', 'Custom', 'Accessories'];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Selling', value: 'sales' },
  { label: 'Top Rated', value: 'rating' },
];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $1,000', min: 500, max: 1000 },
  { label: '$1,000 - $2,500', min: 1000, max: 2500 },
  { label: '$2,500 - $5,000', min: 2500, max: 5000 },
  { label: 'Over $5,000', min: 5000, max: Infinity },
];

export default function Shop() {
  const { visibleProducts } = useData();
  const { formatPrice, currency } = useCurrency();
  const { isSynced, generateSyncCode } = useSync();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [gridView, setGridView] = useState('grid'); // 'grid' or 'large'
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Advanced filtering and sorting
  const filteredProducts = useMemo(() => {
    let products = visibleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                           product.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || product.category === filter;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesFilter && matchesPrice;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'sales':
        products.sort((a, b) => b.sales - a.sales);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return products;
  }, [visibleProducts, search, filter, priceRange, sortBy]);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-[var(--bg-primary)]">
         <div className="relative">
           <div className="w-20 h-20 border-4 border-[var(--border-color)] border-t-[var(--accent-color)] rounded-full animate-spin" />
           <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-[var(--accent-color)]/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
         </div>
         <p className="font-black tracking-[0.6em] text-[12px] uppercase text-[var(--accent-color)] animate-pulse mt-8">Synchronizing Boutique...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[var(--bg-primary)]">
      {/* Shop Header */}
      <section className="bg-black border-b border-[var(--border-color)] overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--accent-color)] rounded-full blur-[150px]" />
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px] opacity-30" />
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

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
               <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                 <Package size={16} className="text-[var(--accent-color)]" />
                 <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{visibleProducts.length} PIECES</span>
               </div>
               <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                 <TrendingUp size={16} className="text-green-400" />
                 <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">LIVE RATES</span>
               </div>
               <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                 <Sparkles size={16} className="text-yellow-400" />
                 <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">EXCLUSIVE ACCESS</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Top Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between bg-[var(--bg-secondary)] p-6 rounded-3xl border border-[var(--border-color)]">
            {/* Search */}
            <div className="relative w-full lg:max-w-md group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search collections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[var(--accent-color)] outline-none text-sm font-medium transition-all rounded-xl placeholder:text-[var(--text-muted)]"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                    filter === cat 
                      ? 'bg-[var(--accent-color)] text-white shadow-lg shadow-[var(--accent-color)]/20' 
                      : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Sort Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl text-[11px] font-bold uppercase tracking-widest hover:border-[var(--accent-color)] transition-all"
                >
                  <ArrowUpDown size={14} />
                  <span className="hidden sm:inline">{sortOptions.find(s => s.value === sortBy)?.label}</span>
                </button>
                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => { setSortBy(option.value); setShowSortDropdown(false); }}
                          className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-color)] hover:text-white transition-colors ${
                            sortBy === option.value ? 'bg-[var(--accent-color)]/20 text-[var(--accent-color)]' : 'text-[var(--text-secondary)]'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Grid Toggle */}
              <div className="flex bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                <button 
                  onClick={() => setGridView('grid')}
                  className={`p-3 transition-all ${gridView === 'grid' ? 'bg-[var(--accent-color)] text-white' : 'text-[var(--text-muted)] hover:text-white'}`}
                >
                  <Grid3X3 size={16} />
                </button>
                <button 
                  onClick={() => setGridView('large')}
                  className={`p-3 transition-all ${gridView === 'large' ? 'bg-[var(--accent-color)] text-white' : 'text-[var(--text-muted)] hover:text-white'}`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button 
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 bg-[var(--accent-color)] py-3 px-5 text-[11px] font-black uppercase tracking-widest text-white rounded-xl shadow-lg"
              >
                <Filter size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 shrink-0 space-y-10">
              <div className="sticky top-32 space-y-10">
                {/* Price Range Filter */}
                <div className="bg-[var(--bg-secondary)] p-8 rounded-3xl border border-[var(--border-color)]">
                  <h3 className="text-[12px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-3 text-[var(--accent-color)]">
                    <SlidersHorizontal size={16} /> PRICE RANGE
                  </h3>
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => setPriceRange(range)}
                        className={`block w-full text-left p-4 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                          priceRange.label === range.label 
                            ? 'bg-[var(--accent-color)] text-white' 
                            : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-white'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Filters */}
                {(filter !== 'All' || priceRange.label !== 'All Prices' || search) && (
                  <div className="bg-[var(--bg-secondary)] p-6 rounded-3xl border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">ACTIVE FILTERS</span>
                      <button 
                        onClick={() => { setFilter('All'); setPriceRange(priceRanges[0]); setSearch(''); }}
                        className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-wider"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {filter !== 'All' && (
                        <span className="flex items-center gap-2 bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase">
                          {filter}
                          <button onClick={() => setFilter('All')}><X size={12} /></button>
                        </span>
                      )}
                      {priceRange.label !== 'All Prices' && (
                        <span className="flex items-center gap-2 bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase">
                          {priceRange.label}
                          <button onClick={() => setPriceRange(priceRanges[0])}><X size={12} /></button>
                        </span>
                      )}
                      {search && (
                        <span className="flex items-center gap-2 bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase">
                          "{search}"
                          <button onClick={() => setSearch('')}><X size={12} /></button>
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Device Sync CTA */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[var(--accent-color)]/10 to-purple-500/10 border border-[var(--accent-color)]/20 group hover:border-[var(--accent-color)] transition-all">
                   <Smartphone className="text-[var(--accent-color)] mb-6" size={32} />
                   <h4 className="text-[12px] font-black uppercase tracking-widest mb-4">CONTINUE ON MOBILE</h4>
                   <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mb-8 uppercase tracking-tighter">Sync your cart and preferences instantly.</p>
                   <button 
                    onClick={() => {
                        const code = generateSyncCode();
                        alert(`Your session sync code: ${code}\nUse this on another device to continue.`);
                    }}
                    className="w-full py-4 bg-[var(--accent-color)] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--accent-color)]/80 transition-all shadow-xl shadow-[var(--accent-color)]/20"
                   >
                     LINK PHONE
                   </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-[var(--text-muted)] text-sm">
                  Showing <span className="text-white font-bold">{filteredProducts.length}</span> of {visibleProducts.length} products
                </p>
              </div>

              {/* Product Grid */}
              <div className={`grid gap-8 ${gridView === 'large' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group"
                    >
                      <div className={`relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg group-hover:border-[var(--accent-color)] transition-all duration-500 ${gridView === 'large' ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Overlay Controls */}
                        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                           <div className="flex gap-3">
                             <button 
                              onClick={() => addToCart(product)}
                              className="flex-1 bg-white text-black py-4 text-[11px] font-black uppercase tracking-widest shadow-2xl hover:bg-[var(--accent-color)] hover:text-white transition-all rounded-xl flex items-center justify-center gap-2"
                             >
                               <ShoppingBag size={16} /> ADD TO BAG
                             </button>
                             <button 
                              onClick={() => handleQuickView(product)}
                              className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-all"
                             >
                               <Eye size={18} />
                             </button>
                           </div>
                        </div>

                        {/* Wishlist Button */}
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-xl transition-all duration-300 ${
                            wishlist.includes(product.id) 
                              ? 'bg-[var(--accent-color)] text-white scale-110' 
                              : 'bg-black/30 text-white border border-white/10 hover:bg-[var(--accent-color)] hover:scale-110'
                          }`}
                        >
                          <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                        </button>

                        {/* Tags */}
                        <div className="absolute top-4 left-4">
                           <div className="flex flex-col gap-2">
                             <span className="bg-black/40 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-white/10 rounded-full">
                               {product.category}
                             </span>
                             {product.sales > 30 && (
                               <span className="bg-green-500/90 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                                 <TrendingUp size={10} /> BESTSELLER
                               </span>
                             )}
                           </div>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute bottom-4 left-4 opacity-100 group-hover:opacity-0 transition-opacity">
                          <div className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-xl text-sm font-black tracking-tighter shadow-lg">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 px-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent-color)] transition-colors line-clamp-1">{product.name}</h3>
                            <span className="text-sm font-bold text-[var(--accent-color)]">{formatPrice(product.price)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                    key={i} 
                                    size={12} 
                                    fill={i < product.rating ? "var(--accent-color)" : "none"} 
                                    className={i < product.rating ? "text-[var(--accent-color)]" : "text-[var(--text-muted)]"} 
                                    />
                                ))}
                            </div>
                            <span className="text-[10px] text-[var(--text-muted)] font-medium">{product.stock} in stock</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProducts.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-32 bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-color)] rounded-[3rem]"
                >
                  <div className="w-24 h-24 mx-auto mb-8 bg-[var(--bg-card)] rounded-full flex items-center justify-center border border-[var(--border-color)]">
                    <Search size={40} className="text-[var(--text-muted)] opacity-30" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">NO RESULTS FOUND</h3>
                  <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">Try adjusting your search or filter criteria to find what you're looking for.</p>
                  <button onClick={() => {setFilter('All'); setSearch(''); setPriceRange(priceRanges[0]);}} className="btn-primary">
                    RESET FILTERS
                  </button>
                </motion.div>
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
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[var(--bg-primary)] p-8 shadow-2xl border-l border-[var(--border-color)] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-lg font-black tracking-widest uppercase text-[var(--accent-color)]">FILTERS</h3>
                <button onClick={() => setShowFilters(false)} className="p-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-10">
                {/* Categories */}
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">CATEGORIES</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {setFilter(cat); setShowFilters(false);}}
                        className={`py-3 px-4 text-[11px] font-bold uppercase tracking-wider transition-all rounded-xl border ${
                          filter === cat 
                            ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' 
                            : 'text-[var(--text-primary)] border-[var(--border-color)] bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">PRICE RANGE</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {setPriceRange(range); setShowFilters(false);}}
                        className={`block w-full text-left py-3 px-4 text-[11px] font-bold uppercase tracking-wider transition-all rounded-xl border ${
                          priceRange.label === range.label 
                            ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' 
                            : 'text-[var(--text-primary)] border-[var(--border-color)] bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-4">SORT BY</h4>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {setSortBy(option.value); setShowFilters(false);}}
                        className={`block w-full text-left py-3 px-4 text-[11px] font-bold uppercase tracking-wider transition-all rounded-xl border ${
                          sortBy === option.value 
                            ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' 
                            : 'text-[var(--text-primary)] border-[var(--border-color)] bg-[var(--bg-secondary)]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <button 
                onClick={() => setShowFilters(false)}
                className="w-full btn-primary h-14 mt-10"
              >
                APPLY FILTERS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[var(--bg-card)] rounded-[3rem] border border-[var(--border-color)] shadow-2xl max-w-4xl w-full overflow-hidden"
            >
              <button 
                onClick={() => setQuickViewProduct(null)} 
                className="absolute top-6 right-6 z-10 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all"
              >
                <X size={20} />
              </button>
              
              <div className="grid md:grid-cols-2">
                <div className="aspect-square bg-[var(--bg-secondary)]">
                  <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <span className="text-[var(--accent-color)] text-[10px] font-black uppercase tracking-widest mb-4">{quickViewProduct.category}</span>
                  <h2 className="text-3xl font-black uppercase tracking-tight mb-4">{quickViewProduct.name}</h2>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < quickViewProduct.rating ? "var(--accent-color)" : "none"} className={i < quickViewProduct.rating ? "text-[var(--accent-color)]" : "text-[var(--text-muted)]"} />
                      ))}
                    </div>
                    <span className="text-sm text-[var(--text-muted)]">({quickViewProduct.sales} sold)</span>
                  </div>
                  <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                    An exquisite piece from our curated collection, crafted with the finest materials and attention to detail. Perfect for those who appreciate timeless elegance.
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl font-black text-[var(--accent-color)]">{formatPrice(quickViewProduct.price)}</span>
                    {currency.code !== 'USD' && (
                      <span className="text-sm text-[var(--text-muted)]">≈ ${quickViewProduct.price.toLocaleString()} USD</span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                      className="flex-1 btn-primary h-14"
                    >
                      <ShoppingBag size={18} className="mr-2" /> ADD TO BAG
                    </button>
                    <button 
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className={`w-14 h-14 rounded-xl border transition-all flex items-center justify-center ${
                        wishlist.includes(quickViewProduct.id) 
                          ? 'bg-[var(--accent-color)] text-white border-[var(--accent-color)]' 
                          : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:border-[var(--accent-color)]'
                      }`}
                    >
                      <Heart size={20} fill={wishlist.includes(quickViewProduct.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm mt-6">
                    <span className="text-green-400">●</span> {quickViewProduct.stock} in stock
                  </p>
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
