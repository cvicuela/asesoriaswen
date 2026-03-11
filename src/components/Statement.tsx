"use client";

import { useEffect, useRef, useState } from "react";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24 md:py-32 lg:py-40 px-6 md:px-12"
    >
      <div
        className={`mx-auto max-w-[1200px] transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="font-[Playfair_Display] text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] leading-snug md:leading-snug lg:leading-snug text-neutral-800">
          Creamos{" "}
          <a
            href="#servicios"
            className="underline underline-offset-4 decoration-neutral-300 transition-colors duration-300 hover:text-[#D4A574] hover:decoration-[#D4A574]"
          >
            estrategias transformadoras
          </a>{" "}
          que impulsan negocios, personas y marcas hacia adelante. Con más de 16
          años de experiencia, somos el{" "}
          <a
            href="#contacto"
            className="underline underline-offset-4 decoration-neutral-300 transition-colors duration-300 hover:text-[#D4A574] hover:decoration-[#D4A574]"
          >
            aliado estratégico
          </a>{" "}
          que tu empresa necesita.
        </p>
      </div>
    </section>
  );
}
