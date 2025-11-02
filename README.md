# Veda Verse - Integrating Ayurveda with Agentic AI

A comprehensive full-stack web application that integrates traditional Ayurvedic medicine with modern AI technology to provide personalized wellness plans, consultations, and health management.

## Features

### 🏠 Home Tab
- Welcome section with progress tracking
- Streak tracker for daily engagement
- Daily yoga pose recommendation
- Jadi Buti (herbal) recommendations
- Yoga pose tutorials

### 📊 Report Tab (Most Important)
- **Prakarti Quiz**: 30-question quiz to determine your Ayurvedic constitution (Dosha type)
- **Report Analysis**: Upload medical reports/images for AI-powered Ayurvedic analysis
- **Personalized Plan Generation**:
  - 10 general health questions
  - Disease selection (12 conditions: Obesity, Diabetes, Hypertension, etc.)
  - Disease-specific questions
  - AI-generated comprehensive Ayurvedic plan including:
    - Yoga poses with detailed instructions and Ayurvedic reasoning
    - Diet recommendations with explanations
    - Lifestyle tips with reasoning
    - Do's and Don'ts with explanations
- **Agentic Chatbot**: AI personal assistant in bottom-left corner for Ayurvedic guidance

### 👨‍⚕️ Consult Tab
- Browse Ayurvedic doctors and experts
- View doctor profiles with ratings and reviews
- Book appointments with slot selection
- Multiple consultation types:
  - Ayurveda Consultation
  - Yoga & Pranayama Session
  - Diet & Lifestyle Coaching
  - Mental Wellness Support
- Payment integration

### 👤 Profile Tab
- User profile management
- Wellness snapshot (Prakriti type, stress level)
- View appointments and plans
- Account settings and preferences

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **OpenAI API** - AI services
- **Multer** - File uploads

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API key (optional, for AI features)

### Setup Steps

1. **Clone the repository**
   ```bash
   cd "emotion analysis/emotion analysis"
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create `server/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vedaVerse
   JWT_SECRET=vedaVerseSecretKeyChangeInProduction
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start MongoDB**
   - Local MongoDB: Ensure MongoDB service is running
   - MongoDB Atlas: Update MONGODB_URI in `.env`

5. **Run the application**
   
   Development mode (runs both server and client):
   ```bash
   npm run dev
   ```
   
   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run server
   
   # Terminal 2 - Frontend
   npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Default Login

You can register a new account or login with:
- **Username/Email**: Any username or email
- **Password**: Any password

## Project Structure

```
veda-verse/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── tabs/          # Tab components
│   │   ├── context/       # React context (Auth)
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Node.js application
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── services/         # Business logic (AI services)
│   ├── index.js          # Server entry point
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update user profile
- `POST /api/users/streak` - Update user streak

### Prakarti
- `GET /api/prakarti/quiz` - Get Prakarti quiz questions
- `POST /api/prakarti/quiz` - Submit Prakarti quiz

### Reports
- `POST /api/reports/upload` - Upload and analyze report
- `GET /api/reports` - Get user's reports

### Plans
- `GET /api/plans/general-questions` - Get general questions
- `GET /api/plans/diseases` - Get diseases list
- `POST /api/plans/disease-questions` - Get disease-specific questions
- `POST /api/plans/generate` - Generate personalized plan
- `GET /api/plans` - Get user's plans

### Doctors & Appointments
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors/seed` - Seed doctors (initial setup)
- `POST /api/appointments` - Book appointment
- `GET /api/appointments` - Get user's appointments

### Chat
- `POST /api/chat` - Chat with AI assistant

### Yoga & Herbs
- `GET /api/yoga/pose-of-day` - Get pose of the day
- `GET /api/yoga` - Get all yoga poses
- `GET /api/herbs/recommendations` - Get herb recommendations

## AI Integration

The application uses OpenAI API for:
- Medical report analysis with Ayurvedic insights
- Personalized plan generation
- Chatbot responses

**Note**: To use AI features, you need to:
1. Get an OpenAI API key from https://platform.openai.com
2. Add it to `server/.env` as `OPENAI_API_KEY`
3. The application will work without AI, but with limited functionality

## Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to Vercel/Netlify

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `server` folder
3. Ensure MongoDB connection string is set

### Database
- Use MongoDB Atlas for cloud database
- Update `MONGODB_URI` in production environment

## Future Enhancements

- [ ] Add image upload to cloud storage (AWS S3/Cloudinary)
- [ ] Implement payment gateway integration
- [ ] Add video consultation features
- [ ] Enhance AI model with Ayurvedic knowledge base
- [ ] Add push notifications
- [ ] Implement offline mode
- [ ] Add social features (community, sharing)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Support

For support, email support@vedaverse.com or open an issue in the repository.

---

**Built with ❤️ for holistic wellness and Ayurvedic healing**

