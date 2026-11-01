# 💊 Pharmacy Management System - Frontend

A full-stack **Pharmacy Management System** frontend built with **React + Vite**, connected to a **Spring Boot REST API** backend. Designed for real-world pharmacy operations with role-based access, inventory tracking, and stock management.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based Login and Registration
- Role-Based Access Control — **ADMIN** and **USER** roles
- Protected Routes (unauthenticated users redirected to login)
- Persistent session using `localStorage`

### 📊 Dashboard
- Summary cards showing total medicines, low stock, expiring soon, and expired count
- Clickable cards navigate directly to filtered medicine list

### 💊 Medicines
- View all medicines in a paginated table
- Search by medicine name
- Filter by status: `ACTIVE`, `LOW_STOCK`, `EXPIRING_SOON`, `EXPIRED`
- Add / Edit / Delete medicines *(Admin only)*
- Status badges with color coding

### 🏭 Suppliers *(Admin only)*
- View all suppliers
- Search by supplier name
- Add / Edit / Delete suppliers

### 📦 Stock Transactions
- View all stock IN and OUT transactions
- Filter by transaction type (IN / OUT)
- Filter by date range
- Reset filters
- Transactions shown in reverse chronological order
- Paginated table

### 👤 User Management *(Admin only)*
- Register new Admin users from inside the app

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 | UI Library |
| Vite | Build Tool |
| React Router DOM v6 | Client-side Routing |
| Axios | HTTP Client |
| CSS (Custom) | Styling |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- Backend server running on `http://localhost:8080`

### Installation

```bash
# Clone the repository
git clone https://github.com/vijaykumar-dev28/PharmacyManagement-Frontend.git

# Navigate to project folder
cd PharmacyManagement-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🔗 Backend

This frontend connects to a Spring Boot backend.

👉 https://github.com/vijaykumar-dev28/PharmacyManagement

---

## 👥 Role-Based Access

| Feature | ADMIN | USER |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| View Medicines | ✅ | ✅ |
| Add/Edit/Delete Medicine | ✅ | ❌ |
| View Suppliers | ✅ | ❌ |
| Add/Edit/Delete Supplier | ✅ | ❌ |
| View Stock Transactions | ✅ | ✅ |
| Add Stock IN/OUT | ✅ | ✅ |
| Register Admin | ✅ | ❌ |

---

## 👨‍💻 Author

**Vijaykumar M**
- GitHub: [@vijaykumar-dev28](https://github.com/vijaykumar-dev28)

---