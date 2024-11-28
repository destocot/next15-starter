import { cn } from '@/lib/utils'

type MainProps = React.HTMLAttributes<HTMLElement>

export const Main = ({ children, className, ...props }: MainProps) => {
  return (
    <main
      {...props}
      className={cn('min-h-[calc(100dvh-5rem-4rem)]', className)}
    >
      {children}
    </main>
  )
}
