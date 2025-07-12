const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const {
    type,
    country,
    year,
    denomination,
    mint_mark,
    material,
    grade,
    image
  } = req.body;

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