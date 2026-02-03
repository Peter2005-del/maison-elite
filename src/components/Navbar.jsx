import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Shop', path: '/shop' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useSync } from '../context/SyncContext';
import { Smartphone, Coins, CreditCard } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, user, logout }) {
  const { toggleCart, cartCount } = useCart();
  const { currency, setCurrency, currencies } = useCurrency();
  const { generateSyncCode, syncCode } = useSync();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCurrencyDrop, setShowCurrencyDrop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const getFilteredLinks = () => {
    if (!user) return navLinks.filter(l => l.name !== 'Shop');
    
    // Admin Links
    if (user.role === 'admin') {
       return [
         { name: 'Business', path: '/admin' },
         { name: 'Shop View', path: '/shop' },
         { name: 'Staff View', path: '/staff' },
         ...navLinks.filter(l => ['Home', 'Contact'].includes(l.name))
       ];
    }
    
    // Staff Links
    if (user.role === 'staff') {
       return [
         { name: 'Staff Portal', path: '/staff' },
         ...navLinks.filter(l => ['Home', 'Contact'].includes(l.name))
       ];
    }

    // Client Links (default)
    return navLinks.filter(l => ['Home', 'Collections', 'Portfolio', 'Shop', 'About', 'Contact'].includes(l.name));
  };

  const currentLinks = getFilteredLinks();

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "glass-header py-2 md:py-3" : "bg-transparent py-3 md:py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Go to homepage">
            <div className="text-accent-indigo transition-transform group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="sm:w-6 sm:h-6">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-serif text-base sm:text-lg md:text-xl tracking-[0.4em] pt-1 gradient-text">
              MAISON ÉLITE
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {currentLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={cn(
                    "text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent-color)] relative py-2",
                    location.pathname === link.path ? "text-[var(--accent-color)]" : "text-[var(--text-secondary)]"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent-color)]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Currency Switcher */}
            <div className="relative">
              <button 
                onClick={() => setShowCurrencyDrop(!showCurrencyDrop)}
                className="p-2 sm:p-2.5 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] transition-all flex items-center gap-2"
                aria-label="Change currency"
              >
                <span className="text-[10px] font-black">{currency.code}</span>
                {currency.code === 'USD' ? <CreditCard size={16} /> : <Coins size={16} />}
              </button>
              
              <AnimatePresence>
                {showCurrencyDrop && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    {Object.values(currencies).map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          setShowCurrencyDrop(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2 text-left text-xs font-bold hover:bg-[var(--accent-color)] hover:text-white transition-colors",
                          currency.code === curr.code ? "bg-[var(--accent-color)]/20 text-[var(--accent-color)]" : "text-[var(--text-secondary)]"
                        )}
                      >
                        {curr.code} ({curr.symbol})
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sync Phone */}
            <button 
              onClick={() => {
                const code = generateSyncCode();
                alert(`Your session sync code: ${code}\nUse this on another device to continue.`);
              }}
              className="hidden sm:flex p-2 sm:p-2.5 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] transition-all"
              title="Link Phone / Continue on other device"
            >
              <Smartphone size={18} />
            </button>

            {/* Cart Button */}
            <button 
              onClick={toggleCart}
              className="p-2 sm:p-2.5 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] transition-all relative"
              aria-label="Open shopping bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent-color)] text-[var(--accent-contrast)] text-[10px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-full border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-color)] transition-all"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Desktop Auth */}
            {user ? (
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex flex-col items-end mr-2">
                   <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">{user.role}</span>
                   <span className="text-[10px] text-[var(--text-muted)]">{user.email.split('@')[0]}</span>
                </div>
                {user.role === 'client' && (
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-2 group"
                    aria-label="View profile"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-accent-gold group-hover:scale-105 transition-transform object-cover"
                    />
                  </Link>
                )}
                <button 
                  onClick={onLogout}
                  className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="hidden lg:flex px-5 py-2 rounded-full border border-accent-gold text-accent-gold text-sm font-semibold hover:bg-accent-gold hover:text-white transition-all"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-[var(--text-primary)] hover:text-accent-gold transition-colors"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
              aria-hidden="true"
            />
            
            {/* Sidebar */}
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] sm:max-w-[380px] bg-[var(--bg-secondary)] z-[70] shadow-2xl overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                <span className="font-bold text-lg tracking-[0.3em] gradient-text pt-1">
                  MAISON ÉLITE
                </span>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 hover:bg-[var(--bg-card)] rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6">
                <ul className="flex flex-col gap-2">
                  {currentLinks.map((link, idx) => (
                    <motion.li 
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link 
                        to={link.path}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl font-medium transition-all group",
                          location.pathname === link.path 
                            ? "bg-accent-gold/10 text-accent-gold" 
                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                        )}
                      >
                        {link.name}
                        <ChevronRight 
                          size={18} 
                          className={cn(
                            "transition-all",
                            location.pathname === link.path 
                              ? "opacity-100" 
                              : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          )} 
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-6 mt-auto border-t border-[var(--border-color)] space-y-4">
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)]"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" 
                        alt="Profile" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">My Profile</p>
                        <p className="text-sm text-[var(--text-muted)]">View account details</p>
                      </div>
                    </Link>
                    <button 
                      onClick={onLogout}
                      className="w-full py-4 rounded-xl border border-red-500/30 text-red-500 font-semibold hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="block w-full py-4 rounded-xl bg-[var(--accent-color)] text-[var(--accent-contrast)] font-semibold text-center shadow-lg shadow-accent-gold/20"
                  >
                    Sign In
                  </Link>
                )}
                
                <button 
                  onClick={toggleTheme}
                  className="w-full py-4 rounded-xl border border-[var(--border-color)] flex items-center justify-center gap-3 font-medium transition-all hover:bg-[var(--bg-card)]"
                >
                  {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
