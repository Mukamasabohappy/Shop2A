import React from "react";
import "../Style/Cart.css";

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="order-btn">Send Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
