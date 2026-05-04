import React, { useState, useEffect } from 'react';

const Navbar = ({ cartItemCount, onCartClick, currentUser, onAuthClick, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => scrollToSection('home')}>
          <i className="fas fa-crown"></i>
          <span>SANTOZ<span className="logo-highlight"> FURNITURE</span></span>
        </div>

        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>Products</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('branches'); }}>Branches</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
        </div>

        <div className="nav-actions">
          <button className="cart-btn" onClick={onCartClick}>
            <i className="fas fa-shopping-cart"></i>
            {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
          </button>
          
          {currentUser ? (
            <div className="user-menu">
              <span className="user-name">{currentUser.fullName}</span>
              <button className="logout-btn" onClick={onLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={() => onAuthClick('login')}>
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
              <button className="signup-btn" onClick={() => onAuthClick('signup')}>
                <i className="fas fa-user-plus"></i> Sign Up
              </button>
            </div>
          )}
          
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s ease;
          padding: 1rem 0;
        }

        .navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          padding: 0.8rem 0;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.4rem;
          font-weight: 700;
          color: #2c2c2c;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-logo i {
          font-size: 1.8rem;
          color: #c8a05e;
        }

        .logo-highlight {
          color: #c8a05e;
        }

        .nav-menu {
          display: flex;
          gap: 2.5rem;
        }

        .nav-menu a {
          text-decoration: none;
          color: #2c2c2c;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-menu a:hover {
          color: #c8a05e;
        }

        .nav-menu a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          transition: width 0.3s ease;
        }

        .nav-menu a:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .cart-btn {
          position: relative;
          background: none;
          border: none;
          font-size: 1.3rem;
          cursor: pointer;
          color: #2c2c2c;
          transition: transform 0.3s ease;
          padding: 0.5rem;
        }

        .cart-btn:hover {
          transform: scale(1.1);
          color: #c8a05e;
        }

        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .auth-buttons {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .login-btn,
        .signup-btn {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .login-btn {
          background: transparent;
          color: #2c2c2c;
          border: 2px solid #c8a05e;
        }

        .login-btn:hover {
          background: #c8a05e;
          color: white;
          transform: translateY(-2px);
        }

        .signup-btn {
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(200, 160, 94, 0.4);
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-name {
          color: #2c2c2c;
          font-weight: 500;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .logout-btn {
          padding: 0.6rem 1.2rem;
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #2c2c2c;
        }

        @media (max-width: 968px) {
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: left 0.3s ease;
            gap: 2rem;
            z-index: 999;
          }

          .nav-menu.active {
            left: 0;
          }

          .mobile-menu-btn {
            display: block;
          }

          .auth-buttons {
            position: fixed;
            top: 70px;
            right: 20px;
            flex-direction: column;
            gap: 0.5rem;
          }

          .login-btn,
          .signup-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .user-menu {
            position: fixed;
            top: 70px;
            right: 20px;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.5rem;
          }

          .logout-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;