import React, { useState, useEffect } from 'react';
import "../Dahboard/DashStyle/Customer.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', password: '' });
  const [editCustomer, setEditCustomer] = useState(null);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customers/all');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    if (newCustomer.name && newCustomer.email && newCustomer.password) {
      try {
        const response = await fetch('http://localhost:5000/api/customers/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newCustomer)
        });
        const addedCustomer = await response.json();
        setCustomers([...customers, addedCustomer]);
        setNewCustomer({ name: '', email: '', password: '' });
      } catch (error) {
        console.error('Error adding customer:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/customers/delete/${id}`, { method: 'DELETE' });
      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEdit = (customer) => setEditCustomer({ ...customer });

  const handleUpdateCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/update/${editCustomer.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCustomer)
      });
      const updatedCustomer = await response.json();
      setCustomers(customers.map(customer => (customer.id === updatedCustomer.id ? updatedCustomer : customer)));
      setEditCustomer(null);
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="customers-container">
      <h2>Customers</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => handleEdit(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
      <input type="text" placeholder="Name" value={editCustomer ? editCustomer.name : newCustomer.name} onChange={e => editCustomer ? setEditCustomer({ ...editCustomer, name: e.target.value }) : setNewCustomer({ ...newCustomer, name: e.target.value })} />
      <input type="email" placeholder="Email" value={editCustomer ? editCustomer.email : newCustomer.email} onChange={e => editCustomer ? setEditCustomer({ ...editCustomer, email: e.target.value }) : setNewCustomer({ ...newCustomer, email: e.target.value })} />
      <input type="password" placeholder="Password" value={editCustomer ? editCustomer.password : newCustomer.password} onChange={e => editCustomer ? setEditCustomer({ ...editCustomer, password: e.target.value }) : setNewCustomer({ ...newCustomer, password: e.target.value })} />
      {editCustomer ? (
        <button onClick={handleUpdateCustomer}>Update</button>
      ) : (
        <button onClick={handleAddCustomer}>Add</button>
      )}
    </div>
  );
}

export default Customers;
