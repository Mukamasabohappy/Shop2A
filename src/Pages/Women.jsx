import React, { useState, useEffect } from 'react';
import '../Style/Men.css';

const womensClothingData = [
  {
    id: 1,
    name: 'Floral Print Dress',
    price: 59,
    imageUrl: 'https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87054094_99_B.jpg?imwidth=2048&imdensity=1&ts=1734955503851',
    description: 'Elegant floral dress for any occasion.',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 2,
    name: 'Jeans',
    price: 69.50,
    imageUrl: 'https://media.glamour.com/photos/62d5b489f4f18942c1630c01/16:9/w_1920%2Cc_limit/high%2520waisted%2520jeans.jpg',
    description: 'Comfortable and stylish high-waisted jeans.',
    sizes: ['24', '26', '28', '30'],
  },
  {
    id: 3,
    name: 'Striped T-Shirt',
    price: 24,
    imageUrl: 'https://i5.walmartimages.com/seo/Female-T-shirt-Classic-Striped-T-shirt-O-Neck-T-shirt-Long-Sleeve-T-shirt-Loose-Casual-T-Shirt-Wild-Base-Top_bfb617dd-15d2-4cba-8d38-5b74faea0982.36991dcfb7e413eff36ba89bbabaf0d0.jpeg',
    description: 'Classic striped t-shirt for a casual look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Tailored Blazer',
    price: 129.99,
    imageUrl: 'https://www.karl.com/dw/image/v2/BHHT_PRD/on/demandware.static/-/Sites-master-catalog/default/dw377008e8/Assets/A1W14036999_5/hi-res/A1W14036999_5.jpg?sw=575&q=70',
    description: 'Sophisticated tailored blazer for a professional style.',
    sizes: ['4', '6', '8', '10'],
  },
  {
    id: 5,
    name: 'Knit Sweater',
    price: 49.00,
    imageUrl: 'https://i.ebayimg.com/images/g/sVEAAOSwO0Zjn~2h/s-l1200.jpg',
    description: 'Cozy knit sweater for cooler days.',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 6,
    name: 'A-Line Skirt',
    price: 59.00,
    imageUrl: 'https://oliverands.com/community/content/uploads/2015/02/B6182-image-1.jpg',
    description: 'Flattering A-line skirt for any occasion.',
    sizes: ['2', '4', '6', '8'],
  },
  {
    id: 7,
    name: 'Leather Jacket',
    price: 199.00,
    imageUrl: 'https://www.fanjackets.com/wp-content/uploads/2023/04/Women-Tan-Brown-Fitted-Bomber-Leather-Jacket.webp',
    description: 'Edgy leather jacket to complete any outfit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 8,
    name: 'Wide Belt',
    price: 39.00,
    imageUrl: 'https://ae01.alicdn.com/kf/S8e7302cd49f04ca69b64cee88612a1e9X.jpg',
    description: 'Stylish wide belt to accessorize any look.',
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 9,
    name: 'Cargo Pants',
    price: 59.50,
    imageUrl: 'https://down-sg.img.susercontent.com/file/sg-11134201-7rbn6-lmy0e4yt5ya8d0',
    description: 'Durable cargo pants for a casual and functional style.',
    sizes: ['26', '28', '30', '32'],
  },
];

const WomensClothing = () => {
  const [clothingItems] = useState(womensClothingData);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({});
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
          ? { ...cartItem, quantity: cartItem.quantity + (quantity[item.id] || 1) }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, selectedSize: selectedSize, quantity: quantity[item.id] || 1 }]);
    }

    setSelectedSize('');
    setQuantity({ ...quantity, [item.id]: 1 });
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

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity({ ...quantity, [itemId]: newQuantity > 0 ? newQuantity : 1 });
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
    return <div className="loading">Loading Women's Clothing...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="womens-clothing-container">
      <header className="header">
        <h1>Women's New Arrivals</h1>
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
                value={quantity[item.id] || 1}
                min="1"
                onChange={(e) => handleQuantityChange(item.id, e)}
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
                value={quantity[quickViewItem.id] || 1}
                min="1"
                onChange={(e) => handleQuantityChange(quickViewItem.id, e)}
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

            {/* Customer Details Form */}
            <form onSubmit={handleCheckoutSubmit}>
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
              <label>Payment Method:</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>

              <button type="submit">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomensClothing;
