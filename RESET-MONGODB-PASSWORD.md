# 🔐 How to Reset MongoDB Atlas Password

Since MongoDB Atlas doesn't show passwords (for security), you need to **reset** it.

## Method 1: Reset in MongoDB Atlas Dashboard (Recommended)

### Step 1: Log into MongoDB Atlas
1. Go to https://cloud.mongodb.com
2. Log in with your account

### Step 2: Navigate to Database Access
1. Click on **"Database Access"** in the left sidebar
2. You'll see a list of database users

### Step 3: Reset Password for Your User
1. Find the user: **`vyassilky1130_db_user`**
2. Click the **"Edit"** button (pencil icon) next to the user
3. Click **"Edit Password"**
4. You have two options:
   - **Option A**: Enter a new password (remember this!)
   - **Option B**: Click **"Autogenerate Secure Password"** to create a random one
5. Click **"Update User"**

### Step 4: Update Your .env File
1. Copy the new password
2. Open `server/.env`
3. Replace `<db_password>` with the new password:
   ```
   MONGODB_URI=mongodb+srv://vyassilky1130_db_user:YOUR_NEW_PASSWORD@cluster0.m1slaxi.mongodb.net/vedaVerse?retryWrites=true&w=majority
   ```
4. Save the file

## Method 2: Create a New Database User

If you prefer, you can create a new user with a password you know:

### Steps:
1. In MongoDB Atlas → **"Database Access"**
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: (choose a name, e.g., `veda_app_user`)
   - **Password**: (choose a password you'll remember)
5. Select **"Read and write to any database"** (or specific permissions)
6. Click **"Add User"**
7. Update your `.env` with the new username and password

## Method 3: Check if Password is Saved Elsewhere

Check if you have:
- ✅ Password manager (LastPass, 1Password, etc.)
- ✅ Notes/documents where you saved it
- ✅ `.env` file backups
- ✅ Previous deployment configurations

## 🔒 Security Tips

1. **Use a password manager** to store database passwords
2. **Never commit `.env` files** to Git (already configured in `.gitignore`)
3. **Use strong passwords** - MongoDB Atlas autogenerate is recommended
4. **Rotate passwords** regularly for production databases

## ⚡ Quick Reset Script

After resetting, update your `.env`:

**Windows PowerShell:**
```powershell
# Open server/.env and manually update the password
notepad server\.env
```

Or use the setup script:
```powershell
.\setup-localhost.ps1
```

## ✅ After Resetting

1. Update `server/.env` with new password
2. Test connection: `npm run dev`
3. Check backend console for "✅ MongoDB Connected"

---

**Quick Links:**
- MongoDB Atlas: https://cloud.mongodb.com
- Database Access: https://cloud.mongodb.com/v2#/security/database/users


