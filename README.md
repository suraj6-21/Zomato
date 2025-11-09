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












// Frontend

# Authentication Pages - Setup Guide

## Overview
This package contains four authentication components with a minimal, seamless UI design featuring automatic light/dark mode support based on system preferences. The color scheme uses white and green combinations for an elegant, modern look.

## File Structure
```
src/
├── components/
│   ├── UserLogin.jsx
│   ├── UserRegister.jsx
│   ├── FoodPartnerLogin.jsx
│   └── FoodPartnerRegister.jsx
├── theme.css
├── App.jsx
└── tailwind.config.js
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Import CSS in your main entry file (index.js or main.jsx)
```javascript
import './theme.css';
import './index.css'; // Tailwind directives
```

### 3. Add Tailwind directives to your index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Components

### UserLogin
Simple login form for regular users with:
- Email and password fields
- Remember me checkbox
- Forgot password link
- Sign up redirect

### UserRegister
Registration form for new users with:
- Full name, email, phone fields
- Password and confirm password fields
- Terms and conditions checkbox
- Sign in redirect

### FoodPartnerLogin
Partner-specific login with:
- Business email field
- Password field
- Partner icon indicator
- Register business link

### FoodPartnerRegister
Comprehensive partner registration with:
- Business information section (name, type, address, contact)
- Owner information section (name, phone, password)
- Multi-column layout for better organization
- Business type dropdown
- Partner-specific terms


## Usage Example

```javascript
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import FoodPartnerLogin from './components/FoodPartnerLogin';
import FoodPartnerRegister from './components/FoodPartnerRegister';

function App() {
  return (
    <div>
      <UserLogin />
      {/* Or use other components */}
    </div>
  );
}
```

## Notes
- No form logic included (as requested)
- All styling uses Tailwind CSS with CSS variables
- Components are independent and can be used separately
- System preference detection is automatic
- All forms are UI-only templates ready for logic implementation