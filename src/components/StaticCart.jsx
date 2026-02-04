import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

export default function StaticCart() {
  const { 
    cartItems, 
    cartTotal,
    removeFromCart, 
    updateQuantity 
  } = useCart();
  
  const { formatPrice, currency } = useCurrency();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white border border-black/5 shadow-[0_0_100px_rgba(0,0,0,0.03)] sticky top-32 overflow-hidden flex flex-col h-[calc(100vh-12rem)] transition-all hover:border-black/10">
      {/* Header - Minimal Ivory */}
      <div className="p-10 border-b border-black/5 bg-[#FDFCF8] relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-black">House Selection</h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-black/30">
            {cartItems.length} ARTICLES
          </span>
        </div>
      </div>

      {/* Cart Items - Clean & Spaced */}
      <div className="flex-1 overflow-y-auto p-10 space-y-12 no-scrollbar">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
            <div className="w-20 h-20 rounded-full border border-dashed border-black/10 flex items-center justify-center">
              <ShoppingBag size={32} className="text-black/10" />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 mb-3">BAG IS EMPTY</h3>
              <p className="text-[9px] text-black/20 font-black uppercase tracking-[0.2em] leading-relaxed">Consider initiating a selection from our current archival collections</p>
            </div>
          </div>
        ) : (
          cartItems.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex gap-8 group"
            >
              <div className="w-20 h-28 flex-shrink-0 bg-[#F8F7F2] border border-black/5 transition-all shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-[14px] uppercase tracking-tight text-black flex-1 pr-4 line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-black/20 hover:text-black transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--accent-color)]">{item.category}</span>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-4 bg-gray-50/50 px-3 py-1.5 border border-black/5">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="text-black/20 hover:text-black transition-all"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-[12px] font-bold min-w-[20px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="text-black/20 hover:text-black transition-all"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[13px] tracking-tighter text-black">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer - Minimal Summary */}
      {cartItems.length > 0 && (
        <div className="p-10 bg-white border-t border-black/5 space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30">Total Valuation</span>
              <span className="text-3xl font-serif text-black leading-none">{formatPrice(cartTotal)}</span>
            </div>
            <div className="h-px bg-black/5 w-full" />
            <p className="text-[9px] text-black/30 text-center font-black uppercase tracking-widest">
              Complimentary Atelier Shipping Included
            </p>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full bg-black text-white h-20 text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[var(--accent-color)] transition-all flex items-center justify-center gap-4"
          >
            SECURE ACQUISITION <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
