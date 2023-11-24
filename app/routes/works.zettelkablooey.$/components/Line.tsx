export default function Line({
  children,
}: {
  children: string | JSX.Element | (string | JSX.Element)[]
}) {
  const className = 'relative z-10'
  return <span className={className}>{children}</span>
}
