import { animated, useSprings } from '@react-spring/web'
import { Link, Outlet, useLocation } from '@remix-run/react'
import _ from 'lodash'
import { Vector } from 'matter-js'
import { useMemo, useState } from 'react'
import { scenes } from '../route'
import { useFlicker, useFlickers } from '../services/animation'
import { useDimensions, useMousePosition } from '../services/dom.client'
import { lerp } from '../services/math'
import { convertTextToLines } from '../services/parser'
import MorphSpan from './MorphSpan'

export default function Kablooey({
  title,
  children,
  gptText,
}: {
  title: string
  children: string
  gptText: string
}) {
  const { w, h } = useDimensions()

  const textMap = useMemo(() => convertTextToLines(title, children), [children])

  const mousePosition = useMousePosition()
  const randomVectors = useMemo(
    () =>
      textMap.map((fragment) =>
        Vector.create(_.random(w - fragment.w, true), _.random(h - 50, true))
      ),
    []
  )

  const [springs] = useSprings(
    textMap.length,
    (i) => {
      const toMouse = Vector.sub(randomVectors[i], mousePosition)
      return {
        from: Vector.create(w / 2, h / 2),
        to: Vector.add(
          randomVectors[i],
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

  useFlickers(
    textMap.map((fragment) => '#' + fragment.id),
    (i) => ({
      from: { min: 0, max: textMap[i].o },
      to: { min: textMap[i].o, max: textMap[i].o },
      duration: 2000 * _.random(0.8, 1.2),
      key: 'opacity',
      go: true,
    })
  )

  const [over, setOver] = useState<string>('')
  useFlicker(over ? '#' + over : '', {
    go: !!over,
    from: { max: 1, min: 0 },
    key: 'opacity',
    resetTo: textMap.find((el) => el.id === over)?.o,
  })

  const { pathname } = useLocation()

  const links = useMemo(() => {
    const scrambleScenes = _.shuffle(Object.keys(scenes))

    return textMap.map(
      (_text, i) => scrambleScenes[i % (scrambleScenes.length - 1)]
    )
  }, [])

  const fontSize = useMemo(() => _.random(12, 24, true), [])

  const formattedGptText = useMemo(() => {
    const area = (w / (fontSize * 0.5)) * (h / fontSize)
    let fullLengthText = gptText
    while (fullLengthText.length < area) fullLengthText += fullLengthText
    const slicedGptText = fullLengthText.slice(0, area)
    return slicedGptText
  }, [gptText])

  return (
    <div className='fixed left-0 top-0 h-full w-full bg-black/50'>
      <div
        className='left-0 top-0 z-0 h-full w-full overflow-hidden font-mono opacity-50'
        style={{ fontSize }}
      >
        <MorphSpan>{formattedGptText}</MorphSpan>
      </div>

      {/* <Stage
        className='absolute left-0 top-0 z-0 bg-transparent'
        width={w}
        height={h}
        options={{ backgroundAlpha: 0 }}
      >
        <LoopedGraphics
          filters={[blurFilter]}
          width={w}
          height={h}
          x={0}
          y={0}
          draw={(g) => {
            g.clear()
            const t = Date.now()
            for (let { x, y } of randomGrid) {
              const n = noise3D(x, y, t / 1000)
              g.beginFill('white', n * 0.05)
              g.drawCircle(x, y, 20)
            }
          }}
        />
      </Stage> */}

      {textMap.map((fragment, i) => (
        <animated.div
          className='absolute left-0 top-0 z-30 -translate-x-1/2 -translate-y-1/2'
          key={fragment.t}
          id={fragment.id}
          style={{
            width: fragment.w,
            ...fragment.s,
            ...springs[i],
          }}
          onMouseEnter={() => setOver(fragment.id)}
          onMouseLeave={() => setOver('')}
        >
          <Link to={`${pathname}/${links[i]}`}>{fragment.t}</Link>
        </animated.div>
      ))}

      <Outlet />
    </div>
  )
}
