"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useCountUp(end: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projectsCount = useCountUp(150, 2000, statsVisible);
  const satisfactionCount = useCountUp(95, 2000, statsVisible);
  const yearsCount = useCountUp(16, 1500, statsVisible);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="bg-[#171717] text-white py-20 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column - Text */}
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-12"
          }`}
        >
          <h2 className="font-[Playfair_Display] text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
            Experiencia que{" "}
            <span className="italic text-[#D4A574]">marca la diferencia</span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
            Con más de 16 años de experiencia en asesoría empresarial, nos
            especializamos en acompañar a mujeres emprendedoras en cada etapa de
            su camino. Desde la conceptualización de ideas hasta la consolidación
            de negocios rentables, brindamos herramientas estratégicas,
            acompañamiento personalizado y una visión integral que transforma
            proyectos en historias de éxito.
          </p>

          {/* Stats Row */}
          <div
            ref={statsRef}
            className={`border-t border-gray-700 pt-8 grid grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div>
              <span className="block font-[Playfair_Display] text-3xl md:text-4xl text-[#D4A574]">
                {projectsCount}+
              </span>
              <span className="text-gray-400 text-sm mt-1 block">
                Proyectos Exitosos
              </span>
            </div>
            <div>
              <span className="block font-[Playfair_Display] text-3xl md:text-4xl text-[#D4A574]">
                {satisfactionCount}%
              </span>
              <span className="text-gray-400 text-sm mt-1 block">
                Satisfacción
              </span>
            </div>
            <div>
              <span className="block font-[Playfair_Display] text-3xl md:text-4xl text-[#D4A574]">
                {yearsCount}+
              </span>
              <span className="text-gray-400 text-sm mt-1 block">
                Años de Experiencia
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-12"
          }`}
        >
          <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=1000&fit=crop&q=80"
              alt="Asesoría profesional para mujeres emprendedoras"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
