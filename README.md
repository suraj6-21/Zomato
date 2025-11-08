# Zomato
## Zomato Clone – Backend

A Node.js/Express backend for a Zomato-like food ordering platform. It provides authentication, partner/food management, media uploads, and MongoDB persistence. This service is designed to be consumed by a separate frontend.

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JSON Web Tokens (JWT), HTTP-only cookies
- **File Uploads**: Multer + ImageKit SDK
- **Other**: bcryptjs, dotenv, uuid

### Features
- **User authentication** with JWT and cookie-based sessions
- **Food partners and items** models and routes (create/list/update patterns)
- **Media uploads** via Multer and ImageKit
- **Modular architecture** with controllers, models, routes, and middleware

### Project Structure
```
backend/
  server.js                # App bootstrap (env → DB connect → start server)
  src/
    app.js                # Express app, middleware, and route mounting
    db/db.js              # Database connection
    routes/               # Route definitions
      auth.routes.js
      food.routes.js
    controllers/          # Route handlers
      auth.controller.js
      food.controller.js
    models/               # Mongoose schemas
      user.models.js
      foodPartner.model.js
      addFood.model.js
    middleware/           # Cross-cutting concerns
      auth.middleware.js
      upload.middleware.js
    services/
      storage.services.js # ImageKit storage helpers
```

### Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)
- ImageKit account (for media storage) – optional if uploads are not used in your flow

### Installation
1. Clone the repository and navigate to the backend folder:
   ```bash
   git clone <your-repo-url>
   cd Zomato/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in `backend/` (same level as `server.js`). Example:
```env
# Server
PORT=8000

# Database
MONGODB_URI=mongodb://localhost:27017/zomato

# Auth
JWT_SECRET=replace-with-strong-secret
JWT_EXPIRES_IN=7d

# Cookies
COOKIE_NAME=token
COOKIE_SECURE=false           # set true in production behind HTTPS
COOKIE_SAME_SITE=lax          # strict|lax|none
COOKIE_DOMAIN=localhost       # set your domain in production

# ImageKit (uploads)
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

Notes:
- Keys above are inferred from typical usage of ImageKit and JWT; confirm names with `storage.services.js` and auth middleware if you change them.
- For production, set `COOKIE_SECURE=true` and configure `COOKIE_DOMAIN` appropriately.

### Running the Server
From the `backend/` directory:
```bash
# Development
node server.js
```

If you prefer nodemon, install it locally or globally and use:
```bash
npx nodemon server.js
```

On startup, the server will:
1) Load env vars, 2) connect to MongoDB, 3) listen on `PORT` (default 8000).

### API Overview
Base URL: `http://localhost:<PORT>`

- `GET /` – Health check (simple text response)
- `POST /api/auth/...` – Authentication endpoints (login/register/logout, etc.)
- `GET|POST|PUT /api/food/...` – Food-related endpoints (items, partners, uploads)

Refer to `src/routes/auth.routes.js` and `src/routes/food.routes.js` for the exact paths and to corresponding controllers for request/response shapes.

### Security Considerations
- Store JWT in HTTP-only cookies; avoid exposing tokens to client JS.
- Use strong `JWT_SECRET` and rotate when necessary.
- Validate request payloads and enforce auth middleware on protected routes.
- In production, enable HTTPS and set secure cookie attributes.

### Common Scripts
`package.json` currently includes a placeholder `test` script. Run via Node directly:
```bash
node server.js
```
You may add:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Troubleshooting
- Cannot connect to DB: verify `MONGODB_URI` and network access to MongoDB.
- Upload errors: confirm ImageKit keys and `IMAGEKIT_URL_ENDPOINT`.
- Invalid token or unauthorized: ensure cookies are being set (check domain, sameSite, secure flags) and `JWT_SECRET` matches.

### License
ISC (as per `backend/package.json`). Replace or update as needed.
