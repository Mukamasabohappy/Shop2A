import React, { useState } from 'react';
import '../Style/Home.css';
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.png";
import img7 from "../assets/image7.png";
import img8 from "../assets/image8.png";
import img9 from "../assets/image9.png";
import img10 from "../assets/image12.png";
const products = [
  {
    id: 1,
    name: 'Stylish T-Shirt',
    price: 29.99,
    imageUrl: img1,
    description: "A stylish and comfortable T-Shirt perfect for any occasion.",
  },
  {
    id: 2,
    name: 'Elegant Dress',
    price: 79.99,
    imageUrl: img2,
    description: "An elegant dress designed for special occasions.",
  },
  {
    id: 3,
    name: 'Comfortable Jeans',
    price: 49.99,
    imageUrl: img3,
    description: "Comfortable jeans suitable for casual outings.",
  },
  {
    id: 4,
    name: 'Summer Shorts',
    price: 35.50,
    imageUrl: img4,
  },
  {
    id: 5,
    name: 'Winter Jacket',
    price: 99.99,
    imageUrl: img5,
  },
  {
    id: 6,
    name: 'Oxford shirt',
    price: 59.00,
    imageUrl: img6,
  },
  {
    id: 7,
    name: 'Wool Sweater',
    price: 65.00,
    imageUrl: img7,
  },
  {
    id: 8,
    name: 'Denim Jacket',
    price: 72.50,
    imageUrl: img8,
  },
  {
    id: 9,
    name: 'floral print sundress',
    price: 110.00,
    imageUrl: img9,
  },
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [comments, setComments] = useState({}); // Store comments for each product
  const [newComment, setNewComment] = useState(""); // New comment input

  // Function to add a comment
  const handleAddComment = () => {
    if (selectedProduct && newComment.trim() !== "") {
      setComments((prev) => ({
        ...prev,
        [selectedProduct.id]: [...(prev[selectedProduct.id] || []), newComment],
      }));
      setNewComment(""); // Clear input after adding comment
    }
  };

  return (
    <div className="home-containers">
     <div class="hero">
    <img src=" https://img.freepik.com/free-photo/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-boutique-empty-fashion-showroom-shopping-centre-with-elegant-merchandise_482257-65537.jpg?t=st=1741932661~exp=1741936261~hmac=f8355a0643f1d41f92ff7340d62ec4a1c40c18c51735ed936a7aef24d76d1d90&w=1800" alt="Clothing Store Background"/>
    <div class="text-overlay">
        <h1>Welcome to Our Clothing Store!</h1>
        <p>Discover the latest trends and styles.</p>
    </div>
          </div>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div 
              className="product-card" 
              key={product.id}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
                  >
              <div className="image-container1" onClick={() => setSelectedProduct(product)}>
                <div className="clothing-card1"><img src={product.imageUrl} alt={product.name} /></div>
                {hoveredProduct === product.id && (
                  <button className="quick-view-btn">Quick View</button>
                )}
              </div>
              <div className="clothing-detail"><h3>{product.name}</h3>
              <p>${product.price}</p>
              <button className='cart'>Add to Cart</button></div>
              
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedProduct(null)}>&times;</span>
           <div> <img src={selectedProduct.imageUrl} alt={selectedProduct.name} /></div>
            <div><h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <button>Add to Cart</button></div>
            

            {/* Comments Section */}
            <div className="comments-section">
              <h3>Comments</h3>
              <ul>
                {(comments[selectedProduct.id] || []).map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <input 
                type="text" 
                placeholder="Add a comment..." 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} 
              />
              <button onClick={handleAddComment}>Post Comment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
