1️⃣ Prerequisites

Before starting, ensure you have the following installed:

Docker and Docker Compose

Node.js (preferably v18 or higher; portable Node.js works)

npm (comes with Node.js)

VS Code or another code editor

Firebase project with a service account JSON file

2️⃣ Directory Structure
logistics2-deployed/
│
├─ backend/
│   ├─ index.js
│   ├─ package.json
│   ├─ package-lock.json
│   ├─ .env
│   └─ serviceaccountKey.json
│
├─ frontend/
│   ├─ src/
│   │   ├─ App.js
│   │   └─ firebase.js
│   ├─ package.json
│   └─ package-lock.json
│
└─ docker-compose.yml

3️⃣ Docker Compose Setup

docker-compose.yml:

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file:
      - ./backend/.env
    volumes:
      - ./backend:/app
      - ./backend/serviceaccountKey.json:/app/serviceaccountKey.json:ro
    command: npm run dev

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
    command: npm start


Notes:

volumes mount your code into containers → hot reload works

command: npm run dev → backend reloads automatically with Nodemon

Frontend uses React dev server with hot reload

4️⃣ Backend Setup
Install dependencies
cd backend
npm install express firebase-admin cors dotenv nodemon

backend/index.js – Express + Firestore
const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Firebase Admin
const serviceAccount = require("./serviceaccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const usersCollection = db.collection("users");

// CRUD routes
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const docRef = await usersCollection.add({ name, email });
  res.status(201).json({ id: docRef.id });
});

app.get("/users", async (req, res) => {
  const snapshot = await usersCollection.get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(users);
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  await usersCollection.doc(id).update(req.body);
  res.json({ message: "Updated successfully" });
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await usersCollection.doc(id).delete();
  res.json({ message: "Deleted successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

backend/package.json scripts
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}

5️⃣ Frontend Setup
Install dependencies
cd frontend
npm install react react-dom firebase axios

frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const API_URL = "http://localhost:5000/users";

  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  const addUser = async () => {
    await axios.post(API_URL, { name, email });
    setName(""); setEmail("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  const updateUser = async (id) => {
    const newName = prompt("Enter new name:");
    await axios.put(`${API_URL}/${id}`, { name: newName });
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Firestore CRUD</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={addUser}>Add User</button>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} ({u.email}){" "}
            <button onClick={() => updateUser(u.id)}>Edit</button>
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

6️⃣ Running the App
docker-compose up


Backend → http://localhost:5000

Frontend → http://localhost:3000

Changes in backend and frontend are hot-reloaded automatically.

7️⃣ Notes & Best Practices

Volumes: Keep backend and frontend mounted to avoid rebuilding for every code change.

Hot Reload: Nodemon (backend) + React dev server (frontend) → live updates.

Environment Variables: Keep .env files outside Docker images for security.

Service Account: Keep serviceaccountKey.json mounted as read-only.

Firestore CRUD: Backend handles API; frontend consumes API → easy separation of concerns.
