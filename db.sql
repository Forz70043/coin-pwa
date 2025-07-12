CREATE DATABASE IF NOT EXISTS coin_collection;
USE coin_collection;

CREATE TABLE coins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20),
  country VARCHAR(100),
  year INT,
  denomination VARCHAR(50),
  mint_mark VARCHAR(10),
  material VARCHAR(100),
  grade VARCHAR(50),
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);