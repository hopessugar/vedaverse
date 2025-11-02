# Quick API Test Script for Ayurvedic Doctor V5
# Run this after starting the backend server

Write-Host "`n=== Testing Ayurvedic Doctor V5 API ===" -ForegroundColor Cyan

# Test 1: Health Check
Write-Host "`n1. Testing Health Check..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET -ErrorAction Stop
    Write-Host "   ✅ Server is running!" -ForegroundColor Green
    Write-Host "   Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Server not responding!" -ForegroundColor Red
    Write-Host "   Make sure the backend server is running on port 5000" -ForegroundColor Yellow
    exit
}

# Test 2: Get Diseases List
Write-Host "`n2. Testing Get Diseases List..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/plans/diseases" -Method GET -ErrorAction Stop
    $diseases = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Found $($diseases.diseases.Count) diseases!" -ForegroundColor Green
    Write-Host "   Diseases: $($diseases.diseases -join ', ')" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Error getting diseases!" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Gray
}

# Test 3: Get General Questions
Write-Host "`n3. Testing Get General Questions..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/plans/questions/general" -Method GET -ErrorAction Stop
    $questions = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Found $($questions.questions.Count) general questions!" -ForegroundColor Green
    Write-Host "   First question: $($questions.questions[0].question)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Error getting general questions!" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Gray
}

# Test 4: Get Disease Questions (Obesity)
Write-Host "`n4. Testing Get Disease Questions (Obesity)..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/plans/questions/disease/Obesity" -Method GET -ErrorAction Stop
    $questions = $response.Content | ConvertFrom-Json
    Write-Host "   ✅ Found $($questions.questions.Count) obesity questions!" -ForegroundColor Green
    Write-Host "   First question: $($questions.questions[0].question)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Error getting disease questions!" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Gray
}

Write-Host "`n=== Tests Complete ===" -ForegroundColor Cyan
Write-Host "`nNote: To test plan generation, you need to:" -ForegroundColor Yellow
Write-Host "  1. Login to get a JWT token" -ForegroundColor White
Write-Host "  2. Use POST /api/plans/generate with the token" -ForegroundColor White
Write-Host "  3. Or test through the frontend UI" -ForegroundColor White




