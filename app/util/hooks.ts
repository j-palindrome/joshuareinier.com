import Ammo from "ammojs3";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import useStateRef from "react-usestateref";

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
  const [_mousePos, setMousePos, mousePosRef] = useStateRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const ready = useRef(true);
  const updateMousePos = (ev: MouseEvent) => {
    if (!ready.current) return;
    ready.current = false;
    requestAnimationFrame(() => {
      ready.current = true;
    });
    setMousePos({ x: ev.clientX, y: ev.clientY });
  };
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  });
  return mousePosRef;
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

export const useAnimationLoop = (
  animation: (timeDelta: number) => void,
  start: boolean = true
) => {
  const interval = useRef<number>(0);
  const thisTime = useRef<number>(Date.now());

  useEffect(() => {
    const animationFrame: FrameRequestCallback = (time) => {
      const timeDelta = time - thisTime.current;
      thisTime.current = time;
      animation(timeDelta);
      if (start) {
        requestAnimationFrame(animationFrame);
      }
    };
    if (start) {
      interval.current = requestAnimationFrame(animationFrame);
    }

    return () => {
      cancelAnimationFrame(interval.current);
    };
  }, [start]);
};

export const useAmmo = (
  setup: (world: Ammo.btDiscreteDynamicsWorld, ammo: typeof Ammo) => void,
  simulation: (world: Ammo.btDiscreteDynamicsWorld, ammo: typeof Ammo) => void
) => {
  const currentFrame = useRef<number>(0);
  useEffect(() => {
    Ammo().then((Ammo) => {
      const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
      const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
      const overlappingPairCache = new Ammo.btBroadphaseInterface();
      const solver = new Ammo.btSequentialImpulseConstraintSolver();
      const world = new Ammo.btDiscreteDynamicsWorld(
        dispatcher,
        overlappingPairCache,
        solver,
        collisionConfiguration
      );
      setup(world, Ammo);
      const step = () => {
        world.stepSimulation(1);
        simulation(world, Ammo);
        currentFrame.current = requestAnimationFrame(step);
      };
      currentFrame.current = requestAnimationFrame(step);
    });
    return () => {
      currentFrame.current && cancelAnimationFrame(currentFrame.current);
    };
  }, []);
};
