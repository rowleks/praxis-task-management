/* eslint-disable no-undef */

/* This script runs once when the MongoDB container is first initialised. It creates the application database, a dedicated app user, and seeds initial users and tasks. */

db = db.getSiblingDB('the_database')

// ── App user ────────────────────────────────────────────────────────────────
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [{ role: 'readWrite', db: 'the_database' }],
})

// ── Users ────────────────────────────────────────────────────────────────────
// Passwords are bcrypt hashes of "password123" (10 rounds)
const now = new Date()

const adminId = new ObjectId()
const johnId = new ObjectId()
const janeId = new ObjectId()
const bobId = new ObjectId()

db.users.insertMany([
  {
    _id: adminId,
    name: 'Admin User',
    email: 'admin@praxis.com',
    password: '$2b$10$9QrlSrtlIQ7ttLnQOuE4eOvYoXlSTXIg0ulDTDF4wLNZ2erMITJOa',
    role: 'admin',
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: johnId,
    name: 'John Doe',
    email: 'john@praxis.com',
    password: '$2b$10$9QrlSrtlIQ7ttLnQOuE4eOvYoXlSTXIg0ulDTDF4wLNZ2erMITJOa',
    role: 'user',
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: janeId,
    name: 'Jane Smith',
    email: 'jane@praxis.com',
    password: '$2b$10$9QrlSrtlIQ7ttLnQOuE4eOvYoXlSTXIg0ulDTDF4wLNZ2erMITJOa',
    role: 'user',
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: bobId,
    name: 'Bob Wilson',
    email: 'bob@praxis.com',
    password: '$2b$10$9QrlSrtlIQ7ttLnQOuE4eOvYoXlSTXIg0ulDTDF4wLNZ2erMITJOa',
    role: 'user',
    createdAt: now,
    updatedAt: now,
  },
])

// ── Tasks ────────────────────────────────────────────────────────────────────
db.tasks.insertMany([
  // Admin tasks
  {
    _id: new ObjectId(),
    userId: adminId,
    title: 'Review pull requests',
    description: 'Go through open PRs and leave feedback.',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date('2026-04-25'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: adminId,
    title: 'Update team permissions',
    description: 'Audit and update role assignments for new hires.',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date('2026-04-30'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: adminId,
    title: 'Quarterly report',
    description: 'Compile metrics and write the Q1 summary.',
    priority: 'high',
    status: 'done',
    dueDate: new Date('2026-04-01'),
    createdAt: now,
    updatedAt: now,
  },

  // John tasks
  {
    _id: new ObjectId(),
    userId: johnId,
    title: 'Set up project scaffolding',
    description: 'Initialise repo, configure linting and CI pipeline.',
    priority: 'high',
    status: 'done',
    dueDate: new Date('2026-04-10'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: johnId,
    title: 'Build REST API endpoints',
    description: 'Implement CRUD routes for tasks and users.',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date('2026-04-28'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: johnId,
    title: 'Write unit tests',
    description: 'Cover service layer with Jest tests.',
    priority: 'medium',
    status: 'todo',
    dueDate: new Date('2026-05-05'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: johnId,
    title: 'Write API documentation',
    description: 'Document all endpoints using OpenAPI / Swagger.',
    priority: 'low',
    status: 'todo',
    dueDate: new Date('2026-05-10'),
    createdAt: now,
    updatedAt: now,
  },

  // Jane tasks
  {
    _id: new ObjectId(),
    userId: janeId,
    title: 'Design system audit',
    description: 'Check component library for inconsistencies.',
    priority: 'medium',
    status: 'done',
    dueDate: new Date('2026-04-15'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: janeId,
    title: 'Implement dark mode',
    description: 'Add theme toggle and persist preference in localStorage.',
    priority: 'low',
    status: 'in-progress',
    dueDate: new Date('2026-05-01'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: janeId,
    title: 'Accessibility review',
    description: 'Run axe-core audit and fix WCAG AA violations.',
    priority: 'high',
    status: 'todo',
    dueDate: new Date('2026-05-08'),
    createdAt: now,
    updatedAt: now,
  },

  // Bob tasks
  {
    _id: new ObjectId(),
    userId: bobId,
    title: 'Database indexing',
    description: 'Analyse slow queries and add missing indexes.',
    priority: 'high',
    status: 'done',
    dueDate: new Date('2026-04-12'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: bobId,
    title: 'Set up Redis caching',
    description: 'Cache frequent read queries to reduce DB load.',
    priority: 'medium',
    status: 'in-progress',
    dueDate: new Date('2026-04-29'),
    createdAt: now,
    updatedAt: now,
  },
  {
    _id: new ObjectId(),
    userId: bobId,
    title: 'Migrate to managed DB',
    description: 'Move from self-hosted Mongo to Atlas free tier.',
    priority: 'low',
    status: 'todo',
    dueDate: new Date('2026-05-15'),
    createdAt: now,
    updatedAt: now,
  },
])
