from google.adk.agents.llm_agent import Agent
from google.adk.models.lite_llm import LiteLlm
import os
from .gentes_autonomas.gentes_montana import Gente_Montaña

root_agent = Agent(
    model=LiteLlm(
        model="openrouter/minimax/minimax-m2:free",  # Especifica el modelo con prefijo 'openrouter/'
        api_key=os.getenv("OPENROUTER_API_KEY"),  # Lee la API key del entorno
        api_base="https://openrouter.ai/api/v1"   # URL base de OpenRouter
    ),
    name='DATAR',
    description='Aplicación agéntica ambiental para participar de la agencia de la estructura ecológica principal (EEP) de Bogotá.',
    instruction='Integras todos los proyectos agénticos del laboratorio DATAR. Cada una de las 20 personas que conforman el laboratorio son gentes autónomas que quieren participar de la agencia ambiental de la estructura ecológica principal (EEP) de Bogotá. Cada una de las personas participantes fijan sus miradas sobre gestos que anuncian bosques en potencia en Bogotá; basados en las observaciones sobre el ecosistema de referencia.',
    sub_agents=[
        Gente_Montaña,
    ],
)
