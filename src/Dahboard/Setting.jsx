import React, { useState } from "react";
import "../Dahboard/DashStyle/Setting.css";

const Settings = () => {
  const [storeName, setStoreName] = useState("My Clothing Store");
  const [logo, setLogo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [shipping, setShipping] = useState("Standard");
  const [notifications, setNotifications] = useState(true);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(URL.createObjectURL(file));
  };

  return (
    <div className="settings-container">
      <h2>Settings & Configuration</h2>

      <div className="settings-section">
        <h3>Store Details & Branding</h3>
        <label>Store Name:</label>
        <input 
          type="text" 
          value={storeName} 
          onChange={(e) => setStoreName(e.target.value)} 
        />
        <label>Upload Logo:</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {logo && <img src={logo} alt="Store Logo" className="logo-preview" />}
      </div>

      <div className="settings-section">
        <h3>Payment & Shipping</h3>
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="PayPal">PayPal</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <label>Shipping Method:</label>
        <select value={shipping} onChange={(e) => setShipping(e.target.value)}>
          <option value="Standard">Standard</option>
          <option value="Express">Express</option>
          <option value="Same Day">Same Day</option>
        </select>
      </div>

      <div className="settings-section">
        <h3>Notification Preferences</h3>
        <label>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
          />
          Receive Notifications
        </label>
      </div>

      <button className="save-button">Save Settings</button>
    </div>
  );
};

export default Settings;
