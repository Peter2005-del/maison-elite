import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles, Globe, ShieldCheck, MessageSquare } from 'lucide-react';

const contactInfo = [
  { icon: Globe, label: 'Global Atelier', value: '123 Avenue des Champs-Élysées, Paris', desc: 'Main heritage headquarters' },
  { icon: Phone, label: 'Concierge Direct', value: '+33 1 23 45 67 89', desc: 'Available for secure voice sessions' },
  { icon: Mail, label: 'Digital Ledger', value: 'atelier@maisonelite.com', desc: 'Secure communication portal' },
  { icon: Clock, label: 'Atelier Hours', value: 'Mon - Fri: 09:00 - 20:00 CET', desc: 'Brussels Standard Time' },
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
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full legal identification required';
    if (!formData.email.trim()) newErrors.email = 'Secure digital address required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Malformed digital address';
    if (!formData.message.trim()) newErrors.message = 'Communication payload required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate high-level API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Header */}
      <section className="pt-48 pb-32 bg-black border-b border-[var(--border-color)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[var(--accent-color)] rounded-full blur-[180px]" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-[var(--accent-color)] tracking-[0.8em] font-black uppercase text-[12px] mb-8 block">
              CONCIERGE ACCESS PORTAL
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-10 leading-[0.85] text-white font-serif">
               INITIATE <br/><span className="gradient-text">DIALOGUE</span>
            </h1>
            <p className="text-white/60 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              Maison Élite maintains a private communications channel for global heritage consultations and bespoke technical requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 lg:gap-32 items-start">
            {/* Contact Info Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-16">
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white font-serif">
                   THE PROTOCOL <br/><span className="gradient-text">OF LUXURY</span>
                 </h2>
                 <p className="text-white/50 text-xl font-light leading-relaxed">
                   Direct engagement with our concierge elite ensures your journey begins with uncompromising precision and professional integrity.
                 </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {contactInfo.map(({ icon: Icon, label, value, desc }, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-[2.5rem] bg-[var(--bg-secondary)] border border-white/5 hover:border-[var(--accent-color)]/30 transition-all duration-500 group shadow-2xl"
                  >
                    <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-2xl flex items-center justify-center text-[var(--accent-color)] mb-6 group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-500">
                      <Icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--accent-color)] uppercase font-black tracking-[0.4em] mb-4">{label}</p>
                      <p className="text-sm font-black text-white uppercase tracking-widest mb-2 leading-relaxed">{value}</p>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 p-10 rounded-[3rem] bg-black border-2 border-[var(--accent-color)]/20 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-color)]/5 rounded-bl-[4rem] group-hover:w-40 group-hover:h-40 transition-all duration-700" />
                 <ShieldCheck className="text-[var(--accent-color)] mb-6" size={40} />
                 <h4 className="text-xl text-white font-black uppercase tracking-widest mb-4">Secure Communications</h4>
                 <p className="text-white/50 text-sm font-light leading-relaxed mb-8">All inquiries are encrypted through our private heritage ledger to ensure maximum client discretion.</p>
                 <div className="flex gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Atelier Server Online</span>
                 </div>
              </div>
            </motion.div>

            {/* Contact Form Side */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-card)] rounded-[4rem] border border-[var(--border-color)] p-10 md:p-16 lg:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden hover:border-[var(--accent-color)]/30 transition-all duration-700"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-color)]/5 rounded-bl-full pointer-events-none blur-3xl" />
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-32 h-32 bg-green-500/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 border-2 border-green-500/20 shadow-2xl">
                      <CheckCircle className="text-green-500" size={64} />
                    </div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 text-white font-serif">TRANSMISSION <span className="text-[var(--accent-color)]">SECURED</span></h3>
                    <p className="text-white/60 font-light mb-12 text-lg leading-relaxed">
                      Your high-level inquiry has been indexed. A heritage advisor will establish direct contact within 12 business hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="w-full py-6 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-2xl"
                    >
                      RESUME COMMUNICATIONS
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    <div className="flex items-center gap-4 mb-14">
                        <MessageSquare size={32} className="text-[var(--accent-color)]" />
                        <div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter text-white font-serif">SECURE FILING</h3>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em]">HAUTE COUTURE COMMISSION DESK</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1 block">IDENTIFICATION</label>
                          <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`form-input py-5 text-lg bg-black/40 border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.name ? 'border-red-500/50' : ''}`}
                            placeholder="NAME"
                          />
                          {errors.name && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.name}</p>}
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1 block">DIGITAL ADDRESS</label>
                          <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`form-input py-5 text-lg bg-black/40 border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.email ? 'border-red-500/50' : ''}`}
                            placeholder="EMAIL"
                          />
                          {errors.email && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1 block">VOICE FREQUENCY (OPT)</label>
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input py-5 text-lg bg-black/40 border border-white/5 focus:border-[var(--accent-color)] transition-all"
                            placeholder="+XX..."
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1 block">MISSION SECTOR</label>
                          <select 
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="form-input py-5 text-lg bg-black/40 border border-white/5 focus:border-[var(--accent-color)] transition-all cursor-pointer appearance-none"
                          >
                            <option value="" className="bg-black">SELECT SECTOR</option>
                            {serviceOptions.map(opt => (
                              <option key={opt} value={opt} className="bg-black">{opt.toUpperCase()}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1 block">DETAILED PAYLOAD</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className={`form-input py-5 text-lg bg-black/40 border border-white/5 resize-none focus:border-[var(--accent-color)] transition-all ${errors.message ? 'border-red-500/50' : ''}`}
                          placeholder="OUTLINE YOUR REQUIREMENTS..."
                        />
                        {errors.message && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.message}</p>}
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary h-20 disabled:opacity-50 shadow-2xl rounded-2xl text-[11px] font-black tracking-[0.6em]"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-4">
                            <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            INDEXING TRANSMISSION...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-4">DISPATCH INQUIRY <Send size={20} /></span>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
