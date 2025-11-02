# 🚀 Quick Deployment Guide - Veda Verse

This guide will help you deploy your Veda Verse application so it works for anyone with the link.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas connection string ready
- [ ] Gemini API key ready  
- [ ] GitHub repository created and code pushed
- [ ] Accounts created: Railway (backend) + Vercel (frontend)

---

## 🎯 Deployment Strategy

**Backend** → Railway (Free tier available)  
**Frontend** → Vercel (Free tier available)  
**Database** → MongoDB Atlas (Free tier available)

---

## Step 1: Deploy Backend (Railway)

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"

### 1.2 Deploy Backend
1. Click "Deploy from GitHub repo"
2. Select your repository
3. Click "Configure Service"
4. Set these settings:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
   - **Build Command**: (leave empty)

### 1.3 Set Environment Variables
Click on your service → Variables tab → Add these:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_random_secret_here
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Important:**
- Replace `your_mongodb_atlas_connection_string` with your MongoDB Atlas connection string
- Generate JWT_SECRET: Use a long random string (you can use: `openssl rand -base64 32` or any online generator)
- Replace `your-vercel-app.vercel.app` with your actual Vercel frontend URL (we'll get this in Step 2)

### 1.4 Get Backend URL
1. Click on your service
2. Click "Settings" → "Generate Domain"
3. Copy the URL (e.g., `https://your-app.railway.app`)
4. **Save this URL** - you'll need it for Step 2!

---

## Step 2: Deploy Frontend (Vercel)

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"

### 2.2 Deploy Frontend
1. Import your GitHub repository
2. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 2.3 Set Environment Variables
Go to Project Settings → Environment Variables → Add:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

**Important:** Replace `https://your-backend-url.railway.app` with the Railway URL you got in Step 1.4!

### 2.4 Get Frontend URL
After deployment, Vercel will give you a URL like:
- `https://your-app.vercel.app`
- **Copy this URL**

### 2.5 Update Backend CORS
1. Go back to Railway
2. Update the `FRONTEND_URL` environment variable to your Vercel URL
3. Railway will automatically redeploy

---

## Step 3: MongoDB Atlas Setup

### 3.1 Create Cluster (if not done)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Wait for cluster to finish creating

### 3.2 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username/password
4. **Save the password!** (you'll need it for connection string)

### 3.3 Whitelist IP Address
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add Railway/Vercel IPs)
4. Click "Confirm"

### 3.4 Get Connection String
1. Go to "Database" → "Connect"
2. Click "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `vedaVerse` (or your preferred database name)
6. **Use this in Railway `MONGODB_URI` variable**

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/vedaVerse?retryWrites=true&w=majority
```

---

## Step 4: Test Your Deployment

### 4.1 Test Backend
Open in browser:
```
https://your-backend-url.railway.app/api/users
```
Should see: `[]` or user data (not an error)

### 4.2 Test Frontend
1. Open your Vercel URL
2. Try to register a new account
3. Try to login
4. Test the plan generation feature

### 4.3 Check Logs
- **Railway**: Service → Deployments → View logs
- **Vercel**: Project → Deployments → Click deployment → View logs

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- ✅ Check `VITE_API_URL` in Vercel matches Railway URL
- ✅ Check Railway backend is running (check logs)
- ✅ Verify CORS: `FRONTEND_URL` in Railway matches Vercel URL

### Database connection errors
- ✅ Check MongoDB Atlas IP whitelist includes Railway IPs (or 0.0.0.0/0)
- ✅ Verify `MONGODB_URI` has correct password and database name
- ✅ Check Railway logs for connection errors

### Authentication not working
- ✅ Verify `JWT_SECRET` is set in Railway
- ✅ Check browser console for API errors
- ✅ Verify tokens are being sent in requests

### Plan generation not working
- ✅ Check `GEMINI_API_KEY` is set correctly
- ✅ Verify backend logs for AI service errors
- ✅ Check Railway logs for detailed error messages

---

## 🔄 Updating Your Deployment

### Update Backend
1. Push changes to GitHub
2. Railway auto-deploys on push
3. Check Railway logs for deployment status

### Update Frontend
1. Push changes to GitHub
2. Vercel auto-deploys on push
3. Check Vercel dashboard for deployment status

---

## 📝 Final URLs Checklist

After deployment, you should have:

- ✅ **Backend URL**: `https://your-app.railway.app`
- ✅ **Frontend URL**: `https://your-app.vercel.app`
- ✅ **Database**: MongoDB Atlas cluster running

Share your **Frontend URL** with anyone - it will work just like localhost! 🎉

---

## 🎉 You're Done!

Your app is now live and accessible to anyone with the link!

**Next Steps:**
- Share your Vercel frontend URL
- Monitor Railway logs for any issues
- Set up custom domain (optional, in Vercel settings)

