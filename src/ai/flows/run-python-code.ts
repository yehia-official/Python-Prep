'use server';
/**
 * @fileOverview This file defines a Genkit flow for running Python code.
 *
 * - runPythonCode - A function that takes Python code and returns the output.
 * - RunPythonCodeInput - The input type for the runPythonCode function.
 * - RunPythonCodeOutput - The return type for the runPythonCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RunPythonCodeInputSchema = z.object({
  code: z.string().describe('The Python code to execute.'),
});
export type RunPythonCodeInput = z.infer<typeof RunPythonCodeInputSchema>;

const RunPythonCodeOutputSchema = z.object({
  output: z.string().describe('The standard output or error from the executed code.'),
});
export type RunPythonCodeOutput = z.infer<typeof RunPythonCodeOutputSchema>;

export async function runPythonCode(input: RunPythonCodeInput): Promise<RunPythonCodeOutput> {
  return runPythonCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'runPythonCodePrompt',
  input: {schema: RunPythonCodeInputSchema},
  output: {schema: RunPythonCodeOutputSchema},
  prompt: `You are a Python interpreter. The user will provide a snippet of Python code. Execute it and return ONLY the standard output. If the code produces an error, return the full error traceback. Do not add any explanation, commentary, or markdown formatting like \`\`\`.

Code:
{{{code}}}`,
});

const runPythonCodeFlow = ai.defineFlow(
  {
    name: 'runPythonCodeFlow',
    inputSchema: RunPythonCodeInputSchema,
    outputSchema: RunPythonCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
