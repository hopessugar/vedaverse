# Quick Start Guide - Veda Verse

## Quick Setup (5 minutes)

### 1. Install All Dependencies
```bash
npm run install-all
```

This will install dependencies for:
- Root project
- Backend server
- Frontend client

### 2. Set Up Environment

Create `server/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedaVerse
JWT_SECRET=vedaVerseSecretKeyChangeInProduction
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: 
- For MongoDB Atlas (cloud), update `MONGODB_URI` with your connection string
- OpenAI API key is optional but recommended for full AI features

### 3. Start MongoDB

**Local MongoDB:**
- Ensure MongoDB service is running on your machine
- Default connection: `mongodb://localhost:27017`

**MongoDB Atlas (Recommended for beginners):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Run the Application

**Option 1: Run both together (Recommended)**
```bash
npm run dev
```

**Option 2: Run separately**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### 6. Create Your Account

1. Open http://localhost:3000
2. Click "Register"
3. Enter:
   - Username: (any username)
   - Email: (any email)
   - Password: (any password)
4. Click "Register"

You're ready to use Veda Verse!

## Features to Try

### Home Tab
- Check your daily streak
- See today's yoga pose
- Browse herbal recommendations
- View yoga tutorials

### Report Tab (Most Important)
1. Click "Let's Check It" → Take Prakarti quiz (30 questions)
2. Upload a medical report image
3. Click "Get Personalized Plan" → 
   - Answer general questions
   - Select diseases
   - Answer disease-specific questions
   - Get your personalized Ayurvedic plan!

### Consult Tab
- Browse doctors
- Book appointments
- Select service type
- Choose date and time

### Profile Tab
- View your wellness snapshot
- See your Prakriti type
- Check appointments and plans

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use
- Change `PORT` in `server/.env`
- Or kill the process using port 5000/3000

### AI Features Not Working
- Add OpenAI API key to `server/.env`
- Or use the app without AI (limited functionality)

## Next Steps

1. **Seed Doctors**: Open http://localhost:5000/api/doctors/seed (POST request) or use the app - it auto-seeds
2. **Explore Features**: Try all tabs and features
3. **Customize**: Modify code to add your features

Enjoy your Ayurvedic wellness journey! 🧘‍♀️🌿

