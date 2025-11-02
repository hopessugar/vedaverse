# Quick Deployment Guide

## ✅ Pre-Deployment Checklist

1. **Environment Variables Setup**
   - Create `server/.env` file (see DEPLOYMENT.md for details)
   - Set `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`

2. **Build the Application**
   ```bash
   # Build frontend
   cd client
   npm run build
   ```

3. **Test Locally**
   ```bash
   # Start server
   cd server
   npm start
   
   # Server should run on http://localhost:5000
   ```

## 🚀 Deployment Options

### Option 1: Separate Deployment (Recommended)

**Frontend → Vercel/Netlify**
- Deploy `client/` folder
- Set `VITE_API_URL` environment variable to your backend URL

**Backend → Railway/Heroku**
- Deploy `server/` folder
- Set all environment variables
- Ensure MongoDB Atlas connection is configured

### Option 2: Unified Deployment (Vercel)

- Deploy entire project to Vercel
- Use `vercel.json` configuration
- Set environment variables in Vercel dashboard

## 📋 Environment Variables

### Backend (.env in server/)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-frontend-url.com
NODE_ENV=production
```

### Frontend (.env in client/ - optional)
```
VITE_API_URL=https://your-backend-url.com
```

## 🔧 Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Set `FRONTEND_URL` in backend `.env` to your frontend domain

### Issue: API 404 Errors
**Solution**: Check that `VITE_API_URL` is set correctly in frontend environment

### Issue: Database Connection Failed
**Solution**: 
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for Railway/Heroku)

### Issue: Build Fails
**Solution**: 
- Run `npm install` in both `client/` and `server/` directories
- Check Node.js version (requires v16+)

## 📞 Support

For detailed deployment instructions, see `DEPLOYMENT.md`


