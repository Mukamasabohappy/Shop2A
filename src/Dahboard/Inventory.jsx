import React, { useState, useEffect } from "react";
import "../Dahboard/DashStyle/Inventory.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", category: "", photo: "" });
  const [updateItem, setUpdateItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false); 

  useEffect(() => {
    fetchInventory();
  }, []);

  
  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clothes/all");
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      alert("Error fetching inventory: " + error.message);
    }
  };

  
  const handleInputChange = (event, setter) => {
    const { name, value } = event.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new item
  const handleAddItem = async (event) => {
    event.preventDefault();
    const itemToAdd = {
      ...newItem,
      price: newItem.price ? parseFloat(newItem.price) : 0,
      category: newItem.category.charAt(0).toUpperCase() + newItem.category.slice(1).toLowerCase(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/clothes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToAdd),
      });

      if (response.ok) {
        fetchInventory();
        setNewItem({ name: "", description: "", price: "", category: "", photo: "" });
        setAddModalVisible(false); 
      } else {
        alert("Failed to add item");
      }
    } catch (error) {
      alert("Error adding item: " + error.message);
    }
  };

  // Update an existing item
  const handleUpdateItem = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/clothes/update/${updateItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateItem),
      });
      if (response.ok) {
        fetchInventory();
        setModalVisible(false);
      } else {
        alert("Failed to update item");
      }
    } catch (error) {
      alert("Error updating item: " + error.message);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clothes/delete/${id}`, { method: "DELETE" });
      if (response.ok) fetchInventory();
      else alert("Failed to delete item");
    } catch (error) {
      alert("Error deleting item: " + error.message);
    }
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      {/* Add Item Button */}
      <button onClick={() => setAddModalVisible(true)} className="add-item-button">Add New Item</button>

      <div className="large-table">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>{item.category}</td>
                <td><img src={item.photo} alt={item.name} width="50" height="50" /></td>
                <td>
                  <button onClick={() => { setUpdateItem(item); setModalVisible(true); }}>Update</button>
                  <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Item Modal */}
      {addModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Item</h3>
            <form onSubmit={handleAddItem}>
              {Object.keys(newItem).map((key) => (
                <input
                  key={key}
                  type={key === "price" ? "number" : "text"}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={newItem[key]}
                  onChange={(e) => handleInputChange(e, setNewItem)}
                  required
                />
              ))}
              <button type="submit">Add Item</button>
            </form>
            <button onClick={() => setAddModalVisible(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Update Item Modal */}
      {modalVisible && updateItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Update Item</h3>
            <form onSubmit={handleUpdateItem}>
              {Object.keys(updateItem).map((key) => (
                <input
                  key={key}
                  type={key === "price" ? "number" : "text"}
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={updateItem[key]}
                  onChange={(e) => handleInputChange(e, setUpdateItem)}
                  required
                />
              ))}
              <button type="submit">Update Item</button>
            </form>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
