# 🪙 Coin PWA

**Coin PWA** is a Progressive Web App that allows you to catalog your coin collection. It works offline, supports image uploads, and stores data in a MySQL database via a Node.js backend.

## 🌐 Live Demo (if applicable)
> _work in progress link_

---

## 📦 Features

- Add new coins with metadata (type, country, year, denomination, mint mark, material, grade)
- Upload and display coin images
- Fully functional offline via Service Worker
- Data persistence with MySQL + Node.js backend
- Mobile-friendly PWA: installable on Android/iOS
- Simple and clean UI

---

## 🛠 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- Progressive Web App (PWA)
- Service Worker

### Backend
- Node.js + Express
- MySQL database
- Multer for image upload
- REST API endpoints

---

## 📁 Folder Structure

```
project-root/
│
├── public/                # Frontend static files
│   ├── icons/             # PWA icons
│   ├── manifest.json      # PWA manifest
│   ├── service-worker.js  # Offline support
│   └── app.js             # Main frontend logic
│
├── uploads/               # Uploaded images (served statically)
│
├── routes/
│   └── coins.js           # API routes for coins
│
├── models/
│   └── db.js              # MySQL connection
│
├── server.js              # Main Express server
└── README.md              # This file
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Forz70043/coin-pwa.git
cd coin-pwa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Fill `.env` file (optional)

If your DB config isn't hardcoded, use environment variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=coin_collection
```

### 4. Create MySQL table

```sql
CREATE TABLE coins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(100),
  country VARCHAR(100),
  year INT,
  denomination VARCHAR(100),
  mint_mark VARCHAR(10),
  material VARCHAR(100),
  grade VARCHAR(50),
  image VARCHAR(255)
);
```

### 5. Start the server

```bash
node server.js
```

App will be available at: [http://localhost:3001](http://localhost:3001)

---

## 📸 Image Uploads

Uploaded images are saved in the `/uploads/` directory and served at:

```
http://localhost:3001/uploads/<filename>
```

---

## 📱 PWA Support

- Installable on mobile and desktop
- Offline access thanks to Service Worker
- Add to Home Screen supported

Make sure to register the Service Worker inside `app.js`:

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
```

---

## ✅ To Do / Future Improvements

- Add coin edit/delete functionality
- Search and filter coins
- User authentication for multi-user support
- Export collection to CSV/PDF
- Sync with cloud (e.g. Google Drive or Firebase)
- Better UI/UX

---

## 🧑‍💻 Author

**Forz70043**  
GitHub: [https://github.com/Forz70043](https://github.com/Forz70043)

