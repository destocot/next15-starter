import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Main } from '@/components/main'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <Main className='flex items-center justify-center'>
      <div className='flex flex-col items-center gap-y-8 pb-8'>
        <h1 className='text-3xl font-bold'>NextStarter</h1>

        <p className='max-w-prose text-center text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          assumenda repudiandae debitis veritatis! Voluptatum, quam laudantium.
          Et earum qui delectus voluptates explicabo rem, porro autem nam
          consectetur sit. Eum, doloremque?
        </p>

        <Button asChild>
          <Link href='/login'>
            Get Started
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Main>
  )
}
