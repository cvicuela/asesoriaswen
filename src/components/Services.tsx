"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "Lanzamiento de Proyectos",
    tag: "Estrategia Digital",
    description:
      "Planificamos y ejecutamos el lanzamiento de tu proyecto con una estrategia integral que maximiza el impacto desde el primer dia.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=520&fit=crop&q=80",
    span: "md:col-span-7",
  },
  {
    title: "Relanzamiento & Rebranding",
    tag: "Identidad de Marca",
    description:
      "Redefinimos tu marca con una nueva identidad visual y narrativa que conecta con tu audiencia y refleja tu evolucion.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=520&fit=crop&q=80",
    span: "md:col-span-5",
  },
  {
    title: "Consultoria Ejecutiva",
    tag: "Asesoria Personalizada",
    description:
      "Sesiones uno a uno con expertos para resolver desafios estrategicos y acelerar el crecimiento de tu negocio.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=520&fit=crop&q=80",
    span: "md:col-span-5",
  },
  {
    title: "Campanas Estrategicas",
    tag: "Marketing & Publicidad",
    description:
      "Disenamos campanas de alto rendimiento orientadas a resultados medibles y un retorno de inversion comprobable.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=520&fit=crop&q=80",
    span: "md:col-span-7",
  },
  {
    title: "Mentoria Empresarial",
    tag: "Desarrollo Profesional",
    description:
      "Acompanamiento continuo para lideres y equipos que buscan escalar operaciones y fortalecer su cultura organizacional.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=520&fit=crop&q=80",
    span: "md:col-span-6",
  },
  {
    title: "Analisis & Growth",
    tag: "Datos & Crecimiento",
    description:
      "Transformamos datos en decisiones con analisis profundos que impulsan el crecimiento sostenible de tu empresa.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=520&fit=crop&q=80",
    span: "md:col-span-6",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative bg-neutral-950 py-24 px-6 sm:px-10 lg:px-20"
    >
      {/* Scroll reveal styles */}
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal:nth-child(2) {
          transition-delay: 0.1s;
        }
        .reveal:nth-child(3) {
          transition-delay: 0.2s;
        }
        .reveal:nth-child(4) {
          transition-delay: 0.3s;
        }
        .reveal:nth-child(5) {
          transition-delay: 0.35s;
        }
        .reveal:nth-child(6) {
          transition-delay: 0.4s;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
          Lo que hacemos
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
          Servicios Seleccionados
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5">
        {services.map((service) => (
          <div
            key={service.title}
            className={`reveal group relative overflow-hidden rounded-2xl ${service.span} col-span-1`}
          >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <span className="inline-block w-fit text-[10px] uppercase tracking-widest text-white/70 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-3 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {service.tag}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed max-w-md translate-y-4 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
