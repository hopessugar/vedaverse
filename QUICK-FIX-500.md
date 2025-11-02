# 🚨 Quick Fix for 500 Error

## The Problem
"Request failed with status code 500" when trying to login/register.

## Most Likely Cause
**MongoDB is NOT connected!**

## ✅ Quick Fix

### Step 1: Check Backend Terminal
Look for:
- ✅ `MongoDB Connected` = Working!
- ❌ `MongoDB Error:` = Problem!

### Step 2: If MongoDB NOT Connected

**Check `server/.env` file:**
```
MONGODB_URI=mongodb+srv://vyassilky1130_db_user:bangtan07@cluster0.m1slaxi.mongodb.net/vedaVerse?retryWrites=true&w=majority
```

**Verify:**
- Password is correct: `bangtan07`
- No extra spaces
- Connection string is complete

### Step 3: Check MongoDB Atlas

1. Go to https://cloud.mongodb.com
2. Click "Network Access"
3. Make sure your IP is whitelisted
4. Or add `0.0.0.0/0` (Allow from anywhere) for testing

### Step 4: Restart Server

1. Press `Ctrl+C` in terminal
2. Run: `npm run dev`
3. Wait for: `✅ MongoDB Connected`
4. Try login again

## ✅ Success
When you see "✅ MongoDB Connected" in terminal, the 500 error should be gone!

---

**The code has been fixed. Now just restart and ensure MongoDB connects!** 🔧

