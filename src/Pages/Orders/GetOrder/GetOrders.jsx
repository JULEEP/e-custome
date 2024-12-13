import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GetOrders.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import OrderStatusStepper from '../../OrderStepper/OrderStatusStepper';

const GetOrders = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false); // Track Order Modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // Cancel Order Modal
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Track selected order
  const [selectedOrderStatus, setSelectedOrderStatus] = useState([]); // Track selected order's status
  const [cancelReason, setCancelReason] = useState(''); // Track the cancel reason
  const navigate = useNavigate(); // Initialize the navigate function
  

  const cancelReasons = ['Change of mind', 'Incorrect item', 'Damaged item', 'Late delivery', 'Other'];

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://admin-backend-rl94.onrender.com/api/orders/getorder/${userId}`);
        if (response.data.status) {
          setOrders(response.data.orders); // Set orders if fetch is successful
        } else {
          setError(response.data.message || 'Failed to fetch orders.');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchOrders();
  }, [userId]);

    // Handle Track Order - This will navigate to the orderStepper route
    const handleTrackOrder = (orderId) => {
      navigate(`/orderStepper/${orderId}`); // Navigate to the track order route
    };
  

  // Handle Cancel Order
  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true); // Open Cancel Order Modal
  };

  // Submit Cancel Order Request
  const handleSubmitCancelOrder = async () => {
    if (!cancelReason) {
      alert('Please select a reason to cancel.');
      return;
    }

    try {
      const response = await axios.put(`https://admin-backend-rl94.onrender.com/api/orders/cancel-order-by-user/${userId}`, {
        orderId: selectedOrderId,
        cancelReason: cancelReason,
      });

      if (response.data.status) {
        setOrders(orders.filter(order => order.orderId !== selectedOrderId)); // Remove the cancelled order
        alert('Order cancelled successfully');
        setIsCancelModalOpen(false); // Close Cancel Modal
      } else {
        alert(response.data.message || 'Failed to cancel order');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('An error occurred while cancelling the order.');
    }
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://admin-backend-rl94.onrender.com/api/orders/delete-order/${userId}`, {
        data: { orderId },
      });

      if (response.data.status) {
        setOrders(orders.filter(order => order.orderId !== orderId)); // Remove the deleted order
        alert('Order deleted successfully');
      } else {
        alert(response.data.message || 'Failed to delete order');
      }
    } catch (err) {
      console.error('Error deleting order:', err);
      alert('An error occurred while deleting the order.');
    }
  };

  // Handle Download Invoice
  const handleDownloadInvoice = (orderId) => {
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

              {/* Track Order Button */}
              <button
                onClick={() => handleTrackOrder(order.orderId)}
                className="track-order-button"
              >
                Track Order
              </button>

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

      {/* Track Order Modal */}
      <Dialog open={isTrackModalOpen} onClose={() => setIsTrackModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Track Order</DialogTitle>
        <DialogContent>
          <OrderStatusStepper orderStatus={selectedOrderStatus} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTrackModalOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Cancel Order Modal */}
      <Dialog open={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitCancelOrder} color="primary">Submit</Button>
          <Button onClick={() => setIsCancelModalOpen(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetOrders;
