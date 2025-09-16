"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type DrawingSpringProps = {
  show: boolean;
};

function generateUniformSpring(width: number, height: number, spacing: number) {
  const turns = Math.floor(height / spacing);
  let d = "";

  for (let i = 0; i < turns; i++) {
    const cy = spacing * (i + 1);
    const rx = width / 2 - i * 2; // radio decrece lentamente
    const ry = spacing / 2;

    if (rx > 0) {
      d += `M ${width / 2 - rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 + rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 - rx} ${cy} `;
    }
  }

  return d;
}

const DrawingSpring = ({ show }: DrawingSpringProps) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!show || !pathRef.current) return;

    const path = pathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}px`;

    const runAnimation = () => {
      path.animate(
        [
          { strokeDashoffset: `${len}px` },
          { strokeDashoffset: "0px" },
        ],
        {
          duration: 2500,
          easing: "linear",
          iterations: Infinity, // 🔄 animación continua
        }
      );
    };

    runAnimation();
  }, [show]);

  const pathD = generateUniformSpring(300, 300, 30); // ancho 300, alto 300, espaciado uniforme

  return (
    <div
      className={cn(
        "relative w-[300px] h-[300px] flex items-center justify-center transition-opacity duration-1000",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        width={300}
        height={300}
        viewBox="0 0 300 300"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d={pathD}
          stroke="#007BFF"   // azul intenso
          strokeWidth={10}  // grosor aumentado
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default DrawingSpring;
