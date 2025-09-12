import Image from "next/image";
import AnimateOnScroll from "@/components/animate-on-scroll";

export default function AboutSection() {
  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-headline text-center text-primary">
            Nuestra Trayectoria
          </h2>
          <p className="mt-4 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            Más de 20 años de experiencia fabricando resortes de la más alta calidad para las industrias más exigentes.
          </p>
        </AnimateOnScroll>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll>
            <Image
              src="https://picsum.photos/600/400?random=2"
              alt="Close-up of a metal spring"
              data-ai-hint="metal spring"
              width={600}
              height={400}
              className="rounded-lg shadow-xl aspect-video object-cover"
            />
          </AnimateOnScroll>
          <AnimateOnScroll>
            <div className="space-y-6 text-foreground/90">
              <h3 className="font-headline text-3xl text-primary">Compromiso con la Calidad</h3>
              <p>
                En FormaResortes LEGO SAS, nuestra misión es entregar productos que no solo cumplen, sino que superan las expectativas de nuestros clientes. Utilizamos materiales de primera y tecnología de punta para garantizar la precisión y durabilidad de cada resorte que producimos.
              </p>
              <p>
                Nuestro equipo de expertos trabaja en estrecha colaboración con cada cliente para desarrollar soluciones a medida que se adaptan perfectamente a sus necesidades específicas, desde el diseño inicial hasta la producción en masa.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
