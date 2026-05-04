import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Branches from './components/Branches';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('home'); // 'home', 'login', 'signup'

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    const savedCart = localStorage.getItem('santozCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setAuthView('home');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('santozCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert('🎉 Order placed successfully! Our team will contact you within 24 hours to confirm delivery.');
    setCartItems([]);
    setShowCheckout(false);
    setIsCartOpen(false);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setAuthView('home');
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
    setAuthView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setAuthView('home');
    setIsCartOpen(false);
  };

  if (isLoading) {
    return <div className="loader-container"><div className="loader"></div></div>;
  }

  // Show login page
  if (authView === 'login' && !currentUser) {
    return (
      <Login 
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignup={() => setAuthView('signup')}
      />
    );
  }

  // Show signup page
  if (authView === 'signup' && !currentUser) {
    return (
      <Signup 
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setAuthView('login')}
      />
    );
  }

  return (
    <div className="App">
      <Navbar 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onAuthClick={(view) => setAuthView(view)}
        onLogout={handleLogout}
      />
      <Hero />
      <About />
      <Products 
        addToCart={addToCart} 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <Branches />
      <Footer />
      
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onClose={() => {
            setIsCartOpen(false);
            setShowCheckout(false);
          }}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          getCartTotal={getCartTotal}
          clearCart={clearCart}
          showCheckout={showCheckout}
          onSubmitOrder={handleSubmitOrder}
          currentUser={currentUser}
          onAuthClick={() => setAuthView('login')}
        />
      )}
    </div>
  );
}

export default App;