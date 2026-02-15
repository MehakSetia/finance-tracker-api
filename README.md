💰 Personal Finance Tracker API

A production-ready, secure RESTful API for tracking personal finances, built with modern backend technologies.

🚀 Live API: https://finance-tracker-api-ug26.onrender.com
📄 API Documentation (Swagger): https://finance-tracker-api-ug26.onrender.com/api-docs

📖 Overview

This project is a robust backend system designed to handle multi-user financial data securely. It goes beyond basic CRUD operations by implementing Ownership-Based Access Control, 
Data Encryption, and Database Relations.

Unlike simple tutorial projects, this API enforces strict data isolation—users can only access and manipulate their own transaction data, ensuring privacy in a multi-tenant 
environment.

✨ Key Features

🔐 Security First

JWT Authentication: Stateless, secure authentication using JSON Web Tokens.

Password Hashing: All passwords are encrypted using bcrypt before storage.

Protected Routes: Middleware middleware ensures only authenticated requests reach sensitive endpoints.

🏗 Architecture

Relational Database: Utilizes PostgreSQL for structured, reliable data storage.

ORM Integration: Uses Prisma for type-safe database queries and automated migrations.

Multi-Tenancy: Transactions are relationally linked to specific Users, preventing data leaks.

⚡️ Core Functionality

User Management: Secure Registration and Login endpoints.

Transaction CRUD: Create, Read, Update, and Delete financial records.

Data Aggregation: Server-side calculation of total expenses/income per user.

Filtering: Query parameter support for filtering transactions by category.

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Asynchronous, event-driven JavaScript runtime. |
| **Framework** | Express.js | Fast, unopinionated web framework for Node.js. |
| **Database** | PostgreSQL | Advanced open-source relational database. |
| **ORM** | Prisma | Next-generation Node.js and TypeScript ORM. |
| **Auth** | JWT & bcrypt | Industry standards for stateless auth and encryption. |
| **Docs** | Swagger UI | Interactive API documentation. |
| **Deployment** | Render & Neon | Cloud hosting for Server and Database. |

🔌 API Endpoints

Full documentation is available at /api-docs.

Authentication

POST /auth/register - Register a new user.

POST /auth/login - Login and receive a Bearer Token.

Transactions (Requires Token)

GET /transaction - Retrieve all user transactions.

POST /transaction - Create a new transaction.

GET /transaction/:id - Retrieve a specific transaction.

PUT /transaction/:id - Update a transaction.

DELETE /transaction/:id - Remove a transaction.

GET /transaction/summary - Get total expense summary.



🚀 Local Installation

Clone the repository:

git clone [https://github.com/MehakSetia/finance-tracker-api.git](https://github.com/MehakSetia/finance-tracker-api.git)
cd finance-tracker-api


Install dependencies:

npm install


Configure Environment:
Create a .env file in the root directory:

DATABASE_URL="postgresql://user:password@localhost:5432/finance_tracker"
JWT_SECRET="your_secret_key"


Run Database Migrations:

npx prisma migrate dev


Start the Server:

npm start


👨‍💻 Author

Built by Mehak Setia
Passionate about scalable backend systems and cloud architecture.
