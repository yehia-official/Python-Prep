
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getCurriculum, Curriculum } from "@/lib/curriculum";
import { BookOpen, Download, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useEffect, useState } from "react";
import dict from '@/locales/en.json';

function getLevelFromLessonId(lessonId: string, curriculum: Curriculum): keyof Curriculum | null {
  for (const level in curriculum) {
    if (curriculum[level as keyof Curriculum].some(lesson => lesson.id === lessonId)) {
      return level as keyof Curriculum;
    }
  }
  return null;
}

export function SidebarNav() {
  const searchParams = useSearchParams();
  const curriculum = getCurriculum();
  const dictionary = dict.sidebar;
  
  const currentLessonId = searchParams.get('lesson') || curriculum.beginner[0]?.id;
  const { completedLessons, progressPercentage, isProgressLoading, totalLessons } = useLessonProgress();
  const [activeAccordion, setActiveAccordion] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (currentLessonId) {
      const currentLevel = getLevelFromLessonId(currentLessonId, curriculum);
      setActiveAccordion(currentLevel ?? 'beginner');
    }
  }, [currentLessonId, curriculum]);


  const handleDownload = () => {
    let formattedContent = "";
    (Object.keys(curriculum) as Array<keyof Curriculum>).forEach(level => {
      formattedContent += `# ${dictionary.levels[level as keyof typeof dictionary.levels].toUpperCase()}\n\n`;
      curriculum[level as keyof Curriculum].forEach(lesson => {
        const quizContent = lesson.quiz.map((q, i) =>
          `${i + 1}. ${q.question}\n${q.options.map(o => `   - ${o}`).join('\n')}`
        ).join('\n\n');

        formattedContent += `
## ${lesson.title}

**${dictionary.description}:** ${lesson.description}

---

### ${dictionary.content}

${lesson.content.join('\n\n')}

### ${dictionary.codeExample}

\`\`\`python
${lesson.codeExample}
\`\`\`

### ${dictionary.quiz}

${quizContent}
        `.trim() + '\n\n---\n\n';
      });
    });

    const blob = new Blob([formattedContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python-prep-course-by-yehia-mohammed.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">{dictionary.yourProgress}</h3>
        {isProgressLoading ? (
            <Skeleton className="h-4 w-full" />
        ) : (
            <Progress value={progressPercentage} className="h-2" />
        )}
        <p className="text-xs text-muted-foreground text-center">
            {completedLessons.size} / {totalLessons} {dictionary.complete} ({Math.floor(progressPercentage)}%)
        </p>
      </div>
      <ScrollArea className="flex-1 mt-4">
        <Accordion 
          type="single" 
          collapsible 
          className="w-full pr-4" 
          value={activeAccordion}
          onValueChange={setActiveAccordion}
        >
          {(Object.keys(curriculum) as Array<keyof Curriculum>).map(level => (
            <AccordionItem value={level} key={level}>
              <AccordionTrigger className="text-base font-semibold hover:no-underline">
                {dictionary.levels[level as keyof typeof dictionary.levels]}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pt-2">
                  {curriculum[level as keyof Curriculum].map((lesson) => {
                    const isActive = (currentLessonId === lesson.id);
                    const isCompleted = completedLessons.has(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <Link
                          href={`/learn?lesson=${lesson.id}`}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-md text-foreground/70 hover:bg-secondary hover:text-foreground transition-colors text-sm",
                            isActive && "bg-primary/10 text-primary font-semibold"
                          )}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5 shrink-0 text-primary" /> : <BookOpen className="w-5 h-5 shrink-0" />}
                          <span className="truncate flex-1">{lesson.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
      <div className="mt-4 pt-4 border-t pr-4">
        <Button variant="outline" className="w-full" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          {dictionary.downloadCourse}
        </Button>
      </div>
    </div>
  );
}
