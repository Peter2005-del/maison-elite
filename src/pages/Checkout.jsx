import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CreditCard, Truck, ShieldCheck, ArrowRight, ArrowLeft, Sparkles, Coins, Wallet, Copy, Smartphone, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const walletAddresses = {
    BTC: 'bc1qlax6px0p6h5v4t0e7e4r5n5x9p7u8w9y6a2j3q',
    ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    USDT: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  };

  const currentWallet = walletAddresses[currency.code] || walletAddresses.ETH;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2500);
  };

  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[var(--bg-primary)]">
        <div className="w-24 h-24 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="text-[var(--text-muted)] opacity-40" size={40} />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">MERCANTILE BAG EMPTY</h2>
        <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em] mb-10">Select articles from the boutique to proceed</p>
        <Link to="/shop" className="btn-primary h-14 px-10 flex items-center">RETURN TO BOUTIQUE</Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[var(--bg-primary)]">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }} 
          animate={{ scale: 1, rotate: 0 }} 
          className="w-32 h-32 bg-green-500/10 border-2 border-green-500/20 rounded-full flex items-center justify-center mb-10 shadow-2xl"
        >
          <Check size={64} className="text-green-500" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">ORDER <span className="gradient-text">CONFIRMED</span></h1>
        <p className="text-[var(--text-secondary)] max-w-md mb-12 text-lg font-medium tracking-tight">
          Your commission has been filed. A confirmation has been dispatched to <span className="text-[var(--accent-color)] font-bold">{formData.email}</span>.
        </p>
        <button onClick={() => navigate('/shop')} className="btn-primary h-14 px-12 uppercase tracking-widest">
          RETURN TO SHOP
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-20">
        
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-12">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-12 bg-black py-8 px-10 rounded-3xl border border-[var(--border-color)]">
            {['LOGISTICS', 'PAYMENT', 'AUTHORIZATION'].map((label, idx) => (
              <div key={label} className="flex gap-4 items-center">
                <div className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500
                  ${step > idx + 1 ? 'bg-green-500 text-white shadow-lg rotate-12' : 
                    step === idx + 1 ? 'bg-[var(--accent-color)] text-white shadow-xl scale-110 -rotate-3' : 'bg-white/5 text-[var(--text-muted)] border border-white/10'}
                `}>
                  {step > idx + 1 ? <Check size={20} /> : idx + 1}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-[0.3em] hidden sm:block ${step === idx + 1 ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                  {label}
                </span>
                {idx < 2 && <div className="w-12 h-[1px] bg-white/10 mx-6 hidden lg:block" />}
              </div>
            ))}
          </div>

          <div className="bg-[var(--bg-card)] p-10 md:p-16 rounded-[4rem] border border-[var(--border-color)] shadow-3xl relative overflow-hidden transition-all hover:border-[var(--accent-color)]/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-bl-full pointer-events-none blur-3xl" />
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-10"
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                      <Truck size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter text-white font-serif">Delivery Logistics</h2>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.3em] mt-1">Global Ivory & Gold Courier Network</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Legal First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} className="form-input text-lg py-5" placeholder="ELENA" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Legal Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} className="form-input text-lg py-5" placeholder="MOREAU" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Communication Cipher (Email)</label>
                    <input name="email" value={formData.email} onChange={handleChange} className="form-input text-lg py-5" placeholder="ATELIER@MAISONELITE.COM" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Physical Coordinate (Address)</label>
                    <input name="address" value={formData.address} onChange={handleChange} className="form-input text-lg py-5" placeholder="AVENUE MONTAIGNE, 30" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">City Atoll</label>
                      <input name="city" value={formData.city} onChange={handleChange} className="form-input text-lg py-5" placeholder="PARIS" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Postal Vector</label>
                      <input name="zip" value={formData.zip} onChange={handleChange} className="form-input text-lg py-5" placeholder="75008" />
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full btn-primary h-20 text-[11px] font-black tracking-[0.5em] rounded-3xl mt-12 flex justify-center items-center gap-4 group">
                    CONTINUE TO VALUATION <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                      {currency.code === 'USD' ? <CreditCard size={32} /> : <Coins size={32} />}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter text-white font-serif">{currency.code === 'USD' ? 'Heritage Assets' : 'Digital Liquidity'}</h2>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.3em] mt-1">Secure {currency.code} Settlement Portal</p>
                    </div>
                  </div>
                  
                  {currency.code === 'USD' ? (
                    <div className="space-y-10">
                      {/* Credit Card Flow */}
                      <div className="bg-gradient-to-br from-[#121212] to-[#050505] text-white p-10 rounded-[2.5rem] shadow-3xl border border-white/5 relative overflow-hidden aspect-[1.58/1] max-w-lg mx-auto">
                        <div className="absolute top-0 right-0 p-16 opacity-[0.05] pointer-events-none">
                            <Sparkles size={300} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="bg-gradient-to-r from-[var(--accent-color)] to-[#ffeaac] w-16 h-11 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
                                    <div className="absolute inset-x-0 top-1/2 h-px bg-black/30" />
                                    <div className="absolute inset-y-0 left-1/2 w-px bg-black/30" />
                                </div>
                                <span className="font-black text-[11px] uppercase tracking-[0.5em] text-[var(--accent-color)]">MAISON PRIVÉ</span>
                            </div>
                            
                            <div className="text-2xl md:text-3xl tracking-[0.3em] font-medium text-white/90">
                            {formData.cardNumber || '•••• •••• •••• ••••'}
                            </div>
                            
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-[8px] font-black uppercase opacity-40 mb-2 tracking-widest">ASSET HOLDER</div>
                                    <div className="font-black text-xs uppercase tracking-[0.3em] text-white">{formData.cardName || 'ELENA MOREAU'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[8px] font-black uppercase opacity-40 mb-2 tracking-widest">VALID THRU</div>
                                    <div className="font-black text-xs tracking-widest text-white">{formData.expiry || 'MM/YY'}</div>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div className="grid gap-8">
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Card Ledger Number</label>
                        <input name="cardNumber" maxLength="19" value={formData.cardNumber} onChange={handleChange} className="form-input text-lg py-5" placeholder="XXXX XXXX XXXX XXXX" />
                        </div>
                        <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Authorized Holder Name</label>
                        <input name="cardName" value={formData.cardName} onChange={handleChange} className="form-input text-lg py-5" placeholder="ELENA MOREAU" />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Cessation Date</label>
                            <input name="expiry" value={formData.expiry} onChange={handleChange} className="form-input text-lg py-5" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Secure Key (CVC)</label>
                            <input name="cvc" value={formData.cvc} onChange={handleChange} className="form-input text-lg py-5" placeholder="XXX" />
                        </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      {/* Crypto Flow */}
                      <div className="bg-[var(--bg-secondary)] p-10 rounded-[2.5rem] border border-[var(--border-color)] space-y-8">
                         <div className="flex flex-col items-center text-center space-y-6">
                            <div className="w-40 h-40 bg-white p-4 rounded-3xl shadow-2xl">
                               {/* Dummy QR Code */}
                               <div className="w-full h-full bg-black flex items-center justify-center rounded-xl overflow-hidden relative">
                                  <div className="grid grid-cols-4 grid-rows-4 gap-1 w-full h-full opacity-80 p-2">
                                     {[...Array(16)].map((_, i) => (
                                       <div key={i} className={`bg-white/90 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-20'}`} />
                                     ))}
                                  </div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="bg-black p-2 rounded-lg border border-white/20">
                                         {currency.code === 'BTC' ? <span className="text-orange-500 font-bold">₿</span> : currency.code === 'ETH' ? <span className="text-blue-400 font-bold">Ξ</span> : <span className="text-green-400 font-bold">₮</span>}
                                      </div>
                                  </div>
                               </div>
                            </div>
                            <div>
                               <h4 className="text-xl font-black uppercase tracking-widest text-white mb-2">Scan to Settle in {currency.code}</h4>
                               <p className="text-[11px] text-[var(--text-muted)] font-black uppercase tracking-[0.3em]">Total Amount: {formatPrice(cartTotal)}</p>
                            </div>
                         </div>

                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-1 block">Official {currency.code} Destination Address</label>
                            <div className="flex gap-4">
                               <div className="flex-1 bg-black border border-white/10 p-5 rounded-2xl text-[12px] font-mono text-[var(--accent-color)] break-all flex items-center truncate">
                                  {currentWallet}
                               </div>
                               <button 
                                onClick={handleCopy}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/5 text-white hover:bg-[var(--accent-color)] hover:text-white border border-white/10'}`}
                               >
                                  {copied ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                         </div>

                         <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl flex items-start gap-4">
                            <ShieldCheck className="text-yellow-500 shrink-0" size={20} />
                            <p className="text-[10px] text-yellow-500/80 font-black uppercase tracking-widest leading-relaxed">
                              Send only {currency.code} to this address. Sending other assets will result in permanent loss of capital.
                            </p>
                         </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-6 mt-12">
                    <button onClick={() => setStep(1)} className="flex-1 btn-outline h-20 rounded-3xl flex justify-center items-center gap-4 text-[11px] font-black tracking-[0.3em]">
                      <ArrowLeft size={20} /> LOGISTICS
                    </button>
                    <button onClick={() => setStep(3)} className="flex-[2] btn-primary h-20 rounded-3xl flex justify-center items-center gap-4 text-[11px] font-black tracking-[0.5em] shadow-2xl">
                      REVIEW COMMISSION <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="space-y-12"
                >
                  <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center text-[var(--accent-color)] border border-[var(--accent-color)]/20">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter text-white font-serif">Final Authorization</h2>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.3em] mt-1">Irretrievable Digital Signature Pending</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8 bg-black/40 p-10 rounded-[2.5rem] border border-[var(--border-color)]">
                     <div className="flex justify-between items-start">
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)]">DELIVERY VECTOR</span>
                       <div className="text-right">
                          <p className="text-sm font-black text-white uppercase tracking-widest mb-1">{formData.firstName} {formData.lastName}</p>
                          <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-tight">{formData.address}</p>
                          <p className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-tight">{formData.city}, {formData.zip}</p>
                       </div>
                     </div>
                     <div className="h-px bg-white/5 w-full" />
                     <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)]">LIQUIDITY METHOD</span>
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${currency.code === 'USD' ? 'bg-green-500/20 text-green-500' : 'bg-[var(--accent-color)]/20 text-[var(--accent-color)]'}`}>
                             {currency.code === 'USD' ? '$' : currency.symbol}
                          </div>
                          <p className="text-sm font-black text-white uppercase tracking-widest">
                            {currency.code === 'USD' ? `ENDING IN •••• ${formData.cardNumber.slice(-4) || 'XXXX'}` : `${currency.code} NETWORK`}
                          </p>
                       </div>
                     </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 mt-12">
                    <button onClick={() => setStep(2)} className="flex-1 btn-outline h-20 rounded-3xl flex justify-center items-center gap-4 text-[11px] font-black tracking-[0.3em]">
                      <ArrowLeft size={20} /> ADJUST ASSETS
                    </button>
                    <button 
                      onClick={handleCreateOrder} 
                      disabled={isProcessing}
                      className="flex-[2] btn-primary h-20 rounded-3xl shadow-[0_20px_50px_rgba(201,162,39,0.3)] flex justify-center items-center gap-4 text-[11px] font-black tracking-[0.5em]"
                    >
                      {isProcessing ? (
                        <>
                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           VERIFYING SIGNATURE...
                        </>
                      ) : (
                        <>AUTHORIZE {formatPrice(cartTotal)} <ArrowRight size={20} /></>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Ledger Summary */}
        <div className="lg:col-span-12 xl:col-span-4">
           <div className="bg-[var(--bg-card)] p-12 rounded-[3.5rem] border border-[var(--border-color)] shadow-3xl sticky top-40 overflow-hidden group hover:border-[var(--accent-color)]/30 transition-all">
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--accent-color)] opacity-20 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-10 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center border border-[var(--border-color)]">
                    <Wallet size={18} className="text-[var(--accent-color)]" />
                 </div>
                 <h3 className="text-xl font-black uppercase tracking-widest text-white font-serif">LEDGER</h3>
              </div>

              <div className="space-y-8 mb-12 max-h-[350px] overflow-y-auto custom-scrollbar pr-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-[var(--border-color)]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-2">
                         <h4 className="font-black text-[11px] uppercase tracking-widest text-white truncate">{item.name}</h4>
                         <span className="text-[11px] font-black tracking-widest text-[var(--accent-color)] whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">{item.category}</p>
                        <p className="text-[10px] font-black text-white/50 bg-white/5 px-2 py-0.5 rounded-md">× {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-5 pt-10 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                  <span>GROSS VALUE</span>
                  <span className="text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                  <span>LOGISTICS FEE</span>
                  <span className="text-[var(--accent-color)]">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-8 border-t border-white/5">
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-white">NET TOTAL</span>
                  <div className="text-right">
                    <span className="text-3xl font-black tracking-tighter text-[var(--accent-color)] leading-none block">{formatPrice(cartTotal)}</span>
                    {currency.code !== 'USD' && (
                       <span className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-2 block">≈ ${cartTotal.toLocaleString()} USD</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-black rounded-3xl border border-white/10 flex items-center gap-4">
                 <div className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center border border-[var(--accent-color)]/20 shadow-lg shadow-[var(--accent-color)]/5">
                    <Smartphone size={18} className="text-[var(--accent-color)]" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white">Device Synced</p>
                    <p className="text-[8px] font-medium text-[var(--text-muted)] uppercase tracking-tighter">Your session is secure & portable</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
