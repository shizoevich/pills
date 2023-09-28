const express = require('express');

const userRouter = require('./routes');
const path = require('path');
const db = require('./db');

const port = process.env.PORT || 8080;

// Підключення до бази даних
db.connect();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname))); 


app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
  // Serve the edit-medicines.html file
  res.sendFile(__dirname + '/dashboard.html');
});

app.get('/edit-medicines', (req, res) => {
  // Serve the edit-medicines.html file
  res.sendFile(__dirname + '/edit-medicines.html');
});


app.listen(port, () => console.log('Server is running on port', port));