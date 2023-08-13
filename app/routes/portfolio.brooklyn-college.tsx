import { Outlet, useSearchParams } from "@remix-run/react";
import { useMemo } from "react";
import { images } from "~/assets/assets";
import Section from "~/components/Section";
import ViewButton from "~/components/ViewButton";
import WorksDisplay from "~/components/WorksDisplay";
import { Role, RoleFilter, Work, works } from "~/models/works";

export default function BrooklynCollege() {
  const [search, _setSearch] = useSearchParams();

  const thisWorks = works.artist;

  return (
    <>
      <div className="w-screen items-center p-4">
        <div className="flex w-full items-center justify-center space-x-8">
          <img
            src={images.headshot}
            className="aspect-square w-[150px] rounded-full"
          ></img>
          <div className="max-w-lg grow">
            <h1 className="text-4xl font-bold">Joshua Tazman Reinier</h1>
            <div className="italic">
              Portfolio: Brooklyn College, Performance & Interactive Media Arts
            </div>
            <div className="md:flex md:space-x-2 -md:space-y-2">
              <ViewButton href="/assets/doc/brooklyn-college_resume.pdf">
                Résumé
              </ViewButton>
              <ViewButton href="/assets/doc/brooklyn-college_personal-statement.pdf">
                Personal Statement
              </ViewButton>
            </div>
          </div>
        </div>
      </div>

      <WorksDisplay works={thisWorks} />
      <Outlet />
    </>
  );
}
