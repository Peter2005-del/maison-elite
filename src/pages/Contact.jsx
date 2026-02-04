import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, ShieldCheck, MessageSquare, Star, RefreshCcw } from 'lucide-react';

const contactInfo = [
  { icon: Mail, title: 'ATELIER INQUIRIES', detail: 'atelier@maisonelite.com', sub: 'Direct concierge relay' },
  { icon: Phone, title: 'CONCIERGE LINE', detail: '+1 (888) MAISON-E', sub: 'Priority for Royal-Tier Patrons' },
  { icon: MapPin, title: 'PHYSICAL HOUSE', detail: '30 Avenue Montaigne, Paris', sub: 'By private appointment only' },
];

const serviceOptions = [
  'Bespoke Bridal Couture',
  'Private Evening Gown Commission',
  'Heritage Tailoring Session',
  'Signature Styling Advisory',
  'Private Gallery Viewing',
  'General Boutique Inquiry',
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
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 8000);
    }, 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-40 pb-20 selection:bg-black selection:text-white">
      <div className="container-custom relative z-10 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-32 max-w-5xl">
           <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-10 block text-[10px] font-black uppercase tracking-[0.6em] text-[var(--accent-color)]"
           >
            LA MAISON ÉLITE CONCIERGE
           </motion.span>
           <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 font-serif text-7xl font-normal uppercase tracking-tighter text-black md:text-9xl leading-[0.8]"
           >
            BESPOKE <br/><span className="italic opacity-60">INQUIRY</span>
           </motion.h1>
           <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl font-light leading-snug text-black/60 text-xl md:text-3xl"
           >
            Our dedicated team is standing by to facilitate your next archival acquisition.
           </motion.p>
        </div>

        <div className="grid gap-24 lg:grid-cols-12">
          {/* Contact Information Cards */}
          <div className="space-y-12 lg:col-span-5">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex gap-10 border border-black/5 bg-white p-12 transition-all hover:border-[var(--accent-color)] shadow-sm hover:shadow-xl"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-black/5 bg-gray-50 text-[var(--accent-color)] transition-all duration-500 group-hover:bg-black group-hover:text-white">
                  <info.icon size={26} />
                </div>
                <div>
                   <h3 className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-black/30">{info.title}</h3>
                   <p className="mb-1 text-xl font-bold text-black">{info.detail}</p>
                   <p className="text-xs font-medium text-black/40">{info.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Global Status Banner - Minimalized */}
            <div className="relative mt-16 overflow-hidden bg-black p-12 text-white shadow-2xl">
               <div className="relative z-10">
                  <div className="mb-10 flex items-center gap-4">
                     <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-green-500">GLOBAL ATELIER ACTIVE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-10">
                     <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/40">PARIS HQ</p>
                        <p className="font-serif text-3xl tracking-tighter opacity-80">01:46 AM</p>
                     </div>
                     <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-white/40">LONDON</p>
                        <p className="font-serif text-3xl tracking-tighter opacity-80">12:46 AM</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden border border-black/5 bg-white p-12 shadow-xl md:p-20"
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-12"
                  >
                    <div className="grid gap-12 md:grid-cols-2">
                      <div className="space-y-4">
                        <label className="ml-2 text-[9px] font-black uppercase tracking-[0.5em] text-black/30">Your Identity</label>
                        <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full Name" className="h-16 w-full border-b border-black/10 text-[11px] font-bold uppercase tracking-widest bg-transparent outline-none focus:border-black transition-all" />
                      </div>
                      <div className="space-y-4">
                        <label className="ml-2 text-[9px] font-black uppercase tracking-[0.5em] text-black/30">Private Address</label>
                        <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="h-16 w-full border-b border-black/10 text-[11px] font-bold uppercase tracking-widest bg-transparent outline-none focus:border-black transition-all" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="ml-2 text-[9px] font-black uppercase tracking-[0.5em] text-black/30">Commission Category</label>
                      <select required name="service" value={formData.service} onChange={handleChange} className="h-16 w-full border-b border-black/10 bg-transparent text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer focus:border-black transition-all" >
                        <option value="" disabled>SELECT INQUIRY TYPE</option>
                        {serviceOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="ml-2 text-[9px] font-black uppercase tracking-[0.5em] text-black/30">Detailed Manifesto</label>
                      <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Enter your requirements..." className="w-full border-b border-black/10 bg-transparent text-[11px] font-bold uppercase tracking-widest outline-none resize-none py-4 focus:border-black transition-all" />
                    </div>

                    <div className="flex items-center gap-4 py-4 opacity-50">
                       <ShieldCheck className="text-black" size={18} />
                       <p className="text-[9px] font-black uppercase tracking-[0.2em]">Confidential Boutique Correspondence Protocols Active</p>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="h-20 w-full bg-black text-[11px] font-black uppercase tracking-[0.6em] text-white shadow-2xl transition-all hover:bg-[var(--accent-color)]" >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-4">
                           <RefreshCcw className="animate-spin" size={18} /> TRANSMITTING...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-4">
                           SUBMIT INQUIRY <Send size={18} />
                        </div>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-20 text-center" >
                    <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-gray-50">
                       <CheckCircle size={40} className="text-black" />
                    </div>
                    <h2 className="mb-6 font-serif text-5xl uppercase tracking-tight">Inquiry Received</h2>
                    <p className="mx-auto mb-12 max-w-sm font-light leading-relaxed text-black/40 text-lg">
                      Your request has been documented in the archive. A Maison representative will contact you for a private consultation.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="h-16 border border-black px-12 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all" >
                      New Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
