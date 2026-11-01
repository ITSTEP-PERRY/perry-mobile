@echo off
title Perry Mobile (Expo)
cd /d "%~dp0"

echo ============================================
echo   Perry Mobile - Expo dev server
echo   Web:    http://localhost:8081
echo   Phone:  scan QR in Expo Go
echo ============================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [!] Node.js not found. Install Node 20 LTS: https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo [1/3] Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [!] npm install failed
    pause
    exit /b 1
  )
) else (
  echo [1/3] node_modules OK
)

if not exist ".env" (
  if exist ".env.example" (
    echo [2/3] No .env - copying .env.example
    copy /Y ".env.example" ".env" >nul
    echo       Edit .env: EXPO_PUBLIC_PRODUCT_URL must point to your PC LAN IP for a phone.
  ) else (
    echo [2/3] No .env and no .env.example - continuing with defaults
  )
) else (
  echo [2/3] .env OK
)

echo [3/3] Checking Product API on :5272...
powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:5272/api/health' -UseBasicParsing -TimeoutSec 3; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }"
if errorlevel 1 (
  echo     [!] API is NOT running - catalog and cart will be empty.
  echo         Start it from the backend repo: Back_end_for_our_poroject\start-api.cmd
  echo.
)
echo.

call npx expo start

echo.
pause
