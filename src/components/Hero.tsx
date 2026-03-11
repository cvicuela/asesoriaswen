"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=1080&fit=crop&q=80",
    alt: "Profesional de negocios",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&h=1080&fit=crop&q=80",
    alt: "Equipo de trabajo colaborando",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1920&h=1080&fit=crop&q=80",
    alt: "Entorno empresarial moderno",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const formattedIndex = String(currentSlide + 1).padStart(2, "0");
  const totalSlides = String(slides.length).padStart(2, "0");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image Carousel */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content - Bottom Left */}
      <div className="absolute bottom-16 left-8 md:left-16 lg:left-24 z-10 max-w-2xl">
        {/* Slide Counter */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-white text-sm font-light tracking-[0.3em] uppercase">
            {formattedIndex}
          </span>
          <span className="w-8 h-px bg-white/50" />
          <span className="text-white/50 text-sm font-light tracking-[0.3em] uppercase">
            {totalSlides}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-[Playfair_Display] text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Transformamos tu{" "}
          <em className="italic" style={{ color: "#D4A574" }}>
            visi&oacute;n
          </em>{" "}
          en realidad empresarial
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-lg">
          Brindamos asesor&iacute;a integral para impulsar el crecimiento y la
          transformaci&oacute;n de tu empresa con soluciones estrat&eacute;gicas
          a la medida.
        </p>
      </div>

      {/* Navigation Arrows - Bottom Right */}
      <div className="absolute bottom-16 right-8 md:right-16 lg:right-24 z-10 flex items-center gap-4">
        <button
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
          className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          aria-label="Siguiente diapositiva"
          className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
