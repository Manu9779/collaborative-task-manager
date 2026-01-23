# Collaborative Task Manager

A modern, full-stack task management application built with the **MERN Stack** (MongoDB, Express, React, Node.js) and redesigned with **Aceternity UI** for a premium, animated user experience.

## ✨ Features

-   **Premium UI/UX**:
    -   **Dynamic Backgrounds**: Aurora effects on auth pages and organic Wavy Backgrounds on the dashboard.
    -   **Aceternity Components**: 3D Task Cards, Floating Navbar, Animated Buttons (`MovingBorder`), and Glow Inputs.
    -   **Dark/Light Mode**: Fully integrated theme switching with persistent state and specific styling for both modes.
    -   **Modern Typography**: Uses the **Inter** font family for a clean, professional look.

-   **Robust Authentication**:
    -   Secure User Signup & Login (JWT-based).
    -   Role-Based Access Control (**RBAC**): Separate permissions for 'User' and 'Manager' roles.
    -   Protected Routes: Ensures unauthorized users cannot access sensitive pages.

-   **Task Management**:
    -   **CRUD Operations**: Create, Read, Update, and Delete tasks.
    -   **Task Assignment**: Managers can assign tasks to specific users.
    -   **Status & Priority**: Track tasks with status (Pending, In Progress, Completed) and priority levels (Low, Medium, High).
    -   **Responsive Grid Layout**: 3D cards automatically adjust for mobile, tablet, and desktop screens.

## 🌐 Live Demo

🚀 **Deployed Application:**  
👉 https://collabartive-task-manager.vercel.app/

> The application is deployed on **Vercel** and fully functional with authentication, role-based access, and task management features.


## 🛠️ Tech Stack

### Frontend
-   **React** (Vite)
-   **Tailwind CSS v4** (latest CSS-first configuration)
-   **Framer Motion** (for complex animations)
-   **Aceternity UI** (specialized animated components)
-   **Lucide React** (icons)
-   **Axios** (API requests)

### Backend
-   **Node.js** & **Express.js**
-   **MongoDB** & **Mongoose** (Database & ODM)
-   **bcryptjs** (Password hashing)
-   **jsonwebtoken** (JWT Auth)
-   **express-rate-limit** (API security)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v14+ recommended)
-   MongoDB (Local instance or Atlas connection string)
-   Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Manu9779/Task_manager.git
    cd "Collaborative  Task Manager"
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/collab-task-manager
    JWT_SECRET=your_super_secret_key_here
    NODE_ENV=development
    ```
    Start the server:
    ```bash
    node server.js
    ```

3.  **Setup Frontend:**
    Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    npm install
    ```
    Start the development server:
    ```bash
    npm run dev
    ```

4.  **Access the App:**
    Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure

```
Collaborative Task Manager/
├── backend/                # Node.js/Express Server
│   ├── config/             # DB Connection
│   ├── controllers/        # Route Logic
│   ├── middleware/         # Auth & Sentinel
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Routes
│   └── server.js           # Entry Point
│
├── frontend/               # React Client
│   ├── src/
│   │   ├── components/     # UI Components (TaskCard, Navbar, etc.)
│   │   │   └── ui/         # Aceternity Shaders & Effects
│   │   ├── context/        # AuthContext
│   │   ├── pages/          # Login, Signup, Dashboard, TaskManager
│   │   └── api.js          # Axios Setup
│   └── index.css           # Tailwind v4 Imports & Theme
│
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

