import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, RefreshCcw } from 'lucide-react';

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Complete identity authentication required');
      return;
    }

    // Role Distribution Logic
    let role = 'client';
    let targetPath = '/profile';

    // Staff & Admin Overrides
    if (email === 'admin@maisonelite.com' && password === 'admin123') {
      role = 'admin';
      targetPath = '/admin';
    } else if (email === 'staff@maisonelite.com' && password === 'staff123') {
      role = 'staff';
      targetPath = '/staff';
    } else if (email === 'client@example.com' && password === 'client123') {
      role = 'client';
      targetPath = '/profile';
    } else {
      // Default behavior for other emails (mocking registration success)
      role = 'client';
      targetPath = '/shop';
    }

    setIsLoading(true);
    setTimeout(() => {
      handleLogin(role, email);
      navigate(targetPath);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-[#FDFCF8] dark:bg-black relative overflow-hidden transition-colors duration-700">
      {/* Editorial Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="w-full max-w-xl bg-white dark:bg-[#0A0A0A] p-12 md:p-24 border border-black/5 dark:border-white/5 shadow-2xl relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-20">
          <Link to="/" className="inline-block mb-12 group">
             <span className="font-serif text-3xl tracking-[0.4em] text-black dark:text-white uppercase block mb-1">
                  MAISON ÉLITE
             </span>
             <div className="h-px w-full bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-center" />
          </Link>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white font-serif leading-none">MEMBER ACCESS</h1>
          <p className="text-black/40 dark:text-white/30 text-[9px] font-black uppercase tracking-[0.5em] mt-6">Authentication Protocol 01</p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 text-red-500 text-[10px] font-black uppercase tracking-widest text-center border-b border-red-500/10 pb-4"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-12">
          <div className="space-y-4">
            <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20 ml-1 block">Identification Cipher</label>
            <div className="relative group">
              <Mail className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/10 group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-5 outline-none font-light"
                placeholder="name@archival.com"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-1 px-1">
              <label className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30 dark:text-white/20">Access Key</label>
              <button type="button" className="text-[9px] font-black uppercase tracking-widest text-black/20 dark:text-white/20 hover:text-[var(--accent-color)] transition-all">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20 dark:text-white/10 group-focus-within:text-[var(--accent-color)] transition-colors" size={18} />
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input text-lg bg-transparent border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white transition-all w-full py-5 outline-none font-light"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-black/10 dark:text-white/10 hover:text-black dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black dark:bg-white text-white dark:text-black h-20 text-[11px] font-black tracking-[0.5em] uppercase hover:bg-[var(--accent-color)] dark:hover:bg-[var(--accent-color)] hover:text-white transition-all shadow-2xl mt-8 flex items-center justify-center gap-4"
          >
            {isLoading ? (
              <>
                <RefreshCcw className="animate-spin" size={18} />
                Transmitting...
              </>
            ) : (
              <>
                 Initialize Session <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Support Footer */}
        <div className="mt-16 pt-12 border-t border-black/5 dark:border-white/5 flex items-center justify-center gap-6">
           <ShieldCheck size={16} className="text-black/20 dark:text-white/20" />
           <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 dark:text-white/20">Encrypted Maison Relay Active</p>
        </div>
        
        <div className="mt-10 text-center">
           <Link to="/register" className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 dark:text-white/20 hover:text-black dark:hover:text-white transition-all">
              Request Archive Decree
           </Link>
        </div>
      </motion.div>
    </div>
  );
}
