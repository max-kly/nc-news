# News portal
This project includes an API to fetch articles, topics, commets, users amd allows users to vote on an article or comment.
Full api description is availabe in `endpoints.json` file or [here](https://nc-news-ih3j.onrender.com/api)

Live demo is [here](https://nc-news-ih3j.onrender.com/).
---
## Setup

1. Fork the repo and clone it
2. Run `npm install` to install all packages
3. You will need to create 2 .env files for the project to run and work on it locally: `.env.test` and `.env.development`. Into each add `PGDATABASE=` with the correct database name for that environment (see `db/setup.sql`)
4. See `__tests__` folder to check integration and utils tests
---
## Packages
Project uses:
- express
- pg-format
- node-postgress
- dotenv
For tests are used:
- Jest
- Supertest
Min version of Node is **22.11.0**
Min version of Node Postres is **8.7.3**
--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
