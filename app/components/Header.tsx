import { Link, useParams } from "@remix-run/react";
import { Bodies, Constraint, Vector, Body } from "matter-js";
import { useMemo, useRef } from "react";
import invariant from "tiny-invariant";
import { useMousePosition, useWindow } from "~/util/hooks";
import { repulsion, useMatter } from "~/util/matter";

const STRENGTH = 0.001;
export default function Header() {
  const window = useWindow();
  const { role } = useParams();
  const fullHeight = !role;

  const mousePosRef = useMousePosition();
  const height = fullHeight ? window?.innerHeight ?? 0 : 200;

  const { bodies, constraints } = useMemo(() => {
    if (!window) return { bodies: [], constraints: [] };
    const props: Matter.IBodyDefinition = {
      inertia: 300,
    };
    const bodies: Matter.Body[] = [
      Bodies.circle(window.innerWidth * 0.5, height * 0.25, 50, {
        label: "ball-artist",
        ...props,
      }),
      Bodies.circle(window.innerWidth * 0.33, height * 0.75, 50, {
        label: "ball-researcher",
        ...props,
      }),
      Bodies.circle(window.innerWidth * 0.66, height * 0.75, 50, {
        label: "ball-designer",
        ...props,
      }),
    ];

    const midpoint = Vector.create(window.innerWidth / 2, height / 2);
    const constraints = bodies
      .map((body) =>
        Constraint.create({
          pointA: midpoint,
          bodyB: body,
          length: 0,
          stiffness: STRENGTH * 0.02,
          label: `midpoint-${body.label}`,
        })
      )
      .concat(
        bodies.flatMap((body) =>
          bodies
            .filter((otherBody) => otherBody !== body)
            .map((otherBody) =>
              Constraint.create({
                bodyA: body,
                bodyB: otherBody,
                length: window.innerWidth / 4,
                stiffness: STRENGTH * 0.05,
                label: `repulsion-${body.label}-${otherBody.label}`,
              })
            )
        )
      );

    const walls = [
      Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 10, {
        isStatic: true,
        label: "wall-1",
      }),
      Bodies.rectangle(0, height / 2, 10, height, {
        isStatic: true,
        label: "wall-2",
      }),
      Bodies.rectangle(window.innerWidth / 2, height, window.innerWidth, 10, {
        isStatic: true,
        label: "wall-3",
      }),
      Bodies.rectangle(window.innerWidth, height / 2, 10, height, {
        isStatic: true,
        label: "wall-4",
      }),
    ];

    bodies.push(...walls);

    return { bodies, constraints };
  }, [window, fullHeight]);

  const frame = useRef<HTMLDivElement>(null);

  useMatter(
    { bodies, constraints },
    ({ bodies, constraints }) => {
      if (!window) return;

      const mousePos = Vector.create(
        mousePosRef.current.x,
        mousePosRef.current.y
      );
      const balls = bodies.filter((body) => body.label.includes("ball"));
      const midpoint = Vector.create(window.innerWidth / 2, height / 2);

      const wall1 = bodies.find(
        (body) => body.label === "wall-1"
      ) as ReturnType<typeof Bodies.rectangle>;
      const wall2 = bodies.find(
        (body) => body.label === "wall-2"
      ) as ReturnType<typeof Bodies.rectangle>;
      const wall3 = bodies.find(
        (body) => body.label === "wall-3"
      ) as ReturnType<typeof Bodies.rectangle>;
      const wall4 = bodies.find(
        (body) => body.label === "wall-4"
      ) as ReturnType<typeof Bodies.rectangle>;

      invariant(wall1 && wall2 && wall3 && wall4);
      wall1.position.x = window.innerWidth / 2;
      wall2.position.y = height / 2;
      wall3.position.x = window.innerWidth / 2;
      wall3.position.y = height;
      wall4.position.x = window.innerWidth;
      wall4.position.y = height / 2;

      for (let constraint of constraints.filter((constraint) =>
        constraint.label.includes("midpoint")
      )) {
        constraint.pointA.x = midpoint.x;
        constraint.pointA.y = midpoint.y;
      }
      for (let constraint of constraints.filter((constraint) =>
        constraint.label.includes("repulsion")
      )) {
        constraint.length = window.innerWidth / 3;
      }

      for (let body of balls) {
        Body.applyForce(
          body,
          body.position,
          repulsion(body.position, mousePos, window.innerWidth, STRENGTH * -1)
        );

        const el = document.getElementById(body.label);
        invariant(el);
        el.style.setProperty(
          "translate",
          `${body.position.x}px ${body.position.y}px`
        );
      }
    },
    (_world, engine) => {
      engine.gravity.x = 0;
      engine.gravity.y = 0;
    }
  );

  const bodyClass = (thisRole: RoleType) =>
    `absolute flex ${
      fullHeight ? "w-[400px]" : thisRole === role ? "w-[200px]" : "w-[100px]"
    } transition-[height,width,background-color] aspect-square max-w-[50vw] duration-500 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700/20 z-0 hover:z-10 hover:bg-selection/50 font-menu`;

  return (
    <>
      <div className="h-12 w-full"></div>
      <div
        className={`${
          fullHeight ? "h-screen" : "h-[200px]"
        } relative w-screen transition-[height] duration-300`}
        ref={frame}
      >
        <Link to="artist" className={bodyClass("artist")} id="ball-artist">
          artist
        </Link>
        <Link
          to="researcher"
          className={bodyClass("researcher")}
          id="ball-researcher"
        >
          researcher
        </Link>
        <Link
          to="designer"
          className={bodyClass("designer")}
          id="ball-designer"
        >
          designer
        </Link>
      </div>
    </>
  );
}
