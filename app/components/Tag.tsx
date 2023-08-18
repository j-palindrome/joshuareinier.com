import { Link, useLocation } from '@remix-run/react'

export default function Tag({
  children,
  to,
  keepSearch = true,
  ...props
}: {
  children: string
  to: string | (() => void)
  keepSearch?: boolean
} & React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement>) {
  const { search } = useLocation()

  const initialClass =
    'inline-block w-fit rounded-full border border-blue-500 px-2 font-menu mouse:hover:bg-gray-700 touch:active:bg-gray-700 transition-colors duration-300 whitespace-nowrap my-1'
  return (
    <>
      {typeof to === 'string' ? (
        <Link
          to={to + (keepSearch ? search : '')}
          className={`${props.className ?? ''} ${initialClass}`}
          {...props}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`${props.className} ${initialClass}`}
          onClick={to}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  )
}
