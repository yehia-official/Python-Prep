
import Link from "next/link";
import { Logo } from "@/components/logo";
import { SidebarNav } from "@/components/learn/sidebar-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Suspense } from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionaries";
import { ThemeToggle } from "@/components/theme-toggle";
import LocaleSwitcher from "@/components/locale-switcher";

export default async function LearnLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="w-72 hidden md:flex flex-col border-r fixed h-full bg-card">
        <div className="p-4 border-b flex justify-between items-center">
          <Link href={`/${lang}`}>
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <Suspense fallback={<div>{dict.sidebar.loading}...</div>}>
            <SidebarNav lang={lang} dictionary={dict.sidebar} />
          </Suspense>
        </nav>
      </aside>
      <div className={lang === 'ar' ? "md:pr-72 flex-1 flex flex-col w-full min-w-0" : "md:pl-72 flex-1 flex flex-col w-full min-w-0"}>
        <header className="md:hidden p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 flex justify-between items-center">
          <Link href={`/${lang}`}>
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle {...dict.theme} />
            <LocaleSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="p-0 w-72 flex flex-col">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Course lessons and navigation
                </SheetDescription>
                <div className="p-4 border-b">
                  <Link href={`/${lang}`}>
                    <Logo />
                  </Link>
                </div>
                <nav className="p-4 flex-1">
                  <Suspense fallback={<div>{dict.sidebar.loading}...</div>}>
                     <SidebarNav lang={lang} dictionary={dict.sidebar} />
                  </Suspense>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
        <header className="hidden md:flex p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10 justify-end items-center">
          <div className="flex items-center gap-2">
            <ThemeToggle {...dict.theme} />
            <LocaleSwitcher />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
