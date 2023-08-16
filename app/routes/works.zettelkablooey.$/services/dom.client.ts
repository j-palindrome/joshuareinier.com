import { useEffect, useRef, useState } from 'react'
import useStateRef from 'react-usestateref'

export const useDimensions = () => {
  const [{ w, h }, setDimensions] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return { w, h }
}

export const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const ready = useRef(true)
  useEffect(() => {
    const updateMousePos = (ev: MouseEvent) => {
      if (!ready.current) return
      ready.current = false
      requestAnimationFrame(() => {
        ready.current = true
      })
      setMousePos({ x: ev.clientX, y: ev.clientY })
    }
    window.addEventListener('mousemove', updateMousePos)
    return () => window.removeEventListener('mousemove', updateMousePos)
  })
  return mousePos
}
