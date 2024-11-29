import { cn } from '@/lib/utils'

type ContainerProps = React.HTMLAttributes<HTMLDivElement>

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div {...props} className={cn('container', className)}>
      {children}
    </div>
  )
}
