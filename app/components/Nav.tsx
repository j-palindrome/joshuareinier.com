import { Link } from '@remix-run/react'
import Section from './Section'
import Tag from './Tag'

export default function Nav() {
  return (
    <>
      <Link
        to='about'
        className='absolute left-0 top-0 m-2 rounded bg-slate-800/50 px-4 py-1'
      >
        About
      </Link>
      <Section>
        <div className='rounded-full border border-transparent px-4 py-1 text-center transition-colors duration-300 hover:border-blue-500/50 hover:bg-gray-700/50'>
          <Link className='font-serif text-4xl' to='/'>
            Joshua Tazman Reinier
          </Link>
        </div>
      </Section>
      <Section>
        <div className='flex items-center justify-center space-x-4'>
          <Tag to='artist' keepSearch={false}>
            artist
          </Tag>
          <Tag to='researcher' keepSearch={false}>
            researcher
          </Tag>
          <Tag to='designer' keepSearch={false}>
            designer
          </Tag>
        </div>
      </Section>
    </>
  )
}
