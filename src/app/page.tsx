"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import IntroLoader from "@/components/intro-loader";
import Header from "@/components/header";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProductSection from "@/components/sections/product-section";
import ServicesSection from "@/components/sections/services-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleIntroFinish = () => {
    setIsLoading(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-background text-foreground">
      {isLoading ? (
        <IntroLoader onFinished={handleIntroFinish} />
      ) : (
        <>
          <Header />
          <main className={cn(!isLoading && "animate-content-enter")}>
            <HeroSection />
            <AboutSection />
            <ProductSection />
            <ServicesSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
