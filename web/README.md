# 🌱 DATAR - Interfaz Web

Interfaz web moderna para interactuar con el sistema agéntico ambiental DATAR.

## 🚀 Características

- ✅ Chat en tiempo real con el agente DATAR
- ✅ Gestión de sesiones (crear, ver, cambiar entre sesiones)
- ✅ Historial de conversaciones
- ✅ Información del agente en tiempo real
- ✅ Indicador de estado de conexión
- ✅ Diseño responsivo y moderno
- ✅ Tema ambiental con colores verdes

## 📁 Estructura

```
web/
├── index.html      # Estructura HTML de la aplicación
├── styles.css      # Estilos CSS personalizados
├── app.js          # Lógica de la aplicación
└── README.md       # Esta documentación
```

## 🔧 Cómo Usar

### 1. Iniciar el servidor FastAPI

Primero, asegúrate de que el servidor backend esté corriendo:

```bash
# Desde la raíz del proyecto
python -m datar.main
```

El servidor debe estar corriendo en `http://localhost:8080`

### 2. Abrir la interfaz web

Tienes varias opciones:

#### Opción A: Abrir directamente en el navegador
```bash
# Desde el directorio web
open index.html
# O en Linux
xdg-open index.html
# O en Windows
start index.html
```

#### Opción B: Usar un servidor HTTP simple (recomendado)

```bash
# Con Python
cd web
python -m http.server 5500

# O con Node.js (si tienes http-server instalado)
npx http-server -p 5500
```

Luego abre tu navegador en: `http://localhost:5500`

#### Opción C: Usar Live Server de VS Code
- Instala la extensión "Live Server" en VS Code
- Click derecho en `index.html` → "Open with Live Server"

## 💬 Funcionalidades

### Chat con DATAR
- Escribe mensajes en el área de texto
- Presiona Enter para enviar (Shift+Enter para nueva línea)
- El agente responderá basándose en su configuración

### Gestión de Sesiones
- **Nueva Sesión**: Click en "Nueva Sesión" para comenzar una conversación nueva
- **Ver Sesiones**: Lista de todas las sesiones activas en el panel lateral
- **Cambiar Sesión**: Click en cualquier sesión para ver su historial completo
- **Contexto**: Cada sesión mantiene su propio contexto de conversación

### Información del Agente
- Panel lateral muestra información detallada del agente
- Incluye nombre, descripción, modelo y sub-agentes

### Indicador de Conexión
- 🟡 Amarillo parpadeante: Conectando...
- 🟢 Verde: Conectado
- 🔴 Rojo: Error de conexión

## 🎨 Personalización

### Cambiar colores
Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #2d7a3e;    /* Color principal */
    --secondary-color: #4a9d5f;  /* Color secundario */
    --accent-color: #6dbf7d;     /* Color de acento */
    /* ... más variables */
}
```

### Cambiar URL del API
Edita `app.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080'; // Cambia aquí
```

## 🔧 Solución de Problemas

### "No se puede conectar con el servidor"
- Verifica que el servidor FastAPI esté corriendo en `http://localhost:8080`
- Ejecuta: `python -m datar.main`

### Error de CORS
El servidor ya está configurado para aceptar peticiones desde:
- `http://localhost:5500`
- `http://127.0.0.1:5500`
- Cualquier origen (`*` en desarrollo)

Si usas otro puerto, agrega tu origen en `datar/main.py`:

```python
ALLOWED_ORIGINS = [
    "http://localhost:5500",
    "http://localhost:TU_PUERTO",  # Agrega aquí
    "*"
]
```

### Los mensajes no se envían
- Verifica la consola del navegador (F12) para ver errores
- Asegúrate de que la API key de OpenRouter esté configurada
- Verifica que el servidor no tenga errores

## 🌐 Endpoints Utilizados

La interfaz web consume estos endpoints del API:

- `GET /health` - Verificar estado del servidor
- `GET /agent/info` - Información del agente
- `POST /chat` - Enviar mensajes al agente
- `GET /sessions` - Listar todas las sesiones
- `GET /sessions/{id}` - Ver historial de una sesión

## 📱 Responsive

La interfaz es totalmente responsiva y funciona en:
- 💻 Desktop
- 📱 Tablets
- 📱 Móviles

## 🚀 Próximas Mejoras

Posibles mejoras futuras:
- [ ] Exportar conversaciones
- [ ] Modo oscuro
- [ ] Soporte para Markdown en mensajes
- [ ] Notificaciones de escritorio
- [ ] Búsqueda en historial
- [ ] Compartir sesiones

## 📄 Licencia

Parte del proyecto DATAR - Sistema Agéntico Ambiental

