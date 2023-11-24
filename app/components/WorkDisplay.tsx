import { Link, useParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import { works } from "~/models/works";

export default function WorkDisplay({ work }: { work: Work<RoleType> }) {
  const { role } = useParams() as { role: RoleType };
  const thisIndex = works[role].indexOf(work as any);

  const frame = useRef<HTMLDivElement>(null);
  const frame2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    invariant(frame.current && frame2.current);
    frame.current.scrollTo({ top: 0 });
    frame2.current.scrollTo({ top: 0 });
  }, [work]);

  const link =
    "w-full sm:w-[100px] py-2 sm:py-0 sm:h-[100px] rounded-full bg-slate-900 hover:bg-selection transition-colors duration-300 flex items-center justify-center text-sm text-center flex-none";

  return (
    <div className="floater" ref={frame}>
      <Link
        to={`/${role}`}
        className="absolute left-0 top-0 -z-10 h-full w-full cursor-pointer"
      >
        <div className="absolute right-0 top-0 m-2 flex h-6 w-6 items-center justify-center rounded-lg bg-slate-700 font-mono">
          x
        </div>
      </Link>
      <div className="flex grow items-center justify-center p-2">
        <Link
          to={`/${role}/${
            works[role][
              thisIndex === 0 ? works[role].length - 1 : thisIndex - 1
            ].route
          }`}
          className={`${link}`}
        >
          {
            works[role][
              thisIndex === 0 ? works[role].length - 1 : thisIndex - 1
            ].title
          }
        </Link>
      </div>
      <div className="floater-overlay" ref={frame2}>
        <div className="absolute top-0 -z-10 flex h-full w-full items-center justify-center brightness-50 child:h-full child:w-full child:max-w-none child:object-cover">
          {work.background}
        </div>
        <div className="space-y-4 p-4">
          <div className="relative w-full flex-col py-4 text-center drop-shadow-lg">
            <h2 className="text-4xl">{work.title}</h2>
            <h3 className="text-2xl">{work.subtitle}</h3>
          </div>
          <div className="space-y-4 rounded-lg bg-black/30 p-2 font-serif text-lg backdrop-blur">
            {work.description}
          </div>
          <div className="z-30">{work.content}</div>
        </div>
      </div>
      <div className="flex grow items-center justify-center p-2">
        <Link
          to={`/${role}/${
            works[role][(thisIndex + 1) % works[role].length].route
          }`}
          className={`${link}`}
        >
          {works[role][(thisIndex + 1) % works[role].length].title}
        </Link>
      </div>
    </div>
  );
}
