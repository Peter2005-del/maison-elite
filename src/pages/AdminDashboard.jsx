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
  EyeOff
} from 'lucide-react';


export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { products, users, addProduct, removeProduct, toggleProductVisibility, addUser, removeUser } = useData();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal States
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Form States
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'client' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({ ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock), image: 'https://images.unsplash.com/photo-1594132062547-495914659223?auto=format&fit=crop&q=80&w=400' });
    setShowProductModal(false);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeTab === id 
          ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)] shadow-lg' 
          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
      }`}
    >
      <Icon size={18} />
      <span className="font-bold uppercase tracking-widest text-[10px]">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex pt-20">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        className="fixed bottom-6 right-6 lg:hidden z-50 p-4 bg-[var(--accent-color)] text-[var(--accent-contrast)] rounded-full shadow-2xl"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-[var(--bg-card)] border-r border-[var(--border-color)] z-40 transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="mb-10 px-4">
             <h2 className="text-xl font-black tracking-[0.4em] text-[var(--accent-color)] uppercase">MAISON</h2>
             <p className="text-[9px] text-[var(--text-muted)] mt-1 font-black uppercase tracking-[0.2em]">Management Portal</p>
          </div>

          <nav className="space-y-3 flex-1">
             <SidebarItem id="overview" label="Overview" icon={BarChart2} />
             <SidebarItem id="products" label="Products" icon={Package} />
             <SidebarItem id="users" label="Users & Staff" icon={Users} />
             <SidebarItem id="orders" label="Orders" icon={ShoppingBag} />
             <SidebarItem id="settings" label="Settings" icon={Settings} />
          </nav>

          <div className="pt-6 border-t border-[var(--border-color)]">
             <div className="flex items-center gap-3 px-4 py-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--accent-color)]/10 border border-[var(--accent-color)]/20 flex items-center justify-center text-[var(--accent-color)] font-black">
                  {user?.email[0].toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <p className="font-black text-[10px] uppercase tracking-widest truncate w-32">{user?.email}</p>
                  <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">{user?.role}</p>
                </div>
             </div>
             <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-black text-[10px] uppercase tracking-widest"
             >
                <LogOut size={18} /> Sign Out
             </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </AnimatePresence>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">{activeTab}</h1>
              <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-widest mt-2">Operational Analytics & Control</p>
            </div>
          </header>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[
                     { label: 'Revenue', value: '$124,500', icon: BarChart2, color: 'text-green-500', bg: 'bg-green-500/10' },
                     { label: 'Articles', value: products.length, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                     { label: 'Personnel', value: users.length, icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                     { label: 'Requests', value: '18', icon: ShoppingBag, color: 'text-[var(--accent-color)]', bg: 'bg-[var(--accent-color)]/10' },
                   ].map((stat, idx) => (
                     <div key={idx} className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-color)] shadow-xl relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-[var(--accent-color)] opacity-40" />
                       <div className="flex justify-between items-start mb-6">
                         <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} border border-current opacity-80`}>
                           <stat.icon size={24} />
                         </div>
                       </div>
                       <h3 className="text-3xl font-black mb-1 tracking-tighter">{stat.value}</h3>
                       <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                     </div>
                   ))}
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-8 shadow-xl">
                    <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-[var(--accent-color)]">Recent Activity</h3>
                    <div className="space-y-6">
                      {[1,2,3].map(i => (
                         <div key={i} className="flex items-center justify-between p-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl group hover:border-[var(--accent-color)] transition-all cursor-default">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center font-black group-hover:text-[var(--accent-color)]">
                                  #{202+i}
                               </div>
                               <div>
                                  <p className="font-black text-xs uppercase tracking-widest">Order Finalized</p>
                                  <p className="text-[10px] text-[var(--text-muted)] font-bold">2 MINUTES AGO</p>
                               </div>
                            </div>
                            <span className="font-black text-sm text-[var(--accent-color)] tracking-widest">+$240.00</span>
                         </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] p-8 shadow-xl">
                    <h3 className="font-black text-xs uppercase tracking-[0.3em] mb-10 text-[var(--accent-color)]">Weekly Performance</h3>
                    <div className="h-64 w-full flex items-end justify-between gap-4 px-2">
                      {[
                        { day: 'MON', value: 80, amount: '$4,000' },
                        { day: 'TUE', value: 60, amount: '$3,000' },
                        { day: 'WED', value: 40, amount: '$2,000' },
                        { day: 'THU', value: 56, amount: '$2,780' },
                        { day: 'FRI', value: 38, amount: '$1,890' },
                        { day: 'SAT', value: 48, amount: '$2,390' },
                        { day: 'SUN', value: 70, amount: '$3,490' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-4 group">
                          <div className="relative w-full flex justify-center">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${item.value * 2}px` }}
                              className="w-full max-w-[20px] bg-[var(--accent-color)] rounded-t-sm opacity-60 group-hover:opacity-100 transition-all duration-300"
                            />
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--bg-primary)] border border-[var(--accent-color)] px-3 py-1.5 text-[9px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                              {item.amount}
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-[var(--text-muted)] tracking-widest">{item.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <motion.div 
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-2xl">
                   <div className="p-8 border-b border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-[var(--bg-secondary)]">
                      <div className="relative w-full sm:max-w-md group">
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-color)]" size={18} />
                         <input type="text" placeholder="Search inventory..." className="w-full pl-12 pr-4 py-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] focus:border-[var(--accent-color)] text-xs font-black uppercase tracking-widest outline-none transition-all" />
                      </div>
                      <button 
                        onClick={() => setShowProductModal(true)}
                        className="btn-primary w-full sm:w-auto"
                      >
                         <Plus size={18} /> Add Article
                      </button>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-[var(--bg-secondary)] text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] border-b border-[var(--border-color)]">
                          <tr>
                            <th className="p-6 pl-8">Article</th>
                            <th className="p-6">Collection</th>
                            <th className="p-6">Valuation</th>
                            <th className="p-6">Inventory</th>
                            <th className="p-6 text-center">Status</th>
                            <th className="p-6 text-right pr-8">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border-color)]">
                          {products.map(product => (
                            <tr key={product.id} className="hover:bg-[var(--bg-secondary)]/50 transition-colors group">
                              <td className="p-6 pl-8">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-lg bg-[var(--bg-hover)] overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--accent-color)] transition-all">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="font-black text-xs uppercase tracking-widest">{product.name}</span>
                                </div>
                              </td>
                              <td className="p-6">
                                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{product.category}</span>
                              </td>
                              <td className="p-6">
                                <span className="text-xs font-bold">${product.price.toLocaleString()}</span>
                              </td>
                              <td className="p-6">
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                  <span className="text-xs font-bold">{product.stock}</span>
                                </div>
                              </td>
                              <td className="p-6 text-center">
                                <button
                                  onClick={() => toggleProductVisibility(product.id)}
                                  className={`p-2.5 rounded-lg border transition-all ${product.visible ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}
                                >
                                  {product.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                                </button>
                              </td>
                              <td className="p-6 pr-8 text-right">
                                <div className="flex items-center justify-end gap-3 text-[var(--text-muted)]">
                                  <button className="hover:text-[var(--accent-color)] transition-colors"><Edit size={18} /></button>
                                  <button 
                                    onClick={() => removeProduct(product.id)}
                                    className="hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 size={18} />
                                  </button>
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

            {/* Other tabs follow similar premium Ivory & Gold pattern */}
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <Users className="mx-auto text-[var(--accent-color)] mb-6 opacity-40" size={48} />
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Personnel Registry</h3>
                <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-widest mb-10">Manage access levels and brand representatives</p>
                <button onClick={() => setShowUserModal(true)} className="btn-primary">REGISTER PERSONNEL</button>
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
                <ShoppingBag className="mx-auto text-[var(--accent-color)] mb-6 opacity-40" size={48} />
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Merchant Ledger</h3>
                <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-widest">Awaiting new transactions</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* Product Modal */}
      <AnimatePresence>
        {showProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowProductModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-3xl"
            >
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-2xl font-black uppercase tracking-tighter">Register New Article</h2>
                   <button onClick={() => setShowProductModal(false)} className="text-[var(--text-muted)] hover:text-white"><X size={20}/></button>
                </div>
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Article Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. L'AUBE GOWN"
                      className="form-input"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Valuation ($)</label>
                      <input 
                        required
                        type="number" 
                        placeholder="2400"
                        className="form-input"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Inventory</label>
                      <input 
                        required
                        type="number" 
                        placeholder="12"
                        className="form-input"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Collection</label>
                    <select 
                      className="form-input"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    >
                      <option value="">Select Collection</option>
                      <option value="Evening">Evening</option>
                      <option value="Bridal">Bridal</option>
                      <option value="Ready-to-Wear">Ready-to-Wear</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-6">COMMISSION ARTICLE</button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Modal */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUserModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-3xl border border-[var(--border-color)] p-10 shadow-3xl">
                <div className="flex justify-between items-center mb-10">
                   <h2 className="text-2xl font-black uppercase tracking-tighter">Personnel Registry</h2>
                   <button onClick={() => setShowUserModal(false)} className="text-[var(--text-muted)] hover:text-white"><X size={20}/></button>
                </div>
                <form onSubmit={handleAddUser} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Full Name</label>
                    <input required type="text" className="form-input" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Email Address</label>
                    <input required type="email" className="form-input" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">Access Level</label>
                    <select className="form-input" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
                      <option value="client">Client</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-6">AUTHORIZE PERSONNEL</button>
                </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
