import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, ShieldCheck, ArrowRight, ArrowLeft, Heart, ShoppingBag, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    address: '', city: '', zip: '', country: '',
    cardName: '', cardNumber: '', expiry: '', cvc: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateOrder = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[var(--bg-primary)]">
        <div className="w-24 h-24 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full flex items-center justify-center mb-10">
          <ShoppingBag className="text-[var(--text-muted)]" size={40} />
        </div>
        <h2 className="text-4xl font-serif uppercase tracking-widest mb-6">Your bag is empty</h2>
        <p className="text-[var(--text-secondary)] mb-12 max-w-sm">Continue exploring our archival collections to find your relative masterpiece.</p>
        <Link to="/shop" className="btn-primary">RETURN TO BOUTIQUE</Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[var(--bg-primary)]">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-32 h-32 bg-green-500/10 border-2 border-green-500/20 rounded-full flex items-center justify-center mb-12 shadow-[0_20px_50px_rgba(34,197,94,0.2)]"
        >
          <Check size={60} className="text-green-600" />
        </motion.div>
        <h1 className="text-6xl font-serif uppercase tracking-tighter mb-8 italic">THANK YOU.</h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-md mb-16 leading-relaxed">
          Your acquisition is being prepared. A confirmation session has been dispatched to <span className="text-[var(--accent-color)] font-bold">{formData.email}</span>.
        </p>
        <button onClick={() => navigate('/shop')} className="btn-primary px-16">
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
        
        {/* Progress Bar Container */}
        <div className="lg:col-span-12">
            <div className="flex items-center justify-between max-w-4xl mx-auto mb-20 relative">
               <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--border-color)] -z-10" />
               <div className="absolute top-1/2 left-0 h-[1.5px] bg-[var(--accent-color)] transition-all duration-700 -z-10" style={{ width: step === 1 ? '0%' : '100%' }} />
               
               {[1, 2].map((i) => (
                 <div key={i} className="flex flex-col items-center gap-4 bg-[var(--bg-primary)] px-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= i ? 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white shadow-xl' : 'bg-white border-[var(--border-color)] text-[var(--text-muted)]'}`}>
                       {step > i ? <Check size={20} /> : <span className="font-bold">{i}</span>}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${step >= i ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                       {i === 1 ? 'SHIPPING' : 'PAYMENT'}
                    </span>
                 </div>
               ))}
            </div>
        </div>

        {/* Left Column: Form */}
        <div className="lg:col-span-12 xl:col-span-8">
           <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12 bg-white border border-[var(--border-color)] p-12 md:p-16 rounded-[2.5rem] shadow-sm"
                >
                  <div className="flex items-center gap-6 mb-4">
                     <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] border border-[var(--border-color)]">
                        <Truck size={28} />
                     </div>
                     <h2 className="text-3xl font-serif uppercase tracking-tight">Shipping Logistics</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">First Name</label>
                       <input name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" placeholder="Enter first name" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Last Name</label>
                       <input name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" placeholder="Enter last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Email Address</label>
                     <input name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="Enter email" type="email" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Street Address</label>
                     <input name="address" value={formData.address} onChange={handleChange} className="form-input" placeholder="Enter shipping address" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">City</label>
                       <input name="city" value={formData.city} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Postal Code</label>
                       <input name="zip" value={formData.zip} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Country</label>
                       <input name="country" value={formData.country} onChange={handleChange} className="form-input" placeholder="United States" />
                    </div>
                  </div>
                  
                  <button onClick={() => setStep(2)} className="w-full btn-primary h-16 mt-10 rounded-2xl">
                    CONTINUE TO PAYMENT <ArrowRight size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-12 bg-white border border-[var(--border-color)] p-12 md:p-16 rounded-[2.5rem] shadow-sm text-center"
                >
                  <div className="flex items-center gap-6 mb-12 text-left">
                     <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] border border-[var(--border-color)]">
                        <CreditCard size={28} />
                     </div>
                     <h2 className="text-3xl font-serif uppercase tracking-tight">Payment Verification</h2>
                  </div>

                  {/* Credit Card UI */}
                  <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-white p-10 rounded-[2rem] aspect-[1.6/1] max-w-md mx-auto relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 right-0 p-10 opacity-10"><Shield size={180} /></div>
                     <div className="h-full flex flex-col justify-between relative z-10 text-left">
                        <p className="text-[10px] font-black tracking-[0.4em] text-white/40">PREMIUM CREDIT</p>
                        <p className="text-2xl font-bold tracking-[0.3em] font-mono">{formData.cardNumber || '•••• •••• •••• ••••'}</p>
                        <div className="flex justify-between items-end">
                           <p className="text-xs font-black uppercase tracking-widest">{formData.cardName || 'YOUR NAME'}</p>
                           <p className="text-xs font-black tracking-widest">{formData.expiry || 'MM/YY'}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Cardholder Name</label>
                       <input name="cardName" value={formData.cardName} onChange={handleChange} className="form-input" placeholder="Name on card" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Card Number</label>
                       <input name="cardNumber" maxLength="19" value={formData.cardNumber} onChange={handleChange} className="form-input" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">Expiry Date</label>
                       <input name="expiry" value={formData.expiry} onChange={handleChange} className="form-input" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] ml-1">CVC Code</label>
                       <input name="cvc" value={formData.cvc} onChange={handleChange} className="form-input" placeholder="123" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-12">
                    <button onClick={() => setStep(1)} className="flex-1 btn-outline h-16 rounded-2xl">
                      <ArrowLeft size={18} /> BACK
                    </button>
                    <button 
                      onClick={handleCreateOrder} 
                      disabled={isProcessing}
                      className="flex-[2] btn-primary h-16 rounded-2xl relative overflow-hidden"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-3"><RefreshCcw className="animate-spin" size={20} /> AUTHORIZING...</div>
                      ) : (
                        <>COMPLETE ACQUISITION - {formatPrice(cartTotal)}</>
                      )}
                    </button>
                  </div>
                  
                  <div className="pt-8 flex items-center justify-center gap-3 text-green-600">
                     <ShieldCheck size={18} />
                     <p className="text-[9px] font-black uppercase tracking-widest">Secured via end-to-end RSA encryption protocols</p>
                  </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-12 xl:col-span-4">
           <div className="bg-[var(--bg-secondary)] p-12 rounded-[2.5rem] border border-[var(--border-color)] sticky top-40">
              <h3 className="text-xl font-serif uppercase tracking-widest mb-10 border-b border-[var(--border-color)] pb-6">Summary</h3>
              
              <div className="space-y-6 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                 {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                       <div className="w-16 h-20 rounded-xl overflow-hidden bg-white border border-[var(--border-color)] shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <h4 className="text-[10px] font-black uppercase tracking-widest truncate">{item.name}</h4>
                          <p className="text-xs font-bold text-[var(--accent-color)] mt-1">{formatPrice(item.price)}</p>
                          <p className="text-[9px] text-[var(--text-muted)] mt-1 uppercase">QTY: {item.quantity}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-10 pt-10 border-t border-[var(--border-color)] space-y-4">
                 <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                 </div>
                 <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
                    <span>Shipping</span>
                    <span>$0.00</span>
                 </div>
                 <div className="h-px bg-[var(--border-color)] my-4" />
                 <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black text-[var(--accent-color)]">{formatPrice(cartTotal)}</span>
                 </div>
              </div>

              <div className="mt-12 bg-white/50 p-6 rounded-2xl border border-[var(--border-color)] flex items-center gap-4">
                 <Heart className="text-[var(--accent-color)]" size={20} />
                 <p className="text-[9px] font-medium text-[var(--text-muted)] uppercase leading-relaxed font-black tracking-widest">
                    Your acquisition supports sustainable artisan heritage across 12 countries.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// Support Icons
function RefreshCcw(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-ccw"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
  )
}
