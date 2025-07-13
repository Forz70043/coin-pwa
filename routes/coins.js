const express = require('express');
const router = express.Router();
const db = require('../models/db');
const multer = require('multer');

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

router.post('/', upload.single('image'), async (req, res) => {
  const { type, country, year, denomination, mint_mark, material, grade } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const [result] = await db.execute(
      `INSERT INTO coins (type, country, year, denomination, mint_mark, material, grade, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, country, year, denomination, mint_mark, material, grade, image]
    );

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM coins ORDER BY year DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;