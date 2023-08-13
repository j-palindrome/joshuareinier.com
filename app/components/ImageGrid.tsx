import { isElement } from 'lodash'
import { Fragment, isValidElement, useEffect, useRef, useState } from 'react'

const isParameters = (
  x: object | string
): x is Parameters<typeof GridItem>[0] => {
  // @ts-ignore
  return typeof x === 'object' && x['src']
}

const GRID_HEIGHT = 300
export default function ImageGrid({
  srcs,
  className,
  childClassName,
}: {
  srcs: (string | JSX.Element | Parameters<typeof GridItem>[0])[]
  className?: string
  childClassName?: string
}) {
  return (
    <div className={`flex w-full flex-wrap ${className ?? ''}`}>
      {srcs.map((src, i) =>
        isParameters(src) ? (
          <GridItem
            {...src}
            className={`${src.className ?? ''} ${childClassName ?? ''}`}
            key={i}
          />
        ) : (
          <GridItem src={src} className={childClassName} key={i} />
        )
      )}
    </div>
  )
}

export function GridItem({
  src,
  className,
}: {
  src: string | JSX.Element
  className?: string
}) {
  return (
    <div
      className={`grow p-2 ${className ?? ''}`}
      style={{ height: GRID_HEIGHT }}
    >
      <div className='h-full w-full overflow-hidden rounded child:h-full child:w-full'>
        {typeof src === 'string' ? (
          <img src={src} key={src} className='object-cover' />
        ) : (
          <>{src}</>
        )}
      </div>
    </div>
  )
}
