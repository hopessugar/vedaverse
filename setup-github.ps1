# GitHub Setup Script for Veda Verse
# Run this script to push your code to GitHub

Write-Host "🚀 GitHub Setup for Veda Verse" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
Write-Host "Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if git is initialized
Write-Host "Checking if Git is initialized..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

Write-Host ""

# Set git user if not set
Write-Host "Checking Git user configuration..." -ForegroundColor Yellow
$gitUser = git config user.name
$gitEmail = git config user.email

if (-not $gitUser -or -not $gitEmail) {
    Write-Host "⚠️  Git user not configured" -ForegroundColor Yellow
    Write-Host "Please set your Git identity:" -ForegroundColor Yellow
    $userName = Read-Host "Enter your name"
    $userEmail = Read-Host "Enter your email"
    git config --global user.name "$userName"
    git config --global user.email "$userEmail"
    Write-Host "✅ Git user configured" -ForegroundColor Green
} else {
    Write-Host "✅ Git user: $gitUser <$gitEmail>" -ForegroundColor Green
}

Write-Host ""

# Add all files
Write-Host "Adding all files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green

Write-Host ""

# Check what will be committed
Write-Host "Files ready to commit:" -ForegroundColor Yellow
git status --short

Write-Host ""

# Ask for commit message
$commitMessage = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Initial commit - Veda Verse app"
}

Write-Host ""
Write-Host "Committing files..." -ForegroundColor Yellow
git commit -m "$commitMessage"
Write-Host "✅ Files committed" -ForegroundColor Green

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ Local Git setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://github.com and create a new repository" -ForegroundColor White
Write-Host "2. DO NOT initialize it with README, .gitignore, or license" -ForegroundColor White
Write-Host "3. Copy the repository URL (e.g., https://github.com/username/repo.git)" -ForegroundColor White
Write-Host ""
Write-Host "Then run these commands (replace YOUR-URL with your GitHub repo URL):" -ForegroundColor Yellow
Write-Host "  git remote add origin YOUR-REPO-URL" -ForegroundColor Cyan
Write-Host "  git branch -M main" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 See GITHUB-SETUP.md for detailed instructions" -ForegroundColor Green
Write-Host ""

