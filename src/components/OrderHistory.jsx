import React from 'react';

const OrderHistory = ({ orders, onClose }) => {
  return (
    <div className="history-overlay">
      <div className="history-card">
        <div className="history-header">
          <div>
            <h2>Your Order History</h2>
            <p>Review recent orders and payment status.</p>
          </div>
          <button className="close-history" onClick={onClose}>
            Close
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="empty-history">
            <p>No previous orders found yet.</p>
            <p>Add items to your cart and complete a purchase to see order details here.</p>
          </div>
        ) : (
          <div className="history-list">
            {orders.map(order => (
              <div key={order.id} className="history-item">
                <div className="item-top">
                  <div>
                    <strong>Order {order.orderNumber}</strong>
                    <span>{new Date(order.date).toLocaleString()}</span>
                  </div>
                  <span className={`status-badge ${order.status}`}>{order.status}</span>
                </div>
                <div className="item-row">
                  <span>Amount</span>
                  <strong>KES {order.amount}</strong>
                </div>
                <div className="item-row">
                  <span>Phone</span>
                  <strong>{order.phone}</strong>
                </div>
                {order.paymentId && (
                  <div className="item-row">
                    <span>Payment ID</span>
                    <strong>{order.paymentId}</strong>
                  </div>
                )}
                {order.message && (
                  <div className="item-row">
                    <span>Info</span>
                    <strong>{order.message}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .history-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
        }

        .history-card {
          width: min(720px, calc(100% - 40px));
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .history-header h2 {
          margin: 0;
          font-size: 1.9rem;
        }

        .history-header p {
          margin: 0.2rem 0 0;
          color: #666;
        }

        .close-history {
          border: none;
          background: transparent;
          color: #2c2c2c;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          transition: background 0.2s ease;
        }

        .close-history:hover {
          background: #f6f4f1;
        }

        .empty-history {
          padding: 2rem;
          text-align: center;
          border: 1px dashed #ddd;
          border-radius: 18px;
          color: #666;
        }

        .history-list {
          display: grid;
          gap: 1rem;
        }

        .history-item {
          padding: 1.3rem 1.4rem;
          border-radius: 18px;
          border: 1px solid #eee;
          background: #fbfbfa;
        }

        .item-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .item-top strong {
          font-size: 1.05rem;
          color: #2c2c2c;
        }

        .item-top span {
          color: #777;
        }

        .item-row {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.75rem;
          color: #444;
        }

        .status-badge {
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status-badge.processing {
          background: #fff4db;
          color: #a56c0a;
        }

        .status-badge.completed {
          background: #e4f8f0;
          color: #1d7a4b;
        }

        .status-badge.failed {
          background: #fdecea;
          color: #9f1b1b;
        }

        .status-badge.pending {
          background: #f4f4f4;
          color: #5f5f5f;
        }
      `}</style>
    </div>
  );
};

export default OrderHistory;
