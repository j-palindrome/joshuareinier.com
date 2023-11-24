import _ from 'lodash'

export const lerp = (
  a: number,
  b: number,
  progress: number,
  config = { clamp: true }
) => {
  const value = a + (b - a) * progress
  return config.clamp
    ? _.clamp(value, ...([a, b].sort() as [number, number]))
    : value
}
