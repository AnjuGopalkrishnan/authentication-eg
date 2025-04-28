# A full-stack authentication starter app with NestJS, React and MongoDB

## Backend

```
cd server
npm install
# Set MongoDB connection string in environment variables
npm run start
```

- Framework: NestJS (TypeScript) — includes Auth and User modules.
- Database: MongoDB Atlas using the Mongoose library.
- Authentication:
  - JWT access tokens with expiration.
  - Tokens are stored securely in server-side HTTP-only cookies. Can be extended to support refresh tokens and token blacklisting for enhanced security.
- Additional Security:
  - CORS configuration.
  - HTTP security headers using the Helmet library.
- Logging: Using NestJS's built-in logging system.

## Frontend

```
cd client
npm install
npm run dev
```

- Framework: ReactJS (TypeScript) — built with Vite.
- Styling: Tailwind CSS.
- UI Components: Shadcn (headless components).
- State Management:
  - TanStack Query for asynchronous server state management (combined with React Hook Form).
  - Zustand for global client-side state management.
- Validation: Form validation using Yup.
