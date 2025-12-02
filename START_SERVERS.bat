@echo off
echo ========================================
echo Starting DeployPrime Portfolio Servers
echo ========================================
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers are starting!
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo Admin: http://localhost:5173/admin/login
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul
