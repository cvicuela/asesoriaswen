export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold tracking-tight mb-4">
              GRUPO ARO
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Estudio creativo especializado en estrategia de marca,
              lanzamientos y crecimiento digital para marcas con vision.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/mynameisaro/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://www.linkedin.com/in/wendolynrodriguez/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300"
                aria-label="LinkedIn"
              >
                LI
              </a>
              <a
                href="https://wa.me/18299420405"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-gray-700 flex items-center justify-center text-sm font-medium hover:bg-white hover:text-black transition-colors duration-300"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Servicios Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Servicios
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Lanzamiento de Marca
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Relanzamiento
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Consultoria Estrategica
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Campanas Digitales
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Mentoria
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Analisis &amp; Growth
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#sobre"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#proceso"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Proceso
                </a>
              </li>
              <li>
                <a
                  href="#testimonios"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Testimonios
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Politica de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terminos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Aviso Legal
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; 2025 Grupo Aro, SRL &middot; Studio Est. 2008
          </p>
          <a
            href="mailto:wendolyn@mynameisaro.com"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Habla con nosotros
          </a>
        </div>
      </div>
    </footer>
  );
}
