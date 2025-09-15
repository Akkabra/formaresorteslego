"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type IntroLoaderProps = {
  onFinished: () => void;
};

export default function IntroLoader({ onFinished }: IntroLoaderProps) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 3000), // después de 3s pasa al logo
      setTimeout(() => {
        onFinished();
      }, 6000), // después de 6s termina y entra a la web
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
      {step === 1 && <SpringLoader />}
      {step === 2 && <LogoScreen />}
    </div>
  );
}

const SpringLoader = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="300"
    height="300"
    viewBox="0 0 100 100"
    fill="none"
    className="text-blue-500"
  >
    <motion.path
      d="M20 10 
         Q40 15 20 20 
         Q40 25 20 30 
         Q40 35 20 40 
         Q40 45 20 50 
         Q40 55 20 60 
         Q40 65 20 70 
         Q40 75 20 80 
         Q40 85 20 90"
      stroke="blue"
      strokeWidth={2}
      fill="transparent"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </motion.svg>
);

const LogoScreen = () => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Aquí va tu logo */}
    <motion.img
      src="/logo.png" // 👈 asegúrate de que tu logo esté en /public/logo.png
      alt="Logo"
      className="w-40 h-40 mb-4"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    />
    <p className="text-white text-lg tracking-wide">
      RESORTES DE PRECISION Y FORMAS DE ALAMBRE
    </p>
  </motion.div>
);
