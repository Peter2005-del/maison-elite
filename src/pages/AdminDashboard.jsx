import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Monitor, 
  Package, 
  Users, 
  ShoppingBag, 
  BarChart2, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { 
    products, 
    users, 
    addProduct, 
    removeProduct, 
    toggleProductVisibility, 
    updateProduct,
    addUser, 
    removeUser 
  } = useData();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Form States
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'client' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, { 
        ...newProduct, 
        price: Number(newProduct.price), 
        stock: Number(newProduct.stock) 
      });
      setEditingProduct(null);
    } else {
      addProduct({ 
        ...newProduct, 
        price: Number(newProduct.price), 
        stock: Number(newProduct.stock), 
        image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=400' 
      });
    }
    setShowProductModal(false);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ 
      name: product.name, 
      price: product.price, 
      category: product.category, 
      stock: product.stock 
    });
    setShowProductModal(true);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser(newUser);
    setShowUserModal(false);
    setNewUser({ name: '', email: '', role: 'client' });
  };

  const SidebarItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ${
        activeTab === id 
          ? 'bg-[var(--accent-color)] text-white shadow-xl translate-x-1' 
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--accent-color)]'
      }`}
    >
      <div className="flex items-center gap-4">
        <Icon size={18} />
        <span className="font-bold uppercase tracking-widest text-[10px]">{label}</span>
      </div>
      {activeTab === id && <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex pt-24">
      
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Modern Sidebar */}
      <aside className={`
        fixed lg:sticky top-24 left-0 h-[calc(100vh-6rem)] w-80 bg-white border-r border-[var(--border-color)] z-[60] transition-all duration-500
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 h-full flex flex-col justify-between">
          <div>
            <div className="mb-12 px-2">
               <h2 className="text-2xl font-serif tracking-[0.2em] text-[var(--text-primary)] font-bold">ATELIER CORE</h2>
               <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em]">Operational Status: Live</p>
               </div>
            </div>

            <nav className="space-y-4">
               <SidebarItem id="overview" label="Overview" icon={BarChart2} />
               <SidebarItem id="products" label="Inventory" icon={Package} />
               <SidebarItem id="users" label="Personnel" icon={Users} />
               <SidebarItem id="orders" label="Transactions" icon={ShoppingBag} />
               <SidebarItem id="settings" label="House Settings" icon={Settings} />
            </nav>
          </div>

          <div className="pt-8 border-t border-[var(--border-color)]">
             <div className="flex items-center gap-4 px-2 mb-8 bg-[var(--bg-secondary)] p-4 rounded-2xl border border-[var(--border-color)]">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-color)] text-white flex items-center justify-center font-black text-xl shadow-lg">
                  {user?.email[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-[10px] uppercase tracking-widest text-[var(--text-primary)] truncate">{user?.email}</p>
                  <p className="text-[9px] text-[var(--accent-color)] font-black uppercase tracking-widest">Master Admin</p>
                </div>
             </div>
             <button 
                onClick={logout}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-red-100"
             >
                <LogOut size={18} /> Terminate Session
             </button>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-[var(--accent-color)] text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">Maison Elite Command</motion.span>
              <h1 className="text-6xl font-serif uppercase tracking-tighter leading-none">{activeTab}</h1>
            </div>
            <div className="flex items-center gap-4 p-2 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] px-6">
               <Clock size={16} className="text-[var(--accent-color)]" />
               <span className="text-[10px] font-black uppercase tracking-widest">SYSTEM TIME: {new Date().toLocaleTimeString()}</span>
            </div>
          </header>

          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[
                     { label: 'GROSS REVENUE', value: '$248,500', icon: TrendingUp, status: '+12%' },
                     { label: 'ARTIFACTS', value: products.length, icon: Package, status: 'Active' },
                     { label: 'REGISTERED CLIENTS', value: users.length, icon: Users, status: 'Verified' },
                     { label: 'OPEN INQUIRIES', value: '14', icon: ShoppingBag, status: 'Action Required' },
                   ].map((stat, idx) => (
                     <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-[var(--border-color)] shadow-sm hover:shadow-xl hover:border-[var(--accent-color)] transition-all duration-500 group">
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-12 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center text-[var(--accent-color)] border border-[var(--border-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all">
                             <stat.icon size={20} />
                          </div>
                          <span className={`text-[9px] font-black px-3 py-1 rounded-full ${idx === 0 ? 'bg-green-100 text-green-600' : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'}`}>{stat.status}</span>
                        </div>
                        <h3 className="text-4xl font-serif text-black mb-1">{stat.value}</h3>
                        <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-[0.3em]">{stat.label}</p>
                     </div>
                   ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                   <div className="lg:col-span-8 bg-white rounded-[3rem] border border-[var(--border-color)] p-12 shadow-sm">
                      <div className="flex justify-between items-center mb-12">
                         <h3 className="font-serif text-2xl uppercase tracking-tight">Recent Commissions</h3>
                         <button className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-color)] flex items-center gap-2">View Audit Log <ArrowRight size={14}/></button>
                      </div>
                      <div className="space-y-6">
                         {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-transparent hover:border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-all group">
                               <div className="flex items-center gap-6">
                                  <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)] flex items-center justify-center font-black group-hover:text-[var(--accent-color)]">
                                     #{1040+i}
                                  </div>
                                  <div>
                                     <p className="font-bold text-sm tracking-widest uppercase">Acquisition Confirmed</p>
                                     <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mt-1">PROCESSED AT 01:{i}4 PM</p>
                                  </div>
                               </div>
                               <div className="text-right">
                                  <p className="font-black text-lg text-[var(--accent-color)] tracking-tighter">+$4,200.00</p>
                                  <div className="flex items-center justify-end gap-2 text-green-500 text-[10px] font-black uppercase">
                                     <CheckCircle size={10} /> Verified
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="lg:col-span-4 space-y-8">
                      <div className="bg-[var(--accent-color)] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><ShieldCheck size={160} /></div>
                         <div className="relative z-10">
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase mb-8 opacity-70">Security Pulse</h4>
                            <p className="text-3xl font-serif mb-10 leading-none">ALL SYSTEMS <br/>OPTIMIZED</p>
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 text-xs font-bold uppercase tracking-widest text-center">
                               Run Integrity Check
                            </div>
                         </div>
                      </div>
                      
                      <div className="bg-white border border-[var(--border-color)] p-12 rounded-[3rem] shadow-sm">
                         <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-[var(--text-muted)] mb-8">Quick Actions</h4>
                         <div className="grid grid-cols-1 gap-4">
                            <button onClick={() => setShowProductModal(true)} className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent-color)] hover:text-white transition-all">
                               <Plus size={16} /> New Product Acquisition
                            </button>
                            <button onClick={() => setShowUserModal(true)} className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] text-[10px] font-black uppercase tracking-widest hover:bg-[var(--accent-color)] hover:text-white transition-all">
                               <Users size={16} /> Authorize Personnel
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {/* INVENTORY TAB */}
            {activeTab === 'products' && (
              <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="bg-white rounded-[3rem] border border-[var(--border-color)] overflow-hidden shadow-sm">
                   <div className="p-10 border-b border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-8 bg-[var(--bg-secondary)]/30">
                      <div className="relative w-full md:max-w-md group text-white">
                         <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--accent-color)]" size={18} />
                         <input type="text" placeholder="FILTER LEDGER..." className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-[var(--border-color)] text-black focus:border-[var(--accent-color)] text-[10px] font-black uppercase tracking-widest outline-none shadow-sm transition-all" />
                      </div>
                      <button onClick={() => { setEditingProduct(null); setNewProduct({name:'', price:'', category:'', stock:''}); setShowProductModal(true); }} className="btn-primary w-full md:w-auto h-14">
                         <Plus size={18} /> REGISTER ARTICLE
                      </button>
                   </div>
                   <div className="overflow-x-auto px-6">
                      <table className="w-full text-left border-separate border-spacing-y-4">
                        <thead className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                          <tr>
                            <th className="p-6">Article Description</th>
                            <th className="p-6">Collection</th>
                            <th className="p-6">Valuation</th>
                            <th className="p-6">Registry</th>
                            <th className="p-6 text-center">Visibility</th>
                            <th className="p-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product.id} className="bg-[var(--bg-secondary)]/20 hover:bg-white border-y border-[var(--border-color)] transition-all group">
                              <td className="p-6 rounded-l-[2rem]">
                                <div className="flex items-center gap-6">
                                  <div className="w-16 h-20 bg-white rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-sm group-hover:border-[var(--accent-color)] transition-all">
                                    <img src={product.image} className="w-full h-full object-cover" alt="" />
                                  </div>
                                  <span className="font-bold text-sm tracking-tight text-black">{product.name}</span>
                                </div>
                              </td>
                              <td className="p-6">
                                <span className="text-[10px] font-black text-[var(--accent-color)] uppercase tracking-widest">{product.category}</span>
                              </td>
                              <td className="p-6">
                                <span className="text-sm font-black text-black">${product.price.toLocaleString()}</span>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                                  <span className="text-xs font-bold text-black">{product.stock} UNITS</span>
                                </div>
                              </td>
                              <td className="p-6 text-center">
                                <button onClick={() => toggleProductVisibility(product.id)} className={`p-4 rounded-xl border transition-all ${product.visible ? 'bg-white text-[var(--accent-color)] border-[var(--border-color)] shadow-sm' : 'bg-red-50 text-red-500 border-red-100 opacity-50'}`}>
                                  {product.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                              </td>
                              <td className="p-6 pr-10 text-right rounded-r-[2rem]">
                                <div className="flex justify-end gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleEditProduct(product)} className="w-10 h-10 rounded-lg bg-white border border-[var(--border-color)] flex items-center justify-center hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all"><Edit size={16} /></button>
                                  <button onClick={() => removeProduct(product.id)} className="w-10 h-10 rounded-lg bg-white border border-[var(--border-color)] flex items-center justify-center hover:text-red-500 hover:border-red-500 transition-all"><Trash2 size={16} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                   </div>
                </div>
              </motion.div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="bg-white rounded-[3rem] border border-[var(--border-color)] p-12">
                   <div className="flex justify-between items-center mb-12">
                      <h3 className="text-3xl font-serif uppercase tracking-tight">Personnel Network</h3>
                      <button onClick={() => setShowUserModal(true)} className="btn-primary">REGISTER STAFF</button>
                   </div>
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {users.map(u => (
                         <div key={u.id} className="bg-[var(--bg-secondary)]/50 p-8 rounded-[2.5rem] border border-[var(--border-color)] group hover:border-[var(--accent-color)] transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity"><Users size={120} /></div>
                            <div className="flex items-center gap-6 mb-8">
                               <div className="w-16 h-16 rounded-full bg-white border border-[var(--border-color)] flex items-center justify-center text-2xl font-black text-black shadow-sm group-hover:border-[var(--accent-color)] group-hover:text-[var(--accent-color)] transition-all">
                                  {u.name[0]}
                               </div>
                               <div>
                                  <h4 className="font-bold text-lg text-black">{u.name}</h4>
                                  <p className="text-[10px] text-[var(--accent-color)] font-black uppercase tracking-widest">{u.role}</p>
                               </div>
                            </div>
                            <div className="space-y-3 mb-8">
                               <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">{u.email}</p>
                               <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-green-500" />
                                  <span className="text-[9px] font-black uppercase tracking-widest text-[var(--text-primary)]">Last Session: {u.lastLogin}</span>
                               </div>
                            </div>
                            <button onClick={() => removeUser(u.id)} className="w-full py-4 rounded-xl border border-red-100 text-red-500 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-red-50 transition-all">
                               Revoke Credentials
                            </button>
                         </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 bg-white rounded-[3rem] border border-[var(--border-color)] shadow-sm">
                <ShoppingBag className="mx-auto text-[var(--accent-color)] mb-10 opacity-20" size={80} />
                <h3 className="text-4xl font-serif uppercase tracking-tight mb-6">Merchant Registry</h3>
                <p className="text-[var(--text-muted)] text-sm font-black uppercase tracking-[0.3em] mb-12">Monitoring Global Transactions</p>
                <div className="max-w-md mx-auto p-12 bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-color)]">
                   <p className="text-xs font-bold text-[var(--accent-color)] uppercase tracking-widest mb-4">Real-time status</p>
                   <p className="text-sm text-[var(--text-muted)] uppercase tracking-widest">Awaiting next verified commission from Paris HQ.</p>
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 bg-white rounded-[3rem] border border-[var(--border-color)] p-16">
                 <div className="max-w-2xl space-y-12">
                    <div className="space-y-8">
                       <h3 className="text-3xl font-serif uppercase tracking-tight">House Protocol</h3>
                       <div className="grid grid-cols-1 gap-6">
                          <div className="flex items-center justify-between p-8 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)]">
                             <div>
                                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Dual-Tone Interface</h4>
                                <p className="text-xs text-[var(--text-muted)]">Allow brand staff to toggle midnight mode.</p>
                             </div>
                             <div className="w-16 h-8 bg-[var(--accent-color)] rounded-full relative p-2 cursor-pointer">
                                <div className="absolute right-2 top-1.5 w-5 h-5 bg-white rounded-full shadow-md" />
                             </div>
                          </div>
                          <div className="flex items-center justify-between p-8 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)]">
                             <div>
                                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Global Shipping Relays</h4>
                                <p className="text-xs text-[var(--text-muted)]">Auto-calculate taxes and heritage duties.</p>
                             </div>
                             <div className="w-16 h-8 bg-[var(--border-color)] rounded-full relative p-2 cursor-pointer">
                                <div className="absolute left-2 top-1.5 w-5 h-5 bg-white rounded-full shadow-md" />
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="pt-12 border-t border-[var(--border-color)]">
                       <h3 className="text-3xl font-serif uppercase tracking-tight mb-8">Brand Typography</h3>
                       <div className="flex gap-4">
                          <div className="flex-1 p-6 border-2 border-[var(--accent-color)] rounded-2xl bg-[var(--bg-secondary)] text-center">
                             <p className="font-serif text-2xl uppercase tracking-tighter mb-2">Garamond</p>
                             <p className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-color)]">ACTIVE</p>
                          </div>
                          <div className="flex-1 p-6 border border-[var(--border-color)] rounded-2xl text-center opacity-40">
                             <p className="font-serif text-2xl uppercase tracking-tighter mb-2">Didot</p>
                             <p className="text-[9px] font-black uppercase tracking-widest">DISABLED</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Product Modal - Re-styled & Updated */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProductModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white rounded-[3rem] border border-[var(--border-color)] overflow-hidden shadow-3xl">
              <div className="p-12">
                <div className="flex justify-between items-center mb-12">
                   <div>
                      <h2 className="text-3xl font-serif uppercase tracking-tight">{editingProduct ? 'Edit Registry' : 'New Article Registration'}</h2>
                      <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.2em] mt-2">Article: {editingProduct?.id || 'PENDING'}</p>
                   </div>
                   <button onClick={() => setShowProductModal(false)} className="w-12 h-12 rounded-full hover:bg-[var(--bg-secondary)] flex items-center justify-center transition-all"><X size={24}/></button>
                </div>
                <form onSubmit={handleAddProduct} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Article Name</label>
                    <input required type="text" placeholder="e.g. L'AUBE GOWN" className="form-input" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Valuation ($)</label>
                      <input required type="number" placeholder="2400" className="form-input" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Inventory Stock</label>
                      <input required type="number" placeholder="12" className="form-input" value={newProduct.stock} onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Heritage Collection</label>
                    <select required className="form-input appearance-none bg-white" value={newProduct.category} onChange={(e) => setNewProduct({...newProduct, category: e.target.value})} >
                      <option value="" disabled>SELECT CATEGORY</option>
                      <option value="Evening">Evening Volume</option>
                      <option value="Bridal">Bridal Gallery</option>
                      <option value="Ready-to-Wear">Maison Ready-to-Wear</option>
                      <option value="Custom">Bespoke Commissions</option>
                      <option value="Accessories">Archive Accessories</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full btn-primary h-20 text-[11px] mt-8 rounded-2xl shadow-2xl shadow-[var(--accent-color)]/20">
                     {editingProduct ? 'UPDATE REGISTRY ASSET' : 'AUTHORIZE NEW ACQUISITION'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Registration Modal - Restyled */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUserModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-white rounded-[3rem] border border-[var(--border-color)] p-12 shadow-3xl">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-3xl font-serif uppercase tracking-tight">Staff Credentials</h2>
                   <button onClick={() => setShowUserModal(false)} className="w-10 h-10 rounded-full hover:bg-[var(--bg-secondary)] flex items-center justify-center transition-all"><X size={20}/></button>
                </div>
                <form onSubmit={handleAddUser} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Full Identity</label>
                    <input required type="text" placeholder="Staff Name" className="form-input" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Encrypted Address</label>
                    <input required type="email" placeholder="staff@maisonelite.com" className="form-input" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Operational Access</label>
                    <select className="form-input appearance-none bg-white font-black" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                      <option value="client">Verified Client</option>
                      <option value="staff">Boutique Staff</option>
                      <option value="admin">House Administrator</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full btn-primary h-18 text-[11px] mt-4 rounded-2xl">AUTHORIZE RELAY HANDSHAKE</button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Support Icon for the table
function ArrowRight(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
}
