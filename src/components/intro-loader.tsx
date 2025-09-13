"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center h-screen bg-gray-900 text-white overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90"></div>

      {/* Contenido */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Bienvenido a FormaResortes
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Expertos en fabricación de resortes industriales.
        </p>
        <a
          href="#contacto"
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-xl text-lg font-medium transition"
        >
          Contáctanos
        </a>
      </div>

      {/* SVG del resorte animado */}
      <div className="absolute bottom-10 w-full flex justify-center">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-pink-500"
        >
          <path
            d="M 50 180 
               Q 75 150, 100 180 
               Q 125 210, 150 180 
               Q 175 150, 200 180"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0, 600"
              to="600, 0"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-600"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </section>
  );
}
