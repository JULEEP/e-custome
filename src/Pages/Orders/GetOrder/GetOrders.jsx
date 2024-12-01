import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GetOrders.css';

const orderSteps = ['Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
const icons = ['📦', '🚚', '📍', '✅']; // Placeholder icons for steps

const GetOrders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const getStepIndex = (status) => {
    const index = orderSteps.indexOf(status);
    return index === -1 ? 0 : index;
  };

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          const currentStep = getStepIndex(order.orderStatus);
          return (
            <div key={order.orderId} className="order-card">
              <div className="order-image">
                <img src={order.order[0].product.images[0]} alt={order.order[0].product.title} />
              </div>
              <div className="order-details">
                <h3>Order ID: {order.orderId}</h3>
                <p>{order.title}</p>
                <p>Delivery ETA: {order.deliveredIn || 'N/A'}</p>
                <div className="order-status">
                  <div className="stepper-container">
                    <div className="stepper-line" />
                    {orderSteps.map((step, index) => (
                      <div
                        key={step}
                        className={`stepper-step ${index <= currentStep ? 'completed' : ''}`}
                      >
                        <div className="step-icon">{icons[index]}</div>
                        <div className="step-label">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default GetOrders;
