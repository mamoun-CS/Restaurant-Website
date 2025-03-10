import React from "react";
import "../style/styles.css"; //  Ensure styles are imported

function PaymentCard({ img, title, content, price, onAddToCart }) {
  return (
    <div className="card-container">
      <div className="card">
        
        <div className="card-content">
          <h1 className="product-title">{title}</h1>
          <p className="product-description">{content}</p>
          <p className="product-price">${price}</p>

          
          <button className="add-to-cart-btn" onClick={onAddToCart} aria-label="Add to cart">
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
