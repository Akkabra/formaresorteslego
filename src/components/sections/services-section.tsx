"use client";

import AnimateOnScroll from "@/components/animate-on-scroll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, PencilRuler, HardHat, ShieldCheck, Wrench } from "lucide-react";

const services = [
  {
    title: "Diseño y Prototipado",
    description: "Colaboramos contigo para diseñar y prototipar resortes a medida que cumplan con tus especificaciones exactas, utilizando software avanzado y pruebas rigurosas.",
    icon: PencilRuler
  },
  {
    title: "Fabricación a Medida",
    description: "Producimos resortes y formas de alambre personalizadas en una amplia gama de materiales, tamaños y acabados para cualquier aplicación industrial.",
    icon: Wrench
  },
  {
    title: "Control de Calidad",
    description: "Cada producto pasa por un estricto proceso de control de calidad para garantizar que cumple con los más altos estándares de rendimiento, durabilidad y precisión.",
    icon: ShieldCheck
  },
  {
    title: "Asesoría Técnica",
    description: "Nuestro equipo de expertos te brinda asesoramiento técnico para seleccionar el material, diseño y tipo de resorte más adecuado para tu proyecto.",
    icon: HardHat
  },
];

export default function ServicesSection() {

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
    <section id="services" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-headline text-center text-primary">
            Nuestros Servicios
          </h2>
          <p className="mt-4 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            Ofrecemos soluciones integrales de ingeniería y fabricación para garantizar el componente perfecto para tu proyecto.
          </p>
        </AnimateOnScroll>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <AnimateOnScroll key={service.title}>
                <Card className="service-card h-full text-center bg-card transition-all duration-300">
                    <div className="service-card-inner-border">
                        <CardHeader className="items-center">
                            <div className="bg-primary/10 p-4 rounded-full">
                                <service.icon className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-primary !mt-4">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-foreground/80">{service.description}</p>
                        </CardContent>
                    </div>
                </Card>
              </AnimateOnScroll>
            ))}
        </div>

        <AnimateOnScroll className="mt-12 md:mt-20 text-center max-w-4xl mx-auto">
          <div className="bg-card border rounded-lg p-6 md:p-8 shadow-lg">
             <p className="text-lg md:text-xl font-headline text-foreground/90">
                ¿Necesitas una solución personalizada? Nuestro equipo de ingenieros puede diseñar el componente perfecto para tu aplicación específica.
             </p>
             <Button 
              onClick={scrollToContact}
              className="mt-6 font-headline text-lg tracking-wider btn-shine"
              size="lg"
            >
              Habla con un experto
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
