# Variedades Carolina — Multi-Module ERP

> **Status:** Active Development (In Progress)

A tailored, high-performance multi-module Enterprise Resource Planning (ERP) system engineered to address the operational challenges of retail businesses operating in volatile economic environments. 

The architecture prioritizes explicit query control, transactional integrity, and low-latency financial calculations to help store owners mitigate inflation, handle foreign exchange dynamics, and automate daily cashier workflows.

---

## Economic Context & Core Problem Solved

Operating a retail business in an unstable currency market introduces significant friction:
- **Price Instability:** Manual price adjustments based on fluctuating foreign exchange rates lead to margin erosion.
- **Cash Flow Overhead:** Managing cash advances (*avances de efectivo*) and manual phone top-up plan calculations consumes valuable employee time.
- **Credit & Debt Drift:** Informal credit lines (*deudores*) require strict ledger tracking to prevent capital loss.

**Variedades Carolina** automates these processes through explicit database-driven markup rules, real-time foreign exchange integration (Central Bank rates), and automated transaction logging.

---

## Key Features & Architectural Roadmap

###  Currently Implemented
- **Authentication & Security:** Secure JWT-based authentication module with structured user context handling.
- **Inventory Module (Core Backend):** Product schema handling cost basis, SKU tracking, category mapping, and stock movements.

### Planned & In-Development Features
- **Dynamic Product Pricing Engine:** Automatic calculation of final retail prices based on product cost data stored in PostgreSQL, user-defined target profit margins, and daily **Central Bank (BCV) Exchange Rates**.
- **General Ledger & Sales Engine:** Immutable transaction records tracking sales, payment methods, and daily register balances.
- **Debtors & Credit Ledger (*Deudores*):** Dedicated ledger tracking outstanding customer debt, partial payments, credit limits, and overdue aging reports.
- **Automated Cash Advances (*Avances de Efectivo*):** Commission-based payout calculator applying configurable fee percentages to cash advance operations.
- **Telecom Top-up Automation (*Planes de Recarga*):** Integrated mobile top-up plan directory to streamline daily cashier balance transfers without requiring manual reference lookups.

---

## Technology Stack

- **Backend:** **Go** utilizing the **Gin** framework. Implements raw SQL execution and explicit connection pooling via `pgxpool` on **PostgreSQL** for maximum query control, transaction safety, and execution performance. Includes native Swagger/OpenAPI specifications.
- **Frontend:** **React** with **TypeScript**, **Vite**, **React Router**, **TanStack Query**, and **Tailwind CSS**.
- **Development Tooling:** Clean monorepo structure managed via `pnpm`.

---

## Quickstart (Development Setup)

### Prerequisites
- Node.js & `pnpm`
- Go (1.21+)
- PostgreSQL instance running locally or via Docker

### Running the Backend (Go)
```bash
# 1. Navigate to backend directory
cd backend

# 2. Set environment variables in .env
# DB_URL=postgres://user:password@localhost:5432/variedades_carolina

# 3. Run application
go run main.go
```

---

## Running the Frontend (React)

```Bash
# 1. Install dependencies
pnpm install

# 2. Start Vite development server
pnpm run dev
```

* Frontend: http://localhost:5173

* Backend API: http://localhost:8082/api/v1

* Swagger Docs: http://localhost:8082/swagger/index.html