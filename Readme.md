# CodersPair 👨‍💻

A social platform designed for developers to connect, collaborate, and build amazing projects together. Think of it as the developer's version of a social match-making app, but for techies!

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT
- 👤 **Profile Management** - Create and edit developer profiles
- 🔍 **Developer Discovery** - Browse and discover other developers
- 🤝 **Connection System** - Send and manage connection requests
- 💬 **Request Management** - Review incoming connection requests
- 🎨 **Modern UI** - Responsive design with dark/light theme support

## 🚀 Tech Stack

### Frontend

- **React 19** with Vite
- **Redux Toolkit** for state management
- **Tailwind CSS** + DaisyUI for styling
- **React Router** for navigation
- **Axios** for API communication

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Git

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

Start the backend server:

```bash
npm run dev
```

**Available Scripts:**

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

**Available Scripts:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 API Endpoints

### Authentication

- `POST /signup` - Register new user
- `POST /login` - Authenticate user
- `POST /logout` - Logout user

### Profile

- `GET /profile/view` - Get user profile
- `PATCH /profile/edit` - Update profile
- `PATCH /profile/password` - Change password

### Connections

- `POST /request/send/:status/:userId` - Send connection request
- `POST /request/review/:status/:requestId` - Review connection request
- `GET /user/requests/received` - Get received requests
- `GET /user/connections` - Get user connections
- `GET /user/feed?page=1&limit=10` - Get discoverable users (supports pagination)

**Connection Request Statuses:**

- `ignored` - User ignored the profile
- `interested` - User showed interest
- `accepted` - Connection request accepted
- `rejected` - Connection request rejected

## 🗃️ Database Schema

### User Collection

```javascript
{
  firstName: String (required, 4-50 chars),
  lastName: String,
  emailId: String (unique, required, validated),
  password: String (hashed, required, strong password validation),
  age: Number (min: 18),
  gender: String (enum: male, female, others),
  photoUrl: String (default avatar, URL validation),
  about: String (default description),
  skills: [String] (comma-separated input converted to array),
  timestamps: true
}
```

### ConnectionRequest Collection

```javascript
{
  fromUserId: ObjectId (ref: User),
  toUserId: ObjectId (ref: User),
  status: String (ignored, interested, accepted, rejected),
  timestamps: true
}
```

## 🚀 Deployment

**Coming Soon** - Deployment instructions will be added here.

### Environment Variables Required

**Backend (.env):**

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3000)

**Frontend:**

- Update `BASE_URL` in `src/utils/constants.js` for production

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Milind Kumar Sahu**

- GitHub: [@milindkusahu](https://github.com/milindkusahu)

## 🙏 Acknowledgments

Built with ❤️ to help developers build cool things — together.

---

⭐ Star this repository if you find it helpful!
