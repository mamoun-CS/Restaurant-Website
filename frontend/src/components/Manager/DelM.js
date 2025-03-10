import React, { useState, useEffect } from "react";

function DelM({ id, fase, onDelete }) { 
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

  const deleteData = (event) => {
    event.stopPropagation();
    
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    // Determine the correct note element based on `fase`
    const noteElement = event.currentTarget.closest(fase === 1 ? ".invoice-card" : ".card");
    if (!noteElement) {
      console.warn("No corresponding note found.");
      return;
    }

    fetch("http://localhost:5000/delete-note", { 
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, fase }), 
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Item removed:", data.message);
          fetchCounter();
          onDelete(id); 
        } else {
          console.error("Error deleting item:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button className="btn btn-danger" onClick={deleteData}>
        Delete Item
      </button>
    </div>
  );
}

export default DelM;
