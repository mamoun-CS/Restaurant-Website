import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";  
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "./components/App"; // User App
import AppManager from "./components/Manager/AppManager"; // Manager App
import Login from "./components/Manager/Login";
import "./style/styles.css";
import "./style/model.css";


const RootComponent = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/check-role", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setRole(data.role);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching role:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  
  return (
    <Routes>
      
      {role === "manager" && <Route path="/*" element={<Navigate to="/manager" />} />}

      
      {role === "user" && <Route path="/*" element={<Navigate to="/Berger" />} />}

      <Route path="/manager/*" element={<AppManager />} />
      <Route path="/Berger/*" element={<App />} />

   
      <Route path="/login" element={<Login />} />

      
      {role === null && <Route path="/*" element={<Navigate to="/login" />} />}

     
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <RootComponent />
    </Router>
  </React.StrictMode>
);
