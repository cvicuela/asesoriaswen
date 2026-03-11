"use client";

import { useEffect, useRef, useState } from "react";

export default function Contact() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="bg-white py-20 px-6 md:px-12 lg:px-20"
    >
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Left Column (2 of 5 = ~1fr of 2.5 total) */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-8">
            Comencemos a trabajar juntas
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-xl mt-0.5">✉</span>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                  Email
                </p>
                <a
                  href="mailto:wendolyn@mynameisaro.com"
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  wendolyn@mynameisaro.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl mt-0.5">📱</span>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/18299420405"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-600 transition-colors"
                >
                  +1 (829) 942-0405
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl mt-0.5">📍</span>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                  Ubicacion
                </p>
                <p className="text-gray-900">Republica Dominicana</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-xl mt-0.5">🕐</span>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
                  Horario
                </p>
                <p className="text-gray-900">Lun - Vie: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (3 of 5 = ~1.5fr of 2.5 total) */}
        <div className="lg:col-span-3">
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10 space-y-6"
          >
            {/* Row 1: Nombre + Empresa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="empresa"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Empresa/Proyecto
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="Nombre de tu empresa o proyecto"
                />
              </div>
            </div>

            {/* Row 2: Email + Telefono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Telefono <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                  placeholder="+1 (000) 000-0000"
                />
              </div>
            </div>

            {/* Servicio de Interes */}
            <div>
              <label
                htmlFor="servicio"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Servicio de Interes <span className="text-red-500">*</span>
              </label>
              <select
                id="servicio"
                name="servicio"
                required
                defaultValue=""
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all appearance-none"
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                <option value="Lanzamiento">Lanzamiento</option>
                <option value="Relanzamiento">Relanzamiento</option>
                <option value="Consultoria">Consultoria</option>
                <option value="Campanas">Campanas</option>
                <option value="Mentoria">Mentoria</option>
                <option value="Analisis & Growth">Analisis &amp; Growth</option>
              </select>
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cuentanos sobre tu proyecto
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-vertical"
                placeholder="Describe brevemente tu proyecto, objetivos y cualquier detalle relevante..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-4 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-center"
            >
              Enviar Solicitud de Consulta →
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
