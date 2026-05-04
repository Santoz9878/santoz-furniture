import React from 'react';

const Branches = () => {
  const branches = [
    {
      id: 1,
      name: 'Head Office - Nairobi',
      location: 'CBD, Kenyatta Avenue',
      address: 'Santoz Towers, 4th Floor, Nairobi, Kenya',
      phone: '+254 123 123 456',
      email: 'nairobi@santozfurniture.com',
      hours: 'Mon-Sat: 8am - 7pm | Sun: 10am - 4pm',
      icon: 'fa-building',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvgXWIGA0-ZGPiG8S0cEVMJ01IXXbhO28kiw&s'
    },
    {
      id: 2,
      name: 'Mombasa Branch',
      location: 'Mombasa, Nyali',
      address: 'Nyali Center, Suite 12, Mombasa',
      phone: '+254 123 234 567',
      email: 'mombasa@santozfurniture.com',
      hours: 'Mon-Sat: 9am - 8pm | Sun: 10am - 5pm',
      icon: 'fa-umbrella-beach',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrMbSx7z2awL6odyvM6mANs9h9wl5Rlcdpg&s'
    },
    {
      id: 3,
      name: 'Kisumu Branch',
      location: 'Kisumu, Lake Basin',
      address: 'Victoria Mall, 2nd Floor, Kisumu',
      phone: '+254 123 345 678',
      email: 'kisumu@santozfurniture.com',
      hours: 'Mon-Sat: 8am - 6pm | Sun: Closed',
      icon: 'fa-water',
      image: 'https://www.shutterstock.com/image-photo/aerial-view-oil-refinery-chemical-260nw-2596944289.jpg'
    }
  ];

  return (
    <section className="branches" id="branches">
      <div className="branches-container">
        <div className="section-header fade-in-up">
          <div className="section-badge">
            <i className="fas fa-map-marker-alt"></i>
            <span>Our Locations</span>
          </div>
          <h2 className="section-title">Visit Our <span>Showrooms</span></h2>
          <p className="section-subtitle">Experience the quality firsthand at any of our three branches</p>
        </div>

        <div className="branches-grid">
          {branches.map((branch, index) => (
            <div key={branch.id} className="branch-card" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="branch-image">
                <img src={branch.image} alt={branch.name} />
                <div className="branch-icon">
                  <i className={`fas ${branch.icon}`}></i>
                </div>
              </div>
              <div className="branch-info">
                <h3>{branch.name}</h3>
                <p className="branch-location">
                  <i className="fas fa-location-dot"></i> {branch.location}
                </p>
                <p className="branch-address">
                  <i className="fas fa-address-card"></i> {branch.address}
                </p>
                <p className="branch-phone">
                  <i className="fas fa-phone"></i> {branch.phone}
                </p>
                <p className="branch-email">
                  <i className="fas fa-envelope"></i> {branch.email}
                </p>
                <p className="branch-hours">
                  <i className="fas fa-clock"></i> {branch.hours}
                </p>
                <div className="branch-actions">
                  <button className="btn-get-directions">
                    <i className="fas fa-directions"></i> Get Directions
                  </button>
                  <button className="btn-call">
                    <i className="fas fa-phone-alt"></i> Call Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="delivery-info fade-in-up">
          <div className="delivery-card">
            <i className="fas fa-truck-fast"></i>
            <h3>Free Delivery Nationwide</h3>
            <p>We deliver to all counties in Kenya within 3-7 business days</p>
          </div>
          <div className="delivery-card">
            <i className="fas fa-calendar-check"></i>
            <h3>Installation Service</h3>
            <p>Free professional installation for all furniture orders</p>
          </div>
          <div className="delivery-card">
            <i className="fas fa-headset"></i>
            <h3>24/7 Customer Support</h3>
            <p>Call our hotline anytime for assistance</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .branches {
          padding: 5rem 2rem;
          background: white;
        }

        .branches-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
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
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .branches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .branch-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          animation: fadeInUp 0.8s ease-out;
        }

        .branch-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .branch-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .branch-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .branch-card:hover .branch-image img {
          transform: scale(1.1);
        }

        .branch-icon {
          position: absolute;
          bottom: -20px;
          left: 20px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .branch-info {
          padding: 1.5rem;
          padding-top: 2rem;
        }

        .branch-info h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #2c2c2c;
        }

        .branch-info p {
          margin-bottom: 0.5rem;
          color: #666;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .branch-info p i {
          color: #c8a05e;
          width: 20px;
        }

        .branch-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .btn-get-directions, .btn-call {
          flex: 1;
          padding: 0.7rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .btn-get-directions {
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
        }

        .btn-call {
          background: #f0f0f0;
          color: #2c2c2c;
        }

        .btn-get-directions:hover, .btn-call:hover {
          transform: translateY(-2px);
        }

        .delivery-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, #faf9f8 0%, #f5f2ef 100%);
          border-radius: 20px;
        }

        .delivery-card {
          text-align: center;
          padding: 1.5rem;
        }

        .delivery-card i {
          font-size: 2.5rem;
          color: #c8a05e;
          margin-bottom: 1rem;
        }

        .delivery-card h3 {
          margin-bottom: 0.5rem;
          color: #2c2c2c;
        }

        .delivery-card p {
          color: #666;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .branches {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .branches-grid {
            grid-template-columns: 1fr;
          }

          .branch-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
};

export default Branches;