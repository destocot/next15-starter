import Link from 'next/link'
import { NavLink } from '@/components/nav-link'
import { Button } from '@/components/ui/button'

export const Header = () => {
  return (
    <header className='h-20 border-b'>
      <div className='container flex h-full items-center'>
        <Link href='/' className='text-3xl font-bold'>
          NextStarter
        </Link>

        <nav className='flex flex-1 justify-end'>
          <ul className='flex gap-x-2'>
            <li>
              <NavLink href='/' variant='ghost' size='sm'>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink href='/profile' variant='ghost' size='sm'>
                Profile
              </NavLink>
            </li>

            <li>
              <Button size='sm' asChild>
                <Link href='/login'>Log In</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
