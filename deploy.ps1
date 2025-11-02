# Veda Verse Deployment Helper Script
# This script helps prepare your application for deployment

Write-Host "🚀 Veda Verse Deployment Preparation" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion) {
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Please install Node.js v16+" -ForegroundColor Red
    exit 1
}

# Check if .env file exists
Write-Host ""
Write-Host "📝 Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path "server\.env") {
    Write-Host "✅ server/.env file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  server/.env file NOT found" -ForegroundColor Yellow
    Write-Host "   Creating server/.env.example..." -ForegroundColor Yellow
    
    $envContent = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedaVerse
JWT_SECRET=vedaVerseSecretKeyChangeInProduction
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=*
NODE_ENV=production
"@
    
    Set-Content -Path "server\.env.example" -Value $envContent
    Write-Host "   📄 Please copy server/.env.example to server/.env and update with your values" -ForegroundColor Cyan
}

# Build frontend
Write-Host ""
Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
Set-Location client
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}
Set-Location ..

# Check dependencies
Write-Host ""
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "server\node_modules") {
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Server dependencies missing. Run: cd server && npm install" -ForegroundColor Yellow
}

if (Test-Path "client\node_modules") {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Client dependencies missing. Run: cd client && npm install" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Update server/.env with your production values" -ForegroundColor White
Write-Host "   2. Set up MongoDB Atlas or use existing MongoDB" -ForegroundColor White
Write-Host "   3. Deploy backend to Railway/Heroku" -ForegroundColor White
Write-Host "   4. Deploy frontend to Vercel/Netlify" -ForegroundColor White
Write-Host ""
Write-Host "📚 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan

