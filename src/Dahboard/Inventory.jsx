import React, { useState, useEffect } from 'react';
import "../Dahboard/DashStyle/Inventory.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({
    name: '', sku: '', category: '', size: '', quantity: '', costPrice: '', sellingPrice: ''
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const initialInventory = [
      { id: 1, name: 'T-Shirt (Red)', sku: 'TS-001-R', category: 'Tops', size: 'M', quantity: 50, costPrice: 8.00, sellingPrice: 19.99 },
      { id: 2, name: 'Jeans (Blue)', sku: 'JN-002-B', category: 'Bottoms', size: '32', quantity: 30, costPrice: 25.00, sellingPrice: 59.99 },
      { id: 3, name: 'Hoodie (Gray)', sku: 'HD-003-G', category: 'Outerwear', size: 'L', quantity: 25, costPrice: 18.00, sellingPrice: 44.99 },
      { id: 4, name: 'Dress (Floral)', sku: 'DR-004-F', category: 'Dresses', size: 'S', quantity: 40, costPrice: 15.00, sellingPrice: 39.99 },
      { id: 5, name: 'Shorts (Khaki)', sku: 'SH-005-K', category: 'Bottoms', size: '34', quantity: 20, costPrice: 12.00, sellingPrice: 29.99 },
      { id: 6, name: 'Sweater (Navy)', sku: 'SW-006-N', category: 'Tops', size: 'M', quantity: 35, costPrice: 20.00, sellingPrice: 49.99 },
      { id: 7, name: 'Skirt (Black)', sku: 'SK-007-BK', category: 'Bottoms', size: '8', quantity: 28, costPrice: 10.00, sellingPrice: 24.99 },
      { id: 8, name: 'Jacket (Denim)', sku: 'JK-008-D', category: 'Outerwear', size: 'L', quantity: 15, costPrice: 30.00, sellingPrice: 69.99 },
      { id: 9, name: 'Blouse (White)', sku: 'BL-009-W', category: 'Tops', size: 'S', quantity: 42, costPrice: 14.00, sellingPrice: 34.99 },
      { id: 10, name: 'Trousers (Gray)', sku: 'TR-010-G', category: 'Bottoms', size: '36', quantity: 22, costPrice: 16.00, sellingPrice: 39.99 }
    ];
    setInventory(initialInventory);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddItem = () => {
    if (newItem.name && newItem.sku) {
      setInventory([...inventory, { ...newItem, id: Date.now(), quantity: Number(newItem.quantity), costPrice: Number(newItem.costPrice), sellingPrice: Number(newItem.sellingPrice) }]);
      setNewItem({ name: '', sku: '', category: '', size: '', quantity: '', costPrice: '', sellingPrice: '' });
    }
  };

  const handleDelete = (id) => setInventory(inventory.filter(item => item.id !== id));

  const handleEdit = (item) => setEditItem({ ...item });

  const handleUpdateItem = () => {
    setInventory(inventory.map(item => (item.id === editItem.id ? editItem : item)));
    setEditItem(null);
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
            <th>SKU</th>
            <th>Category</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.category}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>${item.costPrice.toFixed(2)}</td>
              <td>${item.sellingPrice.toFixed(2)}</td>
              <td>
                <button onClick={() => handleEdit(item)} className="inventory-edit-button">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="inventory-delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{editItem ? 'Edit Item' : 'Add New Item'}</h3>
      <input type="text" placeholder="Name" value={editItem ? editItem.name : newItem.name} onChange={e => editItem ? setEditItem({ ...editItem, name: e.target.value }) : setNewItem({ ...newItem, name: e.target.value })} />
      <input type="text" placeholder="SKU" value={editItem ? editItem.sku : newItem.sku} onChange={e => editItem ? setEditItem({ ...editItem, sku: e.target.value }) : setNewItem({ ...newItem, sku: e.target.value })} />
      <input type="number" placeholder="Quantity" value={editItem ? editItem.quantity : newItem.quantity} onChange={e => editItem ? setEditItem({ ...editItem, quantity: e.target.value }) : setNewItem({ ...newItem, quantity: e.target.value })} />
      <input type="number" placeholder="Cost Price" value={editItem ? editItem.costPrice : newItem.costPrice} onChange={e => editItem ? setEditItem({ ...editItem, costPrice: e.target.value }) : setNewItem({ ...newItem, costPrice: e.target.value })} />
      <input type="number" placeholder="Selling Price" value={editItem ? editItem.sellingPrice : newItem.sellingPrice} onChange={e => editItem ? setEditItem({ ...editItem, sellingPrice: e.target.value }) : setNewItem({ ...newItem, sellingPrice: e.target.value })} />
      {editItem ? (
        <button onClick={handleUpdateItem}>Update</button>
      ) : (
        <button onClick={handleAddItem}>Add</button>
      )}
    </div>
  );
}

export default Inventory;
