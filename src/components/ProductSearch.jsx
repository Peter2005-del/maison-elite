import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';

export default function ProductSearch({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const { visibleProducts } = useData();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const filtered = visibleProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery) ||
      product.designer?.toLowerCase().includes(searchQuery) ||
      product.material?.toLowerCase().includes(searchQuery)
    ).slice(0, 8);

    setResults(filtered);
  }, [query, visibleProducts]);

  const handleProductClick = (product) => {
    // Navigate to shop with product filter
    navigate('/shop', { state: { searchQuery: product.name } });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[9999] flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0A0A0A] border border-white/10">
          <div className="flex items-center gap-4 p-6 border-b border-white/10">
            <Search className="w-5 h-5 text-white/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, categories, or designers..."
              className="flex-1 bg-transparent border-none outline-none text-white text-lg font-sans placeholder:text-white/30"
            />
            <button
              onClick={onClose}
              className="hover:opacity-70 transition-opacity"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.map((product, index) => (
                    <motion.button
                      key={product.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleProductClick(product)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left border-b border-white/5"
                    >
                      <div className="w-16 h-16 bg-white/5 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-white text-base mb-1 truncate">
                          {product.name}
                        </h4>
                        <p className="text-white/40 text-xs font-sans uppercase tracking-wider">
                          {product.category} • {product.designer}
                        </p>
                      </div>
                      <div className="text-white font-sans text-sm font-medium">
                        {formatPrice(product.price)}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {query.length > 0 && results.length === 0 && (
            <div className="p-12 text-center text-white/40 font-sans text-sm">
              No products found for "{query}"
            </div>
          )}

          {query.length === 0 && (
            <div className="p-12 text-center text-white/30 font-sans text-xs uppercase tracking-wider">
              Start typing to search our collection
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
