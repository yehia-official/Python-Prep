
import 'server-only';
import type {Locale} from '@/i18n.config';

const dictionaries = {
  en: () => import('@/locales/en.json').then(module => module.default),
  ar: () => import('@/locales/ar.json').then(module => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return locale === 'ar' ? dictionaries.ar() : dictionaries.en();
};
