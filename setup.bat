@echo off
echo ========================================
echo Shipment Tracker - Setup Script
echo ========================================
echo.

echo Step 1: Installing Backend Dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Backend installation failed!
    exit /b 1
)
cd ..

echo.
echo Step 2: Installing Frontend Dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo Frontend installation failed!
    exit /b 1
)
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Import schema.sql into MySQL:
echo    mysql -u root -p < schema.sql
echo.
echo 2. Start Backend Server (in new terminal):
echo    cd backend
echo    npm start
echo.
echo 3. Start Frontend (in another new terminal):
echo    cd frontend
echo    npm start
echo.
echo The application will open at http://localhost:3000
echo Backend API runs at http://localhost:5000
echo.
pause
