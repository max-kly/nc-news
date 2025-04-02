# 📝 NC NEWS - Blogging Platform (Backend)

NC NEWS is a full-stack blog platform consisting of **frontend** and **backend** parts.  
This repository contains the **backend** for the platform.

🔗 **Live API Demo:** [NC NEWS API](https://nc-news-yuce.onrender.com/api)  
🔗 **Frontend Repository:** [GitHub - NC NEWS Frontend](https://github.com/max-kly/fe-nc-news)  
🔗 **API Documentation:** Available in `endpoints.json` or [here](https://nc-news-yuce.onrender.com/api)  

---

## Features 🌍
NC NEWS allows users to:
- ✅ Create topics
- ✅ Create articles
- ✅ Leave comments
- ✅ Vote up or down articles
- ✅ Vote up or down comments

---

## Tech Stack ⚙️
- ⚡ NodeJS
- ⚡ PostgreSQL
- ⚡ ExpressJS
- ⚡ Supabase
- ⚡ Bcrypt
- ⚡ JWT
- ⚡ Jest & Supertest
- ⚡ Render

### Other Packages ⚙️
- ⚡ pg-format
- ⚡ node-postgres
- ⚡ dotenv
- ⚡ cors
- ⚡ Axios (used only for noSleep function and not essential in production or development)

---

## ❗ Requirements
| Package         | Version   |
|----------------|-----------|
| NodeJS         | `^22.11.0` |
| Axios          | `^0.27.2` |
| Bcrypt         | `^5.1.1` |
| CORS           | `^2.8.5` |
| dotenv         | `^16.0.0` |
| Express        | `^4.21.2` |
| JWT            | `^9.0.2` |
| Node Postgres  | `^8.7.3` |
| PG-format      | `^1.0.4` |

### Development Dependencies 🛠️
| Package        | Version   |
|---------------|-----------|
| Husky         | `^8.0.2` |
| Jest          | `^27.5.1` |
| Jest-extended | `^2.0.0` |
| Jest-sorted   | `^1.0.15` |
| Supertest     | `^7.0.0` |

---

## 👨‍💻 Installation

1. **Fork & Clone** this repository.
2. Open the terminal and install dependencies:
   ```sh
   npm install
   ```
3. Create two `.env` files:
   - `.env.development` with:
     ```sh
     PGDATABASE=nc_news
     ```
   - `.env.test` with:
     ```sh
     PGDATABASE=nc_news_test
     JWT_SECRET=*your-secret*
     JWT_EXPIRES_IN=1d
     ```
     *(Replace `*your-secret*` with a secure key and adjust expiration time as needed.)*
4. Set up local databases:
   ```sh
   npm run setup-dbs
   ```
5. Seed the database:
   ```sh
   npm run seed
   ```
6. Start the server:
   ```sh
   npm start
   ```
   *(You should see `Listening on 10000...`. Adjust the port if needed.)*
7. Run tests:
   ```sh
   npm run test
   ```

---

## 📁 Project Structure

```
📦 NC NEWS Backend
 ┣ 📂 __tests__       # Tests for API endpoints & helper functions
 ┣ 📂 .husky         # Pre-commit hooks enforcing test passes
 ┣ 📂 api            # Handles API logic
 ┃ ┣ 📂 controllers  # Handles incoming requests & responses
 ┃ ┣ 📂 models       # Handles CRUD operations in the database
 ┃ ┣ 📂 routers      # Routes API requests to controllers
 ┃ ┗ 📜 app.js       # Main server file
 ┣ 📂 db             # Database configuration & seeding
 ┃ ┣ 📂 data         # Development & test environment data
 ┃ ┣ 📂 seeds        # Seeds databases with dummy data
 ┃ ┣ 📜 connection.js # Database connection setup
 ┃ ┗ 📜 setup.sql    # Creates local databases
 ┣ 📜 README.md      # This file
```

---

## ☁️ Deployment (Render & Supabase)

1. Create a `.env.production` file with:
   ```sh
   DATABASE_URL=*your-database-url*
   JWT_SECRET=*your-secret*
   JWT_EXPIRES_IN=1d
   ```
2. Sign up on [Supabase](https://supabase.com) & create a database.
3. Copy the database connection string (from the *Transaction Pooler* section in Supabase).
4. Replace `*your-database-url*` in `.env.production` with your Supabase URL.
5. Seed production database (optional):
   ```sh
   npm run seed-prod
   ```
6. Deploy backend on [Render](https://render.com):
   - Sign up/log in to Render.
   - Create a new *Web Service*.
   - Connect the repository.
   - Set runtime to `Node`.
   - Set the environment variables from `.env.production`.
   - Choose a region (`Oregon`, `Ohio`, `Frankfurt`, `Singapore` based on user location).
   - Deploy the service.

---

## 🎓 Credits

This portfolio project was created as part of the **Digital Skills Bootcamp in Software Engineering** provided by [Northcoders](https://northcoders.com).
