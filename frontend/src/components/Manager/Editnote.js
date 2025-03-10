import React, { useState, useEffect, useRef } from "react";
import "../../style/styles.css";

function Editnote({ selectedNote, updateNote }) {
    const [img, setimg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price_one, setPriceOne] = useState("");
  const [price_two, setPriceTwo] = useState("");
  const [price_three, setPriceThree] = useState("");
  const fileInputRef = useRef(null); // 🔹 Use useRef for file input

  // Prefill form when editing an existing note
  useEffect(() => {
    if (selectedNote) {
      //alert("this is new data" , selectedNote.img);
        setimg(selectedNote.img || "/img/main.jpg");
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
      setPriceOne(selectedNote.price_one || "");
      setPriceTwo(selectedNote.price_two || "");
      setPriceThree(selectedNote.price_three || "");

    }
  }, [selectedNote]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setimg(URL.createObjectURL(e.target.files[0]));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || (!price_one && !price_two && !price_three)) {
      alert("Please fill in all required fields and at least one price!");
      return;
    }
   
    const formData = new FormData();
    formData.append("id", selectedNote.id);
    formData.append("img", img);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("price_one", Number(price_one) || 0);
    formData.append("price_two", Number(price_two) || 0);
    formData.append("price_three", Number(price_three) || 0);

    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]); 
    }

    try {
      const response = await fetch("http://localhost:5000/update-note", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Note updated successfully!");
        updateNote({ id: selectedNote.id, title, content, price_one, price_two, price_three });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      alert("Failed to update note. Please try again.");
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h3 className="product-title">Edit Product</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <hr />
          <input type="text" placeholder="Description" value={content} onChange={(e) => setContent(e.target.value)} required />
          <hr />
          {img && <img className="product-image" src={img} alt={title} />}
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
          <hr />
          <input type="number" placeholder="Large Price (₪)" value={price_one} onChange={(e) => setPriceOne(e.target.value)} />
          <hr />
          <input type="number" placeholder="Medium Price (₪)" value={price_two} onChange={(e) => setPriceTwo(e.target.value)} />
          <hr />
          <input type="number" placeholder="Small Price (₪)" value={price_three} onChange={(e) => setPriceThree(e.target.value)} />
          <hr />
          <button type="submit" className="add-to-cart-btn">Update Note</button>
        </form>
      </div>
    </div>
  );
}

export default Editnote;
