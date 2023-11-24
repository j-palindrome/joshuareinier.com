import { Outlet, useParams, useSearchParams } from '@remix-run/react'
import Section from '~/components/Section'
import Tag from '~/components/Tag'
import WorksDisplay from '~/components/WorksDisplay'
import { works } from '~/models/works'

export default function Role() {
  const params = useParams()
  const role = params['role'] as RoleType
  const [search, setSearch] = useSearchParams()
  const filter = search.get('filter') as RoleFilter<RoleType> | null

  const setFilter = (newFilter: RoleFilter<RoleType>) => {
    search.set('filter', newFilter)
    setSearch(search)
  }

  const sections: Record<RoleType, () => JSX.Element> = {
    artist: () => (
      <>
        <div>
          My creative work encompasses{' '}
          <Tag to={() => setFilter('hypertext')}>hypertext</Tag> and{' '}
          <Tag to={() => setFilter('performance')}>performance</Tag>,
          deconstructing speech and writing by placing it in multimedia, coded
          ecosystems.
        </div>
      </>
    ),
    researcher: () => (
      <>
        <div>
          My <Tag to={() => setFilter('teaching')}>teaching</Tag> and{' '}
          <Tag to={() => setFilter('writing')}>writing</Tag> is informed by
          posthumanism and deconstruction, investigating technology and
          intermediality to find new approaches to the human.
        </div>
      </>
    ),
    designer: () => (
      <>
        As a <Tag to={() => setFilter('web')}>web</Tag> and{' '}
        <Tag to={() => setFilter('multimedia')}>multimedia</Tag> designer, I
        create tools for thought and innovative platforms for communication.
      </>
    ),
  }

  const thisWorks = (works[role] as Work<RoleType>[]).filter(
    (work) => !filter || work.filter === filter
  )

  return (
    <>
      <Section>{sections[role]()}</Section>
      <WorksDisplay works={thisWorks} />
      <Outlet />
    </>
  )
}
