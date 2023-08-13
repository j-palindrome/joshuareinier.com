import type { LinksFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useParams,
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'
import Tag from './components/Tag'
import Section from './components/Section'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

const subSites = /^\/(portfolio|design-bio)/
export default function App() {
  const location = useLocation()
  const noRoot = subSites.test(location.pathname)

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body
        className={`min-h-screen bg-gradient-to-br from-black to-gray-900 font-sans text-white`}
      >
        {!noRoot && (
          <>
            <Section>
              <div className='rounded-full border border-transparent px-4 py-1 text-center transition-colors duration-300 hover:border-blue-500/50 hover:bg-gray-700/50'>
                <Link className='font-serif text-4xl' to='/'>
                  Joshua Tazman Reinier
                </Link>
              </div>
            </Section>
            <Section>
              <div>
                is an{' '}
                <Tag to='artist' keepSearch={false}>
                  artist
                </Tag>{' '}
                <Tag to='researcher' keepSearch={false}>
                  researcher
                </Tag>{' '}
                and{' '}
                <Tag to='designer' keepSearch={false}>
                  designer
                </Tag>{' '}
                exploring the connections between language, noise, and
                technology.
              </div>
            </Section>
          </>
        )}

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
