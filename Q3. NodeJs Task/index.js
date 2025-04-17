const express = require('express');
const app = express();
const rateLimiter = require('./middleware/rateLimiter');

app.use('/api/products', rateLimiter);

app.get('/api/products', (req, res) => {
  res.json({ message: "Here are the products!" });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
