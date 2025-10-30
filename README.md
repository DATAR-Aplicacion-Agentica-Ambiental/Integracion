# Integración

# Si no tienes un entorno virtual activo, créalo y actívalo
python3 -m venv venv
source venv/bin/activate

# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias actualizadas
python -m pip install --upgrade -r requirements.txt

# Verificar que todo está bien
python fix_mcp_issue.py
python verificar_instalacion.py

# Ejecutar el agente
adk run datar