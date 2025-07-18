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

if (require.main === module) {
  // Only if runned with `node server.js`
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; // export for supertest
