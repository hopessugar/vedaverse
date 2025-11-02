# 📤 Push Your Code to GitHub - Quick Guide

Since your code is local, let's get it on GitHub first!

---

## ✅ Step 1: Run the Setup Script

**Option A: Run the PowerShell script (Easiest!)**
```powershell
# In your project folder
cd "C:\Users\vyass\emotion analysis\emotion analysis"
.\setup-github.ps1
```

**Option B: Manual steps (if script doesn't work)**
```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Veda Verse app"

# Set your git identity (if not set)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 🔗 Step 2: Create GitHub Repository

1. Go to **[github.com](https://github.com)** and sign in
2. Click **"+"** (top right) → **"New repository"**
3. Fill in:
   - **Name**: `veda-verse` (or any name)
   - **Description**: "Ayurvedic wellness app"
   - **Public** or **Private** (your choice)
   - ⚠️ **IMPORTANT**: DON'T check "Add a README file"
   - DON'T add .gitignore or license
4. Click **"Create repository"**
5. **Copy the repository URL** - it looks like:
   ```
   https://github.com/yourusername/veda-verse.git
   ```

---

## 🚀 Step 3: Connect and Push

**Run these commands** (replace `YOUR-USERNAME` and `YOUR-REPO-NAME`):

```powershell
# Connect to GitHub (replace with YOUR actual URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Verify connection
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**If asked for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic)
  - Check "repo" permission
  - Copy the token and use it as password

---

## ✅ Step 4: Verify

1. Go to your GitHub repository page
2. You should see all your files! ✅
3. Done!

---

## 🚀 Next: Deploy!

Now that your code is on GitHub:

1. Open **`DEPLOY-SIMPLE.md`**
2. Follow the deployment steps
3. When Railway/Vercel asks for GitHub repo, select the one you just created!

---

## 🐛 Troubleshooting

### "fatal: not a git repository"
Run: `git init` first

### "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

### "Authentication failed"
- Use Personal Access Token, not password
- Or set up SSH keys

### "Please tell me who you are"
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

**Need more help?** Check `GITHUB-SETUP.md` for detailed instructions! 📖

