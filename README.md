# Setup for Local Environment
## Backend
- Ensure PostgreSQL is installed
- `cd backend`
- `npm install`
- Create `.env` file (example at `.env.example`)
- `npx prisma migrate dev --name init` to initialize db tables
- `npm run prisma:seed` to seed database with starter data

## Frontend
- `cd frontend`
- `npm install`
- Create `.env` file (example at `.env.example`)
- `npm run dev`

# Deployed Endpoints
Base API URL: `https://qsr-platform-backend-c4ae13a804c0.herokuapp.com`
- `/auth/login (POST)`
  - Authenticate a user and return a JWT token
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