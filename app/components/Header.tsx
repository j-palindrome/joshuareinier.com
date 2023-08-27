import { Link, useParams } from '@remix-run/react'
import { Bodies, Constraint, Vector, Body } from 'matter-js'
import { useMemo, useRef } from 'react'
import invariant from 'tiny-invariant'
import { useMousePosition, useWindow } from '~/util/hooks'
import { repulsion, useMatter } from '~/util/matter'

export default function Header() {
  const window = useWindow()
  const { role } = useParams()
  const fullHeight = !role

  const mousePosRef = useRef<[number, number]>([0, 0])
  const [x, y] = useMousePosition()
  mousePosRef.current = [x, y]

  const height = fullHeight ? window?.innerHeight ?? 0 : 200

  const bodies = useMemo(() => {
    if (!window) return []
    const midpoint: [number, number] = [window.innerWidth / 2, height]
    const props: Partial<Matter.Body> = {
      inertia: 300,
    }
    const bodies: Matter.Body[] = [
      Bodies.circle(window.innerWidth / 2, height / 2, 50, {
        label: 'artist',
        ...props,
      }),
      Bodies.circle(window.innerWidth / 2, height / 2, 50, {
        label: 'researcher',
        ...props,
      }),
      Bodies.circle(window.innerWidth / 2, height / 2, 50, {
        label: 'designer',
        ...props,
      }),
    ]
    const constraints: Matter.Constraint[] = []

    for (let body of bodies) {
      const constraint = Constraint.create({
        pointA: Vector.create(midpoint[0], midpoint[1]),
        bodyB: body,
        length: 0,
        stiffness: 1e-6,
      })
      constraints.push(constraint)
    }

    const walls = [
      Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
        isStatic: true,
      }),
      Bodies.rectangle(0, height / 2, 10, height, {
        isStatic: true,
      }),
      Bodies.rectangle(window.innerWidth / 2, height, window.innerWidth, 10, {
        isStatic: true,
      }),
      Bodies.rectangle(window.innerWidth, height / 2, 10, height, {
        isStatic: true,
      }),
    ]

    bodies.push(...walls)

    return [...bodies, ...constraints]
  }, [window, fullHeight])

  const frame = useRef<HTMLDivElement>(null)

  useMatter(
    bodies,
    (bodies) => {
      if (!window) return

      for (let body of bodies) {
        if (body.isStatic) continue
        for (let otherBody of bodies) {
          if (body === otherBody || body.isStatic) continue
          Body.applyForce(
            body,
            body.position,
            repulsion(
              body.position,
              otherBody.position,
              window.innerWidth / 4,
              1e-3
            )
          )
        }
        Body.applyForce(
          body,
          body.position,
          repulsion(
            body.position,
            Vector.create(...mousePosRef.current),
            window.innerWidth / 2,
            0.0005 * -1
          )
        )

        const el = document.getElementById(`${body.label}`)
        invariant(el)
        el.style.setProperty(
          'translate',
          `${body.position.x}px ${body.position.y}px`
        )
      }
    },
    (_world, engine) => {
      engine.gravity.x = 0
      engine.gravity.y = 0
    }
  )

  const bodyClass = (thisRole: RoleType) =>
    `absolute flex ${
      fullHeight
        ? 'h-[400px] w-[400px]'
        : thisRole === role
        ? 'h-[200px] w-[200px]'
        : 'h-[100px] w-[100px]'
    } transition-[height,width] duration-500 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700/20 hover:z-10`
  return (
    <div
      className={`${
        fullHeight ? 'h-screen' : 'h-[200px]'
      } relative w-screen transition-[height] duration-300`}
      ref={frame}
    >
      {fullHeight && (
        <Link
          to='#artist-statement'
          className='button absolute bottom-0 right-0'
        >
          Artist Statement
        </Link>
      )}
      <Link to='about' className='button absolute left-0 top-0'>
        about
      </Link>
      <Link to='artist' className={bodyClass('artist')} id='artist'>
        artist
      </Link>
      <Link to='researcher' className={bodyClass('researcher')} id='researcher'>
        researcher
      </Link>
      <Link to='designer' className={bodyClass('designer')} id='designer'>
        designer
      </Link>
      <Link
        to='/'
        className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold'
      >
        Joshua Tazman Reinier
      </Link>
    </div>
  )
}
