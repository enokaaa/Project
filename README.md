
# 🚀 Next.js + Prisma Starter Project

This is a full-stack web application built with [Next.js](https://nextjs.org/) and [Prisma](https://www.prisma.io/). It uses PostgreSQL for the database and follows best practices for environment management and development setup.

---

## 📦 Technologies Used

- Next.js
- React
- Prisma ORM
- PostgreSQL
- TypeScript (optional)
- dotenv

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-nextjs-prisma-project.git
cd your-nextjs-prisma-project
```
### 2. Install dependencies


npm install
or
yarn install

### 3. Set up your .env file
Create a .env file in the root directory with the following content:

DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"


## 🛠 Prisma Setup
#### 1. Generate Prisma Client
```bash
npx prisma generate
Run Database Migrations
npx prisma migrate dev --name init
```
This creates the database (if it doesn't exist), applies migrations, and generates the Prisma client.

### ▶️ Running the Project
Start the development server:
```bash
npm run development 
or
yarn dev
Visit: http://localhost:3000
```
