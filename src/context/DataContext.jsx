import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

// Initial Mock Data with more products
const initialProducts = [
  { id: 1, name: 'Silk Evening Gown', price: 2499, image: '/img/evening dress.avif', category: 'Evening', rating: 5, stock: 5, sales: 12, visible: true },
  { id: 2, name: 'Tailored Blazer', price: 899, image: '/img/Tailored Power Suit.avif', category: 'Ready-to-Wear', rating: 4, stock: 15, sales: 45, visible: true },
  { id: 3, name: 'Lace Bridal Veil', price: 450, image: '/img/ethereal.avif', category: 'Bridal', rating: 5, stock: 8, sales: 23, visible: true },
  { id: 4, name: 'Velvet Gala Dress', price: 3200, image: '/img/evening3.avif', category: 'Evening', rating: 5, stock: 3, sales: 8, visible: true },
  { id: 5, name: 'Chiffon Scarf', price: 120, image: '/img/taquilla.avif', category: 'Accessories', rating: 4, stock: 50, sales: 120, visible: true },
  { id: 6, name: 'Diamond Tiara', price: 4500, image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 5, stock: 2, sales: 5, visible: true },
  { id: 7, name: 'Cashmere Wrap', price: 680, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 4, stock: 20, sales: 35, visible: true },
  { id: 8, name: 'Beaded Clutch', price: 350, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 5, stock: 12, sales: 28, visible: true },
  { id: 9, name: 'Custom Wedding Dress', price: 8500, image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&q=80&w=400', category: 'Bridal', rating: 5, stock: 1, sales: 3, visible: true },
  { id: 10, name: 'Sequin Cocktail Dress', price: 1200, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400', category: 'Evening', rating: 4, stock: 8, sales: 18, visible: true },
  { id: 11, name: 'Leather Handbag', price: 950, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 5, stock: 10, sales: 42, visible: true },
  { id: 12, name: 'Pearl Necklace Set', price: 780, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 5, stock: 6, sales: 15, visible: true },
  { id: 13, name: 'Satin Blouse', price: 320, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=400', category: 'Ready-to-Wear', rating: 4, stock: 25, sales: 55, visible: true },
  { id: 14, name: 'Wool Trench Coat', price: 1450, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400', category: 'Ready-to-Wear', rating: 5, stock: 7, sales: 22, visible: true },
  { id: 15, name: 'Bridal Shoes', price: 550, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400', category: 'Bridal', rating: 5, stock: 4, sales: 11, visible: true },
  { id: 16, name: 'Bespoke Suit', price: 5200, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400', category: 'Custom', rating: 5, stock: 2, sales: 8, visible: true },
  { id: 17, name: 'Custom Evening Cape', price: 3800, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400', category: 'Custom', rating: 5, stock: 1, sales: 4, visible: true },
  { id: 18, name: 'Embroidered Gown', price: 6500, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400', category: 'Evening', rating: 5, stock: 2, sales: 6, visible: true },
  { id: 19, name: 'Silk Pocket Square', price: 85, image: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 4, stock: 40, sales: 95, visible: true },
  { id: 20, name: 'Crystal Earrings', price: 420, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 5, stock: 15, sales: 32, visible: true },
  { id: 21, name: 'Linen Summer Dress', price: 580, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=400', category: 'Ready-to-Wear', rating: 4, stock: 18, sales: 38, visible: true },
  { id: 22, name: 'Bridal Corset', price: 1800, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400', category: 'Bridal', rating: 5, stock: 5, sales: 14, visible: true },
  { id: 23, name: 'Monogrammed Robe', price: 2200, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=400', category: 'Custom', rating: 5, stock: 3, sales: 9, visible: true },
  { id: 24, name: 'Vintage Brooch Set', price: 650, image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=400', category: 'Accessories', rating: 5, stock: 8, sales: 21, visible: true },
];

const initialUsers = [
  { id: 1, name: 'Admin User', email: 'admin@kaito.com', role: 'admin', status: 'Active', lastLogin: '2026-01-31' },
  { id: 2, name: 'Staff Member', email: 'staff@kaito.com', role: 'staff', status: 'Active', lastLogin: '2026-01-30' },
  { id: 3, name: 'Jane Doe', email: 'client@example.com', role: 'client', status: 'Active', lastLogin: '2026-01-28' },
];

export function DataProvider({ children }) {
  // Load from local storage or use initial
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all products have the visible property
      return parsed.map(p => ({ ...p, visible: p.visible !== undefined ? p.visible : true }));
    }
    return initialProducts;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Product Actions
  const addProduct = (product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now(), rating: 5, sales: 0, visible: true }]);
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleProductVisibility = (id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, visible: !p.visible } : p
    ));
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };

  // User Actions
  const addUser = (user) => {
    setUsers(prev => [...prev, { ...user, id: Date.now(), status: 'Active', lastLogin: '-' }]);
  };

  const removeUser = (id) => {
    if (users.find(u => u.id === id)?.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
      alert("Cannot remove the last admin.");
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // Get only visible products (for shop display)
  const visibleProducts = products.filter(p => p.visible);

  return (
    <DataContext.Provider value={{
      products,
      visibleProducts,
      users,
      addProduct,
      removeProduct,
      toggleProductVisibility,
      updateProduct,
      addUser,
      removeUser
    }}>
      {children}
    </DataContext.Provider>
  );
}
