"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import logo from "../../public/LOGO PRINCIPAL BLANCO.png"; // ajusta la ruta al logo según tu estructura de carpetas

type IntroLoaderProps = {
  onFinished: () => void;
};

// Función para generar el resorte con elipses crecientes
function generateEllipseSpring(width: number, height: number, turns: number) {
  const stepY = height / (turns + 1.5);
  let d = "";

  for (let i = 0; i < turns; i++) {
    const cy = stepY * (i + 1);
    const scaleFactor = 0.5 + (i / turns) * 0.5;
    const rx = (width / 2) * scaleFactor;
    const ry = (stepY / 2) * scaleFactor;

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
      path.style.strokeDashoffset = `${len}px`;
      const anim = path.animate(
        [
          { strokeDashoffset: `${len}px` },
          { strokeDashoffset: "0px" },
        ],
        {
          duration: 2500,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );

      anim.onfinish = () => {
        count++;
        if (count < repeat) {
          runAnimation();
        }
      };
    };

    runAnimation();
  }, [show, repeat]);

  const pathD = generateEllipseSpring(240, 400, 6);

  return (
    <div
      className={cn(
        "relative w-[300px] h-[450px] flex flex-col items-center justify-center gap-6 transition-opacity duration-1000",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        width={240}
        height={400}
        viewBox={`0 0 240 400`}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={pathD}
          stroke="#003463"
          strokeWidth={8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Logo debajo del resorte */}
      <Image src={logo} alt="Logo" width={120} height={120} />
    </div>
  );
};

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // aparece el resorte
      setTimeout(() => setPhase(2), 6000),  // se mantiene
      setTimeout(() => setPhase(3), 8500),  // fade out
      setTimeout(() => onFinished(), 9300),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-800",
        phase === 3 && "opacity-0"
      )}
    >
      {phase < 3 && <DrawingSpring show={phase === 1} repeat={2} />}
    </div>
  );
}
