export const Footer = () => {
  return (
    <footer className='h-16 border-t'>
      <div className='container flex h-full flex-col justify-center sm:flex-row sm:items-center sm:justify-between'>
        <span className='text-sm text-foreground/50'>
          © {new Date().getFullYear()} Next Starter
        </span>
        <span className='text-sm text-foreground/50'>
          Created by Khurram Ali
        </span>
      </div>
    </footer>
  )
}
