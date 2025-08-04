# CodersPair Backend - Connect & Collaborate with Developers

CodersPair is a social platform designed for developers to connect, collaborate, hang out, and build amazing projects together. Think of it as the developer's version of a social match-making app, but for techies!

---

## 🚀 Why CodersPair?

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
- `POST /logout` – Log out a user

#### 👤 Profile

- `GET /profile/view` – Get user profile
- `PATCH /profile/edit` – Update profile
- `PATCH /profile/password` – Change user password

#### 🤝 Connection Requests

- `POST /request/send/:status/:userId` – Send a connection request (status: `ignore`, `interested`, `accepted`, `rejected`)
- `POST /request/review/:status/:requestId` – Review a connection request (status: `ignore`, `interested`, `accepted`, `rejected`)

#### 👥 User

- `GET /user/requests/received` – Get all received connection requests
- `GET /user/connections` – Get all user connections
- `GET /user/feed` – Get profiles of other users on the platform (supports pagination: `/feed?page=1&limit=10`)

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
