import { Main } from '@/components/main'
import { Button } from '@/components/ui/button'
import { Undo2Icon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Main className='flex items-center justify-center'>
      <div className='flex flex-col items-center gap-y-8 pb-8'>
        <h1 className='text-3xl font-bold'>Not Found</h1>

        <p className='max-w-prose text-center text-muted-foreground'>
          Could not find requested resource
        </p>

        <Button asChild>
          <Link href='/'>
            Return Home
            <Undo2Icon />
          </Link>
        </Button>
      </div>
    </Main>
  )
}
