# 🚀 Simple Deployment Guide

Deploy your Veda Verse app in 10 minutes!

## Quick Overview

- **Backend**: Railway (free)
- **Frontend**: Vercel (free)  
- **Database**: MongoDB Atlas (free)

---

## ⚠️ IMPORTANT: Push to GitHub First!

**Your code must be on GitHub before deploying!**

If your code is only local:
1. Read **`PUSH-TO-GITHUB.md`** first
2. Push your code to GitHub
3. Come back here and continue!

---

## 📦 Step 1: Prepare Your Code

1. **Make sure your code is on GitHub**
   - If not on GitHub yet, see **`PUSH-TO-GITHUB.md`**
   - Once on GitHub, you're ready!

2. **Note down your MongoDB Atlas connection string**
   - Format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/vedaVerse?retryWrites=true&w=majority`

3. **Note down your Gemini API key**
   - You already have this: `AIzaSyB6112TtdEAIjqscWHR84oBq97g7yzo8BE`

---

## 🔧 Step 2: Deploy Backend (Railway)

### 2.1 Setup Railway
1. Go to **[railway.app](https://railway.app)** → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository

### 2.2 Configure Service
1. Click on your service
2. Go to **Settings** tab
3. Set **Root Directory** to: `server`
4. Go to **Variables** tab → Add these:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://vyassilky1130_db_user:bangtan07@cluster0.m1slaxi.mongodb.net/vedaVerse?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_12345_replace_with_random_string
GEMINI_API_KEY=AIzaSyB6112TtdEAIjqscWHR84oBq97g7yzo8BE
FRONTEND_URL=https://your-frontend.vercel.app
```

**Important:** 
- Replace `your_super_secret_jwt_key_12345_replace_with_random_string` with a random string (you can generate one [here](https://randomkeygen.com/))
- Leave `FRONTEND_URL` for now - we'll update it after frontend is deployed

### 2.3 Get Backend URL
1. Railway will auto-deploy
2. Go to **Settings** → **Generate Domain**
3. Copy your backend URL (e.g., `https://your-app.railway.app`)
4. **Save this URL!** You'll need it in Step 3

---

## 🎨 Step 3: Deploy Frontend (Vercel)

### 3.1 Setup Vercel
1. Go to **[vercel.com](https://vercel.com)** → Sign up with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository

### 3.2 Configure Project
- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3 Set Environment Variable
Before deploying, click **"Environment Variables"** → Add:

```
VITE_API_URL=https://your-backend-url.railway.app
```

**Important:** Replace `https://your-backend-url.railway.app` with the Railway URL from Step 2.3!

### 3.4 Deploy
Click **"Deploy"** → Wait 2-3 minutes

### 3.5 Get Frontend URL
After deployment, Vercel gives you a URL like:
- `https://your-app.vercel.app`
- **Copy this URL**

### 3.6 Update Backend CORS
1. Go back to **Railway**
2. Update `FRONTEND_URL` variable to your Vercel URL
3. Railway will auto-redeploy

---

## ✅ Step 4: Test Everything

1. **Open your Vercel frontend URL**
2. **Try to register** a new account
3. **Try to login**
4. **Test plan generation**

---

## 🎉 Done!

Your app is now live! Share your **Vercel URL** with anyone.

**Your URLs:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`

---

## 🔍 Troubleshooting

### Can't connect to backend?
- Check `VITE_API_URL` in Vercel matches Railway URL
- Check Railway logs (Service → Deployments → View logs)
- Make sure Railway service is running

### Database errors?
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify `MONGODB_URI` in Railway has correct password
- Check Railway logs for connection errors

### Authentication not working?
- Verify `JWT_SECRET` is set in Railway
- Check browser console (F12) for errors
- Make sure tokens are in localStorage

---

## 📝 Quick Checklist

- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] `VITE_API_URL` set in Vercel
- [ ] `FRONTEND_URL` updated in Railway
- [ ] MongoDB Atlas connection working
- [ ] Tested registration/login
- [ ] Tested plan generation

**You're all set! 🚀**

