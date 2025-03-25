import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Orders';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/orders`);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
      console.error('Error fetching orders:', err);
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h3>Order #{order._id.substring(0, 8)}</h3>
              <p>Customer: {order.customer.name}</p>
              <p>Total: ${order.totalAmount.toFixed(2)}</p>
              <p>Status: <span className={`status-${order.status}`}>{order.status}</span></p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <button onClick={() => window.location.href = `/orders/${order._id}`}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      <button onClick={fetchOrders}>Refresh Orders</button>
    </div>
  );
};

export default OrdersList;


