import _ from 'lodash'
import { RefObject, useEffect, useRef } from 'react'
import invariant from 'tiny-invariant'
import { lerp } from './math'

/**
 * @param el: either a document.querySelector string or a ref to an HTMLElement.
 * @param to: the destination (must set duration to activate)
 * @param duration: length of animation (ms)
 */
export const useFlicker = (
  el: RefObject<HTMLElement> | string,
  {
    go,
    key,
    from,
    to,
    duration,
    units,
    resetTo,
  }: {
    go: boolean
    key: keyof CSSStyleDeclaration
    from: { max: number; min: number }
    to?: { max: number; min: number }
    duration?: number
    units?: 'px' | 'vw' | 'vh' | '%' | ((amount: number) => string)
    resetTo?: number
  }
) => {
  const currentFlicker = useRef<{ max: number; min: number }>({ ...from })
  const startTime = useRef<number>()
  const nextFrame = useRef<number>()

  useEffect(() => {
    const styleElement = (setAmount?: number) => {
      if (!el) return

      const element =
        typeof el === 'string'
          ? (document.querySelector(el) as HTMLElement)
          : el.current

      if (!element) return

      const amount =
        setAmount ??
        _.round(
          _.random(
            currentFlicker.current.min,
            currentFlicker.current.max,
            true
          ),
          3
        )
      const unitAmount =
        typeof units === 'function' ? units(amount) : `${amount}${units ?? ''}`
      element.style.setProperty(key as string, unitAmount)
    }

    const flicker: FrameRequestCallback = (currentTime: number) => {
      if (!startTime.current) startTime.current = currentTime

      styleElement()

      if (to && duration) {
        const progress = (currentTime - startTime.current) / duration

        currentFlicker.current.max = lerp(from.max, to.max, progress)
        currentFlicker.current.min = lerp(from.min, to.min, progress)
        if (progress > 1.0) return
      }

      if (go) nextFrame.current = requestAnimationFrame(flicker)
    }

    if (go) {
      nextFrame.current = requestAnimationFrame(flicker)
    }

    return () => {
      nextFrame.current && cancelAnimationFrame(nextFrame.current)
      styleElement(resetTo ?? from.max)
    }
  }, [go, el])
}

export const useFlickers = (
  els: Parameters<typeof useFlicker>[0][],
  config:
    | Parameters<typeof useFlicker>[1]
    | Parameters<typeof useFlicker>[1][]
    | ((index: number) => Parameters<typeof useFlicker>[1])
) => {
  let i = 0
  if (typeof config === 'function') {
    for (let el of els) {
      useFlicker(el, config(i))
      i++
    }
  } else if (config instanceof Array) {
    for (let el of els) {
      invariant(config[i], 'Not enough configs in list')
      i++
      useFlicker(el, config[i])
    }
  } else {
    for (let el of els) {
      useFlicker(el, config)
    }
  }
}
