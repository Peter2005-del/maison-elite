import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Collections = lazy(() => import("./pages/Collections"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Shop = lazy(() => import("./pages/Shop"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Checkout = lazy(() => import("./pages/Checkout"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StaffDashboard = lazy(() => import("./pages/StaffDashboard"));

import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SyncProvider } from "./context/SyncContext";
import { DataProvider } from "./context/DataContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ToastProvider } from "./context/ToastContext";

// Navigation wrapper to manage unified heritage state
function AppContent() {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    // Force static architectural theme
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  }, []);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      if (user.role === "admin") return <Navigate to="/admin" replace />;
      if (user.role === "staff") return <Navigate to="/staff" replace />;
      return <Navigate to="/shop" replace />;
    }
    return children;
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-black selection:bg-white selection:text-black">
        <Navbar
          user={user}
          logout={logout}
        />
        <main className="flex-grow">
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><div className="text-center"><div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin mx-auto mb-8"></div><p className="text-white/40 text-xs uppercase tracking-widest">Loading...</p></div></div>}>
            <Routes>
            {/* Public Archive */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login handleLogin={login} />} />

            {/* Private Access */}
            <Route
              path="/shop"
              element={
                <ProtectedRoute allowedRoles={["client", "admin", "staff"]}>
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute allowedRoles={["client", "admin", "staff"]}>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["client", "admin", "staff"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Command Centers */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={["staff", "admin"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <DataProvider>
            <WishlistProvider>
              <CurrencyProvider>
                <SyncProvider>
                  <AppContent />
                </SyncProvider>
              </CurrencyProvider>
            </WishlistProvider>
          </DataProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
