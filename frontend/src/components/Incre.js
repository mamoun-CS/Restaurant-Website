import React, { useState, useEffect } from "react";

function Incre({ rd, price, updateTotalSum }) {  
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (rd) {
            fetchCounter();
        }
    }, [rd]);

    const fetchCounter = async () => {
        try {
            const response = await fetch(`http://localhost:5000/order?id=${rd}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
           
            const data = await response.json();
            
            console.log(`Fetched counter for ${rd}:`, data.message);
            const initialCount = data.message || 0;
            setCount(initialCount);
            updateTotalSum(price * initialCount , 0.5);
        } catch (error) {
            console.error("Error fetching counter:", error);
        }
    };

    const updateCounter = async (newCount) => {
        if (!rd) return;
        try {
            await fetch("http://localhost:5000/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: rd, count: newCount }), 
            });
        } catch (error) {
            console.error("Error updating counter:", error);
        }
    };
      
    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        updateCounter(newCount);
        updateTotalSum(price, 1);  
    };

    const handleDecrement = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            updateCounter(newCount);
            updateTotalSum(-price, 1);  
        }
    };

    return (
        <div className="btn-group">
            <button className="increment-btn butt" onClick={handleIncrement}>
                <span className="material-symbols-outlined">add</span>
            </button>

            <p id={rd} className="pp">{count}</p>

            <button className="decrement-btn butt" onClick={handleDecrement}>
                <span className="material-symbols-outlined">remove</span>
            </button>
        </div>
    );
}

export default Incre;
