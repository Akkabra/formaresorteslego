"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

const PATHS: string[] = [
  `M4160 5147 c0 -55 -88 -150 -198 -213 -31 -18 -33 -18 -80 0 -393 154 -953 204 -1462 130 -224 -32 -390 -87 -451 -150 -30 -31 -34 -42 -34 -86 0 -47 3 -53 43 -88 115 -103 482 -172 912 -173 316 0 566 31 803 99 235 68 391 147 498 253 76 75 108 131 116 202 l6 49 -77 0 c-73 0 -76 -1 -76 -23z m-1029 -207 c166 -13 343 -41 472 -75 53 -14 99 -25 102 -25 3 0 5 -4 5 -8 0 -8 -167 -53 -270 -72 -306 -56 -729 -58 -1055 -4 -101 16 -265 63 -265 75 0 13 147 55 250 73 257 43 513 55 761 36z`,
  `M4047 4761 l-67 -38 60 -47 c157 -121 159 -248 7 -364 -107 -81 -100 -80 -218 -38 -438 157 -1081 190 -1571 81 -273 -60 -380 -154 -305 -266 28 -43 141 -100 252 -129 284 -73 766 -94 1110 -50 510 66 893 251 976 470 28 73 23 184 -11 250 -24 48 -136 170 -154 170 -6 -1 -41 -18 -79 -39z m-906 -502 c214 -17 569 -85 569 -109 0 -8 -135 -42 -257 -66 -315 -60 -822 -59 -1118 2 -99 20 -215 55 -215 65 0 15 160 59 284 79 238 38 494 49 737 29z`,
  `M4047 4081 l-69 -39 34 -22 c183 -126 196 -265 35 -388 -103 -79 -97 -78 -249 -27 -284 95 -516 129 -888 129 -347 1 -601 -30 -786 -95 -136 -48 -194 -97 -194 -165 0 -122 232 -212 649 -254 133 -13 499 -13 632 0 349 35 651 120 857 242 76 45 183 152 213 213 17 36 25 72 27 128 4 72 2 84 -28 143 -31 64 -129 174 -154 174 -6 -1 -42 -18 -79 -39z m-892 -501 c131 -11 332 -43 423 -66 124 -32 134 -36 126 -44 -13 -12 -190 -55 -304 -74 -185 -30 -330 -39 -580 -33 -305 6 -543 40 -670 94 l-35 14 26 14 c141 75 665 124 1014 95z`,
  `M4052 3405 l-73 -43 33 -23 c55 -37 109 -92 129 -131 24 -47 24 -114 1 -153 -28 -44 -96 -107 -157 -144 l-54 -33 -81 31 c-407 157 -1095 197 -1582 91 -274 -59 -382 -147 -322 -261 103 -201 1055 -278 1659 -134 367 87 630 249 690 424 23 69 19 166 -10 229 -29 62 -73 119 -124 160 l-37 29 -72 -42z m-747 -520 c199 -27 416 -79 399 -95 -15 -14 -212 -59 -354 -81 -173 -27 -540 -37 -730 -20 -233 21 -498 78 -494 106 4 26 268 83 484 104 141 14 553 6 695 -14z`,
  `M4053 2726 l-71 -41 56 -45 c87 -70 115 -110 120 -174 3 -44 0 -62 -17 -89 -28 -45 -105 -117 -163 -151 l-47 -27 -96 36 c-378 141 -975 185 -1460 105 -349 -57 -496 -153 -429 -281 96 -187 966 -272 1564 -153 330 65 602 190 715 328 132 162 109 362 -58 499 l-42 35 -72 -42z m-715 -525 c137 -21 332 -64 360 -80 12 -7 -1 -14 -54 -29 -335 -100 -864 -121 -1260 -52 -124 22 -255 60 -257 75 -5 24 263 83 473 104 161 16 584 6 738 -18z`,
  `M4051 2047 l-75 -41 25 -15 c46 -30 127 -113 143 -146 18 -38 21 -91 6 -130 -15 -40 -97 -122 -162 -161 l-58 -35 -62 24 c-244 97 -523 146 -884 154 -344 8 -621 -21 -834 -87 -193 -60 -262 -144 -197 -241 76 -114 484 -199 952 -199 488 0 931 102 1189 274 99 66 147 118 187 201 66 137 17 307 -119 413 l-37 29 -74 -40z m-705 -525 c140 -22 343 -68 358 -82 10 -10 -57 -31 -189 -59 -327 -72 -787 -80 -1132 -20 -126 22 -255 59 -255 74 1 26 251 82 467 104 155 16 601 6 751 -17z`,
  `M4052 1368 l-73 -40 48 -33 c68 -46 129 -116 144 -164 l12 -41 75 0 75 0 -7 43 c-11 70 -55 148 -123 215 -35 34 -67 62 -71 62 -4 -1 -40 -19 -80 -42z`
];

const DrawingSpring = ({ show }: { show: boolean }) => {
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (!paths.length) return;

    // Calcular longitudes y total
    const lengths = paths.map((p) => {
      try {
        return p.getTotalLength();
      } catch {
        return 0;
      }
    });
    const totalLength = lengths.reduce((s, v) => s + v, 0);

    // Configurar strokeDash
    paths.forEach((p, i) => {
      const L = lengths[i];
      p.style.strokeDasharray = `${L}`;
      p.style.strokeDashoffset = show ? `${L}` : "0";
    });

    if (!show) return;

    // Animar como un solo trazo
    let cum = 0;
    paths.forEach((p, i) => {
      const L = lengths[i];
      p.animate(
        [
          { strokeDashoffset: L.toString() },
          { strokeDashoffset: "0" }
        ],
        {
          duration: 4000 * (L / totalLength), // proporcional al tamaño
          delay: (cum / totalLength) * 4000, // empieza donde terminó el anterior
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
        className="w-[400px] h-[400px]"
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
  <div className={cn("flex flex-col items-center text-primary transition-opacity duration-1000", show ? "opacity-100" : "opacity-0")}>
    <Image src="/LOGO PRINCIPAL BLANCO.png" alt="FormaResortes Logo" width={240} height={120} priority />
    <p className="mt-4 text-lg font-headline tracking-wider text-primary/80 text-center">
      RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
    </p>
  </div>
);

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase(1), 100),
      window.setTimeout(() => setPhase(2), 5500),
      window.setTimeout(() => setPhase(3), 7500),
      window.setTimeout(() => onFinished(), 8300)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div className={cn("fixed inset-0 flex flex-col items-center justify-center bg-[#0a192f] z-50 transition-opacity duration-800", phase === 3 && "opacity-0")}>
      <div className="absolute inset-0 flex items-center justify-center">
        {phase < 2 && <DrawingSpring show={phase === 1} />}
      </div>
      <div className={cn("transition-opacity duration-1000", phase >= 2 ? "opacity-100" : "opacity-0")}>
        <LogoAndText show={phase >= 2} />
      </div>
    </div>
  );
}
