@echo off
echo Keep-Alive Script
echo Press CTRL+C to exit

:loop
REM simulate user activity by moving the mouse and pressing a key
set "x="
set "y="
for /f "skip=1 tokens=3,4" %%a in ('reg query "HKEY_CURRENT_USER\Control Panel\Mouse" /v MouseTrails') do (
    set "x=%%a"
    set "y=%%b"
)
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "" /f >nul
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v Wallpaper /t REG_SZ /d "%TEMP%\desktop.bmp" /f >nul
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v WallpaperStyle /t REG_SZ /d 0 /f >nul
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v WallpaperStyle /t REG_SZ /d 2 /f >nul
reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v ScreenSaveActive /t REG_SZ /d 0 /f >nul
timeout /t 60 /nobreak >nul

goto loop
