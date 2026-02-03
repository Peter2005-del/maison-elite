import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Portfolio from "./pages/Portfolio";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import StaffDashboard from "./pages/StaffDashboard";

import { CartProvider } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { SyncProvider } from "./context/SyncContext";

// Navigation wrapper to use hooks
function AppContent() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const { user, login, logout } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect based on their actual role if they try to access unauthorized pages
      if (user.role === "admin") return <Navigate to="/admin" replace />;
      if (user.role === "staff") return <Navigate to="/staff" replace />;
      return <Navigate to="/shop" replace />;
    }
    return children;
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          logout={logout}
        />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login handleLogin={login} />} />

            {/* Client Routes */}
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

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Staff Routes */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute allowedRoles={["staff", "admin"]}>
                  <StaffDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <CurrencyProvider>
            <SyncProvider>
              <AppContent />
            </SyncProvider>
          </CurrencyProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
