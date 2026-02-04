import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartSidebar() {
  const { 
    cartItems, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] z-[110] border-l border-[var(--border-color)] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-[var(--border-color)] flex items-center justify-between bg-[#FDFCF8]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center text-[var(--accent-color)] border border-[var(--border-color)] shadow-sm">
                   <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-serif uppercase tracking-tight font-bold">Your Bag</h2>
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">{cartItems.length} Articles</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 hover:bg-[var(--bg-secondary)] rounded-full transition-all flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                  <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-dashed border-[var(--border-color)]">
                    <ShoppingBag size={40} className="text-[var(--text-muted)] opacity-30" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif uppercase mb-2">The bag is empty</h3>
                    <p className="text-[var(--text-muted)] text-sm max-w-[240px] font-medium leading-relaxed">Consider initiating a selection from our current archival collections.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="btn-outline h-14 px-10 text-[10px]"
                  >
                    CONTINUE SELECTION
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm group-hover:border-[var(--accent-color)] transition-all">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-sm tracking-tight text-black line-clamp-2 pr-6 uppercase">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4 bg-[var(--bg-secondary)] rounded-xl px-4 py-2 border border-[var(--border-color)]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-all disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-black text-[var(--accent-color)] tracking-tighter">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-8 bg-[#FDFCF8] border-t border-[var(--border-color)] space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Subtotal Valuation</span>
                    <span className="text-sm font-black text-black">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="h-px bg-[var(--border-color)] w-full" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Total</span>
                    <span className="text-2xl font-serif text-[var(--accent-color)] font-bold">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] text-center font-bold uppercase tracking-widest">
                    Complimentary heritage shipping included
                  </p>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full h-20 bg-[var(--accent-color)] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-all shadow-2xl shadow-[var(--accent-color)]/20 active:scale-[0.98]"
                >
                  SECURE COMMISION <ArrowRight size={20} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
