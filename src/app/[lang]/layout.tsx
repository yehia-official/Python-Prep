
import type {Metadata} from 'next';
import '../globals.css';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n.config';

export const metadata: Metadata = {
  title: 'Python Prep',
  description: 'A comprehensive and integrated site to learn Python, designed by Engineer Yehia Mohammed.',
};

export default function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  // The <html> and <body> tags are now in the root layout (src/app/layout.tsx)
  // to prevent hydration errors. We can still apply language-specific classes to a wrapper div.
  return (
    <div className={cn(params.lang === 'ar' && 'font-arabic')}>
      {children}
    </div>
  );
}
