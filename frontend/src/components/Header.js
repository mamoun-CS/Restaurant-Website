import React, { useState } from "react";
import Menu from "./menu";
function Header({ number }) {
  return (
    <header>
      
      <h1>JALTAH</h1>
      <Menu number={number} />
    </header>
  );
}

export default Header;
