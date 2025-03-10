import React, { useState, useEffect } from 'react';
function App() {
  const [data, setdata] = useState('');
  useEffect(() => {
    fetch('http://localhost:3000/startorder')
      .then(response => response.text())
      .then(data => setdata(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>{data} fuck React  </h1>
    </div>
  );
}
export default App;