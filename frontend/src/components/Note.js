import React, { useState } from "react";
import Btn from "./button";
import Del from "./Del.js";
import Incr from "./Incre.js";
import "../style/styles.css";

function Note({ round, img, title, content, priceOne, priceTwo, priceThree, chose, increment, flag, updateTotalSum=0 }) {
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
      <div className="card">
        <div className="img-box">
          {img && <img className="product-image" src={img} alt={title} />}
        </div>
        <div className="detail-box">
          <h5 className="product-title">{title}</h5>
          <p className="product-description">{content}</p>

          {flag && (
            <>
              {largePrice > 0 && (
                <>
                  <label className="product-price">Large: {largePrice}₪</label><br />
                  <Incr rd={`L ${title}${round}`} price={largePrice} updateTotalSum={updateTotalSum} /><br />
                </>
              )}
              {mediumPrice > 0 && (
                <>
                  <label className="product-price">Medium: {mediumPrice}₪</label><br />
                  <Incr rd={`M ${title}${round}`} price={mediumPrice} updateTotalSum={updateTotalSum} /><br />
                </>
              )}
              {smallPrice > 0 && (
                <>
                  <label className="product-price">Small: {smallPrice}₪</label><br />
                  <Incr rd={`S ${title}${round}`} price={smallPrice} updateTotalSum={updateTotalSum} />
                </>
              )}
            </>
          )}

          <div className="options">
            {chose ? (
              <Del onDelete={handleDelete} />
            ) : (
              <Btn round={round} name="Add to Cart" increment={increment} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;
