import React, { useState, useEffect } from 'react';
import ProductCard from './Productcard';

const Products = ({ addToCart, activeCategory, setActiveCategory }) => {
  const [products] = useState([
    // CHAIRS - All Types
    {
      id: 1,
      name: 'Royal Recliner Chair',
      price: 899,
      originalPrice: 1299,
      description: 'Premium leather recliner with massage function and adjustable headrest',
      category: 'chairs',
      type: 'Recliner',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSODkDfLZVB2gz9JsYgHVKuO8Jw7jCAOyTqfw&s',
      badge: 'Best Seller',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Modern Accent Chair',
      price: 399,
      originalPrice: 599,
      description: 'Elegant accent chair with velvet upholstery and gold legs',
      category: 'chairs',
      type: 'Accent Chair',
      image: 'https://www.lampsplus.com/ideas-and-advice/wp-content/uploads/2018/01/mid-century-modern-accent-chair.jpg',
      badge: 'Trending',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      price: 499,
      originalPrice: 799,
      description: 'High-back mesh office chair with lumbar support and adjustable arms',
      category: 'chairs',
      type: 'Office Chair',
      image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=400',
      badge: '',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Dining Chair (Set of 6)',
      price: 699,
      originalPrice: 999,
      description: 'Modern dining chairs with wooden frame and cushioned seat',
      category: 'chairs',
      type: 'Dining Chair',
      image: 'https://neilanfurniture.com/wp-content/uploads/2025/11/ChatGPT-Image-Nov-24-2025-10_06_13-AM.png',
      badge: 'Sale',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Rocking Chair Classic',
      price: 349,
      originalPrice: 499,
      description: 'Solid wood rocking chair with comfortable cushions',
      category: 'chairs',
      type: 'Rocking Chair',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe5oHw6QTJMfxPqHCh3Ayu-7kPklvNJeO8cQ&s',
      badge: '',
      rating: 4.7
    },
    {
      id: 6,
      name: 'Lounge Chair with Ottoman',
      price: 1299,
      originalPrice: 1699,
      description: 'Luxury lounge chair set with matching ottoman, premium leather',
      category: 'chairs',
      type: 'Lounge Chair',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu92gBMUDsja8UGlWVjc43Iw5OU-pNK-NZpw&s',
      badge: 'Premium',
      rating: 5.0
    },
    {
      id: 7,
      name: 'Bar Stool Chair',
      price: 199,
      originalPrice: 299,
      description: 'Adjustable height bar stool with footrest and swivel feature',
      category: 'chairs',
      type: 'Bar Stool',
      image: 'https://thea2zfurniture.com/cdn/shop/files/cairo-bar-stool-set-of-2-the-a2z-furniture-1-49603.png?v=1776396011&width=2048',
      badge: '',
      rating: 4.5
    },
    {
      id: 8,
      name: 'Gaming Chair Elite',
      price: 599,
      originalPrice: 899,
      description: 'Professional gaming chair with RGB lighting and memory foam',
      category: 'chairs',
      type: 'Gaming Chair',
      image: 'https://cdn.mos.cms.futurecdn.net/qajnp9KGa629KuAYztxsoC-1200-80.jpg',
      badge: 'New',
      rating: 4.9
    },

    // TABLES - All Types
    {
      id: 9,
      name: 'Extending Dining Table',
      price: 1299,
      originalPrice: 1799,
      description: 'Solid oak dining table, seats 8-10 people, extends to 120 inches',
      category: 'tables',
      type: 'Dining Table',
      image: 'https://www.furnitureworld.co.uk/images/products/standard/17589_288807.jpg',
      badge: 'Best Seller',
      rating: 4.8
    },
    {
      id: 10,
      name: 'Coffee Table Modern',
      price: 399,
      originalPrice: 599,
      description: 'Minimalist coffee table with hidden storage compartment',
      category: 'tables',
      type: 'Coffee Table',
      image: 'https://applemall.co.ke/media/products/IMG-20240908-WA0009.jpg',
      badge: '',
      rating: 4.7
    },
    {
      id: 11,
      name: 'Executive Desk',
      price: 899,
      originalPrice: 1299,
      description: 'Large executive desk with built-in cable management',
      category: 'tables',
      type: 'Office Desk',
      image: 'https://gucca.co.ke/wp-content/uploads/2024/10/1199x1199-2024-06-08T225533.444-1.jpg',
      badge: 'Premium',
      rating: 4.9
    },
    {
      id: 12,
      name: 'Round Pedestal Table',
      price: 599,
      originalPrice: 899,
      description: 'Elegant round table for 4, perfect for small spaces',
      category: 'tables',
      type: 'Dining Table',
      image: 'https://scumblegoosie.co.uk/wp-content/uploads/2019/01/DT6-no-chairs.jpg',
      badge: '',
      rating: 4.6
    },
    {
      id: 13,
      name: 'Nest of Tables (Set of 3)',
      price: 299,
      originalPrice: 449,
      description: 'Space-saving nested tables in walnut finish',
      category: 'tables',
      type: 'Side Table',
      image: 'https://dreamhomestore.co.uk/cdn/shop/files/stackora-oak-nesting-tables-lifestyle-sofa-separated.webp?v=1777723813&width=1214',
      badge: 'Sale',
      rating: 4.7
    },

    // BEDS - All Types
    {
      id: 14,
      name: 'King Size Upholstered Bed',
      price: 1599,
      originalPrice: 2199,
      description: 'Luxury king bed with velvet headboard and storage drawers',
      category: 'beds',
      type: 'King Bed',
      image: 'https://m.media-amazon.com/images/I/81E+WjX9QWL.jpg',
      badge: 'Best Seller',
      rating: 4.9
    },
    {
      id: 15,
      name: 'Queen Platform Bed',
      price: 899,
      originalPrice: 1299,
      description: 'Solid wood platform bed with built-in nightstands',
      category: 'beds',
      type: 'Queen Bed',
      image: 'https://m.media-amazon.com/images/I/61nApg2lEiL._AC_UF894,1000_QL80_.jpg',
      badge: '',
      rating: 4.8
    },
    {
      id: 16,
      name: 'Kids Bunk Bed',
      price: 699,
      originalPrice: 999,
      description: 'Space-saving bunk bed with safety rails and ladder',
      category: 'beds',
      type: 'Bunk Bed',
      image: 'https://m.media-amazon.com/images/I/81VkIxN671L._AC_UF894,1000_QL80_.jpg',
      badge: 'Family Choice',
      rating: 4.7
    },
    {
      id: 17,
      name: 'Adjustable Electric Bed',
      price: 2499,
      originalPrice: 3499,
      description: 'Premium adjustable bed with massage and USB ports',
      category: 'beds',
      type: 'Adjustable Bed',
      image: 'https://m.media-amazon.com/images/I/81HoSSDq47L.jpg',
      badge: 'Premium',
      rating: 5.0
    },
    {
      id: 18,
      name: 'Daybed with Trundle',
      price: 799,
      originalPrice: 1199,
      description: 'Versatile daybed with pull-out trundle for guests',
      category: 'beds',
      type: 'Daybed',
      image: 'https://i5.walmartimages.com/seo/Daybed-with-Trundle-Muumblus-Modren-Adult-Pull-Out-Sofa-Bed-for-Bedroom-Living-Room-Full-Size-Black-PU-Leather_fde2fe5c-b983-4298-bb75-af86fcab7639.5f90b9b49d8a0228d136c057bf989753.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
      badge: '',
      rating: 4.6
    },

    // SOFAS
    {
      id: 19,
      name: 'L-Shape Sectional Sofa',
      price: 1899,
      originalPrice: 2599,
      description: 'Large L-shaped sofa with chaise and storage ottoman',
      category: 'sofas',
      type: 'Sectional',
      image: 'https://www.premium-sofas.com/cdn/shop/files/Lifestyle-ChicagoLG-Modern-Fabric_6.jpg?v=1774329000&width=2000',
      badge: 'Best Seller',
      rating: 4.9
    },
    {
      id: 20,
      name: 'Velvet Sofa 3-Seater',
      price: 999,
      originalPrice: 1499,
      description: 'Luxurious velvet sofa in emerald green with gold legs',
      category: 'sofas',
      type: 'Sofa',
      image: 'https://ak1.ostkcdn.com/images/products/is/images/direct/6d0cb8ce89e5697332808a7928b0af2eec84b81c/Mid-century-Button-Tufted-Sofa-with-Metal-Legs%2C-3-seat-Velvet-Upholstered-Sofa-with-Removable-Cushion-for-Living-Room%2C-Apartment.jpg?impolicy=medium',
      badge: 'Trending',
      rating: 4.8
    },
    {
      id: 21,
      name: 'Reclining Sofa Set',
      price: 2199,
      originalPrice: 2999,
      description: 'Power reclining sofa with cup holders and USB ports',
      category: 'sofas',
      type: 'Recliner Sofa',
      image: 'https://image.made-in-china.com/2f0j00zFfbLrpcgouK/Wholesale-Power-Recliner-Sofa-Set-4-Seat-Power-with-Hidden-Socket-USB-Charging-Living-Room-Furniture.webp',
      badge: 'Premium',
      rating: 4.9
    },
    {
      id: 22,
      name: 'Loveseat Sofa',
      price: 499,
      originalPrice: 749,
      description: 'Compact loveseat perfect for apartments',
      category: 'sofas',
      type: 'Loveseat',
      image: 'https://m.media-amazon.com/images/I/71OZFBt68LL._AC_UF894,1000_QL80_.jpg',
      badge: '',
      rating: 4.7
    },

    // Storage/Cabinets
    {
      id: 23,
      name: 'Wooden Wardrobe',
      price: 899,
      originalPrice: 1299,
      description: 'Spacious 3-door wardrobe with mirror',
      category: 'storage',
      type: 'Wardrobe',
      image: 'https://s.alicdn.com/@sc04/kf/H1bbd1a09101646639c0b417e0be9fab81/Bedroom-Wardrobe-Set-3-Door-Sliding-Wardrobe-with-Side-Top-Cabinet-Modern-Wooden-Storage-Wal.png_300x300.jpg',
      badge: '',
      rating: 4.8
    },
    {
      id: 24,
      name: 'Display Cabinet',
      price: 599,
      originalPrice: 899,
      description: 'Glass display cabinet with LED lighting',
      category: 'storage',
      type: 'Cabinet',
      image: 'https://m.media-amazon.com/images/I/81IGxSrPdAL._AC_UF894,1000_QL80_.jpg',
      badge: '',
      rating: 4.6
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('products');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  const categories = [
    { id: 'all', name: 'All Products', icon: 'fa-grid' },
    { id: 'chairs', name: 'Chairs', icon: 'fa-chair' },
    { id: 'tables', name: 'Tables', icon: 'fa-table' },
    { id: 'beds', name: 'Beds', icon: 'fa-bed' },
    { id: 'sofas', name: 'Sofas', icon: 'fa-couch' },
    { id: 'storage', name: 'Storage', icon: 'fa-cabinet-filing' }
  ];

  return (
    <section className="products-section" id="products">
      <div className="products-container">
        <div className="section-header fade-in-up">
          <div className="section-badge">
            <i className="fas fa-store"></i>
            <span>Our Collection</span>
          </div>
          <h2 className="section-title">Discover Our <span>Premium Furniture</span></h2>
          <p className="section-subtitle">Handcrafted with love and attention to every detail</p>
        </div>

        <div className="filter-bar fade-in-up">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <i className={`fas ${cat.icon}`}></i>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className={`products-grid ${isVisible ? 'fade-in-up' : ''}`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .products-section {
          padding: 5rem 2rem;
          background: #faf9f8;
        }

        .products-container {
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

        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.8rem 1.8rem;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #666;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Poppins', sans-serif;
        }

        .filter-btn i {
          font-size: 1rem;
        }

        .filter-btn:hover, .filter-btn.active {
          border-color: #c8a05e;
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(200, 160, 94, 0.3);
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .products-section {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .filter-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.85rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Products;