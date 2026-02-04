import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  ShoppingCart, 
  User, 
  Clock, 
  CheckCircle, 
  Package, 
  Search,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Eye,
  RefreshCw,
  MoreVertical,
  X,
  Plus,
  Truck,
  ArrowRight
} from 'lucide-react';

const mockOrders = [
  { id: '#ORD-7829', customer: 'Alice Johnson', items: 3, total: 3450, status: 'Pending', time: '10 mins ago' },
  { id: '#ORD-7830', customer: 'Michael Chen', items: 1, total: 899, status: 'Processing', time: '45 mins ago' },
  { id: '#ORD-7831', customer: 'Sarah Williams', items: 5, total: 12500, status: 'Completed', time: '2 hours ago' },
  { id: '#ORD-7832', customer: 'David Miller', items: 2, total: 1500, status: 'Pending', time: '3 hours ago' },
  { id: '#ORD-7833', customer: 'Emma Davis', items: 4, total: 4200, status: 'Processing', time: '4 hours ago' },
];

export default function StaffDashboard() {
  const { user } = useAuth();
  const { products } = useData();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('orders');

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockProducts = products.filter(p => p.stock < 10);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[#FDFCF8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <span className="text-[var(--accent-color)] font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Maison Personnel Hub</span>
            <h1 className="text-4xl md:text-7xl font-serif uppercase tracking-tighter">BOUTIQUE <span className="gradient-text italic font-normal">OPERATIONS</span></h1>
            <div className="flex items-center gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-white border border-[var(--border-color)] flex items-center justify-center text-[var(--accent-color)] shadow-sm">
                   <User size={18} />
                </div>
                <p className="text-[var(--text-primary)] text-[11px] font-black uppercase tracking-widest">Logged: {user?.email?.split('@')[0] || 'Member'}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="btn-primary shadow-xl h-16 px-10">
              <Plus size={20} /> REGISTER NEW COMMISSION
            </button>
          </div>
        </div>

        {/* Stats Grid - Brighter & Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'BOUTIQUE SALES', value: '$18,349', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'ARTICLES OUT', value: '24 Units', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'PENDING TASKS', value: pendingOrders, icon: Clock, color: 'text-[var(--accent-color)]', bg: 'bg-[var(--accent-color)]/5' },
            { label: 'STOCK ALERTS', value: lowStockProducts.length, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] border border-[var(--border-color)] shadow-sm hover:shadow-xl hover:border-[var(--accent-color)] transition-all group overflow-hidden relative"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-current opacity-70 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={22} />
                </div>
              </div>
              <h3 className="text-4xl font-serif text-black mb-1 relative z-10">{stat.value}</h3>
              <p className="text-[var(--text-muted)] text-[9px] font-black uppercase tracking-[0.3em] relative z-10">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
           <div className="flex gap-4 bg-white p-2 rounded-2xl border border-[var(--border-color)] shadow-sm">
            {['orders', 'inventory', 'customers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? 'bg-[var(--accent-color)] text-white shadow-xl' 
                    : 'text-[var(--text-muted)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-md group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--accent-color)] transition-colors" size={20} />
             <input 
              type="text" 
              placeholder="FILTER OPERATIONS LEDGER..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-white border border-[var(--border-color)] focus:border-[var(--accent-color)] text-[10px] font-black uppercase tracking-[0.4em] outline-none transition-all rounded-2xl shadow-sm"
             />
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-[3rem] border border-[var(--border-color)] overflow-hidden shadow-sm"
            >
              <div className="overflow-x-auto px-8 py-4">
                <table className="w-full text-left border-separate border-spacing-y-4">
                  <thead className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--text-muted)]">
                    <tr>
                      <th className="p-6">ID</th>
                      <th className="p-6">Client Identity</th>
                      <th className="p-6">Line Articles</th>
                      <th className="p-6">Total Val</th>
                      <th className="p-6">Operational Status</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="bg-[var(--bg-secondary)]/30 hover:bg-white border-y border-[var(--border-color)] transition-all group">
                        <td className="p-6 rounded-l-2xl">
                           <span className="text-[11px] font-black text-[var(--accent-color)] tracking-widest">{order.id}</span>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white border border-[var(--border-color)] flex items-center justify-center text-[10px] font-black">{order.customer[0]}</div>
                              <span className="font-bold text-sm text-black">{order.customer}</span>
                           </div>
                        </td>
                        <td className="p-6">
                           <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">{order.items} Articles</span>
                        </td>
                        <td className="p-6">
                           <span className="text-sm font-black text-black">${order.total.toLocaleString()}</span>
                        </td>
                        <td className="p-6 text-center">
                           <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border ${
                             order.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                             order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                             'bg-amber-50 text-amber-600 border-amber-100'
                           }`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Completed' ? 'bg-green-500' : 'bg-current animate-pulse'}`} />
                             {order.status}
                           </div>
                        </td>
                        <td className="p-6 text-right rounded-r-2xl">
                          <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => handleStatusChange(order.id, 'Completed')}
                               className="w-10 h-10 bg-white shadow-sm border border-[var(--border-color)] rounded-xl flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all"
                             >
                               <CheckCircle size={18} />
                             </button>
                             <button className="w-10 h-10 bg-white shadow-sm border border-[var(--border-color)] rounded-xl flex items-center justify-center text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-white transition-all">
                               <RefreshCw size={18} />
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div key="inv" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {products.map(product => (
                 <div key={product.id} className="bg-white p-8 rounded-[2.5rem] border border-[var(--border-color)] flex items-center gap-8 group hover:border-[var(--accent-color)] transition-all shadow-sm hover:shadow-xl">
                    <div className="w-20 h-24 bg-[var(--bg-secondary)] rounded-2xl overflow-hidden border border-[var(--border-color)] shrink-0 shadow-sm transition-transform group-hover:scale-105">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-sm text-black mb-1 group-hover:text-[var(--accent-color)] transition-colors">{product.name}</h4>
                       <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-4">{product.category}</p>
                       <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-black">${product.price.toLocaleString()}</span>
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full ${product.stock < 10 ? 'bg-red-500 animate-bounce' : 'bg-green-500'}`} />
                             <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">QTY: {product.stock}</span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </motion.div>
          )}

          {activeTab === 'customers' && (
            <motion.div key="cust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-48 bg-white rounded-[4rem] border border-[var(--border-color)] shadow-sm">
               <div className="w-24 h-24 bg-[var(--bg-secondary)] rounded-full flex items-center justify-center mx-auto mb-10 text-[var(--accent-color)] border border-[var(--border-color)]">
                  <User size={40} />
               </div>
               <h3 className="text-4xl font-serif uppercase tracking-tight mb-4">Registry of Patrons</h3>
               <p className="text-[var(--text-muted)] text-[11px] font-black uppercase tracking-[0.5em] mb-12">Authorized Heritage Profiles</p>
               <button className="btn-primary">DOWNLOAD COMPREHENSIVE LEDGER</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
