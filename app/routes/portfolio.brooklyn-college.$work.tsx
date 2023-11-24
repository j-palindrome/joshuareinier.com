import { Outlet, useParams } from '@remix-run/react'
import invariant from 'tiny-invariant'
import WorkDisplay from '~/components/WorkDisplay'
import { works } from '~/models/works'

export default function Works() {
  const { work: route } = useParams() as { work: string }
  const thisWorks = works.artist as Work<RoleType>[]
  const thisWork = thisWorks.find((work) => work.route === route)
  invariant(thisWork)

  return (
    <>
      <WorkDisplay work={thisWork} />
      <Outlet />
    </>
  )
}
