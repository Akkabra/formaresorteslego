"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SingleLineSpring = ({ show }: { show: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    path.style.transition = "none";

    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }

    if (!show) {
      path.style.strokeDashoffset = `${length}`;
      return;
    }

    // Animación: dibujo → pausa → desdibujo
    const drawDur = 2000;
    const pauseDur = 400;
    const eraseDur = 2000;

    // Dibuja
    const drawAnim = path.animate(
      [
        { strokeDashoffset: `${length}` },
        { strokeDashoffset: "0" }
      ],
      {
        duration: drawDur,
        easing: "ease-in-out",
        fill: "forwards"
      }
    );

    drawAnim.onfinish = () => {
      setTimeout(() => {
        // Borrado después de la pausa
        const eraseAnim = path.animate(
          [
            { strokeDashoffset: "0" },
            { strokeDashoffset: `${length}` }
          ],
          {
            duration: eraseDur,
            easing: "ease-in-out",
            fill: "forwards"
          }
        );
        animationRef.current = eraseAnim;
      }, pauseDur);
    };

    animationRef.current = drawAnim;

    // cleanup
    return () => {
      if (animationRef.current) animationRef.current.cancel();
    };
  }, [show]);

  return (
    <div
      className={cn(
        "relative w-72 h-24 flex items-center justify-center transition-opacity duration-700",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      <svg
        viewBox="0 0 420 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M10 50 C30 20, 70 20, 90 50 S150 80, 170 50 S230 20, 250 50 S310 80, 330 50 S390 20, 410 50"
          fill="none"
          stroke="#2563eb"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default function IntroLoader({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 100),
      window.setTimeout(() => setPhase(2), 4600), // dibujo (2s) + pausa (0.4s) + borrado (2s) ≈ 4600ms
      window.setTimeout(() => setPhase(3), 5600),
      window.setTimeout(() => onFinished(), 6300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-800",
        phase === 3 && "opacity-0"
      )}
    >
      {phase < 2 && <SingleLineSpring show={phase === 1} />}
    </div>
  );
}
