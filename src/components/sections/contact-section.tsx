import AnimateOnScroll from "@/components/animate-on-scroll";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-4xl md:text-5xl font-headline text-primary">
            Contáctanos
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-foreground/80">
            Estamos listos para ayudarte con tu próximo proyecto.
          </p>
        </AnimateOnScroll>
        
        <div className="mt-12 md:mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <AnimateOnScroll className="space-y-6">
            <div className="bg-card p-6 rounded-lg shadow-lg flex items-start gap-4">
              <Mail className="h-7 w-7 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="font-headline text-xl text-primary">Email</h3>
                <a href="mailto:ventas@formaresortes.com" className="mt-1 text-base text-foreground/80 hover:text-primary transition-colors break-all">ventas@formaresortes.com</a>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg flex items-start gap-4">
              <Phone className="h-7 w-7 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="font-headline text-xl text-primary">Teléfono</h3>
                <a href="tel:+573101234567" className="mt-1 text-base text-foreground/80 hover:text-primary transition-colors">+57 310 123 4567</a>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg flex items-start gap-4">
              <MapPin className="h-7 w-7 text-accent mt-1 shrink-0" />
              <div>
                <h3 className="font-headline text-xl text-primary">Dirección</h3>
                <p className="mt-1 text-base text-foreground/80">Calle Falsa 123, Bogotá, Colombia</p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg h-full">
              <h3 className="font-headline text-2xl text-primary mb-6">Envíanos un mensaje</h3>
              <form action="https://formspree.io/f/mwpnaoay" method="POST" className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">Nombre</label>
                  <Input type="text" name="name" id="name" required className="w-full" placeholder="Tu nombre completo" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                  <Input type="email" name="email" id="email" required className="w-full" placeholder="tu@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">Mensaje</label>
                  <Textarea name="message" id="message" rows={4} required className="w-full min-h-[100px]" placeholder="¿En qué podemos ayudarte?" />
                </div>
                <div>
                  <Button type="submit" className="w-full font-headline text-lg btn-shine" size="lg">
                    Enviar Mensaje
                  </Button>
                </div>
              </form>
            </div>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll className="mt-12 md:mt-16">
          <div className="w-full overflow-hidden rounded-lg shadow-2xl border-4 border-card" style={{paddingBottom: "56.25%", position: "relative"}}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.955668386616!2d-74.08378368523803!3d4.601846996657905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a1a7a4a6e3%3A0x6b3f8e5b6b6d5b6b!2sPlaza%20de%20Bol%C3%ADvar!5e0!3m2!1ses!2sco!4v1678886510305!5m2!1ses!2sco"
              style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de FormaResortes"
              className="w-full h-full"
            ></iframe>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
