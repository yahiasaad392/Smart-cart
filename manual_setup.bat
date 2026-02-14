@echo off
echo ===========================================
echo       MANUAL GIT SETUP (DEBUG MODE)
echo ===========================================

echo 1. Checking Git Version...
git --version
if %errorlevel% neq 0 (
    echo Git is NOT installed or not in PATH.
    pause
    exit /b
)

echo.
echo 2. Initializing Repository...
git init
if %errorlevel% neq 0 (
    echo Failed to initialize git repository.
    pause
    exit /b
)

echo.
echo 3. Adding Files...
git add .

echo.
echo 4. Committing...
git commit -m "Manual setup commit"

echo.
echo 5. Setting Remote URL...
git remote remove origin 2>nul
git remote add origin https://github.com/yahiasaad392/smart-cart.git

echo.
echo ===========================================
echo      SETUP COMPLETE. NOW TRY PUSHING.
echo ===========================================
echo Run this command in your terminal manually:
echo.
echo git push -u origin main
echo.
pause
