import React, { useState, useEffect } from "react";
import "../Dahboard/DashStyle/Inventory.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "" });
  const [updateItem, setUpdateItem] = useState(null);

  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clothes/all");
      if (!response.ok) throw new Error("Failed to fetch inventory");
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // Add New Item (Real-Time Update in Table & Database)
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) {
      alert("Name and price are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/clothes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Failed to add item");
      const addedItem = await response.json();

      // Optimistically add the new item to the inventory table without re-fetching
      setInventory((prevInventory) => [...prevInventory, addedItem]);

      // Clear form after adding
      setNewItem({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Delete Item (Real-Time Update in Table & Database)
  const handleDeleteItem = async (id) => {
    console.log("Deleting item with ID:", id); // Debug log for deleting
    try {
      const response = await fetch(`http://localhost:5000/api/clothes/delete/id`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      // Optimistically update inventory state by removing the deleted item
      setInventory((prevInventory) => prevInventory.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Update Item (Real-Time Update in Table & Database)
  const handleUpdateItem = async () => {
    if (!updateItem.name || !updateItem.price) {
      alert("Name and price are required!");
      return;
    }

    console.log("Updating item with ID:", updateItem.id); // Debug log for updating
    try {
      const response = await fetch(`http://localhost:5000/api/clothes/update/id`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateItem),
      });

      if (!response.ok) throw new Error("Failed to update item");
      const updatedItem = await response.json();

      // Replace the old item with the updated item in the inventory state
      setInventory((prevInventory) =>
        prevInventory.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );
      setUpdateItem(null); // Clear update form
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Search functionality
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>

      {/* Search Bar */}
      <div className="inventory-toolbar">
        <input
          type="text"
          placeholder="Search inventory..."
          className="inventory-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => setUpdateItem(item)}>Update</button>
                    <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Item Form */}
      <div className="inventory-form">
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <button className="inventory-add-button" onClick={handleAddItem}>
          Add
        </button>
      </div>

      {/* Update Item Form */}
      {updateItem && (
        <div className="inventory-form">
          <h3>Update Item</h3>
          <input
            type="text"
            value={updateItem.name}
            onChange={(e) => setUpdateItem({ ...updateItem, name: e.target.value })}
          />
          <input
            type="text"
            value={updateItem.description}
            onChange={(e) => setUpdateItem({ ...updateItem, description: e.target.value })}
          />
          <input
            type="number"
            value={updateItem.price}
            onChange={(e) => setUpdateItem({ ...updateItem, price: e.target.value })}
          />
          <button className="inventory-add-button" onClick={handleUpdateItem}>
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default Inventory;
