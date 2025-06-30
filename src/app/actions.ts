"use server";

import {
  personalizeLessonPacing,
  type PersonalizeLessonPacingInput,
  type PersonalizeLessonPacingOutput,
} from "@/ai/flows/personalize-lesson-pacing";
import { runPythonCode, type RunPythonCodeOutput } from "@/ai/flows/run-python-code";
import { explainCode, type ExplainCodeOutput } from "@/ai/flows/explain-code";


export async function handleQuizSubmission(
  input: PersonalizeLessonPacingInput
): Promise<PersonalizeLessonPacingOutput> {
  try {
    const result = await personalizeLessonPacing(input);
    return result;
  } catch (error) {
    console.error("Error getting AI feedback:", error);
    return {
      suggestion: "Could not retrieve AI feedback at this time. Please try again later.",
    };
  }
}

export async function handleRunCode(
  code: string
): Promise<RunPythonCodeOutput> {
  try {
    const result = await runPythonCode({ code });
    return result;
  } catch (error) {
    console.error("Error running code:", error);
    return {
      output: "An error occurred while running the code. Please try again."
    }
  }
}

export async function handleExplainCode(
  code: string
): Promise<ExplainCodeOutput> {
  try {
    const result = await explainCode({ code });
    return result;
  } catch (error) {
    console.error("Error explaining code:", error);
    return {
      explanation: "An error occurred while generating the explanation. Please try again."
    }
  }
}
