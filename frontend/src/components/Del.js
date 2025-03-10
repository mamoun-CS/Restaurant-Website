import React, { useState, useEffect } from "react";

function Del({ round, onDelete }) { 
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = () => {
    fetch("http://localhost:5000/update-session", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: "" }) 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched counter:", data.message);
        setCounter(data.message || 0);
      })
      .catch((error) => console.error("Error fetching counter:", error));
  };

  const deleteData = (buttonElement) => {
    const noteElement = buttonElement.closest(".card");
    if (!noteElement) {
      alert("No corresponding note found.");
      return;
    }

    const name = noteElement.querySelector(".product-title")?.textContent.trim();
   
    if (!name) {
      alert("Note title not found.");
      return;
    }

    fetch("http://localhost:5000/update-session", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }), 
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Item removed: " + data.message);
        fetchCounter(); 
        onDelete(round);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button
        className="btn btn-danger"
        onClick={(event) => deleteData(event.target)}
      >
        Delete Item
      </button>
    </div>
  );
}

export default Del;
