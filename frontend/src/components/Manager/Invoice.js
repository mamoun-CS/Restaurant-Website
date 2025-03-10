import React, { useEffect, useState } from "react";
import "../../style/styles.css";
import DelM from "./DelM";

function Invoices() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-orders");
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading invoices...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!orders.length) return <p>No invoices found.</p>;

  return (
    <div className="invoice-container">
      <h1>All Invoices</h1>
      <h2>Total Orders: {orders.length}</h2> 
     <div >
      {orders.map((order) => (
        <div key={order.orderId} className="invoice-card">
          <h3>Invoice #{order.orderId}</h3>
          <p><strong>Name:</strong> {order.customer_name}</p>
          <p><strong>Location:</strong> {order.location}</p>
          <p><strong>Phone:</strong> {order.phone}</p>

          <h4>Order Details:</h4>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Size</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.quantity}</td>
                  <td>{item.size}</td>
                  <td>{item.item_name}</td>    
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: {order.totalOrder}₪</h3>
          

          <DelM onDelete={() => setOrders(orders.filter(o => o.orderId !== order.orderId))} id={order.orderId} fase={1} />
        </div>
      ))}</div>
    </div>
  );
}

export default Invoices;
