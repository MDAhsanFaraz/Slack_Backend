# Slack Backend Project Documentation

## Overview
This project is a backend API for a Slack-like collaboration platform, built with Node.js, Express, and MongoDB (Mongoose). It supports user authentication, workspace and channel management, and real-time messaging features.

---

## Project Structure

```
src/
  config/           # Configuration files (DB, server, mail)
  controllers/      # Express route controllers for business logic
  middleware/       # Express middleware (e.g., authentication)
  repositories/     # Data access layer (Mongoose queries)
  routes/           # Express route definitions
  schema/           # Mongoose models (User, Workspace, Channel, Message)
  services/         # Business logic and orchestration
  utils/            # Utility functions and error handling
  validators/       # Request validation schemas
```

---

## Key Features
- **User Authentication**: Sign up, sign in, JWT-based auth, middleware for protected routes.
- **Workspace Management**: Create, join, and manage workspaces. Add members and channels.
- **Channel Management**: Create and manage channels within workspaces.
- **Messaging**: (Planned/Partial) Send and retrieve messages in channels.
- **Validation & Error Handling**: Centralized error and validation handling using custom error classes and middleware.

---

## Main Components

### 1. Controllers (`src/controllers/`)
- Handle HTTP requests and responses.
- Call service layer for business logic.
- Example: `workspaceController.js` manages workspace creation, error handling, and response formatting.

### 2. Services (`src/services/`)
- Contain business logic and orchestration.
- Example: `workspaceService.js` handles workspace creation, member addition, and channel setup.

### 3. Repositories (`src/repositories/`)
- Abstract database operations (CRUD) for each model.
- Example: `workspaceRepository.js` provides methods to find, create, and update workspaces.

### 4. Middleware (`src/middleware/`)
- Handle authentication, authorization, and request preprocessing.
- Example: `authMiddleware.js` checks JWT and attaches user to request.

### 5. Routes (`src/routes/`)
- Define API endpoints and route requests to controllers.
- Example: `routes/v1/workspaces.js` defines workspace-related endpoints.

### 6. Schema (`src/schema/`)
- Mongoose models for MongoDB collections.
- Example: `user.js`, `workspace.js`, `channel.js`, `message.js`.

### 7. Validators (`src/validators/`)
- Zod schemas for validating incoming requests.
- Example: `userSchema.js`, `workspaceSchema.js`.

### 8. Utils (`src/utils/`)
- Common utilities, error classes, and response formatting.
- Example: `responseObjects.js`, `clientError.js`, `ValidationError.js`.

---

## Error Handling
- Uses custom error classes (`ClientError`, `ValidationError`).
- Centralized error responses in controllers and middleware.
- All async operations use try/catch and return structured error responses.

---

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your MongoDB connection in `src/config/dbConfig.js`.
3. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints (Examples)
- `POST /api/v1/users/signup` — Register a new user
- `POST /api/v1/users/signin` — Authenticate user
- `POST /api/v1/workspaces` — Create a new workspace
- `POST /api/v1/channels` — Create a new channel

---

## Contribution & Further Development
- Add more features (e.g., direct messaging, file uploads, notifications)
- Improve test coverage
- Add real-time support (e.g., with Socket.io)

---

## License
MIT
