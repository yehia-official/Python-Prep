
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Check, Code, TrendingUp, Users, ChevronsRight, BrainCircuit, GraduationCap } from 'lucide-react';
import { getCurriculum } from '@/lib/curriculum';
import { ThemeToggle } from '@/components/theme-toggle';
import dict from '@/locales/en.json';


export default function Home() {
  const curriculum = getCurriculum();
  const homeDict = dict.home;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 flex justify-between items-center container mx-auto sticky top-0 bg-background/80 backdrop-blur-sm z-20">
        <Logo />
        <div className="flex items-center gap-2">
          <ThemeToggle {...dict.theme} />
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center container mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            {homeDict.hero.title}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-8">
            {homeDict.hero.subtitle}
          </p>
          <Link href="/learn">
            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-xl transition-shadow">
              {homeDict.hero.cta}
            </Button>
          </Link>
        </section>

        {/* Why Python Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12">{homeDict.why.title}</h2>
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
              <h2 className="text-4xl font-bold mb-12">{homeDict.learn.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <Card className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ChevronsRight className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl">{dict.sidebar.levels.beginner}</CardTitle>
                  </div>
                  <CardContent className="text-muted-foreground p-0 pt-2">Build a solid foundation in Python programming.</CardContent>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {curriculum.beginner.slice(0, 6).map(lesson => (
                      <li key={lesson.id} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span>{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                 <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl">{dict.sidebar.levels.intermediate}</CardTitle>
                  </div>
                   <CardContent className="text-muted-foreground p-0 pt-2">Apply your skills to practical, real-world problems.</CardContent>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {curriculum.intermediate.slice(0, 6).map(lesson => (
                      <li key={lesson.id} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span>{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="flex flex-col">
                 <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <CardTitle className="text-2xl">{dict.sidebar.levels.advanced}</CardTitle>
                  </div>
                   <CardContent className="text-muted-foreground p-0 pt-2">Master complex topics and Pythonic best practices.</CardContent>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {curriculum.advanced.slice(0, 6).map(lesson => (
                      <li key={lesson.id} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span>{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
             <div className="text-center text-muted-foreground p-8">{homeDict.learn.more}</div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="py-20 text-center container mx-auto">
            <h2 className="text-4xl font-bold mb-4">{homeDict.finalCta.title}</h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80 mb-8">
                {homeDict.finalCta.subtitle}
            </p>
            <Link href="/learn">
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
