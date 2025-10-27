# Integracion
Integración del prototipo de {DATAR} de Aplicación Agéntica Ambiental.

## Instalación

### Requisitos previos
- **Python 3.12 o superior**
  - Windows: [python.org/downloads](https://www.python.org/downloads/)
  - Linux: `sudo apt install python3.12` (Ubuntu/Debian) o `sudo dnf install python3.12` (Fedora)
  - macOS: `brew install python@3.12` o descarga desde [python.org](https://www.python.org/downloads/)
- **Git** configurado con acceso SSH
  - Verifica con: `git --version`
  - Configura SSH: [docs.github.com/authentication](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Pasos de instalación

1. **Clonar el repositorio**

**Windows:**
```bash
cd C:\Users\TuUsuario\Datar
git clone git@github.com:DATAR-Aplicacion-Agentica-Ambiental/integracion.git
cd integracion
```

**Linux/macOS:**
```bash
cd ~/Datar
git clone git@github.com:DATAR-Aplicacion-Agentica-Ambiental/integracion.git
cd integracion
```

2. **Crear y activar entorno virtual**

**Windows (PowerShell):**
```powershell
# Crear el entorno virtual
python -m venv .venv

# Activar el entorno virtual
.venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
# Crear el entorno virtual
python -m venv .venv

# Activar el entorno virtual
.venv\Scripts\activate.bat
```

**Linux/macOS:**
```bash
# Crear el entorno virtual
python3 -m venv .venv

# Activar el entorno virtual
source .venv/bin/activate
```

3. **Instalar dependencias**

**Windows:**
```bash
# Actualizar pip (opcional pero recomendado)
python.exe -m pip install --upgrade pip

# Instalar todas las dependencias
pip install -r requirements.txt
```

**Linux/macOS:**
```bash
# Actualizar pip (opcional pero recomendado)
python3 -m pip install --upgrade pip

# Instalar todas las dependencias
pip install -r requirements.txt
```

4. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con tus claves API:

```env
OPENROUTER_API_KEY=tu_clave_de_openrouter
OPENAI_API_KEY=tu_clave_de_openai
```

📖 **Para instrucciones detalladas sobre cómo obtener las claves API, consulta [CONFIGURACION.md](CONFIGURACION.md)**

5. **Verificar la instalación (opcional)**

Antes de ejecutar el agente, puedes verificar que todo esté correctamente configurado:

```bash
python verificar_instalacion.py
```

Este script verificará:
- ✅ Que todas las dependencias estén instaladas
- ✅ Que las variables de entorno estén configuradas
- ✅ Que la estructura del proyecto sea correcta

6. **Ejecutar el agente**
```bash
adk run datar
```

## Estructura del Proyecto

```
integracion/
├── datar/
│   ├── __init__.py
│   ├── agent.py                    # Agente principal DATAR
│   └── gentes_autonomas/
│       └── gentes_montana/
│           ├── __init__.py
│           └── agent.py            # Sub-agente gente_raiz
├── requirements.txt                # Dependencias del proyecto
├── .env                           # Variables de entorno (no incluido en git)
├── .gitignore
├── LICENSE
├── Log.md
└── README.md
```

## Descripción del Proyecto

DATAR es una aplicación agéntica ambiental diseñada para participar de la agencia de la estructura ecológica principal (EEP) de Bogotá. Integra proyectos agénticos del laboratorio DATAR, donde cada una de las 20 personas participantes son gentes autónomas que fijan sus miradas sobre gestos que anuncian bosques en potencia en Bogotá.

## Solución de Problemas

### Error: "No module named 'litellm'"
Si encuentras este error, asegúrate de haber instalado todas las dependencias:

**Windows:**
```bash
pip install -r requirements.txt
```

**Linux/macOS:**
```bash
pip install -r requirements.txt
```

### Error con las claves API
Verifica que tu archivo `.env` esté en la raíz del proyecto y contenga las claves correctas:
- `OPENROUTER_API_KEY` para el agente principal
- `OPENAI_API_KEY` para los sub-agentes

### Problemas con permisos (Linux/macOS)
Si encuentras errores de permisos al instalar paquetes:
```bash
# Usa el flag --user para instalar sin privilegios de administrador
pip install --user -r requirements.txt
```

### Error: "python: command not found" (Linux/macOS)
Algunos sistemas usan `python3` en lugar de `python`:
```bash
# Usa python3 explícitamente
python3 -m venv .venv
python3 -m pip install -r requirements.txt
```

### Error de codificación en Windows
Si ves errores de codificación al ejecutar scripts, asegúrate de que tu terminal soporte UTF-8:
```powershell
# En PowerShell, configura UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```

### El entorno virtual no se activa (Windows)
Si PowerShell no permite ejecutar scripts, ejecuta:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Inicio Rápido (Resumen por Sistema Operativo)

### Windows (PowerShell)
```powershell
git clone git@github.com:DATAR-Aplicacion-Agentica-Ambiental/integracion.git
cd integracion
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# Configura tu archivo .env
python verificar_instalacion.py
adk run datar
```

### Linux
```bash
git clone git@github.com:DATAR-Aplicacion-Agentica-Ambiental/integracion.git
cd integracion
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# Configura tu archivo .env
python verificar_instalacion.py
adk run datar
```

### macOS
```bash
git clone git@github.com:DATAR-Aplicacion-Agentica-Ambiental/integracion.git
cd integracion
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# Configura tu archivo .env
python verificar_instalacion.py
adk run datar
```

---

## Contribuciones

Este proyecto forma parte del laboratorio DATAR de Aplicación Agéntica Ambiental. Para contribuir o reportar problemas, por favor contacta al equipo del proyecto.