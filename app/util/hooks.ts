import _ from "lodash";
import { useEffect, useRef, useState } from "react";

export function useWindow() {
  const [thisWindow, setWindow] = useState<typeof window>();

  useEffect(() => {
    setWindow(window);
  }, []);

  return thisWindow;
}

export const useDimensions = () => {
  const [{ w, h }, setDimensions] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const updateSize = () =>
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return { w, h };
};

export const useMousePosition = () => {
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const ready = useRef(true);
  useEffect(() => {
    const updateMousePos = (ev: MouseEvent) => {
      if (!ready.current) return;
      ready.current = false;
      requestAnimationFrame(() => {
        ready.current = true;
      });
      setMousePos([ev.clientX, ev.clientY]);
    };
    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  });
  return mousePos;
};

export const lerp = (
  a: number,
  b: number,
  progress: number,
  config = { clamp: true }
) => {
  const value = a + (b - a) * progress;
  return config.clamp
    ? _.clamp(value, ...([a, b].sort() as [number, number]))
    : value;
};
