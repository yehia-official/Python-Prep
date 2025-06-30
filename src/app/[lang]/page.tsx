
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Check, Code, TrendingUp, Users } from 'lucide-react';
import { getCurriculum } from '@/lib/curriculum';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/i18n.config';
import { ThemeToggle } from '@/components/theme-toggle';
import LocaleSwitcher from '@/components/locale-switcher';


export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const curriculum = getCurriculum(lang);
  const dict = await getDictionary(lang);
  const homeDict = dict.home;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 flex justify-between items-center container mx-auto sticky top-0 bg-background/80 backdrop-blur-sm z-20">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle {...dict.theme} />
          <LocaleSwitcher />
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            {homeDict.hero.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
            {homeDict.hero.subtitle}
          </p>
          <Link href={`/${lang}/learn`}>
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-xl transition-shadow">
              {homeDict.hero.cta}
            </Button>
          </Link>
        </section>

        {/* Why Python Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold font-headline mb-12">{homeDict.why.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow text-left border-transparent bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-primary" />
                    <span>{homeDict.why.cards.beginner.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                   {homeDict.why.cards.beginner.text}
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow text-left border-transparent bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Code className="w-8 h-8 text-primary" />
                    <span>{homeDict.why.cards.versatile.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {homeDict.why.cards.versatile.text}
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow text-left border-transparent bg-background">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <span>{homeDict.why.cards.demand.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {homeDict.why.cards.demand.text}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold font-headline mb-12">{homeDict.learn.title}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <ul className="space-y-4">
                {curriculum.beginner.slice(0, 7).map((lesson) => (
                  <li key={lesson.id} className="flex items-start gap-4 p-4 rounded-lg bg-card border">
                     <div className="bg-primary/10 p-2 rounded-full mt-1">
                       <Check className="w-5 h-5 text-primary" />
                     </div>
                     <div>
                       <h3 className="font-semibold text-lg">{lesson.title}</h3>
                       <p className="text-muted-foreground">{lesson.description}</p>
                     </div>
                  </li>
                ))}
                 <li className="text-center text-muted-foreground p-4">{homeDict.learn.more}</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-20 text-center container mx-auto">
            <h2 className="text-4xl font-bold font-headline mb-4">{homeDict.finalCta.title}</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80 mb-8">
                {homeDict.finalCta.subtitle}
            </p>
            <Link href={`/${lang}/learn`}>
                <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-xl transition-shadow">
                    {homeDict.finalCta.cta}
                </Button>
            </Link>
        </section>

      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground bg-card">
        <p>© {new Date().getFullYear()} {homeDict.footer.rights}</p>
        <p className="mt-2" dangerouslySetInnerHTML={{ __html: homeDict.footer.designedBy }} />
      </footer>
    </div>
  );
}
