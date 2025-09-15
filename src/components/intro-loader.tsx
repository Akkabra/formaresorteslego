"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

const PATHS: string[] = [
  `M4160 5147 c0 -55 -88 -150 ...`, // ← tus paths
  `M4047 4761 l-67 -38 ...`,
  `M4047 4081 l-69 -39 ...`,
  `M4052 3405 l-73 -43 ...`,
  `M4053 2726 l-71 -41 ...`,
  `M4051 2047 l-75 -41 ...`,
  `M4052 1368 l-73 -40 ...`
];

const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (!paths.length) return;

    const lengths = paths.map((p) => p?.getTotalLength?.() || 0);
    const totalLength = lengths.reduce((s, v) => s + v, 0);

    paths.forEach((p, i) => {
      const L = lengths[i];
      p.style.strokeDasharray = `${L}`;
      p.style.strokeDashoffset = show ? `${L}` : "0";
    });

    if (!show) return;

    let cum = 0;
    paths.forEach((p, i) => {
      const L = lengths[i];
      p.animate(
        [
          { strokeDashoffset: L.toString() },
          { strokeDashoffset: "0" }
        ],
        {
          duration: 4000 * (L / totalLength),
          delay: (cum / totalLength) * 4000,
          easing: "ease-in-out",
          fill: "forwards"
        }
      );
      cum += L;
    });
  }, [show]);

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 4600 5400"
        preserveAspectRatio="xMidYMid meet"
        className="w-[500px] h-[500px]" // más grande en pantalla
        aria-hidden="true"
      >
        {PATHS.map((d, i) => (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el; }}
            d={d}
            fill="none"
            stroke="white"
            strokeWidth={20}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
};

const LogoAndText = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "flex flex-col items-center transition-opacity duration-1000",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <Image
      src="/LOGO PRINCIPAL BLANCO.png"
      alt="FormaResortes Logo"
      width={260}
      height={130}
      priority
    />
    <p className="mt-6 text-xl font-headline tracking-wide text-white text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 200),   // resorte
      window.setTimeout(() => setPhase(2), 4800),  // logo + texto
      window.setTimeout(() => setPhase(3), 7500),  // fade out
      window.setTimeout(() => onFinished(), 8300)  // pasa a la web
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-1000",
        phase === 3 && "opacity-0"
      )}
    >
      {/* Fase 1 → Resorte */}
      {phase === 1 && <DrawingSpring show={true} />}

      {/* Fase 2 → Logo + Texto */}
      {phase >= 2 && <LogoAndText show={phase >= 2} />}
    </div>
  );
}
