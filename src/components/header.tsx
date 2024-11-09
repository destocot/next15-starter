import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/theme-toggler";

export const Header = () => {
  return (
    <header className="border-border/50 h-16 border-b">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          NextStarter
        </Link>

        <nav>
          <ul className="flex items-center gap-x-4">
            <li>
              <Button size="sm" asChild>
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </li>
            <li>
              <ThemeToggler />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
