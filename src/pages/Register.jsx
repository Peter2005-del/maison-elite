import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Fingerprint } from 'lucide-react';

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
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Security key mismatch';
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
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-[#FDFCF8] dark:bg-black transition-colors duration-700 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="w-full max-w-2xl bg-white dark:bg-[#0A0A0A] p-12 md:p-24 border border-black/5 dark:border-white/5 shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <Link to="/" className="inline-block mb-12 group text-black dark:text-white">
             <span className="font-serif text-3xl tracking-[0.4em] uppercase block mb-1">
                  MAISON ÉLITE
             </span>
             <div className="h-px w-full bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white font-serif leading-none">REQUEST DECREE</h1>
          <p className="text-black/40 dark:text-white/30 text-[9px] font-black uppercase tracking-[0.6em] mt-6 leading-loose">Authorize your heritage profile for direct atelier commissions</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-12">
          {/* Identity Group */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 ml-1 block">Legal First Name</label>
              <div className="relative group">
                <User className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/10 group-focus-within:text-[var(--accent-color)] transition-colors" size={16} />
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-4 outline-none font-light text-black dark:text-white"
                  placeholder="LUCIEN"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-[8px] font-black mt-2 uppercase tracking-widest">{errors.firstName}</p>}
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 ml-1 block">Legal Last Name</label>
              <input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-4 outline-none font-light text-black dark:text-white"
                placeholder="ÉLITE"
              />
              {errors.lastName && <p className="text-red-500 text-[8px] font-black mt-2 uppercase tracking-widest">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 ml-1 block">Official Digital Address</label>
            <div className="relative group">
              <Mail className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/10 group-focus-within:text-[var(--accent-color)] transition-colors" size={16} />
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-4 outline-none font-light text-black dark:text-white"
                placeholder="ATELIER@COMMISSION.COM"
              />
            </div>
            {errors.email && <p className="text-red-500 text-[8px] font-black mt-2 uppercase tracking-widest">{errors.email}</p>}
          </div>

          {/* Keys Group */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 ml-1 block">Security Key</label>
              <div className="relative group">
                <Lock className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/10 group-focus-within:text-[var(--accent-color)] transition-colors" size={16} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-4 outline-none font-light text-black dark:text-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-black/10 dark:text-white/10 hover:text-black dark:hover:text-white transition-all"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[8px] font-black mt-2 uppercase tracking-widest">{errors.password}</p>}
            </div>

            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 ml-1 block">Confirm Key</label>
              <input 
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-4 outline-none font-light text-black dark:text-white"
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-red-500 text-[8px] font-black mt-2 uppercase tracking-widest">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="pt-8 opacity-40">
             <div className="flex gap-4">
                <Fingerprint className="text-black dark:text-white shrink-0" size={24} />
                <p className="text-[8px] font-black uppercase tracking-widest leading-loose">
                  By request you authorize Maison Élite to index your heritage identity within our private global network protocols.
                </p>
             </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-white text-white dark:text-black h-20 text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[var(--accent-color)] dark:hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-2xl mt-8 flex items-center justify-center gap-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-4">
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Initializing...
              </span>
            ) : (
              <span className="flex items-center gap-4">VERIFY & AUTHORIZE <ArrowRight size={20} /></span>
            )}
          </button>
        </form>

        <div className="mt-16 text-center">
           <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 hover:text-black dark:hover:text-white transition-all">
              EXISTING HERITAGE? <span className="text-black dark:text-white ml-3 underline decoration-black/10 underline-offset-4">INITIALIZE LOGIN</span>
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
