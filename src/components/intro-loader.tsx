"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

const DrawingSpring = ({ show }: { show: boolean }) => (
  <div
    className={cn(
      "relative w-[300px] h-[450px] flex items-center justify-center transition-opacity duration-1000",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <svg
      viewBox="0 0 1024 1536"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#003463"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M 524.5,596.5 C 501.99,595.576 479.323,594.576 456.5,593.5C 453.975,593.503 451.641,593.837 449.5,594.5C 414.692,591.947 380.359,586.447 346.5,578C 323.147,571.774 301.147,562.441 280.5,550C 251.236,530.881 239.403,504.047 245,469.5C 250.925,452.571 261.092,438.738 275.5,428C 296.699,413.816 319.699,403.483 344.5,397C 393.003,384.351 442.336,377.684 492.5,377C 564.824,373.907 635.824,381.907 705.5,401C 726.341,407.253 745.341,416.92 762.5,430C 784.635,453.342 790.135,480.175 779,510.5C 770.662,528.504 757.829,542.338 740.5,552C 721.317,563.063 700.983,571.396 679.5,577C 628.562,589.159 576.895,595.659 524.5,596.5 Z"
        strokeDasharray="4000"
        strokeDashoffset="4000"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="4000"
          to="0"
          dur="3s"
          fill="freeze"
          begin="0s"
        />
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="4000"
          dur="2s"
          fill="freeze"
          begin="3s"
        />
      </path>
    </svg>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // aparece el resorte
      setTimeout(() => setPhase(2), 5500),  // se empieza a desdibujar
      setTimeout(() => setPhase(3), 7500),  // fade out
      setTimeout(() => onFinished(), 8300),
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
      {phase < 3 && <DrawingSpring show={phase === 1} />}
    </div>
  );
}
