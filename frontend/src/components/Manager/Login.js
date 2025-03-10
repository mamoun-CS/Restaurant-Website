import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/read-session", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setNumber(data.message[1] || 0);
          console.log("Session Loaded:", data.message);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/sing-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.role === "manager") {
          navigate("/manager"); // Redirect to manager page
        } else {
          navigate("/"); // Redirect to user home page
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div>
      <Header number={number} />
      <div className="card-container">
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <hr />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <hr />
            <button type="submit" className="add-to-cart-btn">Login</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
