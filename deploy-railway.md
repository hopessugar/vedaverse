# Railway Deployment - Step by Step

## Backend Deployment to Railway

### 1. Create Railway Account
- Visit https://railway.app
- Sign up with GitHub (easiest)

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository

### 3. Configure Service
- In project settings, click on your service
- Go to "Settings" tab
- Set **Root Directory** to: `server`

### 4. Add Environment Variables
Go to "Variables" tab and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vedaVerse?retryWrites=true&w=majority
JWT_SECRET=your_generated_secret_here
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

**Note:** Railway auto-sets PORT, don't override it.

### 5. Deploy
- Railway auto-detects Node.js
- It will run `npm install` and `npm start`
- Watch the deployment logs

### 6. Get Your URL
- Once deployed, Railway provides a URL
- Copy this URL - you'll need it for frontend `VITE_API_URL`

### 7. Update CORS (if needed)
Add to environment variables:
```
FRONTEND_URL=https://your-frontend.vercel.app
```

## Troubleshooting

- **Build fails:** Check that root directory is set to `server`
- **Port error:** Don't set PORT, Railway handles it
- **MongoDB error:** Check connection string format
- **404 on API:** Ensure routes are correct


