# 🚀 Start Deployment Now!

Your code is on GitHub! Now let's deploy it.

---

## ✅ What's Done:
- ✅ Code pushed to: https://github.com/hopessugar/vedaverse
- ✅ Repository is ready
- ✅ Now let's deploy!

---

## 🎯 Deployment Steps

### Step 1: Deploy Backend (Railway)

1. **Go to [railway.app](https://railway.app)**
   - Sign up with GitHub (same account: hopessugar)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: **vedaverse** repository
   - Click "Deploy Now"

3. **Configure Service**
   - Click on your service
   - Go to **Settings** tab
   - Set **Root Directory**: `server`
   - Leave other settings as default

4. **Add Environment Variables**
   - Go to **Variables** tab
   - Click **"New Variable"**
   - Add these one by one:

   ```
   PORT = 5000
   ```

   ```
   NODE_ENV = production
   ```

   ```
   MONGODB_URI = mongodb+srv://vyassilky1130_db_user:bangtan07@cluster0.m1slaxi.mongodb.net/vedaVerse?retryWrites=true&w=majority
   ```

   ```
   JWT_SECRET = veda_verse_secret_key_2024_production_replace_with_random
   ```
   *(Replace the JWT_SECRET with a random string - you can use any random text)*

   ```
   GEMINI_API_KEY = AIzaSyB6112TtdEAIjqscWHR84oBq97g7yzo8BE
   ```

   ```
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
   *(Leave this for now - we'll update it after frontend is deployed)*

5. **Get Your Backend URL**
   - Railway will auto-deploy
   - Go to **Settings** → **Generate Domain**
   - Copy the URL (e.g., `https://veda-verse-production.up.railway.app`)
   - **Save this URL!** You'll need it for Step 2

---

### Step 2: Deploy Frontend (Vercel)

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up with GitHub (same account: hopessugar)

2. **Import Project**
   - Click "Add New Project"
   - Import from GitHub
   - Select: **vedaverse** repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variable**
   - Click **"Environment Variables"**
   - Add new variable:
     - **Name**: `VITE_API_URL`
     - **Value**: Your Railway backend URL from Step 1.5
     - Example: `https://veda-verse-production.up.railway.app`

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Vercel will give you a URL (e.g., `https://veda-verse.vercel.app`)
   - **Copy this URL!**

6. **Update Backend CORS**
   - Go back to **Railway**
   - Update the `FRONTEND_URL` variable to your Vercel URL
   - Railway will auto-redeploy

---

## ✅ Test Your Deployment

1. Open your Vercel frontend URL
2. Try to register a new account
3. Try to login
4. Test plan generation feature

---

## 🎉 Done!

Share your **Vercel frontend URL** with anyone - it works just like localhost!

---

## 🐛 Need Help?

- Check Railway logs: Service → Deployments → View logs
- Check Vercel logs: Project → Deployments → Click deployment → View logs
- Verify all environment variables are set correctly

**Your URLs:**
- **Frontend**: Your Vercel URL
- **Backend**: Your Railway URL

Good luck! 🚀

