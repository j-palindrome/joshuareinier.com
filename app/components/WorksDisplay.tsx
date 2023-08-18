import { animated, useSprings } from '@react-spring/web'
import { Link, useParams, useSearchParams } from '@remix-run/react'
import _ from 'lodash'
import { Vector } from 'matter-js'
import { cloneElement, useEffect, useRef, useState } from 'react'
import { ClientOnly } from 'remix-utils'
import { lerp, useDimensions, useMousePosition } from '~/util/hooks'

export default function WorksDisplay(
  props: Parameters<typeof WorksDisplayClient>[0]
) {
  return (
    <ClientOnly fallback={<></>}>
      {() => <WorksDisplayClient {...props} />}
    </ClientOnly>
  )
}

function WorksDisplayClient({ works }: { works: Work<RoleType>[] }) {
  const [search] = useSearchParams()
  const { work } = useParams()

  const frame = useRef<HTMLDivElement>(null)

  const itemWidth = 150
  const margin = 24
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const computeResize = () => {
      const newWidth = Math.min(
        works.length,
        Math.floor(
          Math.min(window.innerWidth - itemWidth, 1000) / (itemWidth + margin)
        )
      )
      if (width !== newWidth) setWidth(newWidth)
    }

    window.addEventListener('resize', computeResize)
    computeResize()
    return () => {
      window.removeEventListener('resize', computeResize)
    }
  }, [works])

  const mousePosition = useMousePosition()
  const { w } = useDimensions()

  const [springs] = useSprings(
    works.length,
    (i) => {
      const position = document
        .querySelector(`[data-spring=${works[i].route}]`)
        ?.getBoundingClientRect()
      if (!position) return {}
      const positionVector = Vector.create(position.x, position.y)
      const toMouse = Vector.sub(
        positionVector,
        Vector.create(...mousePosition)
      )

      return {
        from: Vector.create(0, 0),
        to: Vector.add(
          Vector.create(0, i % 2 ? itemWidth / 4 : -itemWidth / 4),
          Vector.mult(
            Vector.normalise(toMouse),
            lerp(20, 0, Vector.magnitude(toMouse) / w, { clamp: true })
          )
        ),
        config: {
          damping: 500,
          friction: 10 * _.random(0.9, 1.1),
          tension: 250 * _.random(0.8, 1.2),
        },
      }
    },
    [mousePosition]
  )

  const lastScroll = useRef<number>(0)
  useEffect(() => {
    window.scrollTo({ top: lastScroll.current })
  }, [work])

  return (
    <div className='w-full'>
      <div
        className='flex w-full overflow-y-auto'
        style={{ height: itemWidth * 3, marginBlock: -itemWidth / 2 }}
      >
        <div
          className={`mx-auto flex grow items-center justify-around`}
          ref={frame}
        >
          {works.map(({ title, subtitle, route, background }, i) => {
            return (
              <animated.div
                data-spring={route}
                key={route}
                className={`relative flex aspect-square flex-none overflow-hidden rounded-full bg-gradient-to-br from-slate-600 to-slate-800 shadow-lg transition-transform duration-500 hover:z-10 hover:scale-125`}
                style={{
                  left: springs[i].x,
                  top: springs[i].y,
                  width: work === route ? itemWidth * 2 : itemWidth,
                }}
              >
                <Link
                  className='relative z-10 flex h-full w-full flex-col items-center justify-center'
                  to={route + (search ? '?' + search : search)}
                  onMouseDown={() => {
                    lastScroll.current = window.scrollY
                  }}
                >
                  <div className='title text-xl'>{title}</div>
                  <div className='subtitle text-sm'>{subtitle}</div>
                </Link>

                {cloneElement(background, {
                  autoPlay: true,
                  muted: true,
                  loop: true,
                  className:
                    'object-cover w-full h-full absolute top-0 left-0 rounded-full',
                })}
              </animated.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
