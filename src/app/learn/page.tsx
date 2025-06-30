
import { Suspense } from 'react';
import { getFlatCurriculum, getCurriculum } from '@/lib/curriculum';
import { LessonView } from '@/components/learn/lesson-view';
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

async function LearnPageContent({ lessonId }: { lessonId?: string }) {
  const flatCurriculum = getFlatCurriculum();
  const defaultLessonId = flatCurriculum[0]?.id;

  if (!defaultLessonId) {
    // Handle case where curriculum is empty
    return <div>No lessons available.</div>;
  }
  
  const currentLessonId = lessonId || defaultLessonId;
  const lesson = flatCurriculum.find(l => l.id === currentLessonId);

  if (!lesson) {
    redirect(`/learn?lesson=${defaultLessonId}`);
  }
  const fullCurriculum = getCurriculum();

  return <LessonView lesson={lesson} curriculum={fullCurriculum} />;
}

export default function LearnPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LearnPageContent lessonId={searchParams?.lesson as string} />
    </Suspense>
  );
}

function LessonSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-48 w-full" />
    </div>
  )
}
