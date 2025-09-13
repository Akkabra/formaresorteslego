"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const animsRef = useRef<Animation[]>([]);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Obtener longitud real del path y prepararlo
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // limpiar anims/tiempos previos
    animsRef.current.forEach(a => a.cancel());
    animsRef.current = [];
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!show) {
      // si no se debe mostrar, dejar oculto
      path.style.strokeDashoffset = `${length}`;
      return;
    }

    // Dibujar (draw) -> pausa -> Desdibujar (erase)
    const drawAnim = path.animate(
      [
        { strokeDashoffset: `${length}` },
        { strokeDashoffset: "0" }
      ],
      {
        duration: 2500,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "forwards"
      }
    );
    animsRef.current.push(drawAnim);

    drawAnim.onfinish = () => {
      // pequeña pausa y luego borrar
      timeoutRef.current = window.setTimeout(() => {
        const eraseAnim = path.animate(
          [
            { strokeDashoffset: "0" },
            { strokeDashoffset: `${length}` }
          ],
          {
            duration: 2500,
            easing: "cubic-bezier(.22,1,.36,1)",
            fill: "forwards"
          }
        );
        animsRef.current.push(eraseAnim);
        timeoutRef.current = null;
      }, 500); // pausa entre dibujo y borrado
    };

    // cleanup
    return () => {
      animsRef.current.forEach(a => a.cancel());
      animsRef.current = [];
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [show]);

  return (
    <div
      className={cn(
        "relative w-48 h-12 flex items-center justify-center transition-opacity duration-700",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        viewBox="0 0 260 40"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        aria-hidden="true"
      >
        {/* Nuevo path del resorte (completo, suave y continuo) */}
        <path
          ref={pathRef}
          d="M10 20 C30 5 50 5 70 20 S110 35 130 20 S170 5 190 20 S230 35 250 20"
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const LogoAndText = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "flex flex-col items-center text-primary transition-opacity duration-1000",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <Image
      src="/LOGO PRINCIPAL BLANCO.png"
      alt="FormaResortes Logo"
      width={240}
      height={120}
      priority
    />
    <p className="mt-4 text-lg font-headline tracking-wider text-primary/80 text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100), // 1. empieza animación
      setTimeout(() => setPhase(2), 5500), // 2. mostrar logo (después de dibujo+erase)
      setTimeout(() => setPhase(3), 7500), // 3. fade out
      setTimeout(() => onFinished(), 8300), // 4. finish
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-800",
        phase === 3 && "opacity-0"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {phase < 2 && <DrawingSpring show={phase === 1} />}
      </div>

      <div className={cn("transition-opacity duration-1000", phase >= 2 ? "opacity-100" : "opacity-0")}>
        <LogoAndText show={phase >= 2} />
      </div>
    </div>
  );
}
