import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GetOrders.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const GetOrders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [templateImage, setTemplateImage] = useState(null); // State for template image modal
  const navigate = useNavigate();

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

  const handleTrackOrder = (orderId) => {
    navigate(`/orderStepper/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setIsCancelModalOpen(true);
  };

  const handleSubmitCancelOrder = async () => {
    if (!cancelReason) {
      alert('Please select a reason to cancel.');
      return;
    }

    try {
      const response = await axios.put(
        `https://admin-backend-rl94.onrender.com/api/orders/cancel-order-by-user/${userId}`,
        {
          orderId: selectedOrderId,
          cancelReason,
        }
      );

      if (response.data.status) {
        setOrders(orders.filter(order => order.orderId !== selectedOrderId));
        alert('Order cancelled successfully');
        setIsCancelModalOpen(false);
      } else {
        alert(response.data.message || 'Failed to cancel order');
      }
    } catch (err) {
      console.error('Error cancelling order:', err);
      alert('An error occurred while cancelling the order.');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`https://admin-backend-rl94.onrender.com/api/orders/delete-order/${userId}`, {
        data: { orderId },
      });

      if (response.data.status) {
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

  const handleDownloadInvoice = (orderId) => {
    window.location.href = `https://admin-backend-rl94.onrender.com/api/orders/download-invoice/${userId}/${orderId}`;
  };

  const handleViewTemplateImage = (templateImageUrl) => {
    if (templateImageUrl) {
      setTemplateImage(templateImageUrl);
    } else {
      alert('Template image not available.');
    }
  };

  const handleShowOrderDetails = (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    setOrderDetails(order);
  };

  if (loading) return <div>Loading orders...</div>;

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-card">
          {orders.map(order => (
            <div className="order-item" key={order.orderId}>
              <div className="product-info">
                {order.order.map(item => (
                  <div key={item._id}>
                    <img src={item.product.images[0]} alt={item.product.title} />
                    <span>{item.product.title}</span>
                  </div>
                ))}
              </div>
              <div className="actions-container">
                <button onClick={() => handleShowOrderDetails(order.orderId)}>Order Details</button>
                <button onClick={() => handleTrackOrder(order.orderId)}>Track</button>
                <button onClick={() => handleDeleteOrder(order.orderId)}>Delete</button>
                <button onClick={() => handleCancelOrder(order.orderId)}>Cancel</button>
                <button onClick={() => handleDownloadInvoice(order.orderId)}>Invoice</button>
                <button
                  onClick={() => handleViewTemplateImage(order.order[0]?.product.templateImageUrl)}
                >
                  View Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Order Details */}
      {orderDetails && (
        <Dialog open={true} onClose={() => setOrderDetails(null)}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            <div>
              <h3>Product Info</h3>
              {orderDetails.order.map(item => (
                <div key={item._id}>
                  <p><strong>Title:</strong> {item.product.title}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ₹{item.product.price}</p>
                </div>
              ))}
              <p><strong>Status:</strong> {orderDetails.orderStatus}</p>
              <p><strong>Total Amount:</strong> ₹{orderDetails.paymentIntent.amount}</p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOrderDetails(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Modal for Template Image */}
      {templateImage && (
        <Dialog open={true} onClose={() => setTemplateImage(null)}>
          <DialogTitle>Template Image</DialogTitle>
          <DialogContent>
            <img src={templateImage} alt="Template" style={{ width: '100%', borderRadius: '8px' }} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = templateImage;
                link.download = 'template-image.jpg';
                link.click();
              }}
            >
              Download
            </Button>
            <Button onClick={() => setTemplateImage(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Cancel Order Modal */}
      <Dialog open={isCancelModalOpen} onClose={() => setIsCancelModalOpen(false)}>
        <DialogTitle>Cancel Order</DialogTitle>
        <DialogContent>
          <label htmlFor="cancelReason">Reason:</label>
          <select
            id="cancelReason"
            value={cancelReason}
            onChange={e => setCancelReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            {cancelReasons.map(reason => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitCancelOrder}>Submit</Button>
          <Button onClick={() => setIsCancelModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GetOrders;
