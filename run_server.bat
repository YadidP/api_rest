@echo off
:: Script para instalar dependencias y ejecutar Flask (app.py)

echo Instalando dependencias de requirements.txt...
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo Error al instalar dependencias. Verifica requirements.txt.
    pause
    exit /b
)

echo Iniciando la aplicación Flask...
python app.py

pause