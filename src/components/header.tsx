import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/components/theme-toggler";
import { DashboardButton } from "@/components/dashboard-button";

export const Header = () => {
  return (
    <header className="h-16 border-b border-border/50">
      <div className="container flex h-full items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          NextStarter
        </Link>

        <nav>
          <ul className="flex items-center gap-x-4">
            <li>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/">Home</Link>
              </Button>
            </li>

            <li>
              <DashboardButton />
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
