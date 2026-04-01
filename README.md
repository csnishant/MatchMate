# 🏠 MatchMate – Roommate Finding App

MatchMate is a modern web application designed to help users find compatible roommates easily. It allows users to create profiles, browse listings, and connect with potential roommates based on preferences like location, budget, and lifestyle.
---

# Features
🔍 Search roommates based on location & preferences
👤 User profile creation & management
💬 Connect & communicate with potential roommates
🏡 Post and browse room listings
📱 Fully responsive UI (mobile + desktop)
⚡ Fast and optimized performance
## 📂 Folder Structure

```
matchmate/
│── frontend/              # React Frontend (Vite + Tailwind)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
│
│── backend/               # Node.js Backend (Express)
│   ├── controllers/       # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & error handling
│   ├── config/            # DB config
│   ├── utils/
│   ├── server.js
│   └── package.json
│
│── .env
│── .gitignore
│── README.md
```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/matchmate.git
cd matchmate
```

---

### 2. Setup Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🛠️ Tech Stack

- Frontend: React.js, Vite, Tailwind CSS  
- Backend: Node.js, Express.js  
- Database: MongoDB  

---

## ✨ Features

- User Authentication  
- Roommate Matching  
- Room Listings  
- Search & Filters  
- Responsive Design  

---

## 👨‍💻 Author

**Nishant Choudhary**

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
