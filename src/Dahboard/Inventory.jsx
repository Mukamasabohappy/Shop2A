import React, { useState, useEffect } from 'react';
import "../Dahboard/DashStyle/Inventory.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    name: '', description: '', costPrice: ''
  });
  const [editItem, setEditItem] = useState(null);

  // Fetch inventory data from API
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clothes/all');
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = async () => {
    if (newItem.name) {
      try {
        const response = await fetch('http://localhost:5000/api/clothes/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem)
        });
        const addedItem = await response.json();
        setInventory([...inventory, addedItem]);
        setNewItem({ name: '', description: '', costPrice: '' });
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/clothes/delete/${id}`, {
        method: 'DELETE',
      });
      setInventory(inventory.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => setEditItem({ ...item });

  const handleUpdateItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/clothes/update/${editItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editItem)
      });
      const updatedItem = await response.json();
      setInventory(inventory.map(item => (item.id === updatedItem.id ? updatedItem : item)));
      setEditItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
      <div className="inventory-toolbar">
        <input type="text" placeholder="Search inventory..." className="inventory-search" value={searchTerm} onChange={handleSearch} />
      </div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editItem ? 'Edit Item' : 'Add New Item'}</h3>
      <input type="text" placeholder="Name" value={editItem ? editItem.name : newItem.name} onChange={e => editItem ? setEditItem({ ...editItem, name: e.target.value }) : setNewItem({ ...newItem, name: e.target.value })} />
      <input type="text" placeholder="Description" value={editItem ? editItem.description : newItem.description} onChange={e => editItem ? setEditItem({ ...editItem, description: e.target.value }) : setNewItem({ ...newItem, description: e.target.value })} />
      <input type="number" placeholder="Cost Price" value={editItem ? editItem.costPrice : newItem.costPrice} onChange={e => editItem ? setEditItem({ ...editItem, costPrice: e.target.value }) : setNewItem({ ...newItem, costPrice: e.target.value })} />
      {editItem ? (
        <button onClick={handleUpdateItem}>Update</button>
      ) : (
        <button onClick={handleAddItem}>Add</button>
      )}
    </div>
  );
}

export default Inventory;
