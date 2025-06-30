
import { Suspense } from 'react';
import { getFlatCurriculum, getCurriculum } from '@/lib/curriculum';
import { LessonView } from '@/components/learn/lesson-view';
import { redirect } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionaries';

async function LearnPageContent({ lessonId, lang }: { lessonId?: string, lang: Locale }) {
  const flatCurriculum = getFlatCurriculum(lang);
  const defaultLessonId = flatCurriculum[0]?.id;

  if (!defaultLessonId) {
    // Handle case where curriculum is empty
    return <div>No lessons available.</div>;
  }
  
  const currentLessonId = lessonId || defaultLessonId;
  const lesson = flatCurriculum.find(l => l.id === currentLessonId);

  if (!lesson) {
    redirect(`/${lang}/learn?lesson=${defaultLessonId}`);
  }
  const dict = await getDictionary(lang);
  const fullCurriculum = getCurriculum(lang);

  return <LessonView lesson={lesson} dictionary={dict} lang={lang} curriculum={fullCurriculum} />;
}

export default function LearnPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LearnPageContent lessonId={searchParams?.lesson as string} lang={lang} />
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
