"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Props: onFinished es opcional por seguridad; el componente comprobará antes de llamarlo
type IntroLoaderProps = {
  onFinished?: () => void;
};

// Generador de resorte con anillos relativamente uniformes.
// Protege contra `turns` == 0 y garantiza radios positivos.
function generateEllipseSpring(width: number, height: number, turns: number) {
  const t = Math.max(1, Math.floor(turns || 1)); // al menos 1 vuelta
  const stepY = height / (t + 1.5);
  let d = "";

  // Diferencia entre radios (px) pequeña y constante
  const baseRx = Math.floor(width / 2);
  const delta = 5; // diferencia en px entre anillos

  for (let i = 0; i < t; i++) {
    const cy = stepY * (i + 1);
    const rx = Math.max(6, baseRx - i * delta);
    const ry = Math.max(3, stepY / 2);

    d += `M ${width / 2 - rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 + rx} ${cy} A ${rx} ${ry} 0 1 0 ${width / 2 - rx} ${cy} `;
  }

  return d;
}

// Obtiene la longitud del path de forma segura: intenta inmediatamente y reintenta
// con requestAnimationFrame hasta timeoutMs. Devuelve 0 si no la obtiene.
async function getPathLengthSafe(path: SVGPathElement | null, timeoutMs = 800): Promise<number> {
  if (!path) return 0;

  try {
    const l = path.getTotalLength();
    if (isFinite(l) && l > 0) return l;
  } catch (_) {
    // ignore and retry
  }

  const start = performance.now();

  return await new Promise<number>((resolve) => {
    let rafId = 0;

    const tick = () => {
      if (!path) return resolve(0);

      try {
        const l = path.getTotalLength();
        if (isFinite(l) && l > 0) return resolve(l);
      } catch (_) {
        // seguir reintentando
      }

      if (performance.now() - start >= timeoutMs) return resolve(0);

      rafId = requestAnimationFrame(tick);
    };

    tick();

    // fallback safety
    setTimeout(() => {
      cancelAnimationFrame(rafId);
      resolve(0);
    }, timeoutMs + 50);
  });
}

const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      const el = pathRef.current;
      if (!show || !el) return;

      // cancelar anim previa si existe
      if (animRef.current) {
        try {
          animRef.current.cancel();
        } catch (_) {}
        animRef.current = null;
      }

      const len = await getPathLengthSafe(el, 1000);
      if (cancelled) return;

      const safeLen = len > 0 ? len : 1000; // fallback razonable

      try {
        el.style.strokeDasharray = `${safeLen}`;
        el.style.strokeDashoffset = `${safeLen}`;
      } catch (_) {
        // ignore
      }

      try {
        // animación continua: una pasada tras otra sin pausa
        animRef.current = el.animate(
          [
            { strokeDashoffset: `${safeLen}` },
            { strokeDashoffset: "0" },
          ],
          {
            duration: 2200,
            easing: "linear",
            iterations: Infinity,
          }
        );
      } catch (_) {
        // si la Web Animations API no está disponible, no rompemos
      }
    };

    if (show) start();

    return () => {
      cancelled = true;
      if (animRef.current) {
        try {
          animRef.current.cancel();
        } catch (_) {}
        animRef.current = null;
      }
    };
  }, [show]);

  // Propiedades visuales solicitadas: 300x300, azul, strokeWidth 10, 6 anillos
  const W = 300;
  const H = 300;
  const TURNS = 6;
  const pathD = generateEllipseSpring(W, H, TURNS);

  return (
    <div
      className={cn(
        "relative w-[300px] h-[300px] flex items-center justify-center transition-opacity duration-400",
        show ? "opacity-100" : "opacity-0"
      )}
      aria-hidden
    >
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <path
          ref={pathRef}
          d={pathD}
          stroke="#007BFF"
          strokeWidth={10}
          fill="none"
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
    <Image src="/LOGO PRINCIPAL BLANCO.png" alt="FormaResortes Logo" width={240} height={120} priority />
    <p className="mt-4 text-lg font-headline tracking-wider text-primary/80 text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    // Guardar los timeouts en un ref para limpiar correctamente
    timersRef.current.push(window.setTimeout(() => setPhase(1), 100)); // start anim
    timersRef.current.push(window.setTimeout(() => setPhase(2), 5500)); // show logo
    timersRef.current.push(window.setTimeout(() => setPhase(3), 7500)); // fade out

    // última llamada: solo si onFinished es función
    timersRef.current.push(
      window.setTimeout(() => {
        if (typeof onFinished === "function") {
          try {
            onFinished();
          } catch (e) {
            // proteger posibles errores dentro del callback del usuario
            // no hacemos nada más aquí
          }
        }
      }, 8300)
    );

    return () => {
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
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
