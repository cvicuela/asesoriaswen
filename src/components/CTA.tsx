"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const content = section.querySelector<HTMLElement>(".cta-content");
    if (content) {
      content.style.opacity = "0";
      content.style.transform = "translateY(30px)";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && content) {
            content.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-24">
      <div className="cta-content mx-auto max-w-3xl px-6 text-center">
        <h2
          className="mb-6 text-4xl font-bold text-white md:text-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ¿Lista para transformar tu{" "}
          <em className="not-italic italic" style={{ color: "#D4A574" }}>
            proyecto
          </em>
          ?
        </h2>
        <p className="mb-10 text-lg text-gray-400">
          Agenda una consulta estratégica gratuita y descubre cómo podemos
          impulsar tu negocio al siguiente nivel.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contacto"
            className="inline-block rounded-full bg-white px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-gray-200"
          >
            Agenda tu Consulta
          </a>
          <a
            href="https://wa.me/18299420405"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            WhatsApp Directo
          </a>
        </div>
      </div>
    </section>
  );
}
