import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import Header from './components/Header'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

const rootPaths = /^\/(artist|designer|researcher|$)/
export default function App() {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className={`min-h-screen font-sans text-white`}>
        <div className='fixed left-0 top-0 -z-10 h-screen w-screen bg-gradient-to-br from-black to-gray-800'></div>
        {rootPaths.test(location.pathname) && <Header />}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
