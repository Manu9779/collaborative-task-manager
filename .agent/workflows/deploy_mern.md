---
description: Deploy MERN Stack to Vercel & Render
---

# Deploy MERN Stack Project

This guide outlines how to deploy the **Collaborative Task Manager** effectively.
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## Prerequisites
- GitHub Repository with your code pushed.
- Accounts on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [Render](https://render.com/), and [Vercel](https://vercel.com/).

## Step 1: Database Setup (MongoDB Atlas)
1.  **Create a Cluster**: Log in to Atlas and build a new cluster (Shared/Free tier is fine).
2.  **Database Access**: Create a database user with a password.
3.  **Network Access**: Allow access from anywhere (`0.0.0.0/0`) for simplicity, or whitelist Render's IP later.
4.  **Get Connection String**:
    - Click "Connect" -> "Connect your application".
    - Copy the string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/...`).

## Step 2: Backend Deployment (Render)
1.  **New Web Service**:
    - Go to Render Dashboard -> New -> Web Service.
    - Connect your GitHub repository.
2.  **Configuration**:
    - **Name**: `collab-task-manager-backend` (or similar)
    - **Root Directory**: `backend` (Important!)
    - **Runtime**: Node
    - **Build Command**: `npm install`
    - **Start Command**: `node server.js`
3.  **Environment Variables**:
    - Add the following variables:
        - `MONGO_URI`: (Paste your Atlas connection string)
        - `JWT_SECRET`: (A secure random string)
        - `NODE_ENV`: `production`
4.  **Deploy**: Click "Create Web Service". Wait for it to build and start.
5.  **Copy URL**: Once live, copy the backend URL (e.g., `https://backend-xyz.onrender.com`).

## Step 3: Frontend Deployment (Vercel)
1.  **New Project**:
    - Go to Vercel Dashboard -> Add New -> Project.
    - Import your GitHub repository.
2.  **Configuration**:
    - **Framework Preset**: Vite (should detect automatically).
    - **Root Directory**: Click "Edit" and select `frontend`.
3.  **Environment Variables**:
    - Add the following variable:
        - `VITE_API_URL`: (Paste your Render Backend URL from Step 2, e.g., `https://backend-xyz.onrender.com/api`)
        - **Note**: Ensure you append `/api` if your backend routes are prefixed with it (which they are).
4.  **Deploy**: Click "Deploy".

## Step 4: Verification
- Visit the Vercel URL.
- Try to Sign Up/Log In.
- Check if tasks load dynamically.
