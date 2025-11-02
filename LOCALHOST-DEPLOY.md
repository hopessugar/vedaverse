# Localhost Deployment with MongoDB Atlas

## ✅ Configuration Complete!

Your app is configured to run on **localhost** with MongoDB Atlas cloud database.

## 🔗 Connection Details

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000
- **Database:** MongoDB Atlas (Cloud)

## 🚀 Starting the Application

### Option 1: Run Both Together
```bash
npm run dev
```

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

## 🔐 MongoDB Connection

Your connection string is configured in `server/.env`:
```
MONGODB_URI=mongodb+srv://vedaverse:YOUR_PASSWORD@cluster0.fe9kr2j.mongodb.net/vedaVerse?retryWrites=true&w=majority
```

**Important:** Replace `YOUR_PASSWORD` with your actual MongoDB Atlas password!

## ✅ Verification

1. **Backend running?** → http://localhost:5000/api
2. **Frontend running?** → http://localhost:3000
3. **Database connected?** → Check backend console for "✅ MongoDB Connected"

## 🎯 Access Your App

Open: **http://localhost:3000**

## 📝 Environment Variables

Your `server/.env` includes:
- `MONGODB_URI` - Your Atlas connection
- `PORT=5000` - Backend port
- `JWT_SECRET` - Authentication secret
- `FRONTEND_URL=*` - Allows localhost:3000

## 🆘 Troubleshooting

**MongoDB Connection Failed?**
- Check your password in the connection string
- Verify IP is whitelisted in MongoDB Atlas (add 0.0.0.0/0 for now)
- Check internet connection

**Port Already in Use?**
- Change PORT in `server/.env`
- Or kill the process using port 5000

**Frontend Can't Reach API?**
- Ensure backend is running on port 5000
- Check CORS settings in `server/index.js`


