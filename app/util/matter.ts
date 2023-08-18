import {
  Bodies,
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
    const runner = Runner.run(engine.current)
    const eventCallback = (ev: Matter.IEventTimestamped<Engine>) =>
      draw(engine.current.world.bodies, ev.timestamp)
    Events.on(engine.current, 'beforeUpdate', eventCallback)

    if (setup) setup(engine.current.world, engine.current)

    return () => {
      World.clear(engine.current.world, false)
      Runner.stop(runner)
      Events.off(engine.current, 'beforeUpdate', eventCallback)
    }
  }, [bodies])
}

export const repulsion = (
  thisBody: Vector,
  thatBody: Vector,
  maxDistance: number,
  maxForce: number
) => {
  const diff = Vector.sub(thisBody, thatBody)
  const distance = Math.max(
    0,
    (maxDistance - Vector.magnitude(diff)) / maxDistance
  )

  return Vector.mult(Vector.normalise(diff), distance * maxForce)
}
