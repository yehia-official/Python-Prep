
import curriculumData from '@/locales/en.json';

export type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string[];
  codeExample: string;
  quiz: Question[];
  pacing: 'slow' | 'medium' | 'fast';
};

export type Curriculum = {
  beginner: Lesson[];
  intermediate: Lesson[];
  advanced: Lesson[];
};

const curriculum: Curriculum = curriculumData.curriculum as Curriculum;

export const getCurriculum = (): Curriculum => {
  return curriculum;
}

export const getFlatCurriculum = (): Lesson[] => {
    const curriculum = getCurriculum();
    const allLessons = [];
    if (curriculum.beginner) allLessons.push(...curriculum.beginner);
    if (curriculum.intermediate) allLessons.push(...curriculum.intermediate);
    if (curriculum.advanced) allLessons.push(...curriculum.advanced);
    return allLessons;
}
