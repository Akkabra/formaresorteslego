"use server";

import { aiSpringSuggestion, type AiSpringSuggestionInput, type AiSpringSuggestionOutput } from "@/ai/flows/ai-spring-suggestion";
import { z } from "zod";

const SuggestionInputSchema = z.object({
  prompt: z.string(),
});

type SuggestionResult = {
    success: true;
    data: AiSpringSuggestionOutput;
} | {
    success: false;
    error: string;
};

export async function getAiSuggestion(input: AiSpringSuggestionInput): Promise<SuggestionResult> {
  const parsedInput = SuggestionInputSchema.safeParse(input);

  if (!parsedInput.success) {
    return { success: false, error: "Invalid input." };
  }

  try {
    const output = await aiSpringSuggestion(parsedInput.data);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Failed to get suggestion from AI." };
  }
}
