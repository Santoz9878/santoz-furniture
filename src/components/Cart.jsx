import React from 'react';

const Cart = ({ cartItems, onClose, onRemove, onUpdateQuantity, onCheckout, getCartTotal, clearCart, showCheckout, onSubmitOrder, currentUser, onAuthClick, checkoutData, onCheckoutChange, paymentStatus, paymentLoading }) => {
  const paymentMethodLabel = checkoutData.paymentMethod === 'creditcard'
    ? 'Credit Card'
    : checkoutData.paymentMethod === 'debitcard'
    ? 'Debit Card'
    : checkoutData.paymentMethod === 'cod'
    ? 'Cash on Delivery'
    : 'M-Pesa';

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>
            <i className="fas fa-shopping-cart"></i>
            Your Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
          </h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        {!showCheckout ? (
          <>
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <i className="fas fa-couch"></i>
                  <p>Your cart is empty</p>
                  <p className="empty-subtitle">Add some beautiful furniture to get started!</p>
                  <button className="continue-shopping" onClick={onClose}>Continue Shopping</button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">KES {item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Subtotal:</span>
                  <strong>KES {getCartTotal().toFixed(2)}</strong>
                </div>
                <div className="cart-total">
                  <span>Delivery:</span>
                  <strong>Free</strong>
                </div>
                <div className="cart-payment-preview">
                  <span>Payment method:</span>
                  <strong>{paymentMethodLabel}</strong>
                </div>
                <div className="cart-payment-options">
                  <span>Choose payment option</span>
                  <div className="payment-options">
                    <button
                      type="button"
                      className={`payment-option ${checkoutData.paymentMethod === 'mpesa' ? 'active' : ''}`}
                      onClick={() => onCheckoutChange('paymentMethod', 'mpesa')}
                    >
                      M-Pesa
                    </button>
                    <button
                      type="button"
                      className={`payment-option ${checkoutData.paymentMethod === 'creditcard' ? 'active' : ''}`}
                      onClick={() => onCheckoutChange('paymentMethod', 'creditcard')}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      className={`payment-option ${checkoutData.paymentMethod === 'debitcard' ? 'active' : ''}`}
                      onClick={() => onCheckoutChange('paymentMethod', 'debitcard')}
                    >
                      Debit Card
                    </button>
                    <button
                      type="button"
                      className={`payment-option ${checkoutData.paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => onCheckoutChange('paymentMethod', 'cod')}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>
                <div className="cart-total total">
                  <span>Total:</span>
                  <strong>KES {getCartTotal().toFixed(2)}</strong>
                </div>
                <div className="cart-actions">
                  <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                  <button className="checkout-btn" onClick={onCheckout}>Proceed to Checkout</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="checkout-form">
            {!currentUser ? (
              <div className="login-prompt">
                <i className="fas fa-lock"></i>
                <h3>Please Login to Continue</h3>
                <p>You need to be logged in to complete your purchase.</p>
                <button className="prompt-login-btn" onClick={() => {
                  onAuthClick('login');
                  onClose();
                }}>
                  <i className="fas fa-sign-in-alt"></i> Login to Your Account
                </button>
                <button className="prompt-signup-btn" onClick={() => {
                  onAuthClick('signup');
                  onClose();
                }}>
                  <i className="fas fa-user-plus"></i> Create New Account
                </button>
              </div>
            ) : (
              <>
                <h3>Complete Your Order</h3>
                {paymentStatus && (
                  <div className={`payment-status ${paymentStatus.startsWith('✅') ? 'success' : 'error'}`}>
                    {paymentStatus}
                  </div>
                )}
                <form onSubmit={onSubmitOrder}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={checkoutData.fullName}
                      onChange={(e) => onCheckoutChange('fullName', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={checkoutData.email}
                      onChange={(e) => onCheckoutChange('email', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="254712345678"
                      value={checkoutData.phone}
                      onChange={(e) => onCheckoutChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Enter your full address including county"
                      value={checkoutData.address}
                      onChange={(e) => onCheckoutChange('address', e.target.value)}
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City/Town *</label>
                      <input
                        type="text"
                        required
                        value={checkoutData.city}
                        onChange={(e) => onCheckoutChange('city', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        value={checkoutData.postalCode}
                        onChange={(e) => onCheckoutChange('postalCode', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="order-summary">
                    <h4>Order Summary</h4>
                    <div className="summary-row">
                      <span>Items:</span>
                      <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} products</span>
                    </div>
                    <div className="summary-row">
                      <span>Total Amount:</span>
                      <strong>KES {getCartTotal().toFixed(2)}</strong>
                    </div>
                  </div>
                  <div className="payment-methods">
                    <h4>Select Payment Method</h4>
                    <div className="payment-options">
                      <button 
                        type="button" 
                        className="payment-option mpesa-option"
                        onClick={() => onCheckoutChange('paymentMethod', 'mpesa')}
                      >
                        <i className="fas fa-mobile-alt"></i>
                        <span>M-Pesa</span>
                      </button>
                      <button 
                        type="button" 
                        className="payment-option creditcard-option"
                        onClick={() => onCheckoutChange('paymentMethod', 'creditcard')}
                      >
                        <i className="fas fa-credit-card"></i>
                        <span>Credit Card</span>
                      </button>
                      <button 
                        type="button" 
                        className="payment-option debitcard-option"
                        onClick={() => onCheckoutChange('paymentMethod', 'debitcard')}
                      >
                        <i className="fas fa-credit-card"></i>
                        <span>Debit Card</span>
                      </button>
                      <button 
                        type="button" 
                        className="payment-option cod-option"
                        onClick={() => onCheckoutChange('paymentMethod', 'cod')}
                      >
                        <i className="fas fa-handshake"></i>
                        <span>Cash on Delivery</span>
                      </button>
                    </div>
                    <div className="selected-method">
                      Selected: <strong>{checkoutData.paymentMethod || 'M-Pesa'}</strong>
                    </div>
                  </div>
                  <button type="submit" className="place-order-btn" disabled={paymentLoading}>
                    {paymentLoading ? 'Processing payment...' : `Pay with ${(checkoutData.paymentMethod || 'M-Pesa').charAt(0).toUpperCase() + (checkoutData.paymentMethod || 'M-Pesa').slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}`}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-modal {
          background: white;
          width: 90%;
          max-width: 600px;
          max-height: 85vh;
          border-radius: 20px;
          overflow: hidden;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .cart-header {
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
        }

        .cart-header h2 {
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: white;
        }

        .cart-items {
          padding: 1.5rem;
          max-height: 400px;
          overflow-y: auto;
        }

        .empty-cart {
          text-align: center;
          padding: 2rem;
        }

        .empty-cart i {
          font-size: 4rem;
          color: #c8a05e;
          margin-bottom: 1rem;
        }

        .empty-subtitle {
          color: #999;
          margin-top: 0.5rem;
        }

        .continue-shopping {
          margin-top: 1rem;
          padding: 0.7rem 1.5rem;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
        }

        .cart-item {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 10px;
        }

        .cart-item-details {
          flex: 1;
        }

        .cart-item-details h3 {
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }

        .item-price {
          color: #c8a05e;
          font-weight: 600;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .quantity-controls button {
          width: 25px;
          height: 25px;
          border: 1px solid #ddd;
          background: white;
          cursor: pointer;
          border-radius: 5px;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ff4757;
          cursor: pointer;
        }

        .cart-footer {
          padding: 1.5rem;
          border-top: 1px solid #eee;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .cart-total.total {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 2px solid #eee;
          font-size: 1.2rem;
        }

        .cart-payment-preview {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 0;
          border-top: 1px dashed #eee;
          border-bottom: 1px dashed #eee;
          margin: 1rem 0;
          color: #333;
        }

        .cart-payment-preview strong {
          font-weight: 700;
          color: #c8a05e;
        }

        .cart-payment-options {
          margin-bottom: 1rem;
        }

        .cart-payment-options span {
          display: block;
          margin-bottom: 0.75rem;
          color: #555;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .payment-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .payment-option {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0.85rem 0.95rem;
          background: white;
          color: #333;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .payment-option:hover,
        .payment-option.active {
          border-color: #c8a05e;
          background: #fff9f0;
          color: #c87d1f;
        }

        .cart-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .clear-cart, .checkout-btn {
          flex: 1;
          padding: 0.8rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .clear-cart {
          background: #f0f0f0;
          color: #666;
        }

        .checkout-btn {
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
        }

        .checkout-form {
          padding: 1.5rem;
        }

        .checkout-form h3 {
          margin-bottom: 1.5rem;
          color: #c8a05e;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.3rem;
          color: #333;
          font-weight: 500;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 0.7rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .order-summary {
          background: #faf9f8;
          padding: 1rem;
          border-radius: 10px;
          margin: 1rem 0;
        }

        .order-summary h4 {
          margin-bottom: 0.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .payment-status {
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 1rem;
          font-weight: 600;
          line-height: 1.4;
        }

        .payment-status.success {
          background: #ecf9f1;
          color: #1a7f37;
          border: 1px solid #b2ebc2;
        }

        .payment-status.error {
          background: #fdecea;
          color: #a1201a;
          border: 1px solid #f4b2b2;
        }

        .place-order-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
        }

        .login-prompt {
          padding: 2rem;
          text-align: center;
        }

        .login-prompt i {
          font-size: 3.5rem;
          color: #c8a05e;
          margin-bottom: 1rem;
        }

        .login-prompt h3 {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .login-prompt p {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .prompt-login-btn,
        .prompt-signup-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 0.8rem;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .prompt-login-btn {
          background: transparent;
          color: #c8a05e;
          border: 2px solid #c8a05e;
        }

        .prompt-login-btn:hover {
          background: #c8a05e;
          color: white;
          transform: translateY(-2px);
        }

        .prompt-signup-btn {
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
        }

        .prompt-signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(200, 160, 94, 0.4);
        }

        .payment-methods {
          background: #faf9f8;
          padding: 1rem;
          border-radius: 10px;
          margin: 1rem 0;
        }

        .payment-methods h4 {
          margin-bottom: 1rem;
          color: #333;
        }

        .payment-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .payment-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
          gap: 0.5rem;
        }

        .payment-option i {
          font-size: 1.5rem;
        }

        .payment-option span {
          font-size: 0.85rem;
          font-weight: 600;
          text-align: center;
        }

        .payment-option:hover {
          border-color: #c8a05e;
          background: #fff9f0;
          transform: translateY(-2px);
        }

        .payment-option.mpesa-option {
          color: #00a86b;
        }

        .payment-option.creditcard-option {
          color: #0066cc;
        }

        .payment-option.debitcard-option {
          color: #ff6b6b;
        }

        .payment-option.cod-option {
          color: #c8a05e;
        }

        .selected-method {
          text-align: center;
          font-size: 0.9rem;
          color: #666;
          padding: 0.5rem;
          background: white;
          border-radius: 5px;
        }

        @media (max-width: 600px) {
          .payment-options {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;