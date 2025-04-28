
# HMCTS Task Manager App

A full-stack task management application built with React, Node.js, Express, and PostgreSQL.

## 🗂️ Project Structure

* `/fe` — Frontend (Vite + React + Tailwind)
* `/be` — Backend (Node.js + Express + PostgreSQL)

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ZaidHassan96/hmcts-task-tracker.git
```

### ⚙️ Backend Setup (`/be`)

#### Step 1: Install dependencies

```bash
cd be
npm install
```

#### Step 2: Set up environment variables

You need two files inside `/be`:
* `.env` — for the development database
* `.env.test` — for the test database

Both should contain:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_username_here
DB_PASSWORD=your_database_password_here
DB_NAME=your_database_name_here


```

For `.env.test`, replace `DB_NAME` with your test database name.

You may use these Database names:
```
DB_NAME=task_manager_db

DB_NAME=test_task_manager_db

```

Make sure your PostgreSQL server is running locally and the databases exist!

#### Step 3: Seed the development database

```bash
npm run seed
```

This will populate your development database with initial data.

#### Step 4: Run backend tests

```bash
npm test
```

Runs tests against the **test** database.

#### Step 5: Start the backend server (development mode)

```bash
npm run dev
```

Server will run on the port defined in your server config (e.g., `localhost:3001`).

### 🎨 Frontend Setup (`/fe`)

#### Step 1: Install dependencies

```bash
cd fe
npm install
```

#### Step 2: Start the frontend server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173/` (default Vite port).

It will connect to your local backend server.

## 📋 Quick Commands Summary

| Command | Location | Purpose |
|---------|----------|---------|
| `npm install` | `/be`, `/fe` | Install project dependencies |
| `npm run seed` | `/be` | Seed the development database |
| `npm test` | `/be` | Run backend API tests |
| `npm run dev` | `/be` or `/fe` | Run backend or frontend server |

## 📌 Requirements

* Node.js (v18+ recommended)
* npm
* PostgreSQL (running locally)
* `.env` and `.env.test` files configured
* Dev databases already created
