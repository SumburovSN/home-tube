@REM  Если вы параллельно работаете с другими Node.js приложениями в других редакторах, этот скрипт закроет их все
@echo off
title Stop Vite
taskkill /f /im node.exe
echo Vite server stopped successfully!
timeout /t 3 >nul
