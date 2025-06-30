
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Lesson, Curriculum } from "@/lib/curriculum";
import { Quiz } from "./quiz";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CodeRunner } from "./code-runner";
import dict from '@/locales/en.json';

export function LessonView({ lesson, curriculum }: { lesson: Lesson, curriculum: Curriculum }) {
  const lessonDict = dict.lesson;
  return (
    <div className="space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">{lesson.title}</CardTitle>
          <CardDescription className="text-base">{lesson.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {lesson.content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{lessonDict.playground.title}</CardTitle>
          <CardDescription>{lessonDict.playground.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeRunner initialCode={lesson.codeExample} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-4 font-headline">{lessonDict.quiz.title}</CardTitle>
            <CardDescription>{lessonDict.quiz.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <Quiz lesson={lesson} key={lesson.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
