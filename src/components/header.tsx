import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/theme-toggler";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border/50">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          NextStarter
        </Link>

        <nav className="flex items-center gap-x-4">
          <ul className="flex items-center gap-x-4">
            <li>
              <Button size="sm" asChild>
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" variant="outline" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            </li>
          </ul>

          <ThemeToggler />
        </nav>
      </div>
    </header>
  );
};
