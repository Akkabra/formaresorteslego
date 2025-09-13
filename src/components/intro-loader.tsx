"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type IntroLoaderProps = {
  onFinished: () => void;
};

const DrawingSpring = ({ show }: { show: boolean }) => (
  <div className={cn("relative w-48 h-48 flex items-center justify-center transition-opacity duration-1000", show ? "opacity-100" : "opacity-0")}>
    <svg className="drawing-spring" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <path d="M4780 11989 c-458 -18 -908 -75 -1210 -153 -717 -186 -1080 -500
-1080 -936 0 -306 167 -537 533 -735 l88 -47 -88 -50 c-310 -177 -478 -367
-529 -597 -32 -143 -2 -315 79 -450 73 -123 240 -271 420 -374 l78 -45 -113
-74 c-134 -89 -255 -191 -321 -273 -93 -116 -157 -282 -156 -410 1 -287 181
-530 540 -724 l72 -39 -50 -26 c-177 -89 -400 -278 -472 -399 -134 -227 -129
-461 14 -676 77 -117 246 -263 397 -343 l46 -24 -87 -58 c-192 -126 -320 -257
-390 -399 -57 -117 -74 -197 -68 -332 8 -200 71 -338 222 -490 239 -241 632
-411 1240 -539 508 -106 1208 -130 1765 -60 286 36 630 114 890 202 717 243
1077 575 1080 995 1 281 -180 526 -522 707 l-88 46 38 18 c141 68 352 241 437
361 158 222 179 479 58 708 -71 135 -255 297 -442 391 l-74 38 72 39 c266 144
453 350 507 560 21 79 23 225 5 299 -55 224 -247 432 -534 580 -37 19 -67 37
-67 40 0 3 19 14 43 25 77 36 243 153 321 226 171 160 248 319 248 514 0 280
-160 495 -510 682 l-93 50 78 43 c180 99 326 224 414 358 172 261 137 562 -94
795 -265 267 -811 452 -1597 541 -316 36 -736 49 -1100 35z m670 -554 c791
-23 1495 -214 1591 -431 19 -42 19 -46 3 -79 -50 -107 -288 -224 -709 -350
l-160 -47 -175 25 c-290 43 -410 52 -695 51 -443 -1 -773 -39 -1246 -145 -53
-12 -62 -11 -170 21 -289 84 -542 188 -642 265 -190 146 -126 289 197 441 281
132 691 214 1206 244 308 17 379 18 800 5z m1046 -1561 c455 -138 637 -293
539 -460 -66 -112 -284 -234 -637 -355 l-154 -53 -164 32 c-333 65 -591 87
-930 79 -405 -9 -764 -60 -1146 -163 l-131 -35 -149 45 c-276 85 -409 146
-501 230 -59 53 -103 128 -103 174 0 118 304 296 787 461 91 31 92 31 160 17
287 -61 592 -87 1003 -87 443 0 723 25 1045 92 77 16 163 35 190 43 68 19 58
20 191 -20z m-1 -1535 c149 -48 307 -113 391 -163 65 -38 148 -120 164 -161
64 -167 -169 -337 -664 -486 l-139 -41 -81 15 c-286 55 -542 77 -901 77 -454
0 -835 -46 -1220 -146 -77 -20 -153 -39 -170 -41 -36 -5 -284 75 -443 143
-227 96 -342 197 -342 299 0 61 74 151 180 218 112 70 332 172 543 251 l98 37
152 -30 c663 -129 1563 -115 2127 34 69 18 137 33 151 34 15 0 84 -17 154 -40z
m74 -1534 c366 -123 523 -248 482 -384 -41 -137 -325 -304 -709 -415 -109 -32
-116 -32 -170 -20 -114 27 -382 64 -577 80 -242 20 -759 14 -978 -10 -253 -28
-521 -78 -713 -132 l-91 -26 -104 32 c-341 105 -546 216 -598 323 -41 85 -18
153 83 235 97 80 347 202 587 287 l107 37 113 -26 c202 -46 414 -77 673 -97
198 -15 756 -6 928 15 257 32 552 91 723 145 52 16 76 12 244 -44z m1 -1505
c180 -59 355 -142 422 -200 25 -22 56 -60 68 -85 20 -40 21 -50 10 -93 -51
-215 -529 -452 -1130 -561 -760 -137 -1553 -115 -2175 60 -454 129 -668 256
-683 407 -14 146 158 269 617 443 85 33 163 59 172 59 10 0 64 -11 121 -24
293 -68 538 -96 913 -103 512 -10 963 34 1310 126 69 18 127 28 155 26 25 -2
115 -27 200 -55z" />
    </svg>
  </div>
);

const LogoAndText = ({ show }: { show: boolean }) => (
    <div className={cn("flex flex-col items-center text-primary transition-opacity duration-1000", show ? "opacity-100" : "opacity-0")}>
       <Image src="/LOGO PRINCIPAL BLANCO.png"   alt="FormaResortes Logo"   width={240} height={120} priority />
       <p className="mt-4 text-lg font-headline tracking-wider text-primary/80 text-center">
        RESORTES DE PRECISIÓN Y FORMAS DE ALAMBRE
      </p>
    </div>
);


export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // 1. Start animation
      setTimeout(() => setPhase(2), 5500),  // 2. Show logo and text (after 2 loops of 2.5s)
      setTimeout(() => setPhase(3), 7500), // 3. Start fade out
      setTimeout(() => onFinished(), 8300) // 4. Finish
    ];

    return () => {
      timers.forEach(clearTimeout);
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
