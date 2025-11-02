# Localhost Deployment Setup Script
Write-Host "🏠 Setting up Localhost Deployment" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Get MongoDB password
Write-Host "🔐 MongoDB Atlas Configuration" -ForegroundColor Yellow
$dbPassword = Read-Host "Enter your MongoDB Atlas password for user 'vedaverse'"

if ([string]::IsNullOrWhiteSpace($dbPassword)) {
    Write-Host "⚠️  Password is required!" -ForegroundColor Red
    exit 1
}

# Generate JWT Secret if needed
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Create .env file
$envContent = @"
PORT=5000
MONGODB_URI=mongodb+srv://vedaverse:$dbPassword@cluster0.fe9kr2j.mongodb.net/vedaVerse?retryWrites=true&w=majority
JWT_SECRET=$jwtSecret
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
"@

$envPath = "server\.env"
Set-Content -Path $envPath -Value $envContent
Write-Host "✅ Created server/.env with MongoDB Atlas connection" -ForegroundColor Green
Write-Host ""

# Verify server directory
Write-Host "📦 Checking server setup..." -ForegroundColor Yellow
if (Test-Path "server\node_modules") {
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Installing server dependencies..." -ForegroundColor Yellow
    Set-Location server
    npm install
    Set-Location ..
}

# Verify client directory
Write-Host "📦 Checking client setup..." -ForegroundColor Yellow
if (Test-Path "client\node_modules") {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Installing client dependencies..." -ForegroundColor Yellow
    Set-Location client
    npm install
    Set-Location ..
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To start your application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1 - Run both together:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Option 2 - Run separately:" -ForegroundColor Cyan
Write-Host "  Terminal 1: cd server && npm start" -ForegroundColor White
Write-Host "  Terminal 2: cd client && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Access your app:" -ForegroundColor Yellow
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:5000/api" -ForegroundColor White
Write-Host ""
Write-Host "📚 See LOCALHOST-DEPLOY.md for details" -ForegroundColor Cyan
Write-Host ""


