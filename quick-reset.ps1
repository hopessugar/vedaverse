# Quick MongoDB Password Reset Helper
Write-Host "🔐 MongoDB Password Reset Helper" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Since MongoDB Atlas doesn't show passwords," -ForegroundColor Yellow
Write-Host "you need to reset it in the dashboard." -ForegroundColor Yellow
Write-Host ""
Write-Host "📋 Steps to Reset:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Open MongoDB Atlas:" -ForegroundColor White
Write-Host "   https://cloud.mongodb.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Navigate to:" -ForegroundColor White
Write-Host "   Database Access → Find 'vyassilky1130_db_user' → Edit → Edit Password" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Set new password:" -ForegroundColor White
Write-Host "   - Enter a new password (remember it!)" -ForegroundColor Gray
Write-Host "   - OR click 'Autogenerate Secure Password'" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Update server/.env:" -ForegroundColor White
Write-Host "   Replace <db_password> with your new password" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔗 Quick Link:" -ForegroundColor Yellow
Write-Host "   https://cloud.mongodb.com/v2#/security/database/users" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to open MongoDB Atlas in your browser..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Try to open browser (Windows)
try {
    Start-Process "https://cloud.mongodb.com/v2#/security/database/users"
    Write-Host "✅ Opened MongoDB Atlas in browser!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not open browser automatically." -ForegroundColor Yellow
    Write-Host "   Please visit: https://cloud.mongodb.com" -ForegroundColor White
}

Write-Host ""
Write-Host "After resetting, run this to update .env:" -ForegroundColor Cyan
Write-Host "   notepad server\.env" -ForegroundColor White
Write-Host ""


