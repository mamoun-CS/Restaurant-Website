import React, { useState, useEffect } from "react";
import notes from "../notes";

function Btn({ increment }) {
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      const response = await fetch("http://localhost:5000/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setCounter(data.message || 0);
    } catch (error) {
      console.error("Error fetching counter:", error);
    }
  };

  const setdata = async (buttonElement) => {
    try {
      const noteElement = buttonElement.closest(".card-container");
      if (!noteElement) {
        alert("No corresponding note found.");
        return;
      }

      const name = noteElement.querySelector(".product-title")?.textContent.trim();
      const note = notes.find((x) => x.title === name);
      
      if (!note) {
        alert("Note title not found.");
        return;
      }

      const response = await fetch("http://localhost:5000/set-note-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, number: note.key }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Added to session:", data);

      fetchCounter();
      setIsActive(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = async (event) => {
    if (isActive) return;

    if (increment) {
      increment();
      await setdata(event.target);
    }
  };

  return (
    <div className="d-grid gap-2 col-6 mx-auto">
      <button
        className={`add-to-cart ${isActive ? "active" : ""} btn btn-primary`}
        onClick={handleClick}
      >
        {isActive ? "Done" : "Add to Cart"}
      </button>
    </div>
  );
}

export default Btn;
