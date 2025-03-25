import React, { useState } from 'react';
import '../Style/Kids.css'; // Assuming a CSS file for styling

function KidaClothing() {
  const [cart, setCart] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    paymentMethod: 'credit_card',
  });

  const kidaClothesItems = [
    {
      id: 'kida-shirt-001',
      name: 'Kida Crystal T-Shirt',
      imageUrl: 'https://i.etsystatic.com/10901505/r/il/71906e/5969414424/il_570xN.5969414424_onb1.jpg',
      description: 'A stylish t-shirt featuring Kida and Atlantean crystals.',
      price: 24.99,
      availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
      id: 'kida-hoodie-002',
      name: 'Kida Atlantean Hoodie',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71nc66E4l+L._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg',
      price: 49.99,
      availableSizes: ['S', 'M', 'L', 'XL'],
      },
      {
      id: 'kida-dress-003',
      name: 'Kida Crystal Dress (Youth)',
      imageUrl: 'https://image.made-in-china.com/2f0j00MGsCKBpISAoq/Fancy-Kids-Princess-Dress-Children-Model-Wedding-Baby-Girl-Party-Dress.jpg',
      description: 'Durable and comfortable khaki shorts, perfect for exploring the backyard or imaginary Atlantis!',
      price: 24.99,
      availableSizes: ['XS', 'S', 'M', 'L'],
      },
      {
      id: 'kida-leggings-005',
      name: 'Kida Atlantean Leggings',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_rvmzO5Y1eXM-TpCEPraouvJEhZYnpfZcw&s',
      description: 'Comfortable leggings with intricate Atlantean patterns.',
      price: 29.99,
      availableSizes: ['S', 'M', 'L'],
      },
      {
      id: 'kida-hoodie-006',
      name: 'Kida Atlantean Hoodie (Youth)',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgs02w_ANnqZrkpznAn0vypZQfRrOcluyIOQ&s',
      description: 'Stay warm and stylish in this cozy hoodie featuring intricate Atlantean designs. Perfect for cool evenings.',
      price: 39.99,
      availableSizes: ['S', 'M', 'L', 'XL'],
      }
  ];

  const handleAddToCart = (itemId, size, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.itemId === itemId && item.size === size);

      if (existingItemIndex !== -1) {
        // Item already exists in cart, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Item doesn't exist, add a new item to the cart
        return [...prevCart, { itemId, size, quantity }];
      }
    });
  };

  const handleSizeChange = (itemId, newSize) => {
    setSelectedSizes((prevSizes) => ({ ...prevSizes, [itemId]: newSize }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const removeFromCart = (itemId, size) => {
    setCart(prevCart => prevCart.filter(item => !(item.itemId === itemId && item.size === size)));
  };

  const toggleCartVisibility = () => {
    setShowCart(!showCart);
  };

   const openCheckoutModal = () => {
        setIsCheckoutOpen(true);
        setShowCart(false);
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
        const orderDetails = cart.map(cartItem => {
            const clothingItem = kidaClothesItems.find(item => item.id === cartItem.itemId);
            return `${clothingItem.name} (Size: ${cartItem.size}, Quantity: ${cartItem.quantity}) - $${clothingItem.price * cartItem.quantity}`;
        }).join('\n');

        // Build the detailed order details string
        let detailInfo = `\n`;
        detailInfo += `Full Name: ${formData.fullName}\n`;
        detailInfo += `Phone Number: ${formData.phoneNumber}\n`;
        detailInfo += `Shipping Location: ${formData.location}\n`;
        detailInfo += `Payment Method: ${formData.paymentMethod} (Placeholder - no real payment processing)\n`;
        detailInfo += `\n--- Ordered Items ---\n${orderDetails}\n`;
        detailInfo += `\nTotal: $${calculateTotal()}`;

        // Add the detailInfo to the alert message
        alert(`Order placed successfully!\n ${detailInfo} `);
        console.log({
          customerInfo: formData,
          order: cart.map(item => {
            const clothingItem = kidaClothesItems.find(p => p.id === item.itemId);
            return {
              name: clothingItem.name,
              size: item.size,
              quantity: item.quantity,
              price: clothingItem.price
            };
          })
        });
        setCart([]);
        setIsCheckoutOpen(false);
   };
   const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const clothingItem = kidaClothesItems.find((c) => c.id === item.itemId);
      return total + clothingItem.price * item.quantity;
    }, 0).toFixed(2);
   };
  const renderClothingItem = (item) => {
    const { id, name, imageUrl, description, price, availableSizes } = item;
    const size = selectedSizes[id] || (availableSizes.length > 0 ? availableSizes[0] : '');
    const quantity = selectedQuantities[id] || 1;

    const sizeOptions = availableSizes.map((size) => (
      <option key={size} value={size}>
        {size}
      </option>
    ));

    return (
      <div key={id} className="kida-clothes-item">
        <img src={imageUrl} alt={name} className="kida-clothes-image" />
        <div className="kida-clothes-details">
          <h3 className="kida-clothes-name">{name}</h3>
          <p className="kida-clothes-description">{description}</p>
          <p className="kida-clothes-price">Price: ${price.toFixed(2)}</p>

          <div className="kida-clothes-options">
            <label htmlFor={`size-${id}`}>Size:</label>
            <select
              id={`size-${id}`}
              value={size}
              onChange={(e) => handleSizeChange(id, e.target.value)}
            >
              {sizeOptions}
            </select>

            <label htmlFor={`quantity-${id}`}>Quantity:</label>
            <input
              type="number"
              id={`quantity-${id}`}
              value={quantity}
              min="1"
              onChange={(e) => handleQuantityChange(id, e.target.value)}
            />

            <button className="kida-add-to-cart-button" onClick={() => handleAddToCart(id, size, Number(quantity))}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="kida-clothing-container">
      <header className="kida-clothing-header">
        <h1>Kida's Atlantean Collection</h1>
        <button className="kida-cart-toggle" onClick={toggleCartVisibility}>
          Cart ({cart.length})
        </button>
      </header>

      <div className="kida-clothing-grid">
        {kidaClothesItems.map(renderClothingItem)}
      </div>

      {showCart && (
        <div className="kida-cart-modal"> {/* Changed from kida-cart to kida-cart-modal */}
          <div className="kida-cart-content"> {/* Added a content div for styling */}
              <span className="kida-close-button" onClick={toggleCartVisibility}>×</span>
              <h2>Shopping Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <ul className="kida-cart-items">
                    {cart.map((item) => {
                      const clothingItem = kidaClothesItems.find((c) => c.id === item.itemId);
                      return (
                        <li key={`${item.itemId}-${item.size}`} className="kida-cart-item">
                          <div className="kida-cart-item-details">
                            <img
                              src={clothingItem.imageUrl}
                              alt={clothingItem.name}
                              className="kida-cart-item-image"
                            />
                            <div>
                              <p className="kida-cart-item-name">{clothingItem.name}</p>
                              <p>Size: {item.size}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: ${clothingItem.price * item.quantity}</p>
                            </div>
                          </div>
                          <button className="kida-remove-from-cart" onClick={() => removeFromCart(item.itemId, item.size)}>Remove</button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="kida-cart-total">
                    Total: ${calculateTotal()}
                  </div>
                  <button className="kida-checkout-button" onClick={openCheckoutModal}>Checkout</button>
                </>
              )}
          </div>
        </div>
      )}

          {/* Checkout Modal */}
          {isCheckoutOpen && (
              <div className="kida-checkout-modal">
                  <div className="kida-checkout-content">
                      <span className="kida-close-button" onClick={closeCheckoutModal}>
                          ×
                      </span>
                      <h3>Checkout</h3>

                      {/* Order Summary Display */}
                      <h4>Order Summary</h4>
                     <ul className="kida-cart-items">
                      {cart.map((item) => {
                       const clothingItem = kidaClothesItems.find((c) => c.id === item.itemId);
                       return (
                         <li key={`${item.itemId}-${item.size}`} className="kida-cart-item">
                                        <div className="kida-cart-item-details">
                                            <img
                                                  src={clothingItem.imageUrl}
                                                    alt={clothingItem.name}
                                                  className="kida-cart-item-image"
                                               />
                                        <div>
                                            <p className="kida-cart-item-name">{clothingItem.name}</p>
                                            <p>Size: {item.size}</p>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Price: ${clothingItem.price * item.quantity}</p>
                                        </div>
                                    </div>
                                  <button className="kida-remove-from-cart" onClick={() => removeFromCart(item.itemId, item.size)}>Remove</button>
                           </li>
                          );
                     })}
                     </ul>
                     <div className="kida-cart-total">
                         Total: ${calculateTotal()}
                        </div>

                      <form onSubmit={handleCheckoutSubmit}>
                          <div className="kida-form-group">
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
                          <div className="kida-form-group">
                              <label htmlFor="phoneNumber">Phone Number:</label>
                              <input
                                  type="tel"
                                  id="phoneNumber"
                                  name="phoneNumber"
                                  value={formData.phoneNumber}
                                  onChange={handleInputChange}
                                  required
                              />
                          </div>
                          <div className="kida-form-group">
                              <label htmlFor="location">Shipping Location:</label>
                              <textarea
                                  id="location"
                                  name="location"
                                  value={formData.location}
                                  onChange={handleInputChange}
                                  required
                              />
                          </div>
                          <div className="kida-form-group">
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
                          <button type="submit" className="kida-place-order-button">Place Order</button>
                      </form>
                  </div>
              </div>
          )}
    </div>
  );
}

export default KidaClothing;