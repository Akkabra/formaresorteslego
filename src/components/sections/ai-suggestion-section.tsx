import AnimateOnScroll from "@/components/animate-on-scroll";
import AiSuggestionForm from "@/components/ai-suggestion-form";

export default function AiSuggestionSection() {
  return (
    <section id="ai-tool" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-headline text-primary">
            Asistente de Diseño AI
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            ¿No estás seguro de qué resorte necesitas? Describe tu aplicación, los requisitos de material o el caso de uso, y nuestra IA te proporcionará sugerencias de diseño y productos existentes.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12 max-w-3xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-xl border">
            <AiSuggestionForm />
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
