import { Link, useParams } from "@remix-run/react";
import { works } from "~/models/works";

export default function WorkDisplay({ work }: { work: Work<RoleType> }) {
  const { role } = useParams() as { role: RoleType };
  const thisIndex = works[role].indexOf(work as any);

  const link =
    "w-[100px] h-[100px] rounded-full bg-slate-900 hover:bg-selection transition-colors duration-300 flex items-center justify-center text-sm text-center";

  console.log("work", [(thisIndex - 1) % works[role].length]);

  return (
    <div className="floater">
      <Link
        to={`/${role}`}
        className="absolute left-0 top-0 -z-10 h-full w-full cursor-pointer"
      >
        <div className="absolute right-0 top-0 m-2 flex h-6 w-6 items-center justify-center rounded-lg bg-slate-700 font-mono">
          x
        </div>
      </Link>
      <Link
        to={`/${role}/${
          works[role][thisIndex === 0 ? works[role].length - 1 : thisIndex - 1]
            .route
        }`}
        className={`${link}`}
      >
        {
          works[role][thisIndex === 0 ? works[role].length - 1 : thisIndex - 1]
            .title
        }
      </Link>
      <div className="grow"></div>
      <div className="floater-overlay">
        <div className="absolute top-0 -z-10 flex h-full w-full items-center justify-center brightness-50 child:h-full child:w-full child:max-w-none child:object-cover">
          {work.background}
        </div>
        <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden">
          <h2 className="title text-4xl">{work.title}</h2>
          <h3 className="subtitle text-2xl">{work.subtitle}</h3>
        </div>

        <div className="space-y-4 p-4">
          <div className="space-y-4 rounded-lg p-2 text-base backdrop-blur">
            {work.description}
          </div>
          <div className="z-30">{work.content}</div>
        </div>
      </div>
      <div className="grow"></div>
      <Link
        to={`/${role}/${
          works[role][(thisIndex + 1) % works[role].length].route
        }`}
        className={`${link}`}
      >
        {works[role][(thisIndex + 1) % works[role].length].title}
      </Link>
    </div>
  );
}
