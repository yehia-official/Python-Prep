
"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { type Lesson, getFlatCurriculum } from "@/lib/curriculum";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Lightbulb, Loader2, ArrowRight } from "lucide-react";
import { handleQuizSubmission } from "@/app/actions";
import { type PersonalizeLessonPacingOutput } from "@/ai/flows/personalize-lesson-pacing";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import dict from '@/locales/en.json';

export function Quiz({ lesson }: { lesson: Lesson }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState<PersonalizeLessonPacingOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { markLessonAsComplete, totalLessons } = useLessonProgress();

  const quizDict = dict.quiz;
  const curriculum = getFlatCurriculum();
  const currentIndex = curriculum.findIndex(l => l.id === lesson.id);
  const nextLesson = curriculum[currentIndex + 1];

  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setAiFeedback(null);
  }, [lesson.id]);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers({ ...answers, [questionIndex]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(answers).length !== lesson.quiz.length) {
      toast({
        title: quizDict.incomplete.title,
        description: quizDict.incomplete.description,
        variant: "destructive",
      });
      return;
    }

    let correctAnswers = 0;
    lesson.quiz.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correctAnswers++;
      }
    });

    const calculatedScore = (correctAnswers / lesson.quiz.length) * 100;
    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore >= 75) {
      markLessonAsComplete(lesson.id);
    }

    startTransition(async () => {
      const feedback = await handleQuizSubmission({
        quizPerformance: calculatedScore,
        currentPacing: lesson.pacing,
        lessonTitle: lesson.title,
      });
      setAiFeedback(feedback);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {lesson.quiz.map((q, index) => (
        <div key={index} className="p-4 border rounded-lg bg-card">
          <p className="font-semibold mb-4 text-lg">
            {index + 1}. {q.question}
          </p>
          <RadioGroup
            onValueChange={(value) => handleAnswerChange(index, value)}
            disabled={submitted}
            value={answers[index]}
          >
            {q.options.map((option, optIndex) => {
              const isCorrect = option === q.correctAnswer;
              const isSelected = answers[index] === option;
              return (
                <Label
                  htmlFor={`q${index}-o${optIndex}`}
                  key={optIndex}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-md border transition-all cursor-pointer hover:bg-secondary",
                    submitted && isCorrect && "bg-green-100 dark:bg-green-900/30 border-green-300",
                    submitted && !isCorrect && isSelected && "bg-red-100 dark:bg-red-900/30 border-red-300"
                  )}
                >
                  <RadioGroupItem value={option} id={`q${index}-o${optIndex}`} />
                  <span className="flex-1">{option}</span>
                  {submitted && isCorrect && <CheckCircle2 className="text-green-600" />}
                  {submitted && !isCorrect && isSelected && <XCircle className="text-red-600" />}
                </Label>
              );
            })}
          </RadioGroup>
        </div>
      ))}
      
      {!submitted && (
        <Button type="submit" size="lg" disabled={isPending || Object.keys(answers).length !== lesson.quiz.length}>
          {quizDict.submit}
        </Button>
      )}

      {submitted && (
        <div className="space-y-4 animate-in fade-in">
          <Alert className={score >= 75 ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-red-500 bg-red-50 dark:bg-red-900/20"}>
            <CheckCircle2 className={cn("h-4 w-4", score >= 75 ? "text-green-600" : "text-red-600")} />
            <AlertTitle className={cn(score >= 75 ? "text-green-800" : "text-red-800")}>{quizDict.results.title}</AlertTitle>
            <AlertDescription className={cn(score >= 75 ? "text-green-700" : "text-red-700")}>
              {quizDict.results.score.replace('{score}', score.toFixed(0))}
            </AlertDescription>
          </Alert>

          {isPending && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>{quizDict.feedback.analyzing}</AlertTitle>
              <AlertDescription>
                {quizDict.feedback.generating}
              </AlertDescription>
            </Alert>
          )}

          {aiFeedback && (
            <Alert variant="default" className="bg-primary/10 border-primary/20">
              <Lightbulb className="h-4 w-4 text-primary" />
              <AlertTitle className="text-primary font-headline">{quizDict.feedback.title}</AlertTitle>
              <AlertDescription>
                <p>{aiFeedback.suggestion}</p>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex items-center gap-4">
            <Button onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setScore(0);
              setAiFeedback(null);
            }} variant="outline">
              {quizDict.tryAgain}
            </Button>

            {score >= 75 && nextLesson && (
              <Button asChild variant="default" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Link href={`/learn?lesson=${nextLesson.id}`}>
                  {quizDict.nextLesson} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
             {score >= 75 && !nextLesson && (
               <p className="font-semibold text-green-600 animate-in fade-in">{quizDict.courseComplete}</p>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
