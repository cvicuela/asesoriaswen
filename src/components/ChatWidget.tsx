"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Knowledge base – keyword → response                               */
/* ------------------------------------------------------------------ */

interface KBEntry {
  keywords: string[];
  reply: string;
}

const WHATSAPP = "18299420405";

const KB: KBEntry[] = [
  {
    keywords: ["precio", "costo", "cuanto", "cuánto", "inversión", "tarifa"],
    reply:
      "Nuestros planes se adaptan a cada empresa:\n\n" +
      "- **Estrategia Express** — desde $2,500 USD\n" +
      "- **Crecimiento Integral** — desde $5,000 USD\n" +
      "- **Transformación Total** — desde $9,500 USD\n\n" +
      "Cada plan incluye diagnóstico inicial sin costo. ¿Te gustaría agendar una llamada para ver cuál se ajusta a tu negocio?",
  },
  {
    keywords: ["servicio", "ofrecen", "hacen", "ayudan", "soluciones"],
    reply:
      "En **Grupo ARO** ofrecemos:\n\n" +
      "1. Consultoría estratégica empresarial\n" +
      "2. Optimización de procesos y operaciones\n" +
      "3. Estrategias de crecimiento y ventas\n" +
      "4. Transformación digital\n" +
      "5. Capacitación y desarrollo de equipos\n\n" +
      "¿Sobre cuál te gustaría saber más?",
  },
  {
    keywords: ["proceso", "como funciona", "cómo funciona", "pasos", "metodología"],
    reply:
      "Nuestro proceso es simple y efectivo:\n\n" +
      "1. **Diagnóstico** — Analizamos tu empresa a fondo\n" +
      "2. **Estrategia** — Diseñamos un plan a tu medida\n" +
      "3. **Implementación** — Ejecutamos junto a tu equipo\n" +
      "4. **Seguimiento** — Medimos resultados y optimizamos\n\n" +
      "Todo inicia con una consulta estratégica sin costo. ¿La agendamos?",
  },
  {
    keywords: ["agendar", "consulta", "cita", "reunión", "llamada", "contactar"],
    reply:
      "¡Perfecto! Puedes agendar tu consulta estratégica gratuita de estas formas:\n\n" +
      `- Escríbenos por WhatsApp: [Abrir WhatsApp](https://wa.me/${WHATSAPP})\n` +
      "- Responde aquí con tu nombre y horario preferido\n\n" +
      "Nos encantaría ayudarte a llevar tu negocio al siguiente nivel.",
  },
  {
    keywords: ["experiencia", "resultados", "casos", "trayectoria", "éxito"],
    reply:
      "Contamos con **+15 años** de experiencia transformando empresas:\n\n" +
      "- Más de **200 empresas** asesoradas\n" +
      "- Crecimiento promedio de **3x** en ventas\n" +
      "- Presencia en **5 países** de Latinoamérica\n" +
      "- **98 %** de satisfacción de nuestros clientes\n\n" +
      "¿Te gustaría conocer casos de éxito en tu industria?",
  },
  {
    keywords: ["hola", "hello", "hi", "buenos días", "buenas tardes", "buenas noches", "hey"],
    reply:
      "¡Hola! Bienvenido(a) a **Grupo ARO**. Soy Valeria, tu asistente de ventas.\n\n" +
      "Estoy aquí para ayudarte con información sobre nuestros servicios de consultoría empresarial. ¿En qué puedo ayudarte hoy?",
  },
  {
    keywords: ["gracias", "ok", "vale", "genial", "perfecto", "excelente"],
    reply:
      "¡Con mucho gusto! Si necesitas algo más, aquí estoy para ayudarte.\n\n" +
      "Recuerda que tu primera consulta estratégica es **sin costo**. No dudes en escribirme cuando quieras agendarla.",
  },
];

const DEFAULT_REPLY =
  "Gracias por tu mensaje. Para brindarte una atención más personalizada, te invito a contactarnos directamente:\n\n" +
  `- [Chatea con nosotros en WhatsApp](https://wa.me/${WHATSAPP})\n\n` +
  "Nuestro equipo estará encantado de ayudarte.";

const GREETING =
  "¡Hola! Soy **Valeria**, asistente virtual de **Grupo ARO**.\n\n" +
  "¿En qué puedo ayudarte hoy? Puedes preguntarme sobre nuestros servicios, precios o agendar una consulta gratuita.";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function matchKB(input: string): string {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")))) {
      return entry.reply;
    }
  }
  return DEFAULT_REPLY;
}

/** Very small markdown-ish renderer (bold + links only). */
function renderMarkdown(text: string) {
  const parts = text.split("\n");
  return parts.map((line, i) => {
    // Process bold and links within a line
    const processed = line
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-blue-600">$1</a>');
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: processed }} />
        {i < parts.length - 1 && <br />}
      </span>
    );
  });
}

/* ------------------------------------------------------------------ */
/*  Typing indicator                                                   */
/* ------------------------------------------------------------------ */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white rounded-2xl rounded-tl-none shadow-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-2 w-2 rounded-full bg-gray-400"
          style={{
            animation: "chatBounce 1.4s infinite ease-in-out",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick-action chips                                                 */
/* ------------------------------------------------------------------ */

const CHIPS = ["Servicios", "Precios", "Proceso", "Agendar"] as const;

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const idRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Auto-greeting when panel first opens
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setMessages([{ id: ++idRef.current, from: "bot", text: GREETING }]);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [open, greeted]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: ++idRef.current, from: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Bot "typing"
    setTyping(true);
    const delay = 800 + Math.random() * 1000;
    setTimeout(() => {
      setTyping(false);
      const botMsg: Message = { id: ++idRef.current, from: "bot", text: matchKB(text) };
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage(input);
  }

  return (
    <>
      {/* Bounce keyframes injected once */}
      <style jsx global>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
        @keyframes chatPulseRing {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.45); opacity: 0; }
        }
      `}</style>

      <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">
        {/* -------- Panel -------- */}
        {open && (
          <div className="w-[340px] max-sm:w-[calc(100vw-2rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white border border-gray-200 animate-[fadeIn_0.2s_ease]">
            {/* Header */}
            <div className="bg-gray-900 text-white px-4 py-3 flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/images/valeria-avatar.jpg"
                  alt="Valeria"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight truncate">
                  Valeria &middot; Grupo ARO
                </p>
                <p className="text-xs text-gray-300 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
                  Asistente de ventas &middot; En l&iacute;nea
                </p>
              </div>
              <button
                aria-label="Cerrar chat"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Promo bar */}
            <div className="bg-emerald-50 text-emerald-800 text-xs text-center py-2 font-medium border-b border-emerald-100">
              Primera consulta estrat&eacute;gica sin costo
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50" style={{ maxHeight: 260 }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] text-sm px-4 py-2.5 leading-relaxed ${
                      msg.from === "user"
                        ? "bg-gray-900 text-white rounded-2xl rounded-tr-none"
                        : "bg-white text-gray-800 rounded-2xl rounded-tl-none shadow-sm"
                    }`}
                  >
                    {renderMarkdown(msg.text)}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <TypingDots />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick-action chips */}
            <div className="flex gap-2 px-4 py-2 overflow-x-auto border-t border-gray-100 bg-white">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-200 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm bg-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300 text-gray-800 placeholder:text-gray-400"
              />
              <button
                onClick={() => sendMessage(input)}
                aria-label="Enviar mensaje"
                className="h-9 w-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* -------- Floating bubble -------- */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir chat"
          className="relative h-16 w-16 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform focus:outline-none"
        >
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
            style={{ animation: "chatPulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
          />
          <Image
            src="/images/valeria-avatar.jpg"
            alt="Chat con Valeria"
            fill
            className="object-cover"
          />
          {/* Notification badge */}
          {!open && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-white">
              1
            </span>
          )}
        </button>
      </div>
    </>
  );
}
