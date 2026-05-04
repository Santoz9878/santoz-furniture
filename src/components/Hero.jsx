import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text fade-in-left">
          <div className="hero-badge">
            <i className="fas fa-gem"></i>
            <span>Since 1995 | Premium Craftsmanship</span>
          </div>
          <h1 className="hero-title">
            Where<br />
            <span className="gold-text">Comfort Meets</span><br />
            Elegance
          </h1>
          <p className="hero-description">
            Experience the finest handcrafted furniture that transforms your house into a home. 
            Santoz Furniture brings you timeless designs, exceptional quality, and unmatched comfort.
          </p>
          <div className="hero-buttons">
            <button className="btn-gold" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Collection <i className="fas fa-arrow-right"></i>
            </button>
            <button className="btn-outline-gold">
              View Catalog <i className="fas fa-download"></i>
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>25+</h3>
              <p>Years Excellence</p>
            </div>
            <div className="stat">
              <h3>10K+</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat">
              <h3>500+</h3>
              <p>Designs</p>
            </div>
          </div>
        </div>
        <div className="hero-image fade-in-right">
          <div className="hero-image-main">
            <img src="https://images.pexels.com/photos/276534/pexels-photo-276534.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Luxury Furniture" />
          </div>
          <div className="floating-card card-1">
            <i className="fas fa-chair"></i>
            <p>Premium Chairs</p>
          </div>
          <div className="floating-card card-2">
            <i className="fas fa-bed"></i>
            <p>Luxury Beds</p>
          </div>
          <div className="floating-card card-3">
            <i className="fas fa-table"></i>
            <p>Designer Tables</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #faf9f8 0%, #f5f2ef 100%);
          padding-top: 80px;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 10% 20%, rgba(200, 160, 94, 0.05) 0%, transparent 50%);
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200, 160, 94, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          margin-bottom: 1.5rem;
        }

        .hero-badge i {
          color: #c8a05e;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          color: #2c2c2c;
        }

        .gold-text {
          color: #c8a05e;
        }

        .hero-description {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
        }

        .stat h3 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #c8a05e;
        }

        .stat p {
          color: #666;
          font-size: 0.9rem;
        }

        .hero-image {
          position: relative;
          min-height: 500px;
        }

        .hero-image-main {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .hero-image-main img {
          width: 100%;
          height: auto;
          display: block;
        }

        .floating-card {
          position: absolute;
          background: white;
          padding: 1rem 1.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: float 3s ease-in-out infinite;
          z-index: 10;
        }

        .floating-card i {
          font-size: 1.5rem;
          color: #c8a05e;
        }

        .card-1 {
          top: 10%;
          left: -20px;
          animation-delay: 0s;
        }

        .card-2 {
          bottom: 15%;
          right: -20px;
          animation-delay: 0.5s;
        }

        .card-3 {
          top: 40%;
          right: -10px;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @media (max-width: 968px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .floating-card {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;