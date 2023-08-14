import { useLocation, useParams } from '@remix-run/react'
import invariant from 'tiny-invariant'
import WorkDisplay from '~/components/WorkDisplay'
import { works } from '~/models/works'

export default function Works() {
  const { role, work: route } = useParams() as { role: RoleType; work: string }
  const { search } = useLocation()

  const thisWorks = works[role] as Work<RoleType>[]
  const thisWork = thisWorks.find((work) => work.route === route)
  invariant(thisWork)

  return <WorkDisplay work={thisWork} to={`/${role}${search}`} />
}
