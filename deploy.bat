@echo off
echo ==========================================
echo      SMART CART GITHUB DEPLOYMENT
echo ==========================================

echo 1. Initializing Git Repository...
call git init
if %errorlevel% neq 0 (
    echo Failed to initialize git.
    pause
    exit /b
)

echo.
echo 2. Adding files...
call git add .

echo.
echo 3. Committing files...
call git commit -m "Initial commit for Smart Cart"

echo.
echo 4. Setting up Remote Repository...
call git remote remove origin 2>nul
call git remote add origin https://github.com/yahiasaad392/smart-cart.git

echo.
echo 5. Pushing to GitHub...
echo ---------------------------------------------------
echo NOTE: A browser window or login prompt should appear.
echo If asked for a password, you MUST use a Personal Access Token (PAT).
echo GitHub Password Authentication is deprecated.
echo ---------------------------------------------------
call git branch -M main
call git push -u origin main

echo.
echo ==========================================
echo      DEPLOYMENT FINISHED
echo ==========================================
pause
