import {
  Body,
  Constraint,
  Engine,
  Events,
  Runner,
  Vector,
  World,
} from 'matter-js'
import { useEffect, useRef } from 'react'

export const useMatter = (
  bodies: (Body | Constraint)[],
  draw: (bodies: Body[], timestamp: number) => void,
  setup?: (world: World, engine: Engine) => void
) => {
  const engine = useRef(Engine.create())
  useEffect(() => {
    World.add(engine.current.world, bodies as Body[])
    Runner.run(engine.current)
    Events.on(engine.current, 'beforeUpdate', (ev) =>
      draw(engine.current.world.bodies, ev.timestamp)
    )

    if (setup) setup(engine.current.world, engine.current)

    return () => {
      World.clear(engine.current.world, false)
      Engine.clear(engine.current)
    }
  }, [])
}

export const repulsiveBody = (max_distance: number, scale: number) => {
  return (thisBody: Body, thatBody: Body) => {
    const diff = Vector.sub(thatBody.position, thisBody.position)
    return Vector.mult(
      Vector.normalise(diff),
      Math.max(0, max_distance - Vector.magnitude(diff)) * scale
    )
  }
}
