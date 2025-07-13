const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const coinRoutes = require('./routes/coins');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/coins', coinRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('API monete attiva');
});

const PORT = process.env.PORT || 3001;

const server = app.listen(3001, () => {
  console.log('Server running on port 3001');
});

module.exports = app; // export for supertest
