export default function ViewButton({
  href,
  children,
  className,
}: {
  href: string
  children: string | JSX.Element
  className?: string
}) {
  return (
    <a
      href={href}
      target='_blank'
      className={`block w-full ${className ?? ''}`}
    >
      <button className='hover:bg-accent-light hover:border-accent-dark my-2 flex w-full justify-center rounded-lg bg-slate-800/50 py-1 font-bold transition-colors duration-300 hover:bg-slate-800/75'>
        {children}
      </button>
    </a>
  )
}
