@echo off
setlocal enabledelayedexpansion
title 2GO Travel - Servidor Local

cd /d "%~dp0"

echo ===================================================
echo   Iniciando o Servidor de Desenvolvimento da 2GO   
echo ===================================================
echo.

:: 1. Verificar se o Node.js esta instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERRO] O Node.js nao foi encontrado no seu computador!
    echo Por favor, instale o Node.js em: https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: 2. Instalar dependencias se a pasta node_modules nao existir
if not exist node_modules (
    echo [INFO] Primeira execucao detectada: instalando dependencias...
    echo Isso pode levar de 1 a 2 minutos, por favor aguarde...
    echo.
    call npm install
    if !errorlevel! neq 0 (
        echo.
        echo [ERRO] Falha ao instalar as dependencias via npm install.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencias instaladas com sucesso!
    echo.
)

:: 3. Abrir o navegador em paralelo (aguarda 4 segundos e abre no navegador padrao)
echo [INFO] Abrindo o navegador em http://localhost:3000 ...
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

:: 4. Iniciar o servidor de desenvolvimento
echo [INFO] Iniciando o servidor Next.js...
echo Para encerrar o servidor, feche esta janela ou pressione Ctrl + C.
echo.
call npm run dev

pause
