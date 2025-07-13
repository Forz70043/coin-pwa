const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const coinRoutes = require('./routes/coins');

// Configurazione multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/coins', coinRoutes);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('API monete attiva');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server in ascolto su http://localhost:${PORT}`));
