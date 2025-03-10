import React, { useState } from "react";
import "../../style/styles.css";

function NoteManager({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [priceOne, setPriceOne] = useState("");
  const [priceTwo, setPriceTwo] = useState("");
  const [priceThree, setPriceThree] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || (!priceOne && !priceTwo && !priceThree)) {
      alert("Please fill in all required fields and at least one price!");
      return;
    }

    const newNote = {
      title,
      content,
      img: img || "/img/default-placeholder.png",
      priceOne: Number(priceOne) || 0,
      priceTwo: Number(priceTwo) || 0,
      priceThree: Number(priceThree) || 0,
    };

    try {
      const response = await fetch("http://localhost:5000/add-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Note added successfully!");
        addNote(data.note); // Update UI dynamically
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding note:", error);
      alert("Failed to add note. Please try again.");
    }

    // Clear input fields
    setTitle("");
    setContent("");
    setImg("");
    setPriceOne("");
    setPriceTwo("");
    setPriceThree("");
  };

  return (
    <div className="card-container">     
      <div className="card">
        <h3 className="product-title">Add New Product</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <hr />
          <input
            type="text"
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <hr />
          <input
            type="file"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <hr />
          <input
            type="number"
            placeholder="Large Price (₪)"
            value={priceOne}
            onChange={(e) => setPriceOne(e.target.value)}
          />
          <hr />
          <input
            type="number"
            placeholder="Medium Price (₪)"
            value={priceTwo}
            onChange={(e) => setPriceTwo(e.target.value)}
          />
          <hr />
          <input
            type="number"
            placeholder="Small Price (₪)"
            value={priceThree}
            onChange={(e) => setPriceThree(e.target.value)}
          />
          <hr />
          <button type="submit" className="add-to-cart-btn">Add to Menu</button>
        </form>
      </div>
    </div>
  );
}

export default NoteManager;
