# ⚙️ Smart Tourism App — Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Swagger](https://img.shields.io/badge/API%20Docs-Swagger%20OpenAPI-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Robust and scalable RESTful API powering the **Smart Tourism Platform**. It manages authentication, user profiles (tourists and verified guides), tours, bookings, community posts, and document verification workflows.

---

## 🏛️ Architecture Overview

The backend is built following a clean, modular layered architecture:

```
src/
├── config/          # Database connection, mailer and environment config
├── controllers/     # HTTP request handling & response formatting
├── services/        # Core business logic & database interactions
├── models/          # Mongoose database schemas & models
├── routes/          # Express route definitions & mounting
├── middlewares/     # JWT authentication, RBAC, input validation (Zod), Multer uploads
└── enums/           # Type-safe application-wide constants & enums
```

---

## 🌟 Core Modules & Functionality

* **🔐 Authentication & RBAC**: JWT bearer tokens, password hashing with Bcrypt, role-based authorization (`Tourist`, `Guide`, `Admin`), and email OTP validation via Nodemailer.
* **🧭 Guide Verification System**: Multi-step accreditation flow with document and ID verification using Multer middleware.
* **🗺️ Tours & Experiences**: Full CRUD management of travel experiences with categories, durations, frequency, and pricing.
* **📅 Bookings & Reviews**: Reservation system and rating/review tracking for certified guides and activities.
* **💬 Community Hub**: User-generated posts, travel tips, and Q&A interaction endpoints.
* **📖 Interactive API Docs**: Integrated OpenAPI / Swagger documentation accessible directly in the browser.

---

## 🛠️ Tech Stack

* **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database & ODM**: [MongoDB](https://www.mongodb.com/) with [Mongoose 9](https://mongoosejs.com/)
* **Data Validation**: [Zod](https://zod.dev/)
* **File Uploads**: [Multer](https://github.com/expressjs/multer)
* **Email / OTP**: [Nodemailer](https://nodemailer.com/)
* **Documentation**: `swagger-jsdoc` & `swagger-ui-express`

---

## 🔗 Connected Services

* 📱 **Mobile Client**: [smart-tourism-app-mobile](https://github.com/iamachrafeaz/smart-tourism-app-mobile) (React Native / Expo)
* 🤖 **AI Chatbot Service**: [smart-tourism-app-chatbot](https://github.com/iamachrafeaz/smart-tourism-app-chatbot) (FastAPI / LangChain / ChromaDB)

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* A running [MongoDB](https://www.mongodb.com/) instance (locally or via MongoDB Atlas)

### Setup & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/iamachrafeaz/smart-tourism-app-backend.git
   cd smart-tourism-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/smart-tourism
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

4. Run the development server:
   ```bash
   npm start
   ```

5. Explore the interactive API documentation:
   Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) in your browser.

---
## 👤 Author
**Achraf EL AZZOUZI**
* GitHub: [@iamachrafeaz](https://github.com/iamachrafeaz)
* LinkedIn: [Achraf EL AZZOUZI](https://www.linkedin.com/in/achraf-el-azzouzi-18bb3b232/)
