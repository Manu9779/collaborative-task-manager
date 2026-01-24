<<<<<<< HEAD
# Collaborative Task Manager

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge\&logo=vercel)](https://collabartive-task-manager.vercel.app/)

A modern, full-stack task management application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and redesigned with **Aceternity UI** for a premium, animated user experience.

---

## 🌐 Live Demo

🚀 **Deployed Application:**
👉 [https://collabartive-task-manager.vercel.app/](https://collabartive-task-manager.vercel.app/)

> The application is deployed on **Vercel** and demonstrates authentication, role-based access, and collaborative task management features.

---

## ✨ Features

### 🎨 Premium UI/UX

* Dynamic backgrounds with **Aurora effects** on authentication pages
* **Wavy animated dashboard background** for an organic feel
* **Aceternity UI components**:

  * 3D Task Cards
  * Floating Navbar
  * Animated Buttons (`MovingBorder`)
  * Glow Input Fields
* **Dark / Light Mode** with persistent theme state
* **Modern Typography** using the **Inter** font family

### 🔐 Robust Authentication

* Secure **User Signup & Login** using JWT
* **Role-Based Access Control (RBAC)**:

  * User
  * Manager
* Protected Routes to prevent unauthorized access

### ✅ Task Management

* Full **CRUD operations** (Create, Read, Update, Delete)
* **Task Assignment** by Managers
* Task **Status Tracking**:

  * Pending
  * In Progress
  * Completed
* Task **Priority Levels**:

  * Low
  * Medium
  * High
* Fully **responsive grid layout** for all screen sizes

---

## 🌐 Live Demo

🚀 **Deployed Application:**  
👉 https://collabartive-task-manager.vercel.app/

> The application is deployed on **Vercel** and fully functional with authentication, role-based access, and task management features.


## 🛠️ Tech Stack

### Frontend

* **React (Vite)**
* **Tailwind CSS v4** (CSS-first configuration)
* **Framer Motion** (animations)
* **Aceternity UI** (advanced animated components)
* **Lucide React** (icons)
* **Axios** (API communication)

### Backend

* **Node.js** & **Express.js**
* **MongoDB** & **Mongoose**
* **bcryptjs** (password hashing)
* **jsonwebtoken** (JWT authentication)
* **express-rate-limit** (API protection)

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v14+ recommended)
* MongoDB (local or MongoDB Atlas)
* Git

<<<<<<< HEAD
---
=======
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Manu9779/Task_manager.git
    cd "Collaborative  Task Manager"
    ```
>>>>>>> 88ae3d04622c0147fe4803a1bb82895c4767b650

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Manu9779/Task_manager.git
cd "Collaborative Task Manager"
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/collab-task-manager
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

Start the backend server:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Access the Application

Open your browser and visit:

```
http://localhost:5173
```

---

## 📂 Project Structure

```
Collaborative Task Manager/
├── backend/
│   ├── config/             # Database connection
│   ├── controllers/        # Business logic
│   ├── middleware/         # Authentication & RBAC
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   └── server.js           # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   └── ui/         # Aceternity UI effects
│   │   ├── context/        # Auth context
│   │   ├── pages/          # App pages
│   │   └── api.js          # Axios configuration
│   └── index.css           # Tailwind v4 styles
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a pull request

---

<<<<<<< HEAD
## 📄 License

This project is licensed under the **MIT License**.

---
### ⭐ If you like this project, give it
=======
>>>>>>> 88ae3d04622c0147fe4803a1bb82895c4767b650
=======
# collaborative-task-manager
>>>>>>> 72acedb0093c35f5b6c02dc73cb45cfbd50c95f9
