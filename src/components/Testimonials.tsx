"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "Grupo Aro fue clave en el relanzamiento de mi empresa. Su enfoque estratégico y comprensión del mercado femenino nos ayudó a triplicar nuestras ventas en 6 meses.",
    name: "María Castillo",
    role: "CEO Fashion Boutique",
    initials: "MC",
  },
  {
    quote:
      "La mentoría que recibí me dio la claridad y confianza que necesitaba para expandir mi negocio a nivel internacional. Resultados excepcionales.",
    name: "Laura Gómez",
    role: "Fundadora Tech Startup",
    initials: "LG",
  },
  {
    quote:
      "Su expertise en campañas estratégicas transformó completamente nuestra presencia en el mercado. Profesionalismo y resultados en cada etapa.",
    name: "Sofía Vargas",
    role: "Directora de Marketing",
    initials: "SV",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".testimonial-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards =
              entry.target.querySelectorAll<HTMLElement>(".testimonial-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, index * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    // Initialize cards as hidden
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonios" ref={sectionRef} className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2
          className="mb-16 text-center text-4xl font-bold md:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Lo que dicen nuestras clientas
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="testimonial-card rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="mb-4 block text-5xl leading-none text-gray-300">
                &ldquo;
              </span>
              <p className="mb-8 italic text-gray-600">{t.quote}</p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
