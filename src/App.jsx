import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import OrderConfirmation from './components/OrderConfirmation';
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
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Nairobi',
    postalCode: '',
    paymentMethod: 'mpesa'
  });
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    const savedCart = localStorage.getItem('santozCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedHistory = localStorage.getItem('santozOrderHistory');
    if (savedHistory) {
      setOrderHistory(JSON.parse(savedHistory));
    }
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setCheckoutData(prev => ({
        ...prev,
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      }));
      setAuthView('home');
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setCheckoutData(prev => ({
        ...prev,
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('santozCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Inactivity logout handler (10 minutes = 600,000 ms)
  useEffect(() => {
    if (!currentUser) return;

    let inactivityTimer;
    const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        console.log('User inactive for 10 minutes. Logging out...');
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    };

    // Activity events to track
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Initialize the timer on mount
    resetInactivityTimer();

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [currentUser]);

  const handleBackClick = () => {
    setAuthView('home');
  };

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
    setPaymentStatus('');
    setShowCheckout(true);
  };

  const handleCheckoutChange = (field, value) => {
    setCheckoutData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (paymentLoading) return;

    const missingFields = ['fullName', 'email', 'phone', 'address', 'city'].filter(field => !checkoutData[field]);
    if (missingFields.length > 0) {
      alert('Please fill in all required checkout fields.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setPaymentLoading(true);
    const paymentMethodDisplay = {
      'mpesa': 'M-Pesa',
      'creditcard': 'Credit Card',
      'debitcard': 'Debit Card',
      'cod': 'Cash on Delivery'
    };
    const methodDisplay = paymentMethodDisplay[checkoutData.paymentMethod] || 'M-Pesa';
    setPaymentStatus(`Creating order and initiating ${methodDisplay} payment...`);

    try {
      const orderPayload = {
        customer_name: checkoutData.fullName,
        customer_email: checkoutData.email,
        customer_phone: checkoutData.phone,
        delivery_address: checkoutData.address,
        city: checkoutData.city,
        total_amount: getCartTotal(),
        payment_method: checkoutData.paymentMethod || 'mpesa',
        items: cartItems.map(item => ({
          product_id: item.id,
          product_name: item.name,
          product_price: item.price,
          quantity: item.quantity
        }))
      };

      const orderResponse = await fetch('http://localhost:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      const orderResult = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderResult.error || 'Unable to create order.');
      }

      const orderId = orderResult.order?.id;
      if (!orderId) {
        throw new Error('Order ID missing from response.');
      }

      let paymentResult = {};
      const paymentMethod = checkoutData.paymentMethod || 'mpesa';

      // Handle different payment methods
      if (paymentMethod === 'mpesa') {
        const paymentResponse = await fetch('http://localhost:8000/api/payments/initiate-stk-push/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            order_id: orderId,
            phone_number: checkoutData.phone.replace(/\s+/g, '')
          })
        });

        paymentResult = await paymentResponse.json();
        if (!paymentResponse.ok) {
          throw new Error(paymentResult.error || paymentResult.detail || 'Unable to start M-Pesa payment.');
        }
      } else if (paymentMethod === 'cod') {
        paymentResult = {
          message: 'Order created successfully. You will pay on delivery.',
          payment_id: 'COD-' + orderId
        };
      } else if (paymentMethod === 'creditcard' || paymentMethod === 'debitcard') {
        paymentResult = {
          message: `Order created successfully. Redirecting to ${paymentMethod === 'creditcard' ? 'Credit Card' : 'Debit Card'} payment...`,
          payment_id: 'CARD-' + orderId
        };
      }

      const confirmation = {
        id: orderId,
        orderNumber: orderResult.order.order_number,
        amount: orderResult.order.total_amount,
        phone: checkoutData.phone,
        status: paymentMethod === 'cod' ? 'pending' : 'processing',
        date: new Date().toISOString(),
        paymentId: paymentResult.payment_id,
        paymentMethod: paymentMethod,
        message: paymentResult.response_description || paymentResult.message
      };

      setOrderHistory(prevHistory => {
        const updated = [confirmation, ...prevHistory];
        localStorage.setItem('santozOrderHistory', JSON.stringify(updated));
        return updated;
      });

      setOrderConfirmation(confirmation);
      const statusMessage = paymentMethod === 'mpesa' 
        ? `✅ ${paymentResult.message}. Please complete the payment on your phone.`
        : paymentMethod === 'cod'
        ? `✅ ${paymentResult.message}`
        : `✅ ${paymentResult.message}`;
      setPaymentStatus(statusMessage);
      setCartItems([]);
      setShowCheckout(false);
      setIsCartOpen(false);
    } catch (error) {
      setPaymentStatus(`❌ ${error.message}`);
    } finally {
      setPaymentLoading(false);
    }
  };

  const openOrderHistory = () => {
    setShowOrderHistory(true);
  };

  const closeOrderHistory = () => {
    setShowOrderHistory(false);
  };

  const closeOrderConfirmation = () => {
    setOrderConfirmation(null);
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
        onBackClick={handleBackClick}
      />
    );
  }

  // Show signup page
  if (authView === 'signup' && !currentUser) {
    return (
      <Signup 
        onSignupSuccess={handleSignupSuccess}
        onSwitchToLogin={() => setAuthView('login')}
        onBackClick={handleBackClick}
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
        onShowHistory={openOrderHistory}
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
          onAuthClick={(view) => setAuthView(view)}
          checkoutData={checkoutData}
          onCheckoutChange={handleCheckoutChange}
          paymentStatus={paymentStatus}
          paymentLoading={paymentLoading}
        />
      )}

      {orderConfirmation && (
        <OrderConfirmation
          confirmation={orderConfirmation}
          onClose={closeOrderConfirmation}
          onViewHistory={openOrderHistory}
        />
      )}

      {showOrderHistory && (
        <OrderHistory
          orders={orderHistory}
          onClose={closeOrderHistory}
        />
      )}
    </div>
  );
}

export default App;