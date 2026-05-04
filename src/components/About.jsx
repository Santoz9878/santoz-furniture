import React from 'react';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-image fade-in-left">
          <img src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Craftsmanship" />
          <div className="experience-badge">
            <span>25+</span>
            <p>Years of Excellence</p>
          </div>
        </div>
        <div className="about-content fade-in-right">
          <div className="section-badge">
            <i className="fas fa-info-circle"></i>
            <span>About Us</span>
          </div>
          <h2 className="section-title">Crafting <span>Dream Furniture</span> Since 1995</h2>
          <p className="about-text">
            Santoz Furniture Limited is a premier furniture manufacturer and retailer dedicated to creating exceptional pieces that blend functionality with artistic design. Every piece we create tells a story of dedication, skill, and passion.
          </p>
          
          <div className="features-grid">
            <div className="feature">
              <i className="fas fa-hand-sparkles"></i>
              <h4>Handcrafted Quality</h4>
              <p>Meticulously crafted by skilled artisans</p>
            </div>
            <div className="feature">
              <i className="fas fa-tree"></i>
              <h4>Sustainable Materials</h4>
              <p>Eco-friendly sourcing and production</p>
            </div>
            <div className="feature">
              <i className="fas fa-truck-fast"></i>
              <h4>Free Delivery</h4>
              <p>Nationwide delivery within 7 days</p>
            </div>
            <div className="feature">
              <i className="fas fa-shield-alt"></i>
              <h4>5 Year Warranty</h4>
              <p>Full warranty on all products</p>
            </div>
          </div>
          
          <button className="btn-gold">Learn More About Us</button>
        </div>
      </div>

      <style jsx>{`
        .about {
          padding: 5rem 2rem;
          background: white;
        }

        .about-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .about-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .about-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .experience-badge {
          position: absolute;
          bottom: 30px;
          right: 30px;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          padding: 1rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .experience-badge span {
          font-size: 1.8rem;
          font-weight: 800;
          display: block;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(200, 160, 94, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          margin-bottom: 1rem;
        }

        .section-badge i {
          color: #c8a05e;
        }

        .section-title {
          text-align: left;
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
        }

        .about-text {
          color: #666;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .feature i {
          font-size: 2rem;
          color: #c8a05e;
          margin-bottom: 0.5rem;
        }

        .feature h4 {
          margin-bottom: 0.3rem;
          color: #2c2c2c;
        }

        .feature p {
          color: #666;
          font-size: 0.85rem;
        }

        @media (max-width: 968px) {
          .about-container {
            grid-template-columns: 1fr;
          }

          .section-title {
            text-align: center;
          }

          .section-badge {
            margin: 0 auto 1rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .about-text {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default About;