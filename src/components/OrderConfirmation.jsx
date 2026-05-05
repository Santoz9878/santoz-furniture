import React from 'react';

const OrderConfirmation = ({ confirmation, onClose, onViewHistory }) => {
  const formattedDate = confirmation.date ? new Date(confirmation.date).toLocaleString() : 'Just now';

  return (
    <div className="confirmation-overlay">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <h2>Order Confirmed</h2>
          <p>Your M-Pesa payment request has been sent.</p>
        </div>

        <div className="confirmation-details">
          <div>
            <strong>Order Number</strong>
            <span>{confirmation.orderNumber}</span>
          </div>
          <div>
            <strong>Total Amount</strong>
            <span>KES {confirmation.amount}</span>
          </div>
          <div>
            <strong>Phone</strong>
            <span>{confirmation.phone}</span>
          </div>
          <div>
            <strong>Payment Status</strong>
            <span>{confirmation.status}</span>
          </div>
          <div>
            <strong>Received</strong>
            <span>{formattedDate}</span>
          </div>
          {confirmation.paymentId && (
            <div>
              <strong>Payment ID</strong>
              <span>{confirmation.paymentId}</span>
            </div>
          )}
          {confirmation.message && (
            <div>
              <strong>Info</strong>
              <span>{confirmation.message}</span>
            </div>
          )}
        </div>

        <div className="confirmation-actions">
          <button className="secondary-btn" onClick={onViewHistory}>
            View Order History
          </button>
          <button className="primary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .confirmation-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 3000;
        }

        .confirmation-card {
          width: min(520px, calc(100% - 40px));
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18);
          text-align: left;
        }

        .confirmation-header h2 {
          margin: 0;
          font-size: 1.8rem;
          color: #2c2c2c;
        }

        .confirmation-header p {
          margin: 0.5rem 0 1.5rem;
          color: #666;
          line-height: 1.6;
        }

        .confirmation-details {
          display: grid;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .confirmation-details div {
          display: flex;
          justify-content: space-between;
          padding: 0.9rem 1rem;
          border-radius: 14px;
          background: #f9f8f6;
        }

        .confirmation-details strong {
          color: #333;
        }

        .confirmation-details span {
          color: #555;
          max-width: 55%;
          text-align: right;
        }

        .confirmation-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          padding: 0.95rem 1.2rem;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .primary-btn {
          background: linear-gradient(135deg, #c8a05e 0%, #a07840 100%);
          color: white;
        }

        .secondary-btn {
          background: #f3f1ed;
          color: #2c2c2c;
        }

        .primary-btn:hover,
        .secondary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
