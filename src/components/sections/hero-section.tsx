import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if(contactSection) {
      const headerOffset = 64; // Approx height of the header
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full flex items-center justify-center text-center p-4">
      <Image
        src="public/FABRICA SPRING.jpg"
        alt="Fábrica de resortes industriales"
        data-ai-hint="spring factory"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 to-black/70 -z-10" />
      <div className="container px-4 text-white flex flex-col items-center">
        <Image
            src="assets/lOGO PRINCIPAL BLANCO.png"
            alt="FormaResortes LEGO SAS Logo"
            width={307}
            height={160}
            className="mb-4 w-[227px] md:w-[307px]"
        />
        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl tracking-wider uppercase drop-shadow-2xl">
          Ingeniería en <span className="text-primary">Resortes</span>
        </h1>
        <p className="mt-4 font-body text-base md:text-lg max-w-2xl mx-auto drop-shadow-xl">
          Resortes de precisión y formas de alambre. Calidad, durabilidad y rendimiento en cada vuelta.
        </p>
        <Button 
          onClick={scrollToContact}
          className="mt-8 font-headline text-lg tracking-wider btn-shine"
          size="lg"
          variant="outline"
        >
          Contáctanos
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
