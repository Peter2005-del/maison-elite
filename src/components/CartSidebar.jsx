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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[var(--bg-secondary)] shadow-2xl z-[100] border-l border-[var(--border-color)] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-primary)]/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-accent-gold" />
                <h2 className="text-xl font-bold">Shopping Bag</h2>
                <span className="text-sm text-[var(--text-muted)]">({cartItems.length} items)</span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-[var(--bg-card)] rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--bg-card)] flex items-center justify-center">
                    <ShoppingBag size={40} className="text-[var(--text-muted)]" />
                  </div>
                  <h3 className="text-lg font-bold">Your bag is empty</h3>
                  <p className="text-[var(--text-muted)] max-w-[200px]">Looks like you haven't added anything to your bag yet.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="btn btn-outline mt-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)]"
                  >
                    <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm sm:text-base line-clamp-2 pr-6">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[var(--text-muted)] hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-[var(--bg-primary)] rounded-lg px-2 py-1 border border-[var(--border-color)]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-accent-gold disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-accent-gold"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-accent-gold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-[var(--bg-primary)] border-t border-[var(--border-color)] space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[var(--text-muted)]">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent-gold">{formatPrice(cartTotal)}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] text-center">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-accent-gold text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors shadow-lg shadow-accent-gold/20"
                >
                  Checkout Now <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
