import ViewButton from './ViewButton'

export default function Card({
  bg,
  title,
  caption,
  href,
  text = 'Learn more',
  className,
}: {
  bg: string
  title: string
  caption: string
  href?: string
  text?: string
  className?: string
}) {
  return (
    <div className={`aspect-[4/3] px-1 ${className ?? ''}`}>
      <div className='bg-gray-500 rounded-lg overflow-hidden text-white w-full h-full flex flex-col'>
        <div className='w-full h-0 grow relative'>
          <img src={bg} className='h-full w-full object-cover' />
          <div className='absolute top-0 w-full bg-black/50 px-2 pt-2'>
            <h2 className='heading'>{title}</h2>
          </div>
          <div className='absolute bottom-0 w-full px-2 bg-black/50'>
            <p>{caption}</p>
          </div>
        </div>
        {href && (
          <ViewButton
            className='child:!m-0 child:rounded-none child:bg-black/50'
            href={href}
          >
            {text}
          </ViewButton>
        )}
      </div>
    </div>
  )
}
