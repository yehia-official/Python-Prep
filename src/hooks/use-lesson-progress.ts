
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFlatCurriculum } from '@/lib/curriculum';

const STORAGE_KEY = 'pythonPrepProgress';
const TOTAL_LESSONS = getFlatCurriculum().length;

type Progress = {
  completedLessons: Set<string>;
};

function getProgressFromStorage(): Progress {
  if (typeof window === 'undefined') {
    return { completedLessons: new Set() };
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const initial = saved ? JSON.parse(saved) : [];
    return { completedLessons: new Set(initial) };
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return { completedLessons: new Set() };
  }
}

export function useLessonProgress() {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setCompletedLessons(getProgressFromStorage().completedLessons);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const dataToStore = JSON.stringify(Array.from(completedLessons));
        window.localStorage.setItem(STORAGE_KEY, dataToStore);
      } catch (error) {
        console.error('Error writing to localStorage', error);
      }
    }
  }, [completedLessons, isMounted]);

  const markLessonAsComplete = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      newSet.add(lessonId);
      return newSet;
    });
  }, []);

  const progressPercentage = isMounted && TOTAL_LESSONS > 0 ? (completedLessons.size / TOTAL_LESSONS) * 100 : 0;

  return {
    completedLessons: isMounted ? completedLessons : new Set(),
    markLessonAsComplete,
    progressPercentage,
    isProgressLoading: !isMounted,
    totalLessons: TOTAL_LESSONS,
  };
}
