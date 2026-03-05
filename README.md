# Campus Lost & Found Management System

A full-stack web-based Lost & Found Management System developed using Node.js, Express, and MySQL.  
This system digitalizes the traditional manual lost and found process within a university environment.

---

## 📌 Project Overview

The Campus Lost & Found Management System allows students and staff to:

- Submit lost item reports
- Submit found item reports
- View all reports
- Search items dynamically
- Sort items by newest or oldest
- Update item status (Active → Claimed)
- Delete reports

The system follows the MVC (Model-View-Controller) architecture and implements RESTful API principles to ensure structured backend logic and maintainable code.

---

## 🛠️ Technologies Used

Frontend:
- HTML5
- CSS3
- JavaScript (Vanilla JS)

Backend:
- Node.js
- Express.js
- MySQL
- mysql2 (Promise-based)
- express-validator
- dotenv
- Helmet
- CORS

---

## 🏗️ System Architecture

This project follows MVC architecture:

User → Frontend → Routes → Controller → Model → MySQL Database

- Routes handle API endpoints
- Controllers manage request logic
- Models communicate with the database
- MySQL stores persistent data

This structure improves maintainability, scalability, and separation of concerns.

---

## 🗄️ Database Design

Database Name:Campus_Lost_Found

Table Name: Items

Table Structure:

| Field        | Type            | Description |
|-------------|-----------------|------------|
| id          | INT (Primary Key, Auto Increment) |
| title       | VARCHAR(255)    | Item title |
| description | TEXT            | Item description |
| category    | VARCHAR(50)     | Lost or Found |
| location    | VARCHAR(255)    | Item location |
| date        | DATE            | Report date |
| contact     | VARCHAR(255)    | Contact information |
| status      | VARCHAR(50)     | Active / Claimed |

---

## 🚀 Installation Guide

### 1️⃣ Clone Repository
git clone https://github.com/LokeWenFai/Web-Technology-FA
cd campus-lost-found

---

### 2️⃣ Install Dependencies
npm install

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=campus_lost_found

---

### 4️⃣ Create Database in MySQL

Run the following SQL commands:
CREATE DATABASE campus_lost_found;

USE campus_lost_found;

CREATE TABLE items (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT NOT NULL,
category VARCHAR(50) NOT NULL,
location VARCHAR(255) NOT NULL,
date DATE NOT NULL,
contact VARCHAR(255) NOT NULL,
status VARCHAR(50) DEFAULT 'Active'
);


---

### 5️⃣ Start the Server
npm start

Open your browser:
http://localhost:3000/

---

## 🔐 Security Implementation

The system includes the following security features:

- Server-side validation using express-validator
- SQL Injection prevention using parameterized queries
- XSS prevention through input sanitization
- Environment variable protection using dotenv
- Helmet middleware for HTTP security headers
- Structured error handling middleware

These implementations ensure data integrity and reduce common web vulnerabilities.

---

## 📊 Performance Considerations

- Lightweight frontend structure
- External CSS and JavaScript files
- Deferred script loading
- RESTful API design
- Efficient database queries

---

## 📂 Folder Structure
Campus-Lost-Found/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── public/
│ ├── css/
│ ├── js/
│
├── db.js
├── server.js
├── package.json
├── .env (not uploaded to GitHub)
└── README.md


---

## 🔮 Future Improvements

- User authentication system
- Admin management dashboard
- Email notification integration
- Claim verification workflow
- Cloud deployment (Render / Railway)
- Image upload support

---

## 👨‍💻 Author

Name: Loke Wen Fai
Course: BIT 2164 Web Technologies  
Institution: Quest International University  
Year: 2026  

---

## 📄 License

This project is developed for academic purposes only.
