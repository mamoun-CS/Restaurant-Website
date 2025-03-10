const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
  return res.json( {message: "Hello from the Node.js backend!"} );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});