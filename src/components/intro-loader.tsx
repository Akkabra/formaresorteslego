"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

/**
 * Genera un resorte compuesto por anillos iguales (elipse por anillo).
 * width/height: dimensiones del area SVG.
 * turns: cantidad de anillos.
 */
function generateSpring(width: number, height: number, turns: number) {
  const t = Math.max(1, Math.floor(turns));
  const stepY = height / (t + 1);
  const centerX = width / 2;
  const rx = width / 2.6; // ancho fijo del anillo
  const ry = Math.max(6, stepY / 3); // alto fijo relativo al paso

  let d = "";
  for (let i = 0; i < t; i++) {
    const cy = stepY * (i + 1);
    // cada anillo se compone de dos arcos (una elipse completa)
    if (i === 0) d += `M ${centerX + rx} ${cy} `;
    d += `A ${rx} ${ry} 0 0 1 ${centerX - rx} ${cy} `;
    d += `A ${rx} ${ry} 0 0 1 ${centerX + rx} ${cy} `;
  }

  return d;
}

/**
 * DrawingSpring: el SVG del resorte y su animación.
 * - La animación se inicia en mount (no depende de show para arrancar),
 *   así el trazo ya está corriendo y solo controlamos la visibilidad por opacity.
 * - El loop es continuo (dibujar -> desdibujar -> dibujar ...) SIN PAUSAS,
 *   usando keyframes [len -> 0 -> len] con easing 'linear'.
 */
const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    let cancelled = false;

    const startWhenReady = () => {
      const p = pathRef.current;
      if (!p) {
        // si aún no está renderizado, reintentar en el siguiente frame
        requestAnimationFrame(startWhenReady);
        return;
      }

      // obtener longitud de forma defensiva
      let len = 0;
      try {
        len = p.getTotalLength();
      } catch {
        len = 1200; // fallback razonable
      }
      if (!isFinite(len) || len <= 0) len = 1200;

      // preparar trazo
      try {
        p.style.strokeDasharray = `${len}px`;
        p.style.strokeDashoffset = `${len}px`;
      } catch {
        // ignore
      }

      if (cancelled) return;

      // animación continua: dibuja -> desdibuja -> dibuja ... sin pausa
      try {
        // duration total del ciclo (ms)
        const duration = 6000;
        animRef.current = p.animate(
          [
            { strokeDashoffset: `${len}px` }, // invisible
            { strokeDashoffset: "0px" },      // dibujado
            { strokeDashoffset: `${len}px` }, // desdibujado
          ],
          {
            duration,
            easing: "linear", // LINEAR para que no exista pausa perceptible
            iterations: Infinity,
          }
        );
      } catch {
        // si la Web Animations API no está disponible, no rompemos
        animRef.current = null;
      }
    };

    startWhenReady();

    return () => {
      cancelled = true;
      if (animRef.current) {
        try {
          animRef.current.cancel();
        } catch {}
        animRef.current = null;
      }
    };
  }, []); // se monta una sola vez

  const pathD = generateSpring(200, 300, 6);

  return (
    <div
      className={cn(
        "relative w-[220px] h-[320px] flex flex-col items-center justify-center transition-opacity duration-700",
        // controlamos solo la opacidad: el anim loop sigue corriendo en background
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!show}
    >
      <svg width={200} height={300} viewBox="0 0 200 300" preserveAspectRatio="xMidYMid meet">
        <path
          ref={pathRef}
          d={pathD}
          stroke="white"
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <p className="mt-4 text-white text-lg tracking-widest">CARGANDO...</p>
    </div>
  );
};

/**
 * Logo + texto para la segunda pantalla.
 */
const LogoAndText = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "flex flex-col items-center transition-opacity duration-700",
      show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}
    aria-hidden={!show}
  >
    <Image src="/LOGO PRINCIPAL BLANCO.png" alt="FormaResortes Logo" width={160} height={80} priority />
    <p className="mt-4 text-lg font-headline tracking-wider text-black text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

/**
 * Componente principal: mantiene la lógica de fases intacta,
 * pero ahora usamos opacidad + transition-colors para una animación
 * suave entre pantallas. El resorte no se detiene y no hace pausas.
 */
export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 100)); // inicia resorte
    timers.push(window.setTimeout(() => setPhase(2), 7500)); // muestra logo
    timers.push(window.setTimeout(() => setPhase(3), 9500)); // fade out completo
    timers.push(window.setTimeout(() => onFinished(), 10300)); // termina

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-800 transition-colors duration-700",
        // background cambia suavemente entre pantalla 1 y 2
        phase === 0 || phase === 1 ? "bg-[#0a192f]" : "bg-white",
        // fade out final
        phase === 3 && "opacity-0"
      )}
    >
      {/* Crossfade entre resorte (primera pantalla) y logo (segunda pantalla).
          Ambos renderizados siempre; su visibilidad se maneja con opacity. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <DrawingSpring show={phase === 1} />
        {/* Logo encima, con opacidad controlada; cuando phase>=2 se mostrará */}
        <div className="absolute inset-0 flex items-center justify-center">
          <LogoAndText show={phase >= 2} />
        </div>
      </div>
    </div>
  );
}
