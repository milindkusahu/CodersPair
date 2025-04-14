# 💘 DevTinder - Connect & Collaborate with Developers

DevTinder is a social platform designed for developers to connect, collaborate, hang out, and build amazing projects together. Think of it as the developer's version of a social match-making app, but for techies!

---

## 🚀 Why DevTinder?

This project is more than just a fun idea—it's a learning playground packed with essential features found in many real-world applications. It’s a perfect hands-on project to strengthen full-stack skills and understand scalable app design.

---

## ✨ Features

- 🔐 User Authentication (Signup/Login)
- 🧑‍💼 Profile Creation & Management
- 📰 Feed/Explore Page to Discover Other Developers
- 🔗 Send & Receive Connection Requests
- 💖 View Your Matches
- 📬 See Sent/Received Requests
- ✏️ Update Profile Anytime

---

## 🏗️ Architecture Overview

### 🔹 High-Level Design (HLD)

The app follows a **microservices architecture**:

- **Frontend**: React.js
- **Backend**: Node.js + Express + MongoDB

---

## 🔍 Low-Level Design (LLD)

### 🗃️ Database Design (MongoDB)

Follows **Single Responsibility Principle** for collections:

#### 📦 `User` Collection

| Field     | Type   |
| --------- | ------ |
| firstname | String |
| lastname  | String |
| email     | String |
| password  | String |
| age       | Number |
| gender    | String |

#### 📦 `ConnectionRequest` Collection

| Field      | Type                                                  |
| ---------- | ----------------------------------------------------- |
| fromUserId | ObjectId                                              |
| toUserId   | ObjectId                                              |
| status     | String (`Pending`, `Accepted`, `Rejected`, `Ignored`) |

---

### 🛠️ REST API Endpoints

#### 🔐 Auth

- `POST /signup` – Register a new user
- `POST /login` – Authenticate a user

#### 👤 Profile

- `GET /profile` – Get user profile
- `POST /profile` – Create user profile
- `PATCH /profile` – Update profile
- `DELETE /profile` – Delete profile

#### 🤝 Connection Requests

- `POST /sendRequest` – Send a connection request (`ignore`, `interested`)
- `POST /reviewRequest` – Accept or reject a request
- `GET /requests` – Get all received/sent requests
- `GET /connections` – Get all matched connections

---

## ⚙️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (Planned)
- **Hosting**: Coming Soon

---

## 🧪 Getting Started

## 🤝 Contribution

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.

## 💡 Inspiration

Built with ❤️ to help developers build cool things — together.
