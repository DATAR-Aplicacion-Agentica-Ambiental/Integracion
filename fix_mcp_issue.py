#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para resolver el problema de Pydantic con ClientSession de MCP.

Este script verifica la versión de google-adk y proporciona instrucciones
para resolver el error de PydanticSchemaGenerationError.
"""

import sys
import subprocess

def check_google_adk_version():
    """Verifica la versión instalada de google-adk."""
    try:
        result = subprocess.run(
            [sys.executable, "-m", "pip", "show", "google-adk"],
            capture_output=True,
            text=True,
            check=True
        )
        print("📦 Información de google-adk:")
        print(result.stdout)
        
        # Extraer versión
        for line in result.stdout.split('\n'):
            if line.startswith('Version:'):
                version = line.split(':', 1)[1].strip()
                return version
    except subprocess.CalledProcessError:
        print("❌ No se pudo obtener información de google-adk")
        return None

def check_pydantic_version():
    """Verifica la versión instalada de pydantic."""
    try:
        result = subprocess.run(
            [sys.executable, "-m", "pip", "show", "pydantic"],
            capture_output=True,
            text=True,
            check=True
        )
        print("\n📦 Información de pydantic:")
        print(result.stdout)
        
        for line in result.stdout.split('\n'):
            if line.startswith('Version:'):
                version = line.split(':', 1)[1].strip()
                return version
    except subprocess.CalledProcessError:
        print("❌ No se pudo obtener información de pydantic")
        return None

def main():
    print("=" * 70)
    print("   DIAGNÓSTICO: Error de Pydantic con ClientSession de MCP")
    print("=" * 70)
    print()
    
    print("🔍 Verificando versiones de paquetes...\n")
    
    adk_version = check_google_adk_version()
    pydantic_version = check_pydantic_version()
    
    print("\n" + "=" * 70)
    print("   SOLUCIONES POSIBLES")
    print("=" * 70)
    print()
    
    print("1️⃣  ACTUALIZAR GOOGLE-ADK (Recomendado)")
    print("   El error sugiere que google-adk necesita una actualización.")
    print()
    print("   Ejecuta en tu entorno virtual:")
    print("   python -m pip install --upgrade google-adk")
    print()
    
    print("2️⃣  FIJAR VERSIÓN DE PYDANTIC")
    print("   Si el problema persiste, intenta con una versión específica:")
    print()
    print("   python -m pip install 'pydantic<2.0.0'")
    print("   O alternativamente:")
    print("   python -m pip install 'pydantic>=2.5.0'")
    print()
    
    print("3️⃣  INSTALAR DEPENDENCIAS ADICIONALES DE MCP")
    print("   Asegúrate de que las dependencias de MCP estén instaladas:")
    print()
    print("   python -m pip install mcp")
    print()
    
    print("4️⃣  VERIFICAR ENTORNO VIRTUAL")
    print("   Asegúrate de estar usando un entorno virtual:")
    print()
    print("   python -m venv venv")
    print("   source venv/bin/activate  # En macOS/Linux")
    print("   python -m pip install -r requirements.txt")
    print()
    
    print("=" * 70)
    print()
    print("⚠️  NOTA: El error ocurre porque google-adk internamente intenta")
    print("   usar ClientSession de MCP, pero Pydantic no puede generar")
    print("   un esquema para esa clase.")
    print()
    print("   La solución más probable es actualizar google-adk a una")
    print("   versión que maneje correctamente este problema.")
    print()
    
    if adk_version:
        print(f"   Tu versión actual de google-adk: {adk_version}")
        print("   Se recomienda actualizar a la versión 1.20.0 o superior")
    
    return 0

if __name__ == '__main__':
    sys.exit(main())

