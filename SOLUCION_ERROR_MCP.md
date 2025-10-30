# Solución al Error de Pydantic con ClientSession de MCP

## 🔴 Error Encontrado

```
pydantic.errors.PydanticSchemaGenerationError: Unable to generate pydantic-core schema for <class 'mcp.client.session.ClientSession'>. Set `arbitrary_types_allowed=True` in the model_config to ignore this error or implement `__get_pydantic_core_schema__` on your type to fully support it.
```

## 🎯 Causa del Error

Este error ocurre porque:

1. **google-adk** internamente usa **MCP (Model Context Protocol)** para gestionar sesiones
2. **Pydantic** (el sistema de validación de datos) no puede generar automáticamente un esquema para la clase `ClientSession` de MCP
3. La versión de `google-adk` que tienes instalada no maneja correctamente esta incompatibilidad

## ✅ Soluciones (en orden de preferencia)

### Solución 1: Actualizar Dependencias (RECOMENDADO)

Esta es la solución más limpia y recomendada:

#### Paso 1: Activar tu entorno virtual

Si no tienes un entorno virtual, créalo:

```bash
# Crear entorno virtual
python3 -m venv venv

# Activar entorno virtual
source venv/bin/activate  # En macOS/Linux
# o
venv\Scripts\activate  # En Windows
```

#### Paso 2: Actualizar las dependencias

```bash
# Actualizar pip primero
python -m pip install --upgrade pip

# Instalar las dependencias actualizadas
python -m pip install --upgrade -r requirements.txt
```

#### Paso 3: Verificar la instalación

```bash
python fix_mcp_issue.py
```

Este script te mostrará las versiones instaladas y verificará si el problema está resuelto.

---

### Solución 2: Instalación Manual de Versiones Específicas

Si la Solución 1 no funciona, intenta instalar versiones específicas:

```bash
# Desinstalar versiones antiguas
python -m pip uninstall -y google-adk pydantic mcp

# Instalar versiones específicas
python -m pip install google-adk==1.20.0
python -m pip install pydantic==2.5.3
python -m pip install mcp
python -m pip install litellm>=1.79.0
python -m pip install python-dotenv>=1.0.0
```

---

### Solución 3: Downgrade de Pydantic (última opción)

Si ninguna de las anteriores funciona, intenta con una versión anterior de Pydantic:

```bash
python -m pip install 'pydantic<2.0.0'
```

⚠️ **Advertencia**: Esta solución puede causar otros problemas de compatibilidad.

---

## 🧪 Verificar que el Problema está Resuelto

Después de aplicar cualquiera de las soluciones, verifica que todo funciona:

```bash
# 1. Verificar versiones
python fix_mcp_issue.py

# 2. Verificar instalación completa
python verificar_instalacion.py

# 3. Intentar ejecutar el agente
adk run datar
```

---

## 🔍 Diagnóstico Adicional

Si el problema persiste, ejecuta estos comandos para obtener más información:

```bash
# Ver versión de google-adk
python -m pip show google-adk

# Ver versión de pydantic
python -m pip show pydantic

# Ver versión de mcp
python -m pip show mcp

# Listar todas las dependencias
python -m pip list
```

---

## 📚 Información Adicional

### ¿Qué es MCP?

MCP (Model Context Protocol) es un protocolo desarrollado por Anthropic para estandarizar la forma en que las aplicaciones de IA se comunican con diferentes fuentes de datos y herramientas.

### ¿Por qué google-adk usa MCP?

Google ADK (Agent Development Kit) usa MCP para gestionar las interacciones entre agentes y herramientas externas de forma estandarizada y segura.

### ¿Por qué ocurre este error?

El error ocurre porque Pydantic (una librería de validación de datos) intenta validar automáticamente todos los tipos de datos que se pasan a los modelos. La clase `ClientSession` de MCP no está diseñada para ser validada automáticamente por Pydantic, lo que causa el error.

Las versiones más recientes de `google-adk` manejan esto configurando Pydantic internamente con `arbitrary_types_allowed=True`, que le indica a Pydantic que no intente validar ciertos tipos complejos.

---

## 🆘 Si Nada Funciona

Si ninguna de estas soluciones funciona, considera:

1. **Crear un issue en el repositorio de google-adk**:
   - Incluye el error completo
   - Incluye las versiones de todas tus dependencias
   - Incluye tu sistema operativo

2. **Usar una versión anterior de google-adk** que sepas que funciona:
   ```bash
   python -m pip install google-adk==1.17.0
   ```

3. **Contactar con el soporte de Google ADK** para obtener ayuda específica

---

## 📝 Notas

- **Siempre usa un entorno virtual** para evitar conflictos con otras instalaciones de Python
- **Mantén tus dependencias actualizadas** ejecutando regularmente `pip install --upgrade -r requirements.txt`
- **Documenta las versiones que funcionan** para tu proyecto específico

