import React, { useState } from "react";
import Menu from "./menum";
function Headerman({ number }) {
  return (
    <header>
      <h1>JALTAH</h1>
      <Menu number={number} />
    </header>
  );
}

export default Headerman;
