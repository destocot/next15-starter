import { NuqsAdapter } from "./nuqs-adapter";
import { SessionProvider } from "./session-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <NuqsAdapter>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </NuqsAdapter>
    </SessionProvider>
  );
};
