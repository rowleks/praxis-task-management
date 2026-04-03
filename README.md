# Task Management API

A RESTful API for managing tasks, built with Node.js, Express, MongoDB, and JWT authentication.

---

## Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB instance
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension (for API testing)

---

## Setup

1. Clone the repository and navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example env file and fill in your values:

   ```bash
   cp .env.example .env
   ```

4. Update `.env`:

   ```env
   PORT=4000
   DB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=1hr
   ```

5. (Optional) Seed the database with sample data:

   ```bash
   npm run seed
   ```

   This creates two users:
   - Admin — `admin@praxis.com` / `password123`
   - User — `user@praxis.com` / `password123`

6. Start the server:

   ```bash
   npm run dev
   ```

---

## Project Structure

```
backend/
├── controllers/       # Request/response handling
├── database/          # Mongoose connection + schemas + seed
├── middlewares/       # Auth, validation, error handling
├── model/             # Mongoose models
├── requests/          # REST Client .http files
├── routes/            # Express routers
├── services/          # Business logic
├── utils/             # Shared helpers
├── index.js           # Entry point
└── server.js          # Express app setup
```

---

## API Testing with REST Client

1. Install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension in VS Code
2. Open any file in the `requests/` folder
3. Set the `@token` variable at the top of the file after registeration and logging in
4. Click **Send Request** above any request block to execute it

---

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint             | Description               | Auth |
| ------ | -------------------- | ------------------------- | ---- |
| POST   | `/api/auth/register` | Register a new user       | No   |
| POST   | `/api/auth/login`    | Login, returns JWT + user | No   |
| POST   | `/api/auth/logout`   | Invalidate token          | Yes  |

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "<jwt>",
    "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
  }
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

---

### Tasks — `/api/tasks` (all require auth)

| Method | Endpoint                   | Description                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/api/tasks`               | Get all tasks for logged-in user |
| GET    | `/api/tasks?status=todo`   | Filter by status                 |
| GET    | `/api/tasks?priority=high` | Filter by priority               |
| GET    | `/api/tasks/:id`           | Get task by ID                   |
| POST   | `/api/tasks`               | Create a task                    |
| PATCH  | `/api/tasks/:id`           | Partial update a task            |
| DELETE | `/api/tasks/:id`           | Delete a task                    |

#### Create Task

```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My task",
  "description": "Optional description",
  "dueDate": "2026-05-01",
  "priority": "high",
  "status": "todo"
}
```

#### Update Task

```http
PATCH /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress"
}
```

Valid values:

- `priority`: `low` | `medium` | `high`
- `status`: `todo` | `in-progress` | `done`

---

### Users — `/api/users` (all require auth)

| Method | Endpoint         | Description    | Role       |
| ------ | ---------------- | -------------- | ---------- |
| GET    | `/api/users`     | Get all users  | Admin only |
| GET    | `/api/users/:id` | Get user by ID | Any        |
| PUT    | `/api/users/:id` | Update user    | Any        |
| DELETE | `/api/users/:id` | Delete user    | Any        |

---

## Response Shape

Success:

```json
{ "success": true, "data": {} }
```

Error:

```json
{ "success": false, "message": "Description of error" }
```

---

## Error Codes

| Code | Meaning                                           |
| ---- | ------------------------------------------------- |
| 400  | Validation error / malformed ID / duplicate email |
| 401  | Missing, invalid, or blacklisted token            |
| 403  | Forbidden — unauthorized request                  |
| 404  | Resource not found                                |
| 500  | Internal server error                             |
