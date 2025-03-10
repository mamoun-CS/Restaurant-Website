import React, { useState } from "react";
import DelM from "./DelM.js";
import "../../style/styles.css";

function Note({ round, img, title, content, priceOne, priceTwo, priceThree, chose, increment, flag, updateTotalSum,onClick }) {
  const [visible, setVisible] = useState(true);

  // Ensure prices are valid numbers, default to 0 if undefined
  const largePrice = Number(priceOne) || 0;
  const mediumPrice = Number(priceTwo) || 0;
  const smallPrice = Number(priceThree) || 0;

  // If all prices are 0, don't render the component
  if (!visible || (largePrice === 0 && mediumPrice === 0 && smallPrice === 0)) return null;

  const handleDelete = () => {
    setVisible(false); 
    updateTotalSum(-largePrice, -1);
    updateTotalSum(-mediumPrice, -1);
    updateTotalSum(-smallPrice, -1);
  };

  return (
    <div className="card-container">
      
      <div className="card" onClick={onClick||0}>
        <div className="img-box">
          {img && <img className="product-image" src={img} alt={title} />}
        </div>
        <div className="detail-box">
          <h5 className="product-title">{title}</h5>
          <p className="product-description">{content}</p>

        
          {flag ===2  && (
            <>
              {largePrice > 0 && (
                <>
                  <label className="product-price">Large: {largePrice}₪</label><br />
                 </>
              )}
              {mediumPrice > 0 && (
                <>
                  <label className="product-price">Medium: {mediumPrice}₪</label><br />
                  </>
              )}
              {smallPrice > 0 && (
                <>
                  <label className="product-price">Small: {smallPrice}₪</label><br />
                  </>
              )}
            </>
          )}

          
       
      </div>
      <div className="options">           
      <div onClick={(e) => e.stopPropagation()}> 
                <DelM onDelete={handleDelete} id={round} fase={122} />
              </div>
          </div>
      </div> 
      
    </div>
  );
}

export default Note;
