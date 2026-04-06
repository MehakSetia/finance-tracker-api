# 💰 Personal Finance Tracker API

A production-ready, secure RESTful API for tracking personal finances with role-based access control and dashboard analytics, built with modern backend technologies.

🚀 **Live API:** https://finance-tracker-api-ug26.onrender.com  
📄 **API Documentation (Swagger):** https://finance-tracker-api-ug26.onrender.com/api-docs

---

## 🔐 Role Model

| Role | Permissions |
|---|---|
| **User** | Create, view, update, delete their own transactions. View their own dashboard and goals. |
| **Analyst** | View all users' transactions (with optional userId filter). View aggregated dashboard across all users. Read-only. |
| **Admin** | Full access — all User permissions plus ability to update and delete any transaction. |

**Note:** Roles are assigned manually in the database. Registration defaults all users to `User` role. Analyst and Admin roles are elevated manually — preventing self-assignment of privileged roles.

---

## ✨ Key Features

### 🔐 Security
- JWT Authentication — stateless, secure token-based auth
- Password hashing with bcrypt
- Role-based access control middleware
- Ownership-based data isolation — users can only access their own data

### 📊 Dashboard Analytics
- Total income and total expenses
- Net balance calculation
- Category-wise spending totals
- 5 most recent transactions
- Analyst and Admin see aggregated data across all users

### ⚡ Core Functionality
- User registration and login with JWT
- Transaction CRUD with type (income/expense), category, date, description
- Category filtering with pagination
- Financial goals management
- Global error handler — no raw server crashes

---

## 🛠 Tech Stack

| Component | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT + bcryptjs |
| Validation | Zod |
| Docs | Swagger UI |
| Deployment | Render + Neon DB |

---

## 🔌 API Endpoints

Full interactive documentation at `/api-docs`.

### Authentication (Public)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register — defaults to User role |
| POST | `/auth/login` | Login — returns JWT token |

### Transactions (Requires Token)
| Method | Endpoint | Role | Description |
|---|---|---|---|
| POST | `/transaction/add` | User, Admin | Add a new transaction |
| GET | `/transaction` | All | Get own transactions (category filter + pagination) |
| GET | `/transaction/dashboard` | All | Dashboard summary (Analyst/Admin see all users) |
| GET | `/transaction/all` | Analyst, Admin | All users' transactions (optional ?id=userId filter) |
| GET | `/transaction/:id` | All | Get single transaction by ID |
| PUT | `/transaction/:id` | User, Admin | Update a transaction |
| DELETE | `/transaction/:id` | User, Admin | Delete a transaction |

### Goals (Requires Token)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/goals/add` | Add a financial goal |
| GET | `/goals` | Get all goals for logged in user |

---

## 🚀 Local Installation

```bash
# Clone the repository
git clone https://github.com/MehakSetia/finance-tracker-api.git
cd finance-tracker-api

# Install dependencies
npm install

# Configure environment
# Create .env file with:
DATABASE_URL="postgresql://user:password@localhost:5432/finance_tracker"
JWT_SECRET="your_secret_key"

# Run migrations
npx prisma migrate dev

# Start server
npm start
```

---

## 📝 Assumptions Made

- Users self-register as `User` role. Analyst and Admin roles are assigned manually by a database administrator — this prevents privilege escalation through the API.
- Analyst role is read-only across all users' data, designed for reporting and analytics use cases.
- Dashboard endpoint behaviour changes based on role — User sees their own data, Analyst and Admin see aggregated data across all users.
- Financial goals are personal to each user and not role-restricted beyond authentication.
- Transactions require explicit `type` field (income or expense) — no default assumed.

---

## 👩‍💻 Author

Built by **Mehak Setia**  
Passionate about scalable backend systems and financial technology.  
GitHub: https://github.com/MehakSetia
