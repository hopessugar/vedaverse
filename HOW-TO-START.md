# 🌐 How to Start Your Website

## Quick Start (Easiest Way)

### Step 1: Open Terminal/PowerShell
- Navigate to your project folder:
  ```bash
  cd "C:\Users\vyass\emotion analysis\emotion analysis"
  ```

### Step 2: Start the Application
Run this command:
```bash
npm run dev
```

This single command starts **both**:
- Backend server (port 5000)
- Frontend website (port 3000)

### Step 3: Open Your Browser
Once you see:
```
✅ Server running on port 5000
VITE ready in xxx ms
➜  Local:   http://localhost:3000/
```

Open your browser and go to:
**http://localhost:3000**

## Alternative: Start Separately

If you prefer to run them in separate terminals:

### Terminal 1 - Backend:
```bash
cd server
npm start
```

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

## ✅ What You Should See

### In Terminal:
```
✅ MongoDB Connected
✅ Server running on port 5000
✅ API available at http://localhost:5000/api

VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### In Browser:
- Login/Register page of Veda Verse
- Beautiful Ayurvedic-themed interface

## 🎯 First Steps After Starting

1. **Open Browser**: Go to http://localhost:3000
2. **Register Account**: Click "Register" → Enter details → Create account
3. **Login**: Use your credentials to login
4. **Explore**: Check out Home, Report, Consult, and Profile tabs

## 🆘 Troubleshooting

### "npm run dev" Not Working?
**Check if dependencies are installed:**
```bash
npm run install-all
```

### Port Already in Use?
**Error:** `Port 5000 is already in use`

**Solution - Kill the process:**
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (replace <PID> with number from above)
taskkill /PID <PID> /F

# Or restart your computer
```

### Can't Access localhost:3000?
- Make sure the terminal shows "VITE ready"
- Wait a few seconds for it to start
- Try refreshing the browser
- Check firewall isn't blocking it

### MongoDB Connection Error?
- Check MongoDB Atlas Network Access
- Make sure your IP is whitelisted (or use 0.0.0.0/0)
- Verify password in `server/.env`

## 📝 Quick Reference

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start both frontend & backend |
| `npm run server` | Start only backend |
| `npm run client` | Start only frontend |
| `npm run build` | Build frontend for production |

## 🎉 Success!

When you see the Veda Verse login page in your browser, you're all set! 🚀

---

**Quick Start Command:**
```bash
npm run dev
```

**Then open:** http://localhost:3000


