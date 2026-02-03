import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User, Shield, Briefcase, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';

const defaultCredentials = [
  { role: 'Admin', email: 'admin@maisonelite.com', password: 'admin123', icon: Shield, color: 'text-[var(--accent-color)]', bg: 'bg-[var(--accent-color)]/10' },
  { role: 'Elite Member', email: 'client@example.com', password: 'client123', icon: User, color: 'text-white', bg: 'bg-white/10' },
];

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fillCredentials = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Complete identity authentication required');
      return;
    }

    let role = 'client';
    let isValid = false;

    if (email === 'admin@maisonelite.com' && password === 'admin123') {
      role = 'admin';
      isValid = true;
    } else if (email === 'client@example.com' && password === 'client123') {
      role = 'client';
      isValid = true;
    } else {
      role = 'client';
      isValid = true;
    }

    setIsLoading(true);
    setTimeout(() => {
      handleLogin(role, email);
      if (role === 'admin') navigate('/admin');
      else navigate('/profile');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[var(--accent-color)] opacity-[0.05] blur-[150px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-[var(--bg-card)] rounded-[3.5rem] border border-white/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="p-10 md:p-16">
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
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white font-serif">MEMBER ACCESS</h1>
            <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.5em] mt-3">Secure Heritage Authentication</p>
          </div>

          {/* Quick-Fill UI */}
          <div className="mb-12 p-8 bg-black/40 rounded-3xl border border-white/5">
            <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-[var(--accent-color)]" /> AUTHORIZED DEMO CHANNELS
            </p>
            <div className="grid grid-cols-2 gap-4">
              {defaultCredentials.map((cred, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => fillCredentials(cred)}
                  className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--accent-color)]/30 hover:bg-white/[0.08] transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 ${cred.bg} ${cred.color}`}>
                    <cred.icon size={20} />
                  </div>
                  <span className="font-black text-[9px] uppercase tracking-widest text-white/50 group-hover:text-white">{cred.role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 ml-1 block">IDENTIFICATION CIPHER</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--accent-color)] transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-16 py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all"
                  placeholder="name@archival.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center mb-1 px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">PRIVATE ACCESS KEY</label>
                <a href="#" className="text-[9px] font-black uppercase tracking-widest text-[var(--accent-color)] opacity-60 hover:opacity-100 transition-opacity">RECOVERY?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[var(--accent-color)] transition-colors" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-16 pr-16 py-6 text-lg bg-black border border-white/5 focus:border-[var(--accent-color)] transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary h-20 shadow-[0_20px_40px_rgba(201,162,39,0.2)] mt-6 rounded-2xl disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-4 text-[11px] font-black tracking-[0.5em]">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-4 text-[11px] font-black tracking-[0.5em]">
                   INITIALIZE SESSION <ArrowRight size={22} />
                </span>
              )}
            </button>
          </form>

          {/* Sync CTA inside Login */}
          <div className="mt-12 pt-10 border-t border-white/5 text-center">
             <Link to="/register" className="text-[11px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-[var(--accent-color)] transition-colors group">
                NO HERITAGE STANDING? <span className="text-white group-hover:text-[var(--accent-color)] ml-2">REQUEST DECREE</span>
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
