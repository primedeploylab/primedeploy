@echo off
REM DeployPrime Portfolio Setup Script for Windows
REM This script automates the initial setup process

echo.
echo ================================
echo DeployPrime Portfolio Setup
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    exit /b 1
)

echo [OK] Node.js version:
node --version
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    exit /b 1
)

echo [OK] npm version:
npm --version
echo.

REM Install backend dependencies
echo [INFO] Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies
    exit /b 1
)
echo [OK] Backend dependencies installed
echo.

REM Install frontend dependencies
echo [INFO] Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies
    exit /b 1
)
echo [OK] Frontend dependencies installed
echo.

REM Create backend .env if it doesn't exist
cd ..\backend
if not exist .env (
    echo [INFO] Creating backend .env file...
    copy .env.example .env
    echo [OK] Backend .env created from .env.example
    echo [WARNING] Please update the .env file with your actual credentials
) else (
    echo [INFO] Backend .env file already exists
)
echo.

REM Create frontend .env if it doesn't exist
cd ..\frontend
if not exist .env (
    echo [INFO] Creating frontend .env file...
    copy .env.example .env
    echo [OK] Frontend .env created from .env.example
) else (
    echo [INFO] Frontend .env file already exists
)
echo.

cd ..

echo ================================
echo Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Update backend\.env with your MongoDB URI and other credentials
echo 2. Update frontend\.env with your API URL (if different from default)
echo 3. Run 'cd backend && npm run create-admin' to create admin user
echo 4. Run 'cd backend && npm run seed' to add sample data (optional)
echo 5. Start backend: 'cd backend && npm run dev'
echo 6. Start frontend: 'cd frontend && npm run dev'
echo.
echo For detailed instructions, see QUICKSTART.md
echo.
pause
