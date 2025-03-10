import React, { useState } from "react";

function Submit({ totalSum }) {
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
  const [Note, setNote] = useState("");
  const [loading, setLoading] = useState(false); // Track submission status

  const sendData = async () => {
    if (!fullname.trim() || !location.trim() || !phone.trim()) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true); // Disable button during submission

    try {
      const response = await fetch("http://localhost:5000/senddata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ location, phone, fullname,Note, sum: totalSum }),
      });

      const data = await response.json();
      console.log("Server Response:", data.message);

      if (data.message === "please enter data for cart") {
        alert("Please add items to your cart before placing an order.");
      } else {
        alert("Order placed successfully!");
        setLocation("");
        setPhone("");
        setFullname("");
        setNote("");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data. Please try again.");
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        <h3>Place Your Order</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        <hr />
        <input
          type="text"
          placeholder="Location or Restaurant Name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <hr />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <hr />
        <input
          type="text"
          placeholder="Note"
          value={Note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
        <hr />
        <h3>Total Order Price: {totalSum}₪</h3>
        <hr />
        <button
          className="btn btn-primary"
          onClick={sendData}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Submit;
