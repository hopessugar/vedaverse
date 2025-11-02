# Veda Verse Deployment Setup Helper
Write-Host "🚀 Veda Verse Deployment Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Generate JWT Secret
Write-Host "🔐 Generating JWT Secret..." -ForegroundColor Yellow
$jwtSecret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
Write-Host "Generated JWT_SECRET: $jwtSecret" -ForegroundColor Green
Write-Host ""

# Check .env file
$envPath = "server\.env"
if (Test-Path $envPath) {
    Write-Host "✅ server/.env file exists" -ForegroundColor Green
    
    # Read current .env
    $envContent = Get-Content $envPath -Raw
    
    # Update JWT_SECRET if it's still the default
    if ($envContent -match "JWT_SECRET=vedaVerseSecretKeyChangeInProduction") {
        $envContent = $envContent -replace "JWT_SECRET=vedaVerseSecretKeyChangeInProduction", "JWT_SECRET=$jwtSecret"
        Set-Content -Path $envPath -Value $envContent -NoNewline
        Write-Host "✅ Updated JWT_SECRET in .env" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "📝 Current server/.env values:" -ForegroundColor Yellow
    Get-Content $envPath | ForEach-Object {
        if ($_ -match "PASSWORD|SECRET|KEY") {
            $parts = $_ -split "="
            Write-Host "  $($parts[0])=***hidden***" -ForegroundColor Gray
        } else {
            Write-Host "  $_" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "⚠️  server/.env not found" -ForegroundColor Yellow
    Write-Host "Creating from template..." -ForegroundColor Yellow
    
    $envTemplate = @"
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedaVerse
JWT_SECRET=$jwtSecret
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=*
NODE_ENV=production
"@
    
    Set-Content -Path $envPath -Value $envTemplate
    Write-Host "✅ Created server/.env with generated JWT_SECRET" -ForegroundColor Green
}

Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "📋 DEPLOYMENT CHECKLIST" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. MongoDB Atlas Setup:" -ForegroundColor Cyan
Write-Host "   - Go to https://www.mongodb.com/cloud/atlas" -ForegroundColor White
Write-Host "   - Create free cluster" -ForegroundColor White
Write-Host "   - Get connection string" -ForegroundColor White
Write-Host "   - Whitelist IP: 0.0.0.0/0 (or Railway IP)" -ForegroundColor White
Write-Host "   - Update MONGODB_URI in server/.env" -ForegroundColor White
Write-Host ""
Write-Host "2. Deploy Backend (Railway):" -ForegroundColor Cyan
Write-Host "   - Go to https://railway.app" -ForegroundColor White
Write-Host "   - Connect GitHub repo" -ForegroundColor White
Write-Host "   - Set root directory: server" -ForegroundColor White
Write-Host "   - Add environment variables" -ForegroundColor White
Write-Host "   - Copy backend URL" -ForegroundColor White
Write-Host ""
Write-Host "3. Deploy Frontend (Vercel):" -ForegroundColor Cyan
Write-Host "   - Go to https://vercel.com" -ForegroundColor White
Write-Host "   - Connect GitHub repo" -ForegroundColor White
Write-Host "   - Set root directory: client" -ForegroundColor White
Write-Host "   - Add VITE_API_URL = your backend URL" -ForegroundColor White
Write-Host ""
Write-Host "📚 Detailed guides:" -ForegroundColor Yellow
Write-Host "   - QUICK-DEPLOY.md" -ForegroundColor White
Write-Host "   - deploy-railway.md" -ForegroundColor White
Write-Host "   - deploy-vercel.md" -ForegroundColor White
Write-Host ""
Write-Host "✅ Frontend build ready in client/dist/" -ForegroundColor Green
Write-Host ""


