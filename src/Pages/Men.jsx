import React, { useState, useEffect } from 'react';
import '../Style/Men.css';

const mensClothingData = [
  {
    id: 1,
    name: 'Slim Fit Linen Shirt',
    price: 49,
    imageUrl: 'https://saintperry.com/cdn/shop/files/slim-fit-linen-shirt-325309.jpg?v=1716519032',
    description: 'Lightweight and breathable.',
    sizes: ['S', 'M', 'L', 'XL'],
    },
    {
    id: 2,
    name: 'Modern Chino Shorts',
    price: 40,
    imageUrl: 'https://bearbottomclothing.com/cdn/shop/files/StretchChinoShort4Pack_954efd33-5621-4ca6-b70e-d9402e9c8999.png?v=1731354124&width=1080',
    description: 'Versatile shorts for a casual look.',
    sizes: ['30', '32', '34', '36'],
    },
    {
    id: 3,
    name: ' T-Shirt',
    price: 35,
    imageUrl: 'https://i.ebayimg.com/00/s/MTYwMFgxMzA4/z/s5MAAOSw3lRcx4qC/$_57.JPG?set_id=8800005007',
    description: 'Classic black and white striped t-shirt. Great for pirate, mime, or retro costumes.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
    id: 4,
    name: 'Premium Wool Blazer',
    price: 30,
    imageUrl: 'https://cdn.shopify.com/s/files/1/0612/5597/5081/files/2_c59d7d63-a6e3-4d65-8feb-7c61b100e89c.jpg?v=1661875846',
    description: 'Timeless blazer adds class to outfit.',
    sizes: ['38R', '40R', '42R', '44R'],
    },
    {
    id: 5,
    name: 'Classic Crew Neck Sweater',
    price: 50,
    imageUrl: 'https://gardenheir.com/cdn/shop/files/Cashmere-Crew-All-3.jpg?v=1729890256&width=1946',
    description: 'Versatile sweater for layering.',
    sizes: ['S', 'M', 'L', 'XL'],
    },
    {
    id: 6,
    name: 'Dark Wash Jeans',
    price: 60,
    imageUrl: 'https://cdn-kdcfl.nitrocdn.com/QrdYURphyxnwJnTyRvoUEFhezMXyKSqk/assets/images/optimized/rev-a4b8d72/www.themodestman.com/wp-content/uploads/2021/02/Dark-wash-jeans-formality.jpg',
    description: 'Versatile jeans for everyday wear.',
    sizes: ['30', '32', '34', '36'],
    },
    {
    id: 7,
    name: 'Leather Motorcycle Jacket',
    price: 70,
    imageUrl: 'https://cdn.hiconsumption.com/wp-content/uploads/2024/04/Best-Motorcycle-Jackets-Tested.jpg',
    description: 'A classic and edgy leather motorcycle jacket. A timeless piece for any wardrobe.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
    id: 8,
    name: 'Rugged Leather Belt',
    price: 52.00,
    imageUrl: 'https://d1w6lranmzyrqf.cloudfront.net/uploads/600/20240521/2a8be945def3a73e632d4b3b4d0f3441.jpeg',
    description: 'A durable and stylish leather belt to complete any outfit.',
    sizes: ['30', '32', '34', '36', '38', '40'],
    },
    {
    id: 9,
    name: 'Camo Cargo Pants',
    price: 65,
    imageUrl: 'https://t3.ftcdn.net/jpg/05/71/53/32/360_F_571533216_ISrKbXi2zDObXZEansYyvkE3kQsgkyyD.jpg',
    description: 'Durable camo cargo pants.  Ideal for military, survivalist, or adventurer costumes.',
    sizes: ['30', '32', '34', '36', '38'],
    }
];

const MensClothing = () => {
  const [clothingItems] = useState(mensClothingData);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    paymentMethod: 'credit_card',
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuickView = (item) => {
    setQuickViewItem(item);
  };

  const closeQuickView = () => {
    setQuickViewItem(null);
  };

  const handleAddToCart = (item) => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const existingCartItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.selectedSize === selectedSize
    );

    if (existingCartItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id && cartItem.selectedSize === selectedSize
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, selectedSize: selectedSize, quantity: quantity }]);
    }

    setSelectedSize('');
    setQuantity(1);
    alert(`${item.name} (Size: ${selectedSize}) added to cart!`);

    if (quickViewItem) {
      closeQuickView();
    }
  };

  const handleRemoveFromCart = (itemId, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === itemId && item.selectedSize === size)
    );
    setCart(updatedCart);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const openCartModal = () => {
    setIsCartOpen(true);
  };

  const closeCartModal = () => {
    setIsCartOpen(false);
  };

  const openCheckoutModal = () => {
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const closeCheckoutModal = () => {
    setIsCheckoutOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

     // Format order details for alert/console
    const orderDetails = cart.map(cartItem => {
      const clothingItem = clothingItems.find(item => item.id === cartItem.id);
      return `${clothingItem.name} (Size: ${cartItem.selectedSize}, Quantity: ${cartItem.quantity})`;
    }).join('\n');

    alert(`Order placed successfully!\n${orderDetails}\n\nName: ${formData.fullName}\nPhone: ${formData.phoneNumber}\nLocation: ${formData.location}\nPayment: ${formData.paymentMethod} (Placeholder - no real payment processing)`);

    console.log({
      customerInfo: formData,
      order: cart.map(item => {
        const clothingItem = clothingItems.find(p => p.id === item.id);
        return {
          name: clothingItem.name,
          size: item.selectedSize,
          quantity: item.quantity,
          price: clothingItem.price
        };
      })
    });

    setCart([]);
    setIsCheckoutOpen(false);
  };

  if (isLoading) {
    return <div className="loading">Loading Men's Clothing...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="mens-clothing-container">
      <header className="header">
        <h1>Men's New Arrivals</h1>
        <button className="cart-button" onClick={openCartModal}>
          View Cart ({cart.length})
        </button>
      </header>

      <div className="clothing-grid">
        {clothingItems.map((item) => (
          <div className="clothing-card" key={item.id}>
            <div className="image-container">
              <img src={item.imageUrl} alt={item.name} />
              <button className="quick-view-button" onClick={() => handleQuickView(item)}>
                Quick View
              </button>
            </div>
            <h2>{item.name}</h2>
            <p className="price">${item.price.toFixed(2)}</p>
            <p className="description">{item.description}</p>
            <div className="size-options">
              {item.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="quantity-selector">
              <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </div>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {quickViewItem && (
        <div className="quick-view-modal">
          <div className="quick-view-content">
            <span className="close-button" onClick={closeQuickView}>
              ×
            </span>
            <img src={quickViewItem.imageUrl} alt={quickViewItem.name} />
            <h2>{quickViewItem.name}</h2>
            <p className="price">${quickViewItem.price.toFixed(2)}</p>
            <p className="description">{quickViewItem.description}</p>
            <div className="size-options">
              {quickViewItem.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="quantity-selector">
              <label htmlFor={`quantity-${quickViewItem.id}`}>Quantity:</label>
              <input
                type="number"
                id={`quantity-${quickViewItem.id}`}
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </div>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(quickViewItem)}>Add to Cart</button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <span className="close-button" onClick={closeCartModal}>
              ×
            </span>
            <h3>Shopping Cart</h3>
            <ul>
              {cart.map((cartItem) => (
                <li key={`${cartItem.id}-${cartItem.selectedSize}`}>
                  {cartItem.name} (Size: {cartItem.selectedSize}, Quantity: {cartItem.quantity}) - ${cartItem.price.toFixed(2)} each
                  <button onClick={() => handleRemoveFromCart(cartItem.id, cartItem.selectedSize)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total: ${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</p>
            <button onClick={openCheckoutModal}>Checkout</button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="checkout-modal checkout-content-container">
          <div className="checkout-modal-content">
            <span className="close-button" onClick={closeCheckoutModal}>
              ×
            </span>
            <h3>Checkout</h3>

             {/* Order Summary Display */}
             <h4>Order Summary:</h4>
            <ul>
              {cart.map((cartItem) => {
                const clothingItem = clothingItems.find(item => item.id === cartItem.id);
                return (
                  <li key={`${cartItem.id}-${cartItem.selectedSize}`}>
                      <img src={clothingItem.imageUrl} alt={clothingItem.name} style={{ width: '50px', height: '50px', marginRight: '10px', verticalAlign: 'middle' }} />
                      {clothingItem.name} (Size: {cartItem.selectedSize}, Quantity: {cartItem.quantity}) - ${clothingItem.price.toFixed(2)} each
                  </li>
                );
              })}
            </ul>
            <p>Total: ${cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</p>

            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"  // Use tel type for phone numbers
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Shipping Location:</label>
                <textarea
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="mobile_money">Mobile Money (Momo)</option>
                </select>
              </div>
              <button type="submit">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default MensClothing;
// import React, { useState, useEffect } from 'react';

// const MensClothing = () => {
//   const [clothingItems, setClothingItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [cart, setCart] = useState([]); // State to hold items in the cart

//   // Fetch clothing items from backend
//   useEffect(() => {
//     fetch('http://localhost:5000/api/clothes/all')
//       .then((response) => response.json())
//       .then((data) => {
//         const menClothingItems = data.filter((item) => item.category === 'Men');
//         setClothingItems(menClothingItems);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         setError('Failed to load data');
//         setIsLoading(false);
//       });
//   }, []);

//   // Handle adding item to cart
//   const handleAddToCart = (item) => {
//     setCart((prevCart) => {
//       const itemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
//       if (itemIndex === -1) {
//         return [...prevCart, { ...item, quantity: 1 }];
//       } else {
//         const updatedCart = [...prevCart];
//         updatedCart[itemIndex].quantity += 1;
//         return updatedCart;
//       }
//     });
//   };

//   // Handle placing an order (simple log for now)
//   const handlePlaceOrder = () => {
//     if (cart.length === 0) {
//       alert('Your cart is empty!');
//       return;
//     }

//     // Send the cart data to the backend (e.g., POST request to create an order)
//     fetch('http://localhost:5000/api/orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ items: cart }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         alert('Order placed successfully!');
//         setCart([]); // Clear the cart after placing the order
//       })
//       .catch((err) => {
//         alert('Failed to place order');
//       });
//   };

//   // Handle loading and error states
//   if (isLoading) {
//     return <div>Loading Men's Clothing...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="mens-clothing-container">
//       <h1>Men's Clothing</h1>
//       <div className="clothing-grid">
//         {clothingItems.length > 0 ? (
//           clothingItems.map((item) => (
//             <div key={item.id} className="clothing-card">
//               <div className="image-container">
//                 <img src={item.imageUrl} alt={item.name} />
//               </div>
//               <h2>{item.name}</h2>
//               <p className="price">${item.price.toFixed(2)}</p>
//               <p className="description">{item.description}</p>
//               <div className="size-options">
//                 {item.sizes && item.sizes.map((size) => (
//                   <button key={size} className="size-button">
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
//                 Add to Cart
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No men's clothing items available.</p>
//         )}
//       </div>

//       {/* Display Cart */}
//       <div className="cart">
//         <h2>Shopping Cart</h2>
//         {cart.length === 0 ? (
//           <p>Your cart is empty</p>
//         ) : (
//           <div>
//             <ul>
//               {cart.map((item, index) => (
//                 <li key={index}>
//                   {item.name} x {item.quantity} - ${item.price * item.quantity}
//                 </li>
//               ))}
//             </ul>
//             <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
//             <button className="place-order-button" onClick={handlePlaceOrder}>
//               Place Order
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MensClothing;
