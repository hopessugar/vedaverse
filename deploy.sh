#!/bin/bash
# Veda Verse Deployment Helper Script (Linux/Mac)

echo "🚀 Veda Verse Deployment Preparation"
echo "====================================="
echo ""

# Check Node.js
echo "📋 Checking prerequisites..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js v16+"
    exit 1
fi

# Check if .env file exists
echo ""
echo "📝 Checking environment configuration..."
if [ -f "server/.env" ]; then
    echo "✅ server/.env file exists"
else
    echo "⚠️  server/.env file NOT found"
    echo "   Creating server/.env.example..."
    
    cat > server/.env.example << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedaVerse
JWT_SECRET=vedaVerseSecretKeyChangeInProduction
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=*
NODE_ENV=production
EOF
    
    echo "   📄 Please copy server/.env.example to server/.env and update with your values"
fi

# Build frontend
echo ""
echo "🔨 Building frontend..."
cd client
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    cd ..
    exit 1
fi
cd ..

# Check dependencies
echo ""
echo "📦 Checking dependencies..."
if [ -d "server/node_modules" ]; then
    echo "✅ Server dependencies installed"
else
    echo "⚠️  Server dependencies missing. Run: cd server && npm install"
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Client dependencies installed"
else
    echo "⚠️  Client dependencies missing. Run: cd client && npm install"
fi

# Summary
echo ""
echo "====================================="
echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update server/.env with your production values"
echo "   2. Set up MongoDB Atlas (or use existing MongoDB)"
echo "   3. Deploy backend to Railway/Heroku"
echo "   4. Deploy frontend to Vercel/Netlify"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"


