/**
 * Netlify Function: /api/chat
 * Proxy seguro hacia Google Gemini 2.0 Flash Lite.
 * La GEMINI_API_KEY nunca se expone al cliente.
 *
 * Configuración requerida en Netlify → Site settings → Environment variables:
 *   GEMINI_API_KEY = 
 */

const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `Eres Valeria, asistente de ventas de Grupo ARO — firma de asesoría empresarial estratégica fundada por Wendolyn Rodriguez en República Dominicana.

SOBRE GRUPO ARO:
- Especialistas en estrategia empresarial, lanzamientos, relanzamientos, branding, campañas de alto impacto y finanzas
- Enfocadas en emprendedoras y ejecutivas
- +15 años de experiencia. Resultados: 3× crecimiento en ventas, +80% conversión en lanzamientos

PLANES:
- Estrategia Express: desde RD$12,000/mes (sesiones 1:1, análisis y plan de acción)
- Lanzamiento & Crecimiento: desde RD$28,000/mes
- Dirección Estratégica: precio a medida
- Primera consulta estratégica: GRATUITA

PROCESO (4 etapas):
1. Diagnóstico — situación actual
2. Estrategia — hoja de ruta personalizada
3. Implementación — ejecución conjunta
4. Seguimiento — medición y ajustes

CONTACTO:
- WhatsApp / Tel: +1 (829) 942-0405
- Email: wendolyn@mynameisaro.com
- Instagram: @mynameisaro

REGLAS:
- Responde siempre en español, tono cálido, profesional y motivador
- Máximo 3-4 líneas (widget de chat pequeño)
- Sin markdown: no uses **, *, #, ni guiones de lista; usa emojis y saltos de línea para estructura
- Si preguntan algo fuera del negocio, redirige amablemente a los servicios de Grupo ARO
- Cuando sea oportuno, invita a agendar la consulta gratuita
- No inventes precios ni datos no listados arriba`;

exports.handler = async function (event) {
    // Solo POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    // CORS para llamadas desde el mismo dominio
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    // Clave de API
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY no configurada');
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'API key missing' }) };
    }

    // Parsear body
    let body;
    try {
        body = JSON.parse(event.body || '{}');
    } catch {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
    }

    const { message, history = [] } = body;

    // Validar mensaje
    if (!message || typeof message !== 'string') {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'message required' }) };
    }

    // Limitar longitud para evitar abuso
    const safeMessage = message.slice(0, 500);

    // Construir turns de conversación (máx. últimos 6 mensajes para contexto)
    const contents = [];
    for (const turn of history.slice(-6)) {
        if (turn.role && turn.text && typeof turn.text === 'string') {
            contents.push({
                role: turn.role === 'user' ? 'user' : 'model',
                parts: [{ text: turn.text.slice(0, 500) }],
            });
        }
    }
    contents.push({ role: 'user', parts: [{ text: safeMessage }] });

    // Llamada a Gemini
    try {
        const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents,
                generationConfig: {
                    maxOutputTokens: 220,
                    temperature: 0.75,
                    topP: 0.9,
                },
                safetySettings: [
                    { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_HATE_SPEECH',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',  threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                    { category: 'HARM_CATEGORY_DANGEROUS_CONTENT',  threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
                ],
            }),
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error('Gemini API HTTP error:', res.status, errText);
            return { statusCode: 502, headers, body: JSON.stringify({ error: 'AI service error' }) };
        }

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!reply) {
            console.error('Gemini empty reply:', JSON.stringify(data));
            return { statusCode: 502, headers, body: JSON.stringify({ error: 'Empty AI response' }) };
        }

        return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

    } catch (err) {
        console.error('Function error:', err);
        return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal error' }) };
    }
};
