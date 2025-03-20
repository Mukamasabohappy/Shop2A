import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Component/Loyout";
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Kids from "./Pages/Kids";
import HomeDecor from "./Pages/Homedecor";
import Login from "./Component/Login";
import Cart from "./Pages/Cart";
import Signup from './Component/Signup';

import DashLayout from "./Dahboard/DashLayout";
import DashView from "./Dahboard/DashView";
import Inventory from "./Dahboard/Inventory";
import Dashboard from "./Dahboard/Dashboard";
import Profile from './Dahboard/Profile';
import Orders from './Dahboard/Orders';
import Setting from './Dahboard/Setting';
import Customer from './Dahboard/Customer';
import Analytics from './Dahboard/Analytics';


function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="men" element={<Men addToCart={addToCart} />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="home-decor" element={<HomeDecor />} />
          <Route path="cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<DashLayout />}>
          
          <Route index element={<Dashboard/>}/>  
          <Route path="inventory" element={<Inventory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Setting />} />
          <Route path="Customer" element={<Customer />} />  
          <Route path="Analytics" element={<Analytics/>}/>
           </Route>
      </Routes>
    </Router>
  );
}

export default App;
