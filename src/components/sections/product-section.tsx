"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import AnimateOnScroll from "@/components/animate-on-scroll";

const products = [
  {
    title: "Resortes de Compresión",
    description: "Ideales para resistir fuerzas de compresión.",
    image: "https://picsum.photos/400/300?random=3",
    hint: "compression spring"
  },
  {
    title: "Resortes de Torsión",
    description: "Diseñados para aplicar o resistir un par de torsión.",
    image: "https://picsum.photos/400/300?random=4",
    hint: "torsion spring"
  },
  {
    title: "Resortes de Extensión",
    description: "Fabricados para operar con una carga de tracción.",
    image: "https://picsum.photos/400/300?random=5",
    hint: "extension spring"
  },
  {
    title: "Formas de Alambre",
    description: "Piezas a medida para aplicaciones específicas.",
    image: "https://picsum.photos/400/300?random=6",
    hint: "wire forms"
  },
  {
    title: "Resortes de Matriz",
    description: "Alta resistencia para maquinaria pesada.",
    image: "https://picsum.photos/400/300?random=7",
    hint: "die spring"
  },
  {
    title: "Resortes Pequeños",
    description: "Precisión en miniatura para electrónica y más.",
    image: "https://picsum.photos/400/300?random=8",
    hint: "small springs"
  },
];

export default function ProductSection() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const [selectedTitle, setSelectedTitle] = React.useState("");

  const openModal = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
    setModalOpen(true);
  };

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="products" className="bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="text-4xl md:text-5xl font-headline text-center text-primary">
            Nuestros Productos
          </h2>
          <p className="mt-4 text-lg text-center max-w-3xl mx-auto text-foreground/80">
            Explora nuestra gama de resortes y formas de alambre, diseñados para la máxima eficiencia y durabilidad.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-16">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card
                      className="service-card overflow-hidden group cursor-pointer h-full"
                      onClick={() => openModal(product.image, product.title)}
                    >
                      <div className="service-card-inner-border">
                        <CardContent className="flex flex-col items-center justify-center p-0 h-full">
                          <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <Image
                              src={product.image}
                              alt={product.title}
                              data-ai-hint={product.hint}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-6 text-center w-full flex-grow flex flex-col justify-center">
                            <h3 className="font-headline text-xl text-primary">{product.title}</h3>
                            <p className="mt-2 text-sm text-foreground/70">{product.description}</p>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </AnimateOnScroll>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl p-0 border-0">
           <DialogTitle className="sr-only">{selectedTitle}</DialogTitle>
          <Image
            src={selectedImage}
            alt={selectedTitle}
            width={1200}
            height={900}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
