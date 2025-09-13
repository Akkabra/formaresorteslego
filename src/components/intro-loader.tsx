"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type SpringProps = {
  show: boolean;
};

const AnimatedSpring = ({ show }: SpringProps) => (
  <div
    className={cn(
      "relative w-72 h-72 flex items-center justify-center transition-opacity duration-1000",
      show ? "opacity-100" : "opacity-0"
    )}
  >
    <svg
      viewBox="0 0 5000 5000"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M4160 5147 c0 -55 -88 -150 -198 -213 -31 -18 -33 -18 -80 0 -393
        154 -953 204 -1462 130 -224 -32 -390 -87 -451 -150 -30 -31 -34 -42 -34 -86
        0 -47 3 -53 43 -88 115 -103 482 -172 912 -173 316 0 566 31 803 99 235 68
        391 147 498 253 76 75 108 131 116 202 l6 49 -77 0 c-73 0 -76 -1 -76 -23z"
        fill="none"
        stroke="#2563eb"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-dasharray"
          from="0, 20000"
          to="20000, 0"
          dur="3s"
          begin="0s"
          fill="freeze"
          repeatCount="1"
        />
        <animate
          attributeName="stroke-dasharray"
          from="20000, 0"
          to="0, 20000"
          dur="3s"
          begin="3.2s"
          fill="freeze"
          repeatCount="1"
        />
      </path>
    </svg>
  </div>
);

export default function IntroLoader({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100), // Start animation
      setTimeout(() => setPhase(2), 6500), // After draw + undraw
      setTimeout(() => setPhase(3), 7500),
      setTimeout(() => onFinished(), 8200),
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
      {phase < 2 && <AnimatedSpring show={phase === 1} />}
    </div>
  );
}
