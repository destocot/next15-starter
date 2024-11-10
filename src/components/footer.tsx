import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="h-12 border-t border-border/50">
      <div className="container flex h-full items-center justify-between">
        <p className="text-sm text-foreground/50">
          <Link href="/" className="font-bold">
            NextStarter
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </p>

        <p className="text-sm text-foreground/50">
          Created by Khurram Ali with Next.js 15, Tailwind, and shadcn/ui
        </p>
      </div>
    </footer>
  );
};
