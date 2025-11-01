# Express Backend Boilerplate

A clean and simple Express.js boilerplate for quickly building backend applications with PostgreSQL and EJS templating.

# Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

# Features
- Express.js backend framework
- EJS templating engine
- PostgreSQL integration
- MVC architecture
- Environment variable configuration using `.env`

# Prerequisites
Before you begin, ensure you have:
- Node.js (v16+)
- npm or yarn
- PostgreSQL database

# Installation
### 1. Clone the repository
git clone https://github.com/hungit-dev/express-backend-boilerplate.git  
cd express-backend-boilerplate

### 2. Install dependencies
npm install  
or  
yarn install

### 3. Set up environment variables
Create a `.env` file in the root directory and add:  
DATABASE_URL=postgresql://username:password@host:port/dbname?sslmode=require  

Replace `username`, `password`, `host`, `port`, and `dbname` with your database credentials.

# Usage
Run the server with Node.js:  
node app.js  

Server will run at `http://localhost:3000`

# Project Structure
- controllers/ - Route handlers
- db/ - Database connection
- partials/ - Reusable EJS components
- public/ - Static files (CSS, JS, images)
- routes/ - Express routes
- views/ - EJS templates
- .gitignore
- package.json
- README.md

# Contributing
Feel free to fork the repo and submit pull requests.

# License
MIT License © 2025 Lam Nhat Hung Huynh
