export default function Subsection({
  children,
  title,
  className,
  innerClassName,
}: React.PropsWithChildren & {
  title: string
  className?: string
  innerClassName?: string
}) {
  return (
    <div className={`p-2 ${className ?? ''}`}>
      <h3 className='my-2 text-xl font-bold'>{title}</h3>
      <div className={innerClassName}>{children}</div>
    </div>
  )
}
