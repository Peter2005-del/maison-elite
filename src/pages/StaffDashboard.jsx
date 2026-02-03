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
  X
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
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-12 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="text-[var(--accent-color)] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">STAFF PORTAL</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">OPERATIONS <span className="gradient-text">DESK</span></h1>
            <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-widest mt-2 px-1">Active Personnel: {user?.email?.split('@')[0] || 'Member'}</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-primary">
              <ShoppingCart size={18} /> REGISTER SALE
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Today\'s Sales', value: '$18,349', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
            { label: 'Inventory Out', value: '24 Units', icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
            { label: 'Pending Action', value: pendingOrders, icon: Clock, color: 'text-[var(--accent-color)]', bg: 'bg-[var(--accent-color)]/10' },
            { label: 'Supply Alert', value: lowStockProducts.length, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-color)] shadow-xl relative overflow-hidden group hover:border-[var(--accent-color)] transition-all"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--accent-color)]/5 rounded-bl-full pointer-events-none" />
              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-xl border border-current opacity-70 ${stat.bg} ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
              </div>
              <h3 className="text-3xl font-black mb-1">{stat.value}</h3>
              <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
           <div className="flex gap-3 bg-[var(--bg-secondary)] p-1.5 rounded-xl border border-[var(--border-color)]">
            {['orders', 'inventory', 'customers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  activeTab === tab 
                    ? 'bg-[var(--accent-color)] text-[var(--accent-contrast)] shadow-lg' 
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-color)] transition-colors" size={16} />
             <input 
              type="text" 
              placeholder="QUICK SEARCH..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] focus:border-[var(--accent-color)] text-[10px] font-black uppercase tracking-widest outline-none transition-all rounded-xl shadow-sm"
             />
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-2xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[var(--bg-secondary)] text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] border-b border-[var(--border-color)]">
                    <tr>
                      <th className="p-6">ID</th>
                      <th className="p-6">Client</th>
                      <th className="p-6">Line Items</th>
                      <th className="p-6">Total Val</th>
                      <th className="p-6">Timestamp</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-[var(--bg-secondary)]/30 transition-colors group">
                        <td className="p-6">
                           <span className="text-[11px] font-bold text-[var(--accent-color)]">{order.id}</span>
                        </td>
                        <td className="p-6">
                           <span className="font-black text-xs uppercase tracking-widest">{order.customer}</span>
                        </td>
                        <td className="p-6">
                           <span className="text-xs font-bold text-[var(--text-muted)]">{order.items} Articles</span>
                        </td>
                        <td className="p-6">
                           <span className="text-xs font-bold">${order.total.toLocaleString()}</span>
                        </td>
                        <td className="p-6">
                           <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">{order.time}</span>
                        </td>
                        <td className="p-6">
                           <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                             order.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                             order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                             'bg-orange-500/10 text-orange-500 border-orange-500/20'
                           }`}>
                             {order.status}
                           </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-3 text-[var(--text-muted)]">
                             <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg hover:text-[var(--accent-color)] transition-all">
                               <CheckCircle size={18} onClick={() => handleStatusChange(order.id, 'Completed')} />
                             </button>
                             <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg hover:text-[var(--text-primary)] transition-all">
                               <MoreVertical size={18} />
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
            <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {products.map(product => (
                 <div key={product.id} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] flex items-center gap-6 group hover:border-[var(--accent-color)] transition-all shadow-xl">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-color)] shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h4 className="font-black text-xs uppercase tracking-widest mb-1">{product.name}</h4>
                       <p className="text-[10px] text-[var(--text-muted)] font-bold mb-3">{product.category}</p>
                       <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-[var(--accent-color)]">${product.price}</span>
                          <span className={`text-[10px] font-black uppercase ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>Stock: {product.stock}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </motion.div>
          )}

          {activeTab === 'customers' && (
            <motion.div key="cust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)]">
               <User className="mx-auto text-[var(--accent-color)] mb-8 opacity-40 shadow-2xl" size={64} />
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Client Portfolio</h3>
               <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.3em] px-4">Direct Merchant Communication & Heritage Profiles</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
