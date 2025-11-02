# 🏠 Localhost Deployment - Quick Start

## ✅ Configuration Status

Your app is configured for **localhost deployment** with:
- ✅ **MongoDB Atlas** connection string
- ✅ **Gemini API Key** configured
- ✅ **JWT Secret** generated
- ✅ **Frontend** on http://localhost:3000
- ✅ **Backend** on http://localhost:5000

## ⚠️ IMPORTANT - Final Step Required

**Update your MongoDB password in `server/.env`:**

1. Open `server/.env` file
2. Find this line:
   ```
   MONGODB_URI=mongodb+srv://vyassilky1130_db_user:<db_password>@cluster0.m1slaxi.mongodb.net/...
   ```
3. Replace `<db_password>` with your **actual MongoDB Atlas password**
4. Save the file

Example:
```
MONGODB_URI=mongodb+srv://vyassilky1130_db_user:MyPassword123@cluster0.m1slaxi.mongodb.net/vedaVerse?retryWrites=true&w=majority
```

## 🚀 Start Your Application

### Option 1: Run Both Together (Recommended)
```bash
npm run dev
```

This starts:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:3000

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## 🌐 Access Your App

Once running:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

## ✅ Verification Checklist

- [ ] Updated `<db_password>` in `server/.env` with actual MongoDB password
- [ ] MongoDB Atlas IP whitelist includes your current IP (or 0.0.0.0/0 for testing)
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] Client dependencies installed (`cd client && npm install`)

## 🎯 What's Configured

✅ **MongoDB Atlas Connection:**
```
mongodb+srv://vyassilky1130_db_user:YOUR_PASSWORD@cluster0.m1slaxi.mongodb.net/vedaVerse
```

✅ **Gemini AI API Key:**
```
AIzaSyB6112TtdEAIjqscWHR84oBq97g7yzo8BE
```

✅ **Authentication:**
- JWT Secret auto-generated
- Ready for user registration/login

✅ **CORS:**
- Configured for localhost:3000

## 🆘 Troubleshooting

**MongoDB Connection Error?**
1. Check password in `server/.env` is correct
2. Verify IP whitelist in MongoDB Atlas:
   - Go to Network Access
   - Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
3. Check internet connection

**Backend Won't Start?**
- Check if port 5000 is available
- Run `cd server && npm install` if dependencies missing
- Check `server/.env` file exists

**Frontend Won't Start?**
- Check if port 3000 is available
- Run `cd client && npm install` if dependencies missing

**API Calls Failing?**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify proxy configuration in `client/vite.config.js`

## 📝 Environment File Location

Your configuration is in: `server/.env`

**Never commit this file to Git!** (already in .gitignore)

---

**Ready? Update the password and run `npm run dev`!** 🚀

