import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-border/50 h-12 border-t">
      <div className="container flex h-full items-center justify-between">
        <p className="text-foreground/50 text-sm">
          <Link href="/" className="font-bold">
            NextStarter
          </Link>{" "}
          &copy; {new Date().getFullYear()}
        </p>

        <p className="text-foreground/50 text-sm">
          Created by Khurram Ali with Next.js 15, Tailwind, and shadcn/ui
        </p>
      </div>
    </footer>
  );
};
