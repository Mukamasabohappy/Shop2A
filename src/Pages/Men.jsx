import React, { useState, useEffect } from 'react';
import '../Style/Men.css';

const mensClothingData = [
  {
    id: 1,
    name: 'Slim Fit Linen Shirt',
    price: 49.99,
    imageUrl: 'https://saintperry.com/cdn/shop/files/slim-fit-linen-shirt-325309.jpg?v=1716519032',
    description: 'Lightweight and breathable.',
    sizes: ['S', 'M', 'L', 'XL'],
    },
    {
    id: 2,
    name: 'Modern Chino Shorts',
    price: 39.50,
    imageUrl: 'https://bearbottomclothing.com/cdn/shop/files/StretchChinoShort4Pack_954efd33-5621-4ca6-b70e-d9402e9c8999.png?v=1731354124&width=1080',
    description: 'Versatile shorts for a casual look.',
    sizes: ['30', '32', '34', '36'],
    },
    {
    id: 3,
    name: ' T-Shirt',
    price: 34.99,
    imageUrl: 'data:image/jpeg;base64,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',
    description: 'Classic black and white striped t-shirt. Great for pirate, mime, or retro costumes.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
    id: 4,
    name: 'Premium Wool Blazer',
    price: 199.99,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDHxUS-qEOkYa6RV6twp0sTmBS-3nbKkEKQ&s',
    description: 'Timeless blazer adds class to outfit.',
    sizes: ['38R', '40R', '42R', '44R'],
    },
    {
    id: 5,
    name: 'Classic Crew Neck Sweater',
    price: 59.00,
    imageUrl: 'https://gardenheir.com/cdn/shop/files/Cashmere-Crew-All-3.jpg?v=1729890256&width=1946',
    description: 'Versatile sweater for layering.',
    sizes: ['S', 'M', 'L', 'XL'],
    },
    {
    id: 6,
    name: 'Dark Wash Jeans',
    price: 79.00,
    imageUrl: 'data:image/jpeg;base64,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',
    description: 'Versatile jeans for everyday wear.',
    sizes: ['30', '32', '34', '36'],
    },
    {
    id: 7,
    name: 'Leather Motorcycle Jacket',
    price: 279.00,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjomBgWjldefQXNPO-SFXaO12OghIbqBcnWQ&s',
    description: 'A classic and edgy leather motorcycle jacket. A timeless piece for any wardrobe.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
    id: 8,
    name: 'Rugged Leather Belt',
    price: 52.00,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtcpvL7Qp3MO86U7D_n1CD2YBxgEIfbWvTBA&s',
    description: 'A durable and stylish leather belt to complete any outfit.',
    sizes: ['30', '32', '34', '36', '38', '40'],
    },
    {
    id: 9,
    name: 'Camo Cargo Pants',
    price: 69.50,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIGdbVbUPfJIPxfTeNfbzAx9gyjlznM8Q4rQ&s',
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