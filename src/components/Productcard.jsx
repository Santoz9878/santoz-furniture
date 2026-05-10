import React, { useState } from 'react';

const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <div className={`product-overlay ${isHovered ? 'active' : ''}`}>
          <button className="quick-view">Quick View</button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.type}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'active' : ''}`}></i>
          ))}
          <span>({product.rating})</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="current-price">KES {product.price}</span>
          <span className="original-price">KES {product.originalPrice}</span>
        </div>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          <i className="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          position: relative;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          overflow: hidden;
          height: 280px;
          background: #f5f5f5;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.1);
        }

        .product-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          z-index: 2;
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-overlay.active {
          opacity: 1;
        }

        .quick-view {
          padding: 0.7rem 1.5rem;
          background: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
        }

        .quick-view:hover {
          background: #c8a05e;
          color: white;
          transform: scale(1.05);
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-category {
          color: #c8a05e;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .product-name {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #2c2c2c;
          font-weight: 600;
        }

        .product-rating {
          margin-bottom: 0.5rem;
        }

        .product-rating i {
          font-size: 0.8rem;
        }

        .product-rating .fa-star {
          color: #ddd;
        }

        .product-rating .fa-star.active {
          color: #ffc107;
        }

        .product-rating span {
          color: #666;
          font-size: 0.8rem;
          margin-left: 0.3rem;
        }

        .product-description {
          color: #666;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .product-price {
          margin-bottom: 1rem;
        }

        .current-price {
          font-size: 1.3rem;
          font-weight: 700;
          color: #c8a05e;
        }

        .original-price {
          color: #999;
          text-decoration: line-through;
          margin-left: 0.5rem;
          font-size: 0.9rem;
        }

        .add-to-cart {
          width: 100%;
          padding: 0.8rem;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: 'Poppins', sans-serif;
        }

        .add-to-cart:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(200, 160, 94, 0.4);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;