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

  // Add New Item (Optimistic UI Update)
  const handleAddItem = async (event) => {
    event.preventDefault();  // Prevent form from submitting and refreshing page

    if (!newItem.name || !newItem.price) {
      alert("Name and price are required!");
      return;
    }

    // Optimistic Update: add item immediately to UI before sending request
    const tempItem = { ...newItem, _id: Date.now() }; // fake _id for the item
    setInventory((prevInventory) => [...prevInventory, tempItem]);

    try {
      const response = await fetch("http://localhost:5000/api/clothes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) throw new Error("Failed to add item");

      const addedItem = await response.json();
      setInventory((prevInventory) =>
        prevInventory.map((item) => (item._id === tempItem._id ? addedItem : item))
      );
      setNewItem({ name: "", description: "", price: "" });
    } catch (error) {
      console.error("Error adding item:", error);
      // Optionally, remove the item from UI if add fails
      setInventory((prevInventory) => prevInventory.filter((item) => item._id !== tempItem._id));
    }
  };

  // Delete Item (Optimistic UI Update)
  const handleDeleteItem = async (id) => {
    // Optimistic Update: remove item from UI immediately
    setInventory((prevInventory) => prevInventory.filter((item) => item._id !== id));

    try {
      const response = await fetch(`http://localhost:5000/api/clothes/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");
    } catch (error) {
      console.error("Error deleting item:", error);
      // Optionally, re-add the deleted item to UI if delete fails
      fetchInventory(); // Re-fetch the entire inventory if deletion fails
    }
  };

  // Update Item (Optimistic UI Update)
  const handleUpdateItem = async (event) => {
    event.preventDefault();

    if (!updateItem.name || !updateItem.price) {
      alert("Name and price are required!");
      return;
    }

    // Optimistic Update: immediately update the item in UI
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item._id === updateItem._id ? { ...item, ...updateItem } : item
      )
    );

    try {
      const response = await fetch(`http://localhost:5000/api/clothes/update/${updateItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateItem),
      });

      if (!response.ok) throw new Error("Failed to update item");

      const updatedItem = await response.json();
      setInventory((prevInventory) =>
        prevInventory.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      setUpdateItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
      // Optionally, re-fetch inventory if update fails
      fetchInventory();
    }
  };

  // Filter inventory for search functionality
  const filteredInventory = inventory.filter(
    (item) =>
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
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>
                    <button
                      className="inventory-edit-button"
                      onClick={() => setUpdateItem(item)}
                    >
                      Update
                    </button>
                    <button
                      className="inventory-delete-button"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </button>
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
      <form className="inventory-form" onSubmit={handleAddItem}>
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
        <button className="inventory-add-button" type="submit">
          Add
        </button>
      </form>

      {/* Update Item Form */}
      {updateItem && (
        <form className="inventory-form" onSubmit={handleUpdateItem}>
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
          <button className="inventory-add-button" type="submit">
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default Inventory;
