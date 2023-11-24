import { Graphics, useTick } from '@pixi/react'
import { Graphics as PixiGraphics } from 'pixi.js'
import { useCallback, useState } from 'react'
import invariant from 'tiny-invariant'

export default function LoopedGraphics(props: Parameters<typeof Graphics>[0]) {
  const [t, setT] = useState(0)
  useTick(() => setT(Date.now()))

  const draw = useCallback(
    (g: PixiGraphics) => {
      invariant(props.draw)
      props.draw(g)
    },
    [t]
  )
  return <Graphics {...props} draw={draw} />
}
