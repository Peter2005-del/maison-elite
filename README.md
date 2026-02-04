# 🛍️ MAISON ÉLITE - Premium Fashion E-Commerce Platform

![Version](https://img.shields.io/badge/version-2.0.0-blue) ![React](https://img.shields.io/badge/react-19.2.0-61dafb) ![License](https://img.shields.io/badge/license-MIT-green)

A sophisticated, high-performance luxury fashion e-commerce platform built with React, featuring a minimalist dark theme, advanced shopping features, and premium UX.

---

## ✨ Features

### 🎨 **Premium UI/UX**

- **Minimalist Dark Theme**: Elegant black and white color palette with subtle champagne gold accents
- **Smooth Animations**: Powered by Framer Motion for fluid, professional transitions
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Custom Typography**: Cormorant Garamond serif and Outfit sans-serif fonts

### 🛒 **E-Commerce Functionality**

- **50+ Premium Products**: Curated fashion collection including Evening Wear, Ready-to-Wear, Bridal, Accessories, and Bespoke items
- **Advanced Product Filtering**: Filter by category, price, size, color, material, and designer
- **Smart Search**: Real-time product search with autocomplete
- **Shopping Cart**: Persistent cart with add, remove, and quantity management
- **Wishlist**: Save favorite items with local storage persistence
- **Multi-Currency Support**: View prices in USD, EUR, and GBP

### 🔐 **User Management**

- **Authentication System**: Login/Register with role-based access
- **User Roles**: Client, Staff, and Admin with different permissions
- **Profile Management**: View and edit user profiles
- **Order History**: Track past purchases (coming soon)

### 👨‍💼 **Admin Dashboard**

- **Product Management**: Add, edit, remove, and toggle product visibility
- **User Management**: Create and manage users with different roles
- **Sales Analytics**: View sales statistics and popular products
- **Inventory Control**: Monitor stock levels

### 🎯 **Advanced Features**

- **Toast Notifications**: Beautiful success/error notifications
- **Skeleton Loaders**: Smooth loading states for better UX
- **Product Tags**: Featured, New Arrival, and On Sale badges
- **Size & Color Variants**: Full product variant support
- **Material & Designer Info**: Comprehensive product metadata
- **Local Storage**: Persistent data for cart, wishlist, and products

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/maison-elite.git

# Navigate to project directory
cd maison-elite

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 📦 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Animations**: Framer Motion 12.27.1
- **Routing**: React Router DOM 7.12.0
- **Icons**: Lucide React 0.562.0
- **State Management**: React Context API

---

## 📂 Project Structure

```
maison-elite/
├── public/
│   └── img/                    # Product images
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Main navigation with search & wishlist
│   │   ├── Footer.jsx         # Site footer
│   │   ├── CartSidebar.jsx    # Shopping cart sidebar
│   │   ├── ProductSearch.jsx  # Search modal
│   │   └── SkeletonLoader.jsx # Loading skeletons
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication state
│   │   ├── CartContext.jsx    # Shopping cart state
│   │   ├── DataContext.jsx    # Product & user data
│   │   ├── WishlistContext.jsx# Wishlist state
│   │   ├── ToastContext.jsx   # Notifications
│   │   ├── CurrencyContext.jsx# Currency conversion
│   │   └── SyncContext.jsx    # Data synchronization
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── Shop.jsx           # Product catalog
│   │   ├── Checkout.jsx       # Checkout flow
│   │   ├── Profile.jsx        # User profile
│   │   ├── AdminDashboard.jsx # Admin panel
│   │   └── ...                # Other pages
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
├── .github/
│   └── workflows/
│       └── deploy.yml         # CI/CD configuration
└── package.json
```

---

## 🎨 Design System

### Color Palette

```css
--bg-primary: #050505 /* Pure Black */ --bg-secondary: #0a0a0a
  /* Deep Obsidian */ --bg-card: #0f0f0f /* Stone Core */
  --text-primary: #ffffff /* White */ --accent-color: #c5a227
  /* Champagne Gold */;
```

### Typography

- **Headings**: Cormorant Garamond (Serif)
- **Body**: Outfit (Sans-serif)
- **Monospace**: Fira Code

---

## 💡 Key Features Explained

### Product Data Structure

Each product includes:

- Basic info (name, price, category, subcategory)
- Variants (sizes, colors)
- Materials and designer attribution
- Stock management
- Sales tracking
- Visibility toggles
- Special tags (featured, new, on sale)

### User Authentication

```javascript
// Default test accounts
Admin:  admin@kaito.com / admin123
Staff:  staff@kaito.com / staff123
Client: client@example.com / client123
```

### Shopping Cart

- Add/remove items
- Adjust quantities
- Persistent across sessions
- Real-time total calculation
- Multi-currency support

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root:

```env
VITE_APP_NAME=Maison Élite
VITE_API_URL=http://localhost:3000
```

### Tailwind Configuration

Custom theme in `tailwind.config.js`:

```javascript
{
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
}
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1536px

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment. Push to `main` branch to trigger deployment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

## 📞 Support

For support, email support@maisonelite.com or open an issue on GitHub.

---

## 🎯 Roadmap

- [ ] Product reviews and ratings system
- [ ] Real-time inventory synchronization
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe)
- [ ] Order tracking
- [ ] Newsletter subscription
- [ ] Gift cards and vouchers
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Social media integration

---

**Made with ❤️ by Maison Élite Team**

_Last Updated: February 4, 2026_
