import {
  MotionProps,
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Pt } from "pts";
import React, { useEffect, useMemo, useRef } from "react";
import invariant from "tiny-invariant";
import { useWindow } from "~/util/hooks";

export default function DynamicSection({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: ReturnType<typeof DynamicSection.Child>[];
}) {
  const thisRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    container.current = document.getElementById("container") as HTMLDivElement;
  }, []);
  const { scrollYProgress } = useScroll({
    target: thisRef,
    offset: ["start end", "end end"],
    container,
  });
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 50,
  });

  return (
    <div
      {...props}
      className={`${
        props.className ?? ""
      } relative h-screen w-screen snap-start overflow-hidden`}
      ref={thisRef}
    >
      {children.map((child: ReturnType<typeof DynamicSection.Child>, i) =>
        React.cloneElement(child, {
          ...child.props,
          progress: springProgress,
          key: i,
        })
      )}
    </div>
  );
}

function Child({
  children,
  angle,
  progress,
  ...props
}: MotionProps &
  React.HTMLAttributes<HTMLDivElement> & {
    angle: number;
    progress?: MotionValue<number>;
  }) {
  const window = useWindow();
  const fixedAngle = angle === 0.5 ? 0.499 : angle;
  const startLocation = useMemo(
    () =>
      new Pt(0, 1)
        .rotate2D(fixedAngle * Math.PI * 2)
        .scale(window?.innerWidth ?? 0),
    [window]
  );

  invariant(progress);
  const translate = useTransform(
    progress,
    [0, 1],
    [`${startLocation.x}px ${startLocation.y}px`, `0px 0px`]
  );

  return (
    <motion.div
      {...props}
      style={{
        ...props.style,
        translate,
      }}
    >
      {children}
    </motion.div>
  );
}

DynamicSection.Child = Child;
