import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <i className="fas fa-crown"></i>
            <span>SANTOZ<span> FURNITURE</span></span>
          </div>
          <p>Creating timeless furniture that transforms houses into homes since 1995.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>
          <a href="#branches">Branches</a>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <a href="#">FAQs</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Returns & Warranty</a>
          <a href="#">Privacy Policy</a>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p><i className="fas fa-phone-alt"></i> +254 123 123 456</p>
          <p><i className="fas fa-envelope"></i> info@santozfurniture.com</p>
          <p><i className="fas fa-map-marker-alt"></i> Nairobi, Kenya</p>
          <div className="newsletter">
            <input type="email" placeholder="Your email" />
            <button><i className="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 SANTOZ FURNITURE LIMITED. All rights reserved.</p>
        <p>Crafted with <i className="fas fa-heart"></i> in Kenya</p>
      </div>

      <style jsx>{`
        .footer {
          background: #1a1a2e;
          color: white;
          padding: 3rem 2rem 1rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .footer-logo i {
          font-size: 1.8rem;
          color: #c8a05e;
        }

        .footer-logo span span {
          color: #c8a05e;
        }

        .footer-section p {
          line-height: 1.6;
          margin-bottom: 1rem;
          color: #aaa;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          background: #c8a05e;
          transform: translateY(-3px);
        }

        .footer-section h4 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          color: #c8a05e;
        }

        .footer-section a {
          display: block;
          color: #aaa;
          text-decoration: none;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #c8a05e;
          transform: translateX(5px);
        }

        .footer-section p i {
          margin-right: 0.5rem;
          color: #c8a05e;
        }

        .newsletter {
          display: flex;
          margin-top: 1rem;
        }

        .newsletter input {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 5px 0 0 5px;
          font-family: 'Poppins', sans-serif;
        }

        .newsletter button {
          padding: 0.5rem 1rem;
          background: #c8a05e;
          border: none;
          border-radius: 0 5px 5px 0;
          cursor: pointer;
          color: white;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid #333;
          color: #aaa;
          display: flex;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-bottom i {
          color: #ff4757;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 2rem 1rem 1rem;
          }

          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .social-links {
            justify-content: center;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;