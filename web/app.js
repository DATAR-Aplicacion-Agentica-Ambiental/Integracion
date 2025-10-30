// Configuración
const API_BASE_URL = 'http://localhost:8080';

// Estado de la aplicación
let currentSessionId = null;
let sessions = [];

// Elementos del DOM
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const sendBtnText = document.getElementById('send-btn-text');
const sendBtnLoader = document.getElementById('send-btn-loader');
const connectionStatus = document.getElementById('connection-status');
const connectionText = document.getElementById('connection-text');
const agentInfo = document.getElementById('agent-info');
const sessionsList = document.getElementById('sessions-list');
const currentSessionSpan = document.getElementById('current-session');
const newSessionBtn = document.getElementById('new-session-btn');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    init();
});

async function init() {
    // Verificar conexión con el servidor
    await checkConnection();
    
    // Cargar información del agente
    await loadAgentInfo();
    
    // Cargar sesiones existentes
    await loadSessions();
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    newSessionBtn.addEventListener('click', createNewSession);
}

// Verificar conexión con el servidor
async function checkConnection() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        if (response.ok) {
            setConnectionStatus('connected', 'Conectado');
            return true;
        }
    } catch (error) {
        setConnectionStatus('error', 'Sin conexión');
        showError('No se puede conectar con el servidor. Asegúrate de que esté corriendo en http://localhost:8080');
        return false;
    }
}

// Establecer estado de conexión
function setConnectionStatus(status, text) {
    connectionStatus.className = `status-dot ${status}`;
    connectionText.textContent = text;
}

// Cargar información del agente
async function loadAgentInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/agent/info`);
        const data = await response.json();
        
        agentInfo.innerHTML = `
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Descripción:</strong> ${data.description}</p>
            <p><strong>Modelo:</strong> ${data.model}</p>
            ${data.sub_agents.length > 0 ? `
                <p><strong>Sub-agentes:</strong></p>
                <ul style="margin-left: 1rem; margin-top: 0.5rem;">
                    ${data.sub_agents.map(agent => `
                        <li>${agent.name}: ${agent.description}</li>
                    `).join('')}
                </ul>
            ` : ''}
        `;
    } catch (error) {
        agentInfo.innerHTML = '<p class="text-muted">No se pudo cargar la información del agente</p>';
        console.error('Error al cargar info del agente:', error);
    }
}

// Cargar sesiones existentes
async function loadSessions() {
    try {
        const response = await fetch(`${API_BASE_URL}/sessions`);
        sessions = await response.json();
        
        if (sessions.length === 0) {
            sessionsList.innerHTML = '<p class="text-muted">No hay sesiones activas</p>';
        } else {
            renderSessions();
        }
    } catch (error) {
        console.error('Error al cargar sesiones:', error);
    }
}

// Renderizar lista de sesiones
function renderSessions() {
    sessionsList.innerHTML = sessions.map(session => `
        <div class="session-item ${session.session_id === currentSessionId ? 'active' : ''}" 
             onclick="loadSession('${session.session_id}')">
            <div class="session-item-id">
                📝 Sesión ${session.session_id.substring(0, 8)}...
            </div>
            <div class="session-item-info">
                ${session.message_count} mensajes
            </div>
        </div>
    `).join('');
}

// Cargar una sesión específica
async function loadSession(sessionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`);
        const data = await response.json();
        
        currentSessionId = sessionId;
        currentSessionSpan.textContent = `Sesión: ${sessionId.substring(0, 8)}...`;
        
        // Limpiar chat
        chatMessages.innerHTML = '';
        
        // Mostrar mensajes del historial
        if (data.messages && data.messages.length > 0) {
            data.messages.forEach(msg => {
                if (msg.role === 'user' || msg.role === 'assistant') {
                    addMessageToChat(msg.role, msg.content, msg.timestamp);
                }
            });
        }
        
        // Actualizar UI
        renderSessions();
    } catch (error) {
        console.error('Error al cargar sesión:', error);
        showError('No se pudo cargar la sesión');
    }
}

// Crear nueva sesión
function createNewSession() {
    currentSessionId = null;
    currentSessionSpan.textContent = 'Sin sesión activa';
    chatMessages.innerHTML = `
        <div class="welcome-message">
            <h3>¡Nueva conversación!</h3>
            <p>Escribe un mensaje para comenzar una nueva sesión con DATAR.</p>
        </div>
    `;
    renderSessions();
    messageInput.focus();
}

// Enviar mensaje
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (!message) {
        return;
    }
    
    // Deshabilitar input
    setLoading(true);
    
    // Agregar mensaje del usuario al chat
    addMessageToChat('user', message);
    
    // Agregar indicador de "escribiendo..."
    const typingIndicator = addTypingIndicator();
    
    // Limpiar input
    messageInput.value = '';
    
    try {
        console.log('Enviando mensaje:', message);
        console.log('Session ID:', currentSessionId);
        
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                session_id: currentSessionId
            })
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Respuesta recibida:', data);
        
        // Verificar que la respuesta tenga los campos necesarios
        if (!data.response) {
            console.error('Respuesta sin campo "response":', data);
            throw new Error('Respuesta inválida del servidor');
        }
        
        // Guardar session_id si es nueva
        if (!currentSessionId && data.session_id) {
            currentSessionId = data.session_id;
            currentSessionSpan.textContent = `Sesión: ${currentSessionId.substring(0, 8)}...`;
            await loadSessions(); // Recargar lista de sesiones
        }
        
        // Remover indicador de "escribiendo..."
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
        
        // Agregar respuesta del agente
        addMessageToChat('assistant', data.response, data.timestamp);
        
    } catch (error) {
        console.error('Error completo al enviar mensaje:', error);
        
        // Remover indicador de "escribiendo..."
        if (typingIndicator && typingIndicator.parentNode) {
            typingIndicator.remove();
        }
        
        addMessageToChat('error', `Error al comunicarse con el servidor: ${error.message}`);
    } finally {
        setLoading(false);
        messageInput.focus();
    }
}

// Agregar indicador de "escribiendo..."
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message assistant typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🌱</div>
        <div>
            <div class="message-content">
                <span class="typing-dots">
                    <span>.</span><span>.</span><span>.</span>
                </span>
                DATAR está escribiendo
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingDiv;
}

// Agregar mensaje al chat
function addMessageToChat(role, content, timestamp = null) {
    // Eliminar mensaje de bienvenida si existe
    const welcomeMessage = chatMessages.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatarEmoji = role === 'user' ? '👤' : (role === 'assistant' ? '🌱' : '⚠️');
    const messageClass = role === 'error' ? 'message-content error-message' : 'message-content';
    
    const timeString = timestamp ? formatTimestamp(timestamp) : formatTimestamp(new Date().toISOString());
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatarEmoji}</div>
        <div>
            <div class="${messageClass}">
                ${escapeHtml(content)}
            </div>
            <div class="message-timestamp">${timeString}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Establecer estado de carga
function setLoading(loading) {
    sendBtn.disabled = loading;
    messageInput.disabled = loading;
    
    if (loading) {
        sendBtnText.classList.add('hidden');
        sendBtnLoader.classList.remove('hidden');
    } else {
        sendBtnText.classList.remove('hidden');
        sendBtnLoader.classList.add('hidden');
    }
}

// Mostrar error
function showError(message) {
    addMessageToChat('error', message);
}

// Formatear timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Si es hoy
    if (diff < 86400000) {
        return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) + ' ' + 
           date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

// Escapar HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}

// Verificar conexión periódicamente
setInterval(checkConnection, 30000); // Cada 30 segundos

