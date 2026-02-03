import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, Fingerprint } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Legal first name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Legal last name required';
    if (!formData.email.trim()) newErrors.email = 'Digital address required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Malformed digital address';
    if (!formData.password) newErrors.password = 'Security key required';
    else if (formData.password.length < 8) newErrors.password = 'Security key minimum: 8 hex characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Security key mismatch detected';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--accent-color)] opacity-[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-[var(--bg-card)] rounded-[4rem] border border-white/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="p-10 md:p-16 lg:p-20">
          {/* Header */}
          <div className="text-center mb-16">
             <Link to="/" className="inline-block mb-10 group">
                <div className="relative">
                   <span className="font-serif text-3xl tracking-[0.4em] text-[var(--accent-color)] uppercase block mb-1">
                        MAISON ÉLITE
                   </span>
                   <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                </div>
             </Link>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white font-serif">REQUEST DECREE</h1>
            <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.6em] mt-4 max-w-sm mx-auto leading-relaxed">Authorize your heritage profile for direct atelier commissions</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-10">
            {/* Identity Group */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 ml-1 block">LEGAL FIRST NAME</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`form-input pl-16 py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.firstName ? 'border-red-500/50' : ''}`}
                    placeholder="LUCIEN"
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.firstName}</p>}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1 block">LEGAL LAST NAME</label>
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`form-input py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.lastName ? 'border-red-500/50' : ''}`}
                  placeholder="ÉLITE"
                />
                {errors.lastName && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 ml-1 block">OFFICIAL DIGITAL ADDRESS</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input pl-16 py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.email ? 'border-red-500/50' : ''}`}
                  placeholder="ATELIER@COMMISSION.COM"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.email}</p>}
            </div>

            {/* Keys Group */}
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 ml-1 block">SECURITY KEY</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input pl-16 pr-16 py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.password ? 'border-red-500/50' : ''}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-all"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.password}</p>}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 ml-1 block">COMPENSATION CONFIRMATION</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`form-input pl-16 py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-[9px] font-black mt-2 uppercase tracking-widest">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-[var(--accent-color)]/5 p-8 rounded-[2.5rem] border border-[var(--accent-color)]/20 flex gap-6 mt-6 shadow-inner relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-color)]/5 rounded-bl-3xl group-hover:scale-110 transition-transform duration-700" />
               <Fingerprint className="text-[var(--accent-color)] shrink-0" size={32} />
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2">Heritage Sovereign Protocols</h4>
                  <p className="text-[9px] font-medium uppercase tracking-widest text-white/40 leading-relaxed">
                    Account initialization requires immediate cryptographic verification. By proceeding, you authorize Maison Élite to index your identity within our private global network.
                  </p>
               </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary h-20 shadow-[0_20px_40px_rgba(201,162,39,0.2)] mt-8 rounded-2xl disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-4 text-[11px] font-black tracking-[0.6em]">
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  INITIALIZING ARCHIVE...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-4 text-[11px] font-black tracking-[0.6em]">VERIFY & AUTHORIZE <ArrowRight size={22} /></span>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-16 text-center">
             <Link to="/login" className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40 hover:text-[var(--accent-color)] transition-colors group">
                EXISTING HERITAGE? <span className="text-white group-hover:text-[var(--accent-color)] ml-3">INITIALIZE LOGIN</span>
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
