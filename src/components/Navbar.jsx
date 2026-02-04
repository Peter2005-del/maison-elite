import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductSearch from './ProductSearch';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Collections', path: '/collections' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { toggleCart, cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  const currentLinks = user?.role === 'admin' 
    ? [ { name: 'Admin', path: '/admin' }, { name: 'Shop', path: '/shop' }, ...navLinks.filter(l => ['Home', 'Contact'].includes(l.name)) ]
    : user?.role === 'staff'
    ? [ { name: 'Operations', path: '/staff' }, ...navLinks.filter(l => ['Home', 'Contact'].includes(l.name)) ]
    : navLinks;

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-1000",
          scrolled ? "bg-black/95 backdrop-blur-3xl py-6 border-b border-white/5 shadow-2xl" : "bg-transparent py-12"
        )}
      >
        <nav className="container-custom flex items-center justify-between">
          {/* Brand Identity - Minimal Architectural */}
          <Link to="/" className="flex items-center gap-6 group">
            <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:border-white transition-all duration-1000">
               <span className="font-serif text-2xl font-light italic">M</span>
            </div>
            <span className="font-serif text-[20px] tracking-[0.6em] text-white font-light uppercase">
              Maison Élite
            </span>
          </Link>

          {/* Nav Links - Unified White */}
          <ul className="hidden lg:flex items-center gap-14">
            {currentLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.6em] transition-all hover:text-white relative py-2",
                    location.pathname === link.path ? "text-white" : "text-white/30"
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-white/40"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Interactions */}
          <div className="flex items-center gap-10">
            <button 
              onClick={() => setSearchOpen(true)}
              className="group relative p-3 transition-all hidden lg:block"
            >
              <Search size={22} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>

            <button 
              onClick={() => navigate('/shop')}
              className="group relative p-3 transition-all hidden lg:block"
              title="Wishlist"
            >
              <Heart size={22} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[9px] font-black rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={toggleCart}
              className="group relative p-3 transition-all"
            >
              <ShoppingBag size={22} className="text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="hidden lg:flex items-center ml-6 gap-10 pl-10 border-l border-white/5">
              {user ? (
                <div className="flex items-center gap-10">
                  <Link to="/profile" className="flex items-center gap-5 group">
                     <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">{user.role}</p>
                        <p className="text-[11px] text-white font-black uppercase tracking-[0.2em]">{user.email.split('@')[0]}</p>
                     </div>
                     <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-all overflow-hidden bg-white/5">
                        <User size={20} className="text-white/40 group-hover:text-white transition-colors" />
                     </div>
                  </Link>
                  <button onClick={onLogout} className="text-white/20 hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-white text-[10px] font-black uppercase tracking-[0.6em] hover:opacity-50 transition-opacity">
                  SIGN IN
                </Link>
              )}
            </div>

            <button className="lg:hidden p-2 text-white" onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Heritage Portal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[60]" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 35, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-black z-[70] p-16 border-l border-white/5 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between mb-24">
                <span className="font-serif text-2xl tracking-[0.4em] font-light uppercase text-white">Maison Élite</span>
                <button onClick={() => setIsOpen(false)} className="p-4 hover:bg-white/5 rounded-full transition-colors">
                  <X size={32} className="text-white" />
                </button>
              </div>

              <nav className="space-y-10 flex-1">
                {currentLinks.map((link) => (
                  <Link key={link.path} to={link.path} className={cn("block text-[12px] font-black uppercase tracking-[0.6em] pb-6 border-b border-white/5 transition-all", location.pathname === link.path ? "text-white border-white/20" : "text-white/20 hover:text-white")}>
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-12">
                {user ? (
                   <div className="space-y-6">
                      <Link to="/profile" className="flex items-center gap-6 p-10 bg-white/5 border border-white/5">
                         <User size={24} className="text-white/40" />
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white">{user.role}</p>
                            <p className="text-[11px] text-white/30 tracking-widest lowercase">{user.email}</p>
                         </div>
                      </Link>
                      <button onClick={onLogout} className="w-full py-8 border border-red-500/20 text-red-500 text-[11px] font-black tracking-[0.4em] uppercase hover:bg-red-500 hover:text-white transition-all">
                         SIGN OUT
                      </button>
                   </div>
                ) : (
                  <Link to="/login" className="bg-white text-black w-full py-8 text-center text-[11px] font-black uppercase tracking-[0.6em] block hover:bg-white/90 transition-all">
                    SIGN IN TO ATELIER
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && <ProductSearch onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
