"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

// 🔹 Función para generar un resorte con anillos iguales
function generateSpring(width: number, height: number, turns: number) {
  const stepY = height / (turns + 1);
  let d = "";

  for (let i = 0; i < turns; i++) {
    const cy = stepY * (i + 1);
    const rx = width / 2.5;
    const ry = stepY / 3;

    d += `M ${width / 2 - rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 + rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 - rx} ${cy} `;
  }

  return d;
}

const DrawingSpring = ({ show, repeat = 2 }: { show: boolean; repeat?: number }) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!show || !pathRef.current) return;

    const path = pathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}px`;

    let count = 0;

    const runAnimation = () => {
      // 🔹 Dibujo
      const draw = path.animate(
        [{ strokeDashoffset: `${len}px` }, { strokeDashoffset: "0px" }],
        {
          duration: 3000, // un poco más lento
          easing: "ease-in-out",
          fill: "forwards",
        }
      );

      draw.onfinish = () => {
        // 🔹 Desdibujo
        const erase = path.animate(
          [{ strokeDashoffset: "0px" }, { strokeDashoffset: `${len}px` }],
          {
            duration: 3000,
            easing: "ease-in-out",
            fill: "forwards",
          }
        );

        erase.onfinish = () => {
          count++;
          if (count < repeat) runAnimation();
        };
      };
    };

    runAnimation();
  }, [show, repeat]);

  const pathD = generateSpring(200, 300, 6);

  return (
    <div
      className={cn(
        "relative w-[220px] h-[320px] flex flex-col items-center justify-center transition-opacity duration-700",
        show ? "opacity-100" : "opacity-0"
      )}
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
      width={160}
      height={80}
      priority
    />
    <p className="mt-4 text-lg font-headline tracking-wider text-black text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 100), // inicia resorte
      window.setTimeout(() => setPhase(2), 7500), // muestra logo
      window.setTimeout(() => setPhase(3), 9500), // fade out
      window.setTimeout(() => onFinished(), 10300), // termina
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-800",
        phase === 0 || phase === 1 ? "bg-[#0a192f]" : "bg-white",
        phase === 3 && "opacity-0"
      )}
    >
      {/* 🔹 Mostrar resorte SOLO en la primera fase */}
      {phase === 1 && <DrawingSpring show={phase === 1} repeat={1} />}

      {/* 🔹 Mostrar logo SOLO en la segunda fase */}
      {phase >= 2 && <LogoAndText show={phase >= 2} />}
    </div>
  );
}
