# 🚀 Quick Deployment Guide

Follow these steps to deploy your Veda Verse application in 10 minutes.

## Step 1: Prepare Backend Environment Variables

Create `server/.env` file (copy from `server/.env.example`):

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_a_random_secret_here
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=*
NODE_ENV=production
```

**To generate JWT_SECRET:**
```powershell
# Windows PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

## Step 2: Set Up MongoDB Atlas (if not done)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Whitelist IP: `0.0.0.0/0` (for now, restrict later)

## Step 3: Deploy Backend

### Option A: Railway (Easiest - Recommended)

1. Go to https://railway.app
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set root directory: `server`
6. Add environment variables:
   - `PORT` = `5000` (or leave default)
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = your generated secret
   - `GEMINI_API_KEY` = your API key (optional)
   - `NODE_ENV` = `production`
7. Deploy! Railway will auto-detect Node.js

**Get your backend URL:** Railway will provide a URL like `https://your-app.railway.app`

### Option B: Render

1. Go to https://render.com
2. Create account → New Web Service
3. Connect GitHub repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Root Directory: `server`
5. Add environment variables (same as above)
6. Deploy

## Step 4: Deploy Frontend

### Option A: Vercel (Recommended)

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Add Environment Variable:
   - `VITE_API_URL` = your backend URL (e.g., `https://your-app.railway.app`)
7. Deploy!

**Get your frontend URL:** Vercel provides like `https://your-app.vercel.app`

### Option B: Netlify

1. Go to https://netlify.com
2. Sign up → "Add new site" → "Import an existing project"
3. Connect GitHub repo
4. Build settings:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`
5. Add environment variable: `VITE_API_URL` = backend URL
6. Deploy

## Step 5: Update Backend CORS

Update `server/index.js` or add to environment variables:
```
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## Step 6: Test Deployment

1. Visit your frontend URL
2. Try to register/login
3. Test API endpoints

## 🎯 Quick Commands

### Generate JWT Secret (PowerShell)
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### Build for Production
```bash
cd client
npm run build
```

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string obtained
- [ ] JWT_SECRET generated
- [ ] Backend deployed and URL obtained
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] CORS updated with frontend URL
- [ ] Test registration/login
- [ ] Test API endpoints

## 🔗 Recommended Free Services

- **Backend:** Railway (free tier) or Render (free tier)
- **Frontend:** Vercel (free, unlimited) or Netlify (free tier)
- **Database:** MongoDB Atlas (free M0 tier)

## 📞 Need Help?

See `DEPLOYMENT.md` for detailed instructions.


