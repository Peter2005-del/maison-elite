import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles, Globe, ShieldCheck, MessageSquare, ArrowRight, Smartphone, Coins } from 'lucide-react';

const contactInfo = [
  { icon: Mail, title: 'DIGITAL ATELIER', detail: 'atelier@maisonelite.com', sub: 'Instant Response via encrypted relay' },
  { icon: Phone, title: 'CONCIERGE LINE', detail: '+1 (888) MAISON-E', sub: 'Priority for Indigo-Tier Members' },
  { icon: MapPin, title: 'PHYSICAL HOUSE', detail: '30 Avenue Montaigne, Paris', sub: 'By appointment only' },
];

const serviceOptions = [
  'Bespoke Bridal Couture',
  'Private Evening Gown Commission',
  'Heritage Tailoring Session',
  'Interstellar Styling Advisory',
  'Digital Portrait & Fitting',
  'General High-Level Inquiry',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-color)]/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container-custom">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
           <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[var(--accent-color)] tracking-[0.6em] uppercase text-[12px] font-black mb-8 block"
           >
            ESTABLISH CONTACT
           </motion.span>
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[9rem] leading-[0.8] font-serif uppercase tracking-tighter text-white mb-10"
           >
            BESPOKE <br/><span className="gradient-text">INQUIRY</span>
           </motion.h1>
           <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[var(--text-secondary)] font-light leading-relaxed max-w-2xl"
           >
            Our concierge team is standing by to facilitate your next acquisition. For urgent private decrees, please include your Indigo membership cipher.
           </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-20">
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-10">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--bg-secondary)] p-10 rounded-[2.5rem] border border-[var(--border-color)] group hover:border-[var(--accent-color)] transition-all flex gap-8 items-start"
              >
                <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center text-[var(--accent-color)] group-hover:scale-110 transition-transform">
                  <info.icon size={32} />
                </div>
                <div>
                   <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] mb-2">{info.title}</h3>
                   <p className="text-xl font-bold text-white mb-1">{info.detail}</p>
                   <p className="text-xs text-[var(--text-muted)] font-medium">{info.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Global Time / Status */}
            <div className="bg-black/40 border border-white/5 p-10 rounded-[2.5rem] mt-12 overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Globe size={180} />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                     <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Global Atelier Online</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">Paris (HQ)</p>
                        <p className="text-xl font-black text-white">01:46 AM</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">New York</p>
                        <p className="text-xl font-black text-white">07:46 PM</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] p-12 md:p-20 rounded-[4rem] border border-[var(--border-color)] shadow-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-bl-[100%] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-10"
                  >
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Identify Yourself</label>
                        <input 
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text" 
                          placeholder="ELENA MOREAU"
                          className="form-input py-6 text-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Digital Address</label>
                        <input 
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email" 
                          placeholder="ATELIER@CLIENT.COM"
                          className="form-input py-6 text-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Nature of Request</label>
                      <select 
                        required
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="form-input py-6 text-lg appearance-none cursor-pointer"
                      >
                        <option value="" disabled>SELECT COMMISSION TYPE</option>
                        {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] ml-2">Your Detailed Manifesto</label>
                      <textarea 
                        required
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5" 
                        placeholder="TELL US ABOUT YOUR VISION..."
                        className="form-input py-6 text-lg resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-4 py-4">
                       <ShieldCheck className="text-green-500/50" size={18} />
                       <p className="text-[9px] text-[var(--text-muted)] font-black uppercase tracking-widest">
                         Information is processed via end-to-end RSA encryption protocols.
                       </p>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-primary h-20 text-[11px] font-black tracking-[0.5em] shadow-2xl shadow-[var(--accent-color)]/20"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-4">
                           <RefreshCcw className="animate-spin" size={20} /> ENCRYPTING...
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                           DISPATCH INQUIRY <Send size={18} />
                        </div>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-32 h-32 bg-green-500/10 border-2 border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                       <CheckCircle size={64} className="text-green-500" />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">MANIFESTO DISPATCHED</h2>
                    <p className="text-[var(--text-secondary)] text-lg mb-12 max-w-sm mx-auto leading-relaxed">
                      Your inquiry has been encrypted and filed in our high-priority ledger. A concierge representative will be in contact shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="btn-outline h-14 px-10"
                    >
                      SEND ANOTHER REQUEST
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Bottom Support Icons */}
            <div className="grid grid-cols-3 gap-6 mt-12">
               {[
                 { icon: Smartphone, label: 'Secure App' },
                 { icon: Coins, label: 'Web3 Wallet' },
                 { icon: MessageSquare, label: 'Live Portal' }
               ].map(item => (
                 <div key={item.label} className="bg-white/5 border border-white/5 py-6 rounded-3xl flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-all cursor-crosshair">
                    <item.icon size={20} className="text-[var(--accent-color)]" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
