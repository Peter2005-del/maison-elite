import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, ShoppingBag, Heart, Shield, LogOut, Camera, ChevronRight, Package, CreditCard, Bell, Sparkles, Smartphone, RefreshCcw, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSync } from '../context/SyncContext';
import { useState } from 'react';

const menuItems = [
  { icon: User, label: 'Access Identity', desc: 'Secure profile authentication', link: '#' },
  { icon: ShoppingBag, label: 'Merchant History', desc: 'Global transaction ledger', link: '#' },
  { icon: Heart, label: 'Curation List', desc: 'Reserved fashion articles', link: '/shop' },
  { icon: CreditCard, label: 'Heritage Assets', desc: 'Payment keys & billing', link: '#' },
//   { icon: Bell, label: 'Directives', desc: 'Concierge communications', link: '#' },
  { icon: Shield, label: 'Security Protocols', desc: 'Access encryption', link: '#' },
];

const recentOrders = [
  { 
    id: 'MAISON-2026-001', 
    status: 'AUTHENTICATING', 
    date: 'FEB 01, 2026', 
    total: 2499,
    image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=200'
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { generateSyncCode, syncCode, syncWithCode, isSynced } = useSync();
  const [inputSyncCode, setInputSyncCode] = useState('');
  const [syncStatus, setSyncStatus] = useState(null); // 'success', 'error', 'pending'
  
  // Safe access to email
  const email = user?.email || 'unauthorized@maisonelite.com';

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const handleSyncSubmit = (e) => {
    e.preventDefault();
    setSyncStatus('pending');
    setTimeout(() => {
        const success = syncWithCode(inputSyncCode);
        if (success) {
            setSyncStatus('success');
            setTimeout(() => setSyncStatus(null), 3000);
        } else {
            setSyncStatus('error');
            setTimeout(() => setSyncStatus(null), 3000);
        }
    }, 1500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <section className="pt-48 pb-24 bg-black border-b border-[var(--border-color)] overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-16"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-[var(--accent-color)] opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity" />
              <div className="relative w-40 h-40 md:w-56 md:h-56">
                <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" 
                    alt="Profile" 
                    className="w-full h-full rounded-[3rem] border-2 border-[var(--accent-color)] object-cover relative z-10 shadow-3xl grayscale group-hover:grayscale-0 transition-all duration-700 p-2"
                />
                <button 
                    className="absolute -bottom-2 -right-2 bg-[var(--accent-color)] text-white p-5 rounded-3xl shadow-2xl hover:scale-110 transition-transform z-20 border-4 border-black"
                    aria-label="Change secure profile image"
                >
                    <Camera size={22} />
                </button>
              </div>
            </div>
            <div className="text-center md:text-left">
              <span className="text-[var(--accent-color)] font-black text-[12px] uppercase tracking-[0.8em] mb-6 block">MAISON ELITE PRIVÉ</span>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white font-serif">IDENTITY <br/><span className="gradient-text">PORTAL</span></h1>
              <p className="text-[var(--text-muted)] text-[12px] font-black uppercase tracking-[0.4em]">{email}</p>
              
              <div className="flex gap-12 mt-12 justify-center md:justify-start">
                <div>
                  <p className="text-3xl font-black tracking-tighter text-white">01</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-2">Active Commissions</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-3xl font-black tracking-tighter text-white">124</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-2">Loyalty Points</p>
                </div>
                <div className="w-px bg-white/10" />
                <div>
                  <p className="text-3xl font-black tracking-tighter text-[var(--accent-color)]">ELITE</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mt-2">Status Tier</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-10"
            >
              {/* Profile Nav */}
              <div className="bg-[var(--bg-card)] rounded-[3rem] border border-[var(--border-color)] p-10 lg:sticky lg:top-32 shadow-2xl">
                <nav className="space-y-4">
                  {menuItems.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.link}
                      className="flex items-center gap-6 p-5 rounded-2xl hover:bg-black transition-all group border border-transparent hover:border-[var(--border-color)]"
                    >
                      <div className="w-12 h-12 bg-white/5 border border-transparent group-hover:border-[var(--accent-color)]/30 rounded-2xl flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent-color)] transition-all">
                        <item.icon size={22} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">{item.label}</span>
                    </Link>
                  ))}
                  <div className="h-px bg-white/5 my-8" />
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-6 p-5 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                  >
                    <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                      <LogOut size={22} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">SECURE LOGOUT</span>
                  </button>
                </nav>
              </div>

              {/* Quick Contact Card */}
              <div className="p-10 bg-[var(--accent-color)] rounded-[3rem] text-white">
                 <Bell className="mb-6 opacity-40" size={40} />
                 <h4 className="text-xl font-black uppercase tracking-widest mb-4">Concierge Desk</h4>
                 <p className="text-xs font-medium uppercase tracking-widest mb-10 opacity-80 leading-relaxed">Direct line to our lead designers for bespoke tailoring requests.</p>
                 <button className="w-full py-5 bg-white text-[var(--accent-color)] rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">INITIATE CALL</button>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-12"
            >
              {/* Sync Portal - The key feature requested */}
              <div className="bg-black rounded-[3.5rem] border-2 border-[var(--accent-color)]/30 overflow-hidden shadow-2xl relative">
                <div className="p-10 md:p-14 border-b border-white/10 bg-gradient-to-br from-black to-[var(--bg-secondary)] flex flex-col md:flex-row justify-between items-center gap-10">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white font-serif">SYNCHRONIZATION HUB</h3>
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.4em] mt-3">{isSynced ? 'STATUS: DEVICE UNIFIED' : 'STATUS: REMAINING LOCAL'}</p>
                  </div>
                  <div className="w-20 h-20 bg-[var(--accent-color)]/10 rounded-3xl flex items-center justify-center border border-[var(--accent-color)]/20 animate-pulse">
                     <RefreshCcw size={40} className={`text-[var(--accent-color)] ${isSynced ? 'animate-spin-slow' : ''}`} />
                  </div>
                </div>
                
                <div className="p-10 md:p-14 space-y-12">
                   <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <div className="flex items-center gap-3">
                            <Smartphone className="text-[var(--accent-color)]" size={20} />
                            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white">This Device Identity</h4>
                         </div>
                         <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed uppercase tracking-tighter">Enter this code on your phone or tablet to continue your session instantly.</p>
                         <div className="flex items-center gap-4">
                            <div className="flex-1 bg-white/5 border border-white/10 p-6 rounded-2xl text-2xl font-black text-white tracking-[0.5em] text-center uppercase font-serif">
                               {syncCode || '------'}
                            </div>
                            <button 
                             onClick={() => generateSyncCode()}
                             className="w-20 h-20 bg-[var(--accent-color)] text-white rounded-2xl flex items-center justify-center shadow-xl shadow-[var(--accent-color)]/20 hover:scale-105 transition-transform shrink-0"
                            >
                               <RefreshCcw size={24} />
                            </button>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="flex items-center gap-3">
                            <Check className="text-green-400" size={20} />
                            <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-white">Resume External Session</h4>
                         </div>
                         <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed uppercase tracking-tighter">Enter a code from another device to bridge your cart and preferences.</p>
                         <form onSubmit={handleSyncSubmit} className="flex flex-col gap-4">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={inputSyncCode}
                                    onChange={(e) => setInputSyncCode(e.target.value.toUpperCase())}
                                    maxLength={6}
                                    placeholder="SYNC KEY" 
                                    className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-xl font-black text-white tracking-[0.3em] uppercase placeholder:text-[var(--text-muted)] focus:border-[var(--accent-color)] transition-all"
                                />
                                <AnimatePresence>
                                    {syncStatus === 'pending' && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <div className="w-8 h-8 border-2 border-[var(--accent-color)] border-t-white rounded-full animate-spin" />
                                        </div>
                                    )}
                                    {syncStatus === 'success' && (
                                        <div className="absolute inset-0 bg-green-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                            <Check className="text-green-400" size={32} />
                                        </div>
                                    )}
                                    {syncStatus === 'error' && (
                                        <div className="absolute inset-0 bg-red-500/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                            <X className="text-red-400" size={32} />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-6 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-xl"
                            >
                                BRIDGE SESSION
                            </button>
                         </form>
                      </div>
                   </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-[var(--bg-card)] rounded-[3rem] border border-[var(--border-color)] p-12 shadow-2xl">
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white font-serif">RECENT ARCHIVES</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.5em] mt-3">Verified delivery ledger</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {recentOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-8 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] gap-10 hover:border-[var(--accent-color)] transition-all group"
                    >
                      <div className="flex items-center gap-10">
                        <div className="w-24 h-32 rounded-2xl overflow-hidden shrink-0 border border-[var(--border-color)] shadow-xl group-hover:scale-105 transition-transform duration-500">
                          <img 
                            src={order.image}
                            alt="Archival article" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-black text-xs text-[var(--accent-color)] mb-4 uppercase tracking-[0.2em]">{order.id}</p>
                          <div className="flex flex-col gap-4">
                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border w-fit ${
                              order.status === 'AUTHENTICATING' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : 'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}>
                              {order.status}
                            </span>
                            <span className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-[var(--border-color)] sm:pl-10 pt-8 sm:pt-0">
                        <p className="font-black text-3xl tracking-tighter text-white mb-3">{formatPrice(order.total)}</p>
                        <span className="text-[10px] uppercase font-black tracking-widest text-[var(--accent-color)] bg-[var(--accent-color)]/10 px-4 py-2 rounded-xl border border-[var(--accent-color)]/20">
                          COMMISSION VERIFIED
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {recentOrders.length === 0 && (
                  <div className="text-center py-32 bg-[var(--bg-secondary)] rounded-[2.5rem] border-2 border-dashed border-white/5">
                    <Package className="mx-auto mb-8 text-[var(--accent-color)] opacity-20" size={80} />
                    <h4 className="text-xl font-black uppercase tracking-widest text-white mb-4">Archives Empty</h4>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] max-w-xs mx-auto">Initiate your first archival commission to view your ledger here.</p>
                    <Link to="/shop" className="btn-primary mt-12 inline-flex h-16 items-center px-14 rounded-2xl text-[10px] tracking-[0.5em]">
                      VISIT BOUTIQUE
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
