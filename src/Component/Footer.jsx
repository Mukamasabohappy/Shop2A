import React from 'react';
import '../Style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CLOTHINGSHOP</h3>
          <p>We're passionate about providing high-quality, fashionable clothing at prices you'll love. Our mission is to empower your unique style and boost your confidence.</p>
          <div className="social-icons">
            <div className="social-icon facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <div className="social-icon instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <div className="social-icon twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5
                 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </div>
            <div className="social-icon pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0a12 12 0 0 0-4.3 23.1c0-.6 0-1.4.2-2 .3-.9 1.7-5.7 1.7-5.7s-.4-.8-.4-2c0-1.9 1.1-3.3 2.5-3.3 1.2 0 1.7.9 1.7 1.9
                 0 1.2-.7 2.9-1.1 4.5-.3 1.3.7 2.3 1.9 2.3 2.3 0 3.9-3 3.9-6.5 0-2.7-1.8-4.6-5-4.6-3.7 0-5.9 2.7-5.9 5.8 0 1.1.3 1.8.8 2.4.2.3.3.4.2.7-.1.3-.2.9-.3 1.1-.1.4-.3.5-.7.3C5.4 16.5 4.6 15 4.6 12.8c0-3.4 2.8-7.4 8.4-7.4 4.5 0 7.4 3.2 7.4 6.7 0 4.6-2.5 8-6.3 8-1.3 0-2.4-.7-2.8-1.5 0 0-.7 2.7-.8 3.2-.3 1-.8 2-1.3 2.8.9.3 1.9.4 3 .4a12 12 0 0 0 12-12 12 12 0 0 0-12-12z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><a href="/men">Men's Collection</a></li>
            <li><a href="/women">Women's Collection</a></li>
            <li><a href="/kids">Kids' Collection</a></li>
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/sale">Sale</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>123 Fashion Street, Style City</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@clothingshop.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CLOTHINGSHOP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;