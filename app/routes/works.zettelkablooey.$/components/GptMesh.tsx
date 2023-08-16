import { Stage } from '@pixi/react'
import _ from 'lodash'
import { makeNoise3D } from 'open-simplex-noise'
import { BlurFilter } from 'pixi.js'
import { Fragment, Suspense, cloneElement, useMemo } from 'react'
import { useDimensions } from '../services/dom.client'
import LoopedGraphics from './LoopedGraphics'
import MyLink from './MyLink'
import MorphSpan from './MorphSpan'

export default function GptMesh(props: Parameters<typeof ClientGptMesh>[0]) {
  return (
    <Suspense fallback={<></>}>
      <ClientGptMesh {...props} />
    </Suspense>
  )
}

function ClientGptMesh({
  children,
  gptText,
}: {
  children: JSX.Element[]
  gptText: string
}) {
  const { w, h } = useDimensions()
  /**
   * @description Splits up the text based on random locations, making room for each of the children.
   */
  const formattedGptText = useMemo(() => {
    if (!gptText) return undefined
    const area = (w / 8) * (h / 24)
    let fullLengthText = gptText
    while (fullLengthText.length < area) fullLengthText += fullLengthText
    const slicedGptText = fullLengthText.slice(0, area)

    const splitGptText = slicedGptText.split(' ')
    const splits: number[] = children
      .map(() => _.random(splitGptText.length, false))
      .sort()

    let currentSplit = 0
    const formattedGptText = []
    for (let split of splits) {
      formattedGptText.push(splitGptText.slice(currentSplit, split).join(' '))
      currentSplit = split
    }
    formattedGptText.push(splitGptText.slice(currentSplit).join(' '))

    return formattedGptText
  }, [gptText, children])
  const noise3D = useMemo(() => makeNoise3D(Date.now()), [])
  const blurFilter = useMemo(() => new BlurFilter(5), [])

  if (!formattedGptText) return <></>
  return (
    <div className='h-full w-full overflow-hidden'>
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
            for (let x = 0; x <= w; x += 10) {
              for (let y = 0; y <= h; y += 10) {
                const n = noise3D(x, y, t / 1000)
                g.beginFill('white', n * 0.05)
                g.drawCircle(x, y, 20)
              }
            }
          }}
        />
      </Stage> */}
      {children.map((child, i) => {
        const splitChildren = child.props.children.split(' ')
        const link = _.random(splitChildren.length)
        const newLink = (
          <MyLink to={'/demos/zettelkablooey/'}>{splitChildren[link]}</MyLink>
        )
        return (
          <Fragment key={i}>
            <MorphSpan>{formattedGptText[i]}</MorphSpan>
            {cloneElement(child, {
              children: [
                <span>{splitChildren.slice(0, link).join(' ') + ' '}</span>,
                newLink,
                <span>{' ' + splitChildren.slice(link + 1).join(' ')}</span>,
              ],
            })}
          </Fragment>
        )
      })}
      <MorphSpan>{formattedGptText[formattedGptText.length - 1]}</MorphSpan>
    </div>
  )
}
