'use server';

/**
 * @fileOverview Provides AI-powered suggestions for spring products based on user prompts.
 *
 * - aiSpringSuggestion - A function that takes a user prompt and returns spring suggestions.
 * - AiSpringSuggestionInput - The input type for the aiSpringSuggestion function.
 * - AiSpringSuggestionOutput - The return type for the aiSpringSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSpringSuggestionInputSchema = z.object({
  prompt: z.string().describe('A description of desired spring characteristics, such as size, material, or use case.'),
});
export type AiSpringSuggestionInput = z.infer<typeof AiSpringSuggestionInputSchema>;

const AiSpringSuggestionOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions for existing products or potential new designs that meet the requirements described in the prompt.'),
});
export type AiSpringSuggestionOutput = z.infer<typeof AiSpringSuggestionOutputSchema>;

export async function aiSpringSuggestion(input: AiSpringSuggestionInput): Promise<AiSpringSuggestionOutput> {
  return aiSpringSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSpringSuggestionPrompt',
  input: {schema: AiSpringSuggestionInputSchema},
  output: {schema: AiSpringSuggestionOutputSchema},
  prompt: `You are an expert spring design and manufacturing consultant.

  Based on the user's prompt, provide suggestions for existing spring products or potential new designs that meet the specified requirements.

  Prompt: {{{prompt}}}

  Suggestions:`, 
});

const aiSpringSuggestionFlow = ai.defineFlow(
  {
    name: 'aiSpringSuggestionFlow',
    inputSchema: AiSpringSuggestionInputSchema,
    outputSchema: AiSpringSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
