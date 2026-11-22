@echo off
title 2GO Travel - Servidor Local
echo ===================================================
echo   Iniciando o Servidor de Desenvolvimento da 2GO   
echo ===================================================
echo.
echo [1/2] Verificando dependencias...
echo.

:: Check if node_modules folder exists
if not exist node_modules (
    echo [INFO] Pasta node_modules nao encontrada. Instalando dependencias primeiro (pode levar alguns segundos)...
    call npm install
)

:: Run development server and open browser
echo.
echo [2/2] Abrindo o navegador em http://localhost:3000...
start http://localhost:3000
echo.
echo Executando 'npm run dev'... Pressione Ctrl+C na janela do terminal para parar.
echo.
npm run dev
pause
