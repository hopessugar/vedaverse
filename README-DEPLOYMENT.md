# 🚀 Veda Verse - Deployment Guide

Your app is ready to deploy! Follow these simple steps.

## 📋 Quick Start

1. **Read**: `DEPLOY-SIMPLE.md` - 10 minute quick guide
2. **Or**: `DEPLOY-NOW.md` - Detailed step-by-step instructions

## 🎯 Recommended Setup

- **Backend**: Railway (free tier)
- **Frontend**: Vercel (free tier)
- **Database**: MongoDB Atlas (free tier)

## ⚡ Quick Deploy Commands

### For Railway (Backend)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Set root directory: `server`
4. Add environment variables (see DEPLOY-SIMPLE.md)

### For Vercel (Frontend)
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set root directory: `client`
4. Set build command: `npm run build`
5. Set output: `dist`
6. Add `VITE_API_URL` environment variable

## 📝 Required Environment Variables

### Backend (Railway)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app
```

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string ready
- [ ] Gemini API key ready
- [ ] Railway account created
- [ ] Vercel account created

## 🔗 After Deployment

1. Test your frontend URL
2. Test registration/login
3. Test plan generation
4. Share your frontend URL!

## 🆘 Need Help?

- Check `DEPLOY-SIMPLE.md` for detailed steps
- Check Railway/Vercel logs if errors occur
- Verify all environment variables are set

---

**Ready?** Open `DEPLOY-SIMPLE.md` and follow the steps! 🚀

