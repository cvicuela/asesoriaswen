"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Expertise", href: "#expertise" },
  { label: "Proceso", href: "#proceso" },
  { label: "Líneas", href: "lanes.html" },
  { label: "Precios", href: "preciosAsesoria.html" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-white/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className={`text-2xl font-bold tracking-[0.25em] transition-colors duration-500 ${
                scrolled
                  ? "text-gray-900"
                  : "text-white mix-blend-difference"
              }`}
            >
              GRUPO ARO
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-500 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled
                      ? "text-gray-600 hover:text-gray-900 after:bg-gray-900"
                      : "text-white mix-blend-difference after:bg-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {/* CTA button */}
              <a
                href="#contacto"
                className={`ml-2 rounded-full px-6 py-2.5 text-sm font-semibold tracking-wide transition-all duration-500 ${
                  scrolled
                    ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20"
                    : "bg-white text-gray-900 hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
                }`}
              >
                Contacto
              </a>
            </div>

            {/* Hamburger button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden transition-colors duration-500 ${
                mobileOpen
                  ? "text-white"
                  : scrolled
                    ? "text-gray-900"
                    : "text-white mix-blend-difference"
              }`}
            >
              <span
                className={`block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen
                    ? "translate-y-[8px] rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen
                    ? "-translate-y-[8px] -rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-[55] flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-3xl font-light tracking-widest text-white/80 transition-all duration-500 hover:text-white ${
                mobileOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: mobileOpen ? `${100 + i * 70}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className={`mt-4 rounded-full border border-white/30 px-10 py-3.5 text-lg font-semibold tracking-widest text-white transition-all duration-500 hover:bg-white hover:text-gray-900 ${
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: mobileOpen ? `${100 + navLinks.length * 70}ms` : "0ms" }}
          >
            Contacto
          </a>
        </div>
      </div>
    </>
  );
}
