# 🔧 Git Setup Script
# Run this ONCE before first commit

# Set your name and email for Git commits
# IMPORTANT: Replace with YOUR information!

# Option 1: Set globally (for all Git projects on your PC)
git config --global user.name "Rimoker"
git config --global user.email "tiutiunyklev@gmail.com"

# Option 2: Set only for THIS project
# cd "g:\Docs\Coding\LearnJapaneseLanguage - LJL"
# git config user.name "Lev Tiutiunyk, LJL, Rimok"
# git config user.email "tiutiunyklev@gmail.com"

# Verify settings
Write-Host "`nYour Git configuration:" -ForegroundColor Green
git config --global user.name
git config --global user.email

Write-Host "`nGit is now configured! You can commit your code." -ForegroundColor Green
