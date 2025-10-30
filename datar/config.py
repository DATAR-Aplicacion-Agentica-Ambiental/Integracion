"""
Configuración personalizada para resolver problemas de compatibilidad
entre google-adk, MCP y Pydantic.
"""

import os
from typing import Optional
from pydantic import ConfigDict

# Configuración de Pydantic para permitir tipos arbitrarios
# Esto resuelve el problema con ClientSession de MCP
PYDANTIC_CONFIG = ConfigDict(
    arbitrary_types_allowed=True,
    validate_assignment=True,
)

def get_api_key(key_name: str) -> Optional[str]:
    """
    Obtiene una clave API del entorno de forma segura.
    
    Args:
        key_name: Nombre de la variable de entorno
        
    Returns:
        La clave API o None si no está configurada
    """
    return os.getenv(key_name)


def setup_environment():
    """
    Configura el entorno para evitar problemas con Pydantic y MCP.
    Debe llamarse antes de importar los agentes.
    """
    # Cargar variables de entorno si existe un archivo .env
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        pass
    
    # Configurar Pydantic para permitir tipos arbitrarios globalmente
    # Esto es necesario para ClientSession de MCP
    os.environ["PYDANTIC_ARBITRARY_TYPES_ALLOWED"] = "true"

