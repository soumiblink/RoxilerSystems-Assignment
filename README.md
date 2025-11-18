📌 Roxiler Systems Full-Stack Assignment — Improved Version

A full-stack MERN + Prisma project featuring authentication, data visualization, transactions dashboard, statistics, charts, and a polished modern UI.

🚀 Features
🔐 Authentication

User Signup & Login

JWT-based authentication

Protected APIs

Secure password hashing

📊 Dashboard

Monthly transaction statistics

Category-based pie chart

Price-range bar chart

Search + filter

Pagination

📁 API Endpoints

POST /api/auth/signup

POST /api/auth/login

GET /api/transactions

GET /api/transactions/statistics

GET /api/transactions/bar-chart

GET /api/transactions/pie-chart

🎨 UI/UX Enhancements by Me

Fully redesigned Login & Signup pages

Modern typography + spacing

Better card layouts

Clean dashboard look

Error handling UI

Mobile responsive

🛠 Tech Stack
Frontend

React + Vite

Tailwind CSS

Axios

Lucide React Icons

React Router

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL / MongoDB (depending on your repo version)

JSON Web Tokens (JWT)

Bcrypt

📦 Folder Structure
root/
│
├── backend/
│   ├── prisma/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── lib/
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

🛠 Installation & Setup (Local Machine)
1️⃣ Clone the Project
git clone https://github.com/soumiblink/RoxilerSystems-Assignment.git
cd your-repo-name

2️⃣ Backend Setup
cd backend
npm install

Create .env inside backend:
DATABASE_URL=your_database_url_here
JWT_SECRET=your_secret_here
PORT=3000

Generate Prisma Client
npx prisma generate

Start Backend
npm start


Backend runs on:

👉 http://localhost:3000

3️⃣ Frontend Setup
cd frontend
npm install

Create .env:
VITE_API_URL=http://localhost:3000

Start Frontend
npm run dev


Frontend runs on:

👉 http://localhost:5173





🧑‍💻 Author

Your Name
GitHub: https://github.com/soumiblink