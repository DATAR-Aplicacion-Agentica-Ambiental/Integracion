# Guía de Configuración - DATAR

## Configuración de Variables de Entorno

El proyecto DATAR utiliza dos servicios de modelos de lenguaje (LLM):
- **OpenRouter** para el agente principal
- **OpenAI** para los sub-agentes

### Paso 1: Crear archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

```env
OPENROUTER_API_KEY=tu_clave_de_openrouter
OPENAI_API_KEY=tu_clave_de_openai
```

### Paso 2: Obtener las claves API

#### OpenRouter API Key

1. Ve a [https://openrouter.ai/](https://openrouter.ai/)
2. Crea una cuenta o inicia sesión
3. Ve a la sección "Keys" en tu perfil
4. Genera una nueva API key
5. Copia la clave y pégala en tu archivo `.env`

#### OpenAI API Key

1. Ve a [https://platform.openai.com/](https://platform.openai.com/)
2. Crea una cuenta o inicia sesión
3. Ve a "API keys" en tu perfil
4. Crea una nueva clave secreta
5. Copia la clave y pégala en tu archivo `.env`

### Paso 3: Verificar la configuración

Para verificar que las variables de entorno están correctamente configuradas, puedes ejecutar este comando en PowerShell dentro del entorno virtual:

```powershell
(.venv) PS> python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('OpenRouter:', 'Configurado' if os.getenv('OPENROUTER_API_KEY') else 'No configurado'); print('OpenAI:', 'Configurado' if os.getenv('OPENAI_API_KEY') else 'No configurado')"
```

Deberías ver:
```
OpenRouter: Configurado
OpenAI: Configurado
```

## Modelos Configurados

### Agente Principal (DATAR)
- **Modelo**: `openrouter/minimax/minimax-m2:free`
- **Proveedor**: OpenRouter
- **Descripción**: Modelo gratuito de MiniMax vía OpenRouter

### Sub-agente (gente_raiz)
- **Modelo**: `gpt-5-mini`
- **Proveedor**: OpenAI
- **Descripción**: Modelo GPT-5-mini de OpenAI

## Notas Importantes

⚠️ **Seguridad**: Nunca compartas tus claves API públicamente ni las incluyas en commits de Git. El archivo `.env` está incluido en `.gitignore` para evitar que se suba accidentalmente.

💡 **Costos**: Aunque el modelo de OpenRouter configurado es gratuito, verifica los límites y costos de los modelos de OpenAI que utilices.

🔄 **Actualización**: Si cambias las claves API, asegúrate de reiniciar el agente para que los cambios surtan efecto.

