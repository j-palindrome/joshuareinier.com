import { Link } from '@remix-run/react'

export default function WorkDisplay({
  work,
  to,
}: {
  work: Work<RoleType>
  to: string
}) {
  return (
    <div className='fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/50 p-8 backdrop-blur-sm'>
      <Link to={to} className='absolute left-0 top-0 -z-10 h-full w-full'>
        {/* {cloneElement(work.background, {
          muted: true,
          className:
            "object-cover w-full h-full absolute top-0 left-0 -z-10 grayscale",
        })} */}
      </Link>
      <div className='relative max-h-full max-w-4xl cursor-default overflow-y-auto rounded-lg border border-gray-400 bg-black/20 p-4 backdrop-blur-lg'>
        <div className='sticky top-4 z-10 mb-8 text-center text-2xl font-bold drop-shadow-text'>
          {work.title}
        </div>
        <div className='text-center'>{work.subtitle}</div>
        <div className='z-30 my-4'>{work.content}</div>
        <div className='my-4 space-y-4 text-base'>{work.description}</div>
      </div>
    </div>
  )
}
