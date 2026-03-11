"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Análisis profundo de tu situación actual, objetivos y oportunidades de mercado.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Desarrollo de un plan estratégico personalizado con objetivos claros y medibles.",
  },
  {
    number: "03",
    title: "Ejecución",
    description:
      "Implementación de las estrategias con acompañamiento continuo y ajustes en tiempo real.",
  },
  {
    number: "04",
    title: "Optimización",
    description:
      "Monitoreo de resultados y optimización continua para maximizar el impacto.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 150);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="bg-white py-24 md:py-32 lg:py-40 px-6 md:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-[Playfair_Display] text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
            Cómo trabajamos contigo
          </h2>
          <p className="text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto">
            Un proceso probado que garantiza resultados medibles en cada etapa.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`group px-6 lg:px-8 ${
                index > 0 ? "lg:border-l lg:border-neutral-200" : ""
              } transition-all duration-700 ease-out ${
                visibleItems[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <span className="font-[Playfair_Display] text-5xl md:text-6xl font-light text-neutral-200 transition-colors duration-300 group-hover:text-[#D4A574] block mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-500 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
