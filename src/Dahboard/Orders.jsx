import React, { useState, useEffect } from "react";
import { 
  FaUsers, FaShoppingCart, FaCalendarAlt, FaDollarSign, 
  FaTruck, FaTshirt, FaSortNumericUp 
} from "react-icons/fa"; 
import axios from "axios";
import "../Dahboard/DashStyle/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hardcoded token for testing (DO NOT USE IN PRODUCTION)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Q3ZjAxZDBlMmQxNDMwNjgxMDRmYjIiLCJpYXQiOjE3NDIyMDUxMzIsImV4cCI6MTc0MjI5MTUzMn0.3QA41ICaIuKRmOCBEIitfneOWTDakuFtrnWxqzxkCuY";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch orders. Please check your token and API.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">Recent Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <table className="orders-table">
          <thead>
            <tr>
              <th><FaShoppingCart className="table-header-icon" /> Order ID</th>
              <th><FaUsers className="table-header-icon" /> Customer</th>
              <th><FaTshirt className="table-header-icon" /> Item</th>
              <th><FaSortNumericUp className="table-header-icon" /> Quantity</th>
              <th><FaCalendarAlt className="table-header-icon" /> Date</th>
              <th><FaDollarSign className="table-header-icon" /> Amount</th>
              <th><FaTruck className="table-header-icon" /> Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.clothName}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
                <td>{order.status}</td>
                <td>
                  <button className="orders-view-button">View</button>
                  <button className="orders-edit-button">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;
