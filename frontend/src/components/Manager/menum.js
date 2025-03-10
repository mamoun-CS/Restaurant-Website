import React, { useState, useEffect, useRef } from "react";

function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  function goto(event) {
    console.log('this is new id ',event.target.innerText);
    const name = event.target.innerText;
    // Send data to the backend
    
    fetch("http://localhost:5000/set-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      credentials: "include", 
      
    })
      .then((response) => response.json())
      .then((data) => {
       
        window.location.href = `/search?query=${name}`;
      })
      .catch((error) => console.error("Error:", error));
     
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    
    }
    

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-container" >
      {/* Cart Icon & Badge */}
      <div className="cart-container" onClick={toggleMenu}>
        <img
          id="sale"
          src="https://www.svgrepo.com/show/364827/shopping-cart-fill.svg"
          alt="Shopping Cart"
          className="cart-icon"
        />
        {props.number > 0 && <div className="badge">{props.number}</div>}
      </div>

      {/* Dropdown Menu (Expands to 50% of the screen on mobile) */}
      {isOpen && (
        <div className="menu-bar" ref={menuRef} >
          <ul>
            <li>
              <a href="/sing-out">sing-out</a>
            </li>
            <li>
            <a onClick={goto}> Order </a>
            </li>
            <li>
            <a onClick={goto}> Edit </a>
            </li>
            <li>
            <a onClick={goto}> addorder </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Menu;
