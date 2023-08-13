import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { Role, Work, works } from "~/models/works";
import { cloneElement } from "react";
import WorkDisplay from "~/components/WorkDisplay";

export default function Works() {
  const { work: route } = useParams() as { work: string };
  const thisWorks = works.artist as Work<Role>[];
  const thisWork = thisWorks.find((work) => work.route === route);
  invariant(thisWork);

  return (
    <>
      <WorkDisplay work={thisWork} to="/portfolio/brooklyn-college" />
      <Outlet />
    </>
  );
}
