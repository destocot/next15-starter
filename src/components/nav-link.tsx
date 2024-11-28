'use client'

import { usePathname } from 'next/navigation'
import Link, { type LinkProps } from 'next/link'
import { Button, type ButtonProps } from '@/components/ui/button'

type NavLinkProps = LinkProps & {
  children: React.ReactNode
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: ButtonProps['className']
}

export const NavLink = ({
  children,
  href,
  variant,
  size,
  className,
  ...props
}: NavLinkProps) => {
  const pathname = usePathname()

  const isActive = pathname === href

  if (isActive) {
    return (
      <Button className={className} size={size} variant={variant} disabled>
        {children}
      </Button>
    )
  }

  return (
    <Button className={className} size={size} variant={variant} asChild>
      <Link href={href} {...props}>
        {children}
      </Link>
    </Button>
  )
}
