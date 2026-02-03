import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Wallet } from 'lucide-react';
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
    <div className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-color)] shadow-2xl sticky top-24 overflow-hidden flex flex-col h-[calc(100vh-10rem)] transition-all hover:border-[var(--accent-color)]/30">
      {/* Header */}
      <div className="p-10 border-b border-[var(--border-color)] bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-color)]/10 rounded-bl-full pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <ShoppingBag className="text-[var(--accent-color)]" size={24} />
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-white">BAG</h2>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-[var(--accent-color)] bg-white/5 px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
            {cartItems.length} ITEMS
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 p-10">
            <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-color)] shadow-inner">
              <ShoppingBag size={40} className="text-[var(--text-muted)] opacity-30" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-3">BAG IS EMPTY</h3>
              <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] leading-relaxed">SELECT ARTICLES FROM OUR<br/>CURATED COLLECTIONS</p>
            </div>
          </div>
        ) : (
          cartItems.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex gap-6 group"
            >
              <div className="w-24 h-28 rounded-2xl overflow-hidden flex-shrink-0 border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all shadow-xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-black text-[12px] uppercase tracking-widest line-clamp-1 group-hover:text-[var(--accent-color)] transition-colors font-serif">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[var(--text-muted)] hover:text-red-500 transition-colors p-2 bg-[var(--bg-secondary)] rounded-full border border-[var(--border-color)]"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">{item.category}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-4 bg-[var(--bg-secondary)] rounded-xl px-3 py-2 border border-[var(--border-color)] shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-[12px] font-black min-w-[20px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--accent-color)] transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-sm tracking-tighter text-[var(--accent-color)]">{formatPrice(item.price * item.quantity)}</p>
                    {currency.code !== 'USD' && (
                        <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">≈ ${(item.price * item.quantity).toLocaleString()} USD</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-10 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em]">
              <span>CURRENCY</span>
              <span className="flex items-center gap-2 text-[var(--accent-color)]"><Wallet size={12}/> {currency.code}</span>
            </div>
            <div className="flex justify-between items-end border-t border-[var(--border-color)] pt-6">
              <span className="text-xs font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">ESTIMATED TOTAL</span>
              <div className="text-right">
                <span className="text-3xl font-black tracking-tighter text-[var(--accent-color)] block leading-none">{formatPrice(cartTotal)}</span>
                {currency.code !== 'USD' && (
                  <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest">≈ ${cartTotal.toLocaleString()} USD</span>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full btn-primary h-16 shadow-2xl text-[11px] tracking-[0.5em] rounded-2xl"
          >
            PROCEED TO CHECKOUT <ArrowRight size={20} className="ml-2" />
          </button>
          
          <div className="flex justify-center gap-4 opacity-40">
             <div className="text-[8px] font-black tracking-widest border border-[var(--border-color)] px-4 py-1 rounded-full">ENCRYPTED</div>
             <div className="text-[8px] font-black tracking-widest border border-[var(--border-color)] px-4 py-1 rounded-full">AUTHENTIC</div>
          </div>
        </div>
      )}
    </div>
  );
}
