# Deployment Guide - Veda Verse

This guide will help you deploy Veda Verse to production.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or MongoDB instance)
- Deployment platform accounts (Vercel/Netlify for frontend, Railway/Heroku for backend)

## Environment Variables

### Backend (Server)

Create a `.env` file in the `server/` directory with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important:**
- `JWT_SECRET`: Use a long, random string for production (e.g., generate with `openssl rand -base64 32`)
- `MONGODB_URI`: Use MongoDB Atlas connection string in production
- `GEMINI_API_KEY`: Optional but required for AI features

### Frontend (Client)

For production builds, create a `.env` file in the `client/` directory (optional):

```env
VITE_API_URL=https://your-backend-api-url.com
```

If not set, the app will use relative paths (works when frontend and backend are on the same domain).

## Deployment Steps

### 1. Backend Deployment (Railway/Heroku)

#### Railway
1. Connect your GitHub repository
2. Select the `server` folder as the root directory
3. Add environment variables in Railway dashboard
4. Deploy

#### Heroku
1. Create a new Heroku app
2. Set buildpack: `heroku/nodejs`
3. Set root directory: `server`
4. Add environment variables: `heroku config:set KEY=value`
5. Deploy: `git subtree push --prefix server heroku main`

### 2. Frontend Deployment (Vercel/Netlify)

#### Vercel
1. Connect your GitHub repository
2. Root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable `VITE_API_URL` with your backend URL
6. Deploy

#### Netlify
1. Connect your GitHub repository
2. Base directory: `client`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable `VITE_API_URL` with your backend URL
6. Deploy

### 3. Database Setup

1. Create a MongoDB Atlas cluster (free tier available)
2. Create a database user
3. Whitelist your deployment platform IPs (or use 0.0.0.0/0 for Railway/Heroku)
4. Get connection string and update `MONGODB_URI`

## Post-Deployment Checklist

- [ ] Backend server is running and accessible
- [ ] Frontend is deployed and loading
- [ ] API endpoints are responding
- [ ] Database connection is working
- [ ] Authentication is working (register/login)
- [ ] Environment variables are set correctly
- [ ] CORS is configured properly (backend allows frontend domain)

## Troubleshooting

### CORS Errors
Update `server/index.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### API Not Found (404)
- Check that `VITE_API_URL` is set correctly in frontend
- Ensure backend is running and accessible
- Verify API routes are correct

### Database Connection Issues
- Check MongoDB Atlas connection string
- Verify IP whitelist includes deployment platform
- Check database user permissions

## Local Testing Before Deployment

1. Build frontend: `cd client && npm run build`
2. Test production build: `npm run preview` (in client directory)
3. Test server: `cd server && npm start`
4. Verify all environment variables are set

## Security Notes

- Never commit `.env` files to git
- Use strong, unique JWT_SECRET in production
- Enable HTTPS for production
- Use MongoDB Atlas with proper authentication
- Regularly update dependencies


