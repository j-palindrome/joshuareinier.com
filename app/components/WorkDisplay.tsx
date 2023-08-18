import { Link } from '@remix-run/react'

export default function WorkDisplay({
  work,
  to,
}: {
  work: Work<RoleType>
  to: string
}) {
  return (
    <div className='mx-auto max-w-4xl'>
      <h2 className='text-center text-4xl font-bold'>{work.title}</h2>
      <h3 className='text-center text-2xl'>{work.subtitle}</h3>

      <div className='space-y-4 p-4'>
        <div className='z-30'>{work.content}</div>
        <div className='space-y-4 text-base'>{work.description}</div>
      </div>
    </div>
  )
}
