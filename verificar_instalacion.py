#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de verificación de instalación para DATAR
Verifica que todas las dependencias y configuraciones estén correctas.
"""

import sys
import os
import io

# Configurar la salida para soportar UTF-8 en Windows
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

def verificar_imports():
    """Verifica que todos los módulos necesarios estén instalados."""
    print("🔍 Verificando importaciones de módulos...")
    
    modulos_requeridos = {
        'google.adk': 'google-adk',
        'litellm': 'litellm',
        'dotenv': 'python-dotenv',
    }
    
    fallos = []
    for modulo, paquete in modulos_requeridos.items():
        try:
            __import__(modulo)
            print(f"  ✅ {paquete}")
        except ImportError:
            print(f"  ❌ {paquete} no encontrado")
            fallos.append(paquete)
    
    return fallos

def verificar_variables_entorno():
    """Verifica que las variables de entorno estén configuradas."""
    print("\n🔍 Verificando variables de entorno...")
    
    try:
        from dotenv import load_dotenv
        load_dotenv()
    except ImportError:
        print("  ⚠️  No se pudo cargar python-dotenv")
        return []
    
    variables_requeridas = [
        'OPENROUTER_API_KEY',
        'OPENAI_API_KEY',
    ]
    
    fallos = []
    for var in variables_requeridas:
        valor = os.getenv(var)
        if valor:
            # Ocultar la mayor parte de la clave por seguridad
            valor_oculto = valor[:8] + "..." if len(valor) > 8 else "***"
            print(f"  ✅ {var} = {valor_oculto}")
        else:
            print(f"  ❌ {var} no configurada")
            fallos.append(var)
    
    return fallos

def verificar_estructura_proyecto():
    """Verifica que la estructura del proyecto sea correcta."""
    print("\n🔍 Verificando estructura del proyecto...")
    
    archivos_requeridos = [
        'datar/__init__.py',
        'datar/agent.py',
        'datar/gentes_autonomas/gentes_montana/__init__.py',
        'datar/gentes_autonomas/gentes_montana/agent.py',
        'requirements.txt',
        'README.md',
    ]
    
    fallos = []
    for archivo in archivos_requeridos:
        if os.path.exists(archivo):
            print(f"  ✅ {archivo}")
        else:
            print(f"  ❌ {archivo} no encontrado")
            fallos.append(archivo)
    
    return fallos

def main():
    """Función principal de verificación."""
    print("=" * 60)
    print("   VERIFICACIÓN DE INSTALACIÓN - DATAR")
    print("=" * 60)
    print()
    
    # Verificar imports
    fallos_imports = verificar_imports()
    
    # Verificar variables de entorno
    fallos_env = verificar_variables_entorno()
    
    # Verificar estructura
    fallos_estructura = verificar_estructura_proyecto()
    
    # Resumen
    print("\n" + "=" * 60)
    print("   RESUMEN")
    print("=" * 60)
    
    total_fallos = len(fallos_imports) + len(fallos_env) + len(fallos_estructura)
    
    if total_fallos == 0:
        print("✨ ¡Todo está correctamente configurado!")
        print("\nPuedes ejecutar el agente con:")
        print("  adk run datar")
        return 0
    else:
        print(f"⚠️  Se encontraron {total_fallos} problema(s):\n")
        
        if fallos_imports:
            print("📦 Módulos faltantes:")
            print("   Ejecuta: pip install -r requirements.txt")
            for paquete in fallos_imports:
                print(f"   - {paquete}")
        
        if fallos_env:
            print("\n🔑 Variables de entorno no configuradas:")
            print("   Crea un archivo .env en la raíz del proyecto")
            print("   Consulta CONFIGURACION.md para más detalles")
            for var in fallos_env:
                print(f"   - {var}")
        
        if fallos_estructura:
            print("\n📁 Archivos faltantes del proyecto:")
            for archivo in fallos_estructura:
                print(f"   - {archivo}")
        
        return 1

if __name__ == '__main__':
    sys.exit(main())

