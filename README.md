# Hosted Example
https://qsr-platform-frontend.web.app

# Setup for Local Environment
## Backend
- Ensure PostgreSQL is installed
- Create a new Postgres Database
- `cd backend`
- `npm install`
- Create `.env` file (example at `.env.example`)
- `npx prisma migrate dev --name init` to initialize db tables
- `npm run prisma:seed` to seed database with starter data
- `npm run start:dev` to start Nestjs server
- Import `backend/QSR-Platform.postman_collection.json` to test endpoints

## Frontend
- `cd frontend`
- `npm install`
- Create `.env` file (example at `.env.example`)
- `npm run dev` to start Vite development server

# Deployed Endpoints
Base API URL: `https://qsr-platform-backend-c4ae13a804c0.herokuapp.com`
- `/auth/login (POST)`
  - Authenticate a user and return a JWT token (and role)
- `/auth/register (POST)`
  - Register a new user
- `/menus (GET)`
  - Fetch all menu items
- `/menus/:id (GET)`
  - Fetch menu item by ID
- `/menus (POST)`
  - Add a new menu item (Admin only)
- `/menus/:id (PUT)`
  - Update an existing menu item by ID (Admin only)
- `/menus/:id (DELETE)`
  - Delete a menu item by ID (Admin only)


# Caveats
- Frontend has no UI to utilize the `/auth/register` endpoint
- Frontend "flashes" when refreshing the page while verifiying JWT token
- Frontend has not data validation outside of type (no length or number maximums)

# Architecture and Design Decisions

## Backend
- Everything was pretty straightforward based on the Assessment Instructions. I decided to add the `/menus/:id (GET)` endpoint so I could have individual routing pages on the frontend with each item.
- I modified the `/auth/login (POST)` endpoint to also return the user's role. Although the actual role-based access control was set up on the backend, I still didn't want to show the options to edit / delete Menu Items on the frontend.
- I chose Prisma for the backend <-> database communications even though it was my first time using it. It went very smoothly, and the Prisma Studio frontend it comes with is a very nice tool to interact with the database without having to use PGAdmin.
- I very much enjoyed using Nestjs for the first time. Nestjs makes it easy for everything to be organized and scale well. I can also see how it feels very similar to Angular.
- I did not end up commenting much of my code, partially because of time limitation, and partially in an effort to practice good naming conventions to reduce unecessary comments.
- I deployed the backend on Heroku, as that's what I'm most familiar using for node apps.
- I chose to create unit tests for the Auth Service and the Menus Controller - I figured those were two of the most significant pieces of the backend.


## Frontend
- I chose to use React for the frontend in order to get it done quickly. I had started with Angular, but it looked like a new version had just come out a few days ago, causing a lot of documentation online to be not necessarily accurate. I learned Angular in my Web Development class in college, but have mostly used Svelte and React since. This is also the case with learning Typescript in that class but using Javascript since. That was a lot easier of a pivot than getting Angular set up. I definitely appreciate the strongly-typed aspect, and see how it's useful at scale.
- Frontend login hero image sourced from https://undraw.co
- I used Tailwind for styling the frontend - I have been a huge fan of it for years.
- Since React + Vite doesn't come with a production server, I built that application and deployed it on Firebase.