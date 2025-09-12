"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { Sparkles } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getAiSuggestion } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const FormSchema = z.object({
  prompt: z.string().min(10, {
    message: "Por favor, describe tus necesidades con al menos 10 caracteres.",
  }),
});

export default function AiSuggestionForm() {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setSuggestion(null);
    setError(null);
    startTransition(async () => {
      const result = await getAiSuggestion({ prompt: data.prompt });
      if (result.success && result.data) {
        setSuggestion(result.data.suggestions);
      } else {
        setError(result.error || "Ocurrió un error inesperado.");
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-headline text-foreground">Describe tu necesidad</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej: 'Necesito un resorte de compresión para un pedal de coche, de acero inoxidable, con alta resistencia a la fatiga...'"
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full font-headline text-lg btn-shine" size="lg">
            {isPending ? "Generando..." : "Obtener Sugerencia"}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>

      {isPending && (
         <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="text-accent" />
              Sugerencia de la IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {suggestion && (
        <Card className="mt-8 animate-content-enter">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-primary">
              <Sparkles className="text-accent" />
              Sugerencia de la IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{suggestion}</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="mt-8 text-center text-destructive">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
