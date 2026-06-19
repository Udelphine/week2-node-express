require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Bonus: log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET / → plain text as required by the assignment
app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

// Serve static HTML page at /home
app.use('/home', express.static(path.join(__dirname, 'public')));

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Both name and email are required.' });
  }
  res.send(`Hello, ${name}!`);
});

app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});