'use server';
/**
 * @fileOverview This file defines a Genkit flow for personalizing lesson pacing based on user quiz performance.
 *
 * - personalizeLessonPacing - A function that adjusts lesson pacing based on quiz performance.
 * - PersonalizeLessonPacingInput - The input type for the personalizeLessonPacing function.
 * - PersonalizeLessonPacingOutput - The return type for the personalizeLessonPacing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizeLessonPacingInputSchema = z.object({
  quizPerformance: z.number().describe('The user’s quiz performance score (0-100).'),
  currentPacing: z.string().describe('The current lesson pacing (e.g., slow, medium, fast).'),
  lessonTitle: z.string().describe('The title of the current lesson.'),
});
export type PersonalizeLessonPacingInput = z.infer<typeof PersonalizeLessonPacingInputSchema>;

const PersonalizeLessonPacingOutputSchema = z.object({
  suggestion: z.string().describe('A friendly, encouraging, and personalized suggestion for the student based on their performance. It should explain the recommendation clearly.'),
});
export type PersonalizeLessonPacingOutput = z.infer<typeof PersonalizeLessonPacingOutputSchema>;

export async function personalizeLessonPacing(input: PersonalizeLessonPacingInput): Promise<PersonalizeLessonPacingOutput> {
  return personalizeLessonPacingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizeLessonPacingPrompt',
  input: {schema: PersonalizeLessonPacingInputSchema},
  output: {schema: PersonalizeLessonPacingOutputSchema},
  prompt: `You are an AI assistant that personalizes lesson pacing for Python learners. Your tone should be encouraging and supportive.

A student just completed the quiz for the lesson "{{{lessonTitle}}}" and scored {{{quizPerformance}}}%. The lesson's current pacing is '{{{currentPacing}}}'.

Analyze their performance and provide a friendly, personalized suggestion.

- If the score is 90% or higher, congratulate them and suggest they might be ready for a faster pace on similar topics.
- If the score is between 60% and 89%, tell them they're doing a great job and that the current pace seems perfect for them.
- If the score is below 60%, be encouraging. Tell them it's okay and suggest that slowing down on the next topic might help solidify their understanding. Avoid making them feel bad.

Your entire response should be a single, natural-sounding paragraph addressed to the student.
`,
});

const personalizeLessonPacingFlow = ai.defineFlow(
  {
    name: 'personalizeLessonPacingFlow',
    inputSchema: PersonalizeLessonPacingInputSchema,
    outputSchema: PersonalizeLessonPacingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
