import { Link } from '@remix-run/react'

export default function WorkDisplay({
  work,
  to,
}: {
  work: Work<RoleType>
  to: string
}) {
  return (
    <div className='floater'>
      <Link
        to={to}
        className='absolute left-0 top-0 -z-10 h-full w-full'
      ></Link>
      <Link
        to={to}
        className='absolute right-0 top-0 m-2 rounded-lg bg-slate-700 p-2 font-mono'
      >
        X
      </Link>
      <div className='floater-overlay'>
        <div className='relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden'>
          <div className='absolute left-0 top-0 -z-10 flex h-full w-full flex-col items-center justify-center'>
            <div className='object-cover'>{work.background}</div>
          </div>
          <h2 className='title text-4xl'>{work.title}</h2>
          <h3 className='subtitle text-2xl'>{work.subtitle}</h3>
        </div>
        <div className='space-y-4 p-4'>
          <div className='space-y-4 text-base'>{work.description}</div>
          <div className='z-30'>{work.content}</div>
        </div>
      </div>
    </div>
  )
}
