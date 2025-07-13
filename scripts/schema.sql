CREATE TABLE IF NOT EXISTS coins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(50),
  country VARCHAR(50),
  year INT,
  denomination VARCHAR(50),
  mint_mark VARCHAR(10),
  material VARCHAR(50),
  grade VARCHAR(20),
  image VARCHAR(255)
);
