# Praxis Task Management

A comprehensive Task Management System consisting of a Node.js/Express backend and a React frontend. The application allows users to register, log in, and manage their tasks with features like filtering, prioritization, and status tracking.

## Repository Structure

- [`/backend`](./backend/): The RESTful API built with Node.js, Express, and MongoDB.
- [`/frontend`](./frontend/): The React SPA (Single Page Application) built with Vite and React Router.

---

## Backend (`/backend`)

The backend is a secure RESTful API serving JSON data, protected by JWT authentication.

### Features
- **User Authentication**: Register, login, and logout endpoints securely issuing and invalidating JWTs. Includes role-based access.
- **Task Management**: Endpoints to create, read, update, and delete tasks strictly belonging to the authenticated user.
- **Filtering**: Comprehensive query parameter support on task retrieval (e.g., `?status=todo&priority=high`).
- **Database**: MongoDB integration using Mongoose for schemas, queries, and constraints.

### Quick Start

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables by copying `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Be sure to provide a valid `DB_URI` MongoDB connection string).*
4. Start the development server:
   ```bash
   npm run dev
   ```

*(For more details, see the [`backend/README.md`](./backend/README.md))*

---

## Frontend (`/frontend`)

The frontend is a minimal, performant, and responsive React application utilizing modern React hooks and standard CSS without relying on heavy external styling libraries.

### Features
- **Secure Access**: Protected routing ensuring only authenticated users can view the task dashboard and forms.
- **Dynamic Task Dashboard**: Real-time listing, creating, and updating of tasks natively utilizing `fetch` abstractions (`api/client.js`).
- **Centralized Toasts**: Toast notifications via a global Context API for responsive system feedback on API interactions.
- **Pure CSS**: All structural and presentational styling is driven directly from an `index.css` file leveraging CSS primitives and responsive grid layouts.

### Quick Start

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables by creating a `.env` file:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

*(For more details, see the [`frontend/README.md`](./frontend/README.md))*

---

## Running the Complete Application Locally (Single Port)

If you wish to serve the entire application from a single port by serving the compiled frontend artifacts off the backend's Express server:

1. First, navigate to the `backend` folder and run the automated UI build script:
   ```bash
   cd backend
   npm run build:ui
   ```
   *This command cleans the backend's `dist` folder, natively builds the sibling `frontend` project, and copies the resulting static assets into your backend.*
2. Start the backend server:
   ```bash
   npm run dev
   ```
3. Visit [http://localhost:4000](http://localhost:4000) (or whichever PORT you specified in your `.env`) in your browser. The backend will now serve the compiled React SPA from its root path, alongside operating the `/api` data plane dynamically.
