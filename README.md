# 📝 NC NEWS - Blog platform
NC NEWS is a blog platform that allows users to:
- Create topics
- Create articles
- Leave comments
- Vote up or down articles
- Vote up or down comments
<br />

Application consists from 2 parts: backend and frontend<br />
<br />

This repo contains a backend for blog platofrm<br />
Full api description is availabe in `endpoints.json` file or [here](https://nc-news-yuce.onrender.com/api) <br />
Live demo is [here](https://nc-news-yuce.onrender.com/api)<br />
Frontend repo to take a look or clone is [here](https://github.com/max-kly/fe-nc-news/)<br />

--- 
## Tech stack ⚙️
- ⚡ NodeJS
- ⚡ PostgreSQL
- ⚡ ExpressJS
- ⚡ Supabase
- ⚡ Bcrypt
- ⚡ JWT
- ⚡ Jest & Supertest
- ⚡ Render
## Other packages ⚙️
- ⚡ pg-format
- ⚡ node-postgress
- ⚡ dotenv
- ⚡ cors
- ⚡ Axios (used only for noSleep function and not essential on production or development)
---
## Requirements ❗️
- Node version is **^22.11.0**
- Axios version is **^0.27.2**
- Bcrypt version is **^5.1.1**
- CORS version is **^2.8.5**
- dotenv version is **^16.0.0**
- Express version is **^4.21.2**
- JWT (jsonwebtoken) version is **^9.0.2**
- Node Postgress version is **^8.7.3**
- PG-format version is **^1.0.4**
## Development dependencies 🛠️
- Husky version is **^8.0.2**
- Jest version is **^27.5.1**
- Jest-extended version is **^2.0.0**
- Jest-sorted version is **^1.0.15**
- Supertest version is **^7.0.0**
--- 
## Instructions 👨‍💻
1. Fork the repo and clone it down
2. Open up your terminal and run `npm install` to install all required packages
3. Create 2 `.env` files called: `.env.development` and `.env.test`
4. In `.env.development` add `PGDATABASE=nc_news` and in `.env.test` add `PGDATABASE=nc_news_test`
5. In `.env.test` add JWT keys, such as: `JWT_SECRET=*your-secret*`, `JWT_EXPIRES_IN=1d`. You can use any possible way to generate your `JWT secret` and make you sure you change `*your-secret*` tou your actual key. Feel free to adjust JWT expiration as needed.
6. Run a `npm run setup-dbs` to create local databases for development and testing purposes
7. Run `npm run seed` command to seed local databases with dummy data for development and testing purposes
8. Run `npm start` command to start the server locally and you should see `Listening on 10000...` message. Feel free to adjust your port, default port in the project is Render's port
9. Run `npm run test` command to run the suit of tests and to make sure everything is setup properly
---
## Project structure explanation 📁
- `__tests__` ➡️ includes tests for current endpoints and "helping" functions
- `.husky` ➡️ runs pre-commit tests and will not allow you to commit any changes if et least one test fails
- `api` ➡️ contains functions that make queries to database
- - `app.js` ➡️ main server file that handles requests to API endpoints
- - `controllers` ➡️ files responsible for receiving requests and sending responses
- - `models` ➡️ files responsible for CRUD operations within your database
- - `routers` ➡️ files that route requests from specific endpoints to controllers
- `db` ➡️ contains data for seeding databases and configuration for database connection
- - `data` ➡️  files containing data for development and test environments
- - `seeds` ➡️  files responsible for using development and test data to seed databases in different environments
- - `connection.js` ➡️ sets up the connection to the databases based on the environment
- - `setup.sql` ➡️ creates local databases for development and testing environment
---
## Deployment ☁️
1. Create `.env.production` file and copy your `JWT secret` and `JWT expiration` from `.env.test` or use new ones if needed
2. Go to [Supabase](https://supabase.com) and create an account
3. Save you database password from Supabase setup
4. In your Supabase account click on Connect and copy your database connection from Transaction pooler section
5. In `.env.production` also add `DATABASE_URL=*your-database-url*` and make sure to change `*your-database-url*` to your actual URL you have copied in `Step 4`
6. Run `npm run seed-prod` command to seed your production database on Supabase if you want to have pre-created content on your blogging platform
7. Go to the [Render](https://render.com) and create a new account or sign in to existing one
8. Choose `Web services` option if you just signed up or click on `Add new` and then `Web service` if you already have an account
9. Pick a `Git Provider` or `Public Git Repository` to connect the repo you are going to deploy
10. Make sure language is set to `Node`
11. Set up your deployment branch if it is different from `main`
12. Pick a region where you want your servers to be located. 
- Choose `Oregon` or `Ohio` if you and your users are located in USA
- Choose `Frankfurt` if you and your users are located in Europe
- Choose `Singapore` if you and your users are located in Asia
13. Leave Root Directory empty if project structure remained without changes or specify your Root Directory
14. Add your environmental variables such as `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN` from your `.env.production` file. You can do it manually or by uploading your file.
<br />
<br />
<br />

---
This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com)