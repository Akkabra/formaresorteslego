"use client";

import { useEffect, useRef } from "react";

type IntroLoaderProps = {
  onFinished?: () => void;
};

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const pathRef = useRef<SVGPathElement | null>(null);

  // Genera el resorte (de pequeño a grande)
  const generateEllipseSpring = (
    turns: number,
    width: number,
    height: number,
    spacing: number
  ) => {
    if (turns <= 0) turns = 1;

    const stepY = height / (turns + 1.5);
    const centerX = width / 2;
    let d = "";

    for (let i = 0; i < turns; i++) {
      const progress = (i + 1) / turns; // ahora crece en cada anillo
      const rx = 20 + progress * (width / 2 - 20);
      const ry = 10 + progress * (height / 2 - 10);
      const y = i * stepY + spacing;

      if (i === 0) {
        d += `M ${centerX + rx} ${y} `;
      }

      // curva superior e inferior
      d += `A ${rx} ${ry} 0 0 1 ${centerX - rx} ${y} `;
      d += `A ${rx} ${ry} 0 0 1 ${centerX + rx} ${y} `;
    }
    return d;
  };

  // Animación continua, lenta y sin pausas
  useEffect(() => {
    if (!pathRef.current) return;

    try {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;

      const animation = pathRef.current.animate(
        [
          { strokeDashoffset: length },
          { strokeDashoffset: 0 },
        ],
        {
          duration: 5000, // más lento
          iterations: Infinity, // infinito
          easing: "linear",
        }
      );

      return () => animation.cancel();
    } catch (err) {
      console.error("Error en animación:", err);
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0A0A0A] z-50">
      <svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={generateEllipseSpring(8, 300, 300, 10)}
          stroke="#1E90FF"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <p className="mt-6 text-blue-400 text-lg font-medium animate-pulse">
        Cargando..
      </p>
    </div>
  );
}
