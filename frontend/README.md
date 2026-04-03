# Praxis Task Management - Frontend

A minimal, performant, and responsive React frontend for the Praxis Task Management system, crafted following straightforward architectural principles and leveraging modern React hooks without overly complex component libraries.

## Features

- **Authentication System**: Secure login and registration flows communicating with a JWT-based backend wrapper (`api/client.js`).
- **Task Management Dashboard**: Create, Read, Update, and Delete tasks efficiently.
- **Dynamic Task Filtering**: Filter tasks through query parameters dynamically updating browser routing (`?status=todo&priority=high`).
- **Centralized Toast Notifications**: Seamless success and error feedback propagated via Context API.
- **Pure CSS**: All styling is driven directly from an `index.css` file leveraging CSS primitives, responsive grid layouts, and consistent design variables rather than external styling frameworks.

---

## Architecture

### 1. State & Context Hooks (`src/context`)

Global states necessary for the functionality of the system:

- `AuthContext`: Instantiates the `user` token lifecycle. Checks `localStorage` recursively on initialization to prevent UI flashes. Contains `login()` and `logout()` implementations.
- `NotificationContext`: A custom utility that manages transient toast messages system-wide, clearing itself asynchronously after 5 seconds.

### 2. Custom Data Hooks (`src/hooks`)

- `useTaskResources`: Centralizes React state definitions (`tasks`, `isLoading`) alongside callback modifiers (`createTask`, `updateTask`, `deleteTask`) interacting with the services. Effectively handles caching array references natively without relying on heavy tools like React Query, but using the same interface signatures.

### 3. API & Service Connectors (`src/api`, `src/services`)

- **`api/client.js`**: An authenticated abstraction layer operating over the native `fetch` Web API. It auto-injects bearer tokens and systematically detects HTTP Error `401 Unauthorized` thresholds to securely route users out of protected zones.
- **`services/tasks.js`**: Encapsulates external API URIs related directly to the Task model.
- **`services/auth.js`**: Encapsulates endpoints mapping explicitly against authentication procedures.

### 4. Components (`src/components`)

Pure React Functional Components formatted entirely as arrow functions:

- `TaskCard`: Presents task meta attributes (title, status badge, description) alongside inline selects targeting instant mutations.
- `TaskForm`: Uses controlled fields handling both Create and Edit workflows.
- `TaskFilters`: Dropdown filters emitting queries intercepted directly by `DashboardPage` pushing against `useSearchParams`.
- `ProtectedRoute`: Context boundary validating authorization before yielding downstream layout (`Outlet`).

---

## API Endpoints Consumed

### Auth

- `POST /api/auth/register` - Create user identities.
- `POST /api/auth/login` - Handshake for standard `token` and `user` data logic.
- `POST /api/auth/logout`

### Tasks

- `GET /api/tasks` - Fetches User's designated tasks (`?status={string}&priority={string}` conditionally included).
- `POST /api/tasks` - Build out new elements in the user space.
- `PATCH /api/tasks/:id` - Update the properties/payloads of an existing structural task.
- `DELETE /api/tasks/:id` - Destroy a target task payload by distinct ID.

---

## Tech Stack Setup

- **React 19**
- **Vite**
- **React-Router-Dom v6**

### Environment Variables

Create a `.env` file in the root of the project to configure the API endpoint:

```env
VITE_API_URL=http://localhost:4000/api
```

### Getting Started

Install modules and dependencies:

```bash
npm install
```

Start the Vite Developer Server:

```bash
npm run dev
```

Build for Production

```bash
npm run build
```

Verify standard structural styling logic:

```bash
npm run format
npm run lint
```
