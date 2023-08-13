import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import { Role, Work, works } from "~/models/works";
import { cloneElement } from "react";
import WorkDisplay from "~/components/WorkDisplay";
import { log } from "console";

export default function Works() {
  const { role, work: route } = useParams() as { role: Role; work: string };
  const { search } = useLocation();

  const thisWorks = works[role] as Work<Role>[];
  const thisWork = thisWorks.find((work) => work.route === route);
  invariant(thisWork);

  return <WorkDisplay work={thisWork} to={`/${role}${search}`} />;
}
