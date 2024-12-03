import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GetOrders.css';

const GetOrders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track which order is being canceled
  const [cancelReason, setCancelReason] = useState(''); // Track the selected cancel reason

  // List of cancel reasons
  const cancelReasons = ['Change of mind', 'Incorrect item', 'Damaged item', 'Late delivery', 'Other'];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://admin-backend-rl94.onrender.com/api/orders/getorder/${userId}`);
        if (response.data.status) {
          setOrders(response.data.orders);
        } else {
          setError(response.data.message || 'Failed to fetch orders.');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://admin-backend-rl94.onrender.com/api/orders/delete-order/${userId}`, {
        data: { orderId },
      });
      if (response.data.status) {
        // Update the state by removing the deleted order
        setOrders(orders.filter(order => order.orderId !== orderId));
        alert('Order deleted successfully');
      } else {
        alert(response.data.message || 'Failed to delete order');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('An error occurred while deleting the order.');
    }
  };

  // Handle cancel order
  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true); // Open the modal to choose cancel reason
  };

  // Submit cancel order request
  const handleSubmitCancelOrder = async () => {
    if (!cancelReason) {
      alert('Please select a reason to cancel.');
      return;
    }

    try {
      const response = await axios.put(`https://admin-backend-rl94.onrender.com/api/orders/cancel-order-by-user/${userId}`, {
        orderId: selectedOrderId,
        cancelReasons: cancelReason,
      });

      if (response.data.status) {
        // Update the state by removing the canceled order
        setOrders(orders.filter(order => order.orderId !== selectedOrderId));
        alert('Order cancelled successfully');
        setIsModalOpen(false); // Close the modal
      } else {
        alert(response.data.message || 'Failed to cancel order');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('An error occurred while cancelling the order.');
    }
  };

  // Handle invoice download
  const handleDownloadInvoice = (orderId) => {
    // Redirect to the invoice download API endpoint
    window.location.href = `https://admin-backend-rl94.onrender.com/api/orders/download-invoice/${userId}/${orderId}`;
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-details">
              {/* Loop through products and display their details */}
              <div className="order-products">
                {order.order.map((orderItem) => (
                  <div key={orderItem._id} className="order-item">
                    <div className="product-image">
                      <img src={orderItem.product.images[0]} alt={orderItem.product.title} />
                    </div>
                    <div className="product-details">
                      <h2>{orderItem.product.title}</h2>
                      <p>Quantity: {orderItem.quantity}</p>
                      <p>Price: ₹{orderItem.product.price}</p>
                      <p>Order ID: {order.orderId}</p>
                      <p className={`order-status ${order.orderStatus.toLowerCase().replace(/\s+/g, '-')}`}>
                        {order.orderStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Delete Order Button */}
              <button
                onClick={() => handleDeleteOrder(order.orderId)}
                className="delete-order-button"
              >
                Delete Order
              </button>

              {/* Cancel Order Button */}
              <button
                onClick={() => handleCancelOrder(order.orderId)}
                className="cancel-order-button"
              >
                Cancel Order
              </button>

              {/* Download Invoice Button */}
              <button
                onClick={() => handleDownloadInvoice(order.orderId)}
                className="download-invoice-button"
              >
                Download Invoice
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal for cancel order */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h4>Cancel Order</h4>
            <label htmlFor="cancelReason">Select Reason:</label>
            <select
              id="cancelReason"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            >
              <option value="">Select a reason</option>
              {cancelReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <div>
              <button onClick={handleSubmitCancelOrder}>Submit</button>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetOrders;
