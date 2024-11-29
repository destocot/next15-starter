import { Container } from '@/components/container'
import { Main } from '@/components/main'

export default function Page() {
  return (
    <Main>
      <Container className='space-y-8 pb-8 pt-16'>
        <h1 className='text-3xl font-bold'>Login</h1>

        <p className='max-w-prose text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
          assumenda repudiandae debitis veritatis! Voluptatum, quam laudantium.
          Et earum qui delectus voluptates explicabo rem, porro autem nam
          consectetur sit. Eum, doloremque?
        </p>
      </Container>
    </Main>
  )
}
