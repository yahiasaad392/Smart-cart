@echo off
echo ==============================================
echo   FORCE DEPLOY TO GITHUB (OVERWRITE REMOTE)
echo ==============================================
echo.
echo This script will:
echo 1. Initialize Git (in case it wasn't).
echo 2. Save all your files.
echo 3. FORCE upload them to GitHub (overwriting the README).
echo.

call git init
call git add .
call git commit -m "Force deploy"

echo.
echo Setting remote to: https://github.com/yahiasaad392/smart-cart.git
call git remote remove origin
call git remote add origin https://github.com/yahiasaad392/smart-cart.git

echo.
echo PUSHING WITH FORCE...
echo (You may need to sign in now)
call git branch -M main
call git push -f origin main

echo.
echo Done. Check your GitHub repository now.
pause
