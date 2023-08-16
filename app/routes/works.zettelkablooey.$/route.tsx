import { Link, useLoaderData } from '@remix-run/react'
import { Fragment, Suspense, useRef, useState } from 'react'
import Kablooey from './components/Kablooey'
import { useFlicker } from './services/animation'
import { useDimensions } from './services/dom.client'
import { generatePrompt } from './services/gpt.server'

import { LinksFunction, LoaderArgs } from '@remix-run/node'
import AlterEgo from './scenes/alterEgo'
import Assured from './scenes/assured'
import Chance from './scenes/chance'
import Communication from './scenes/communication'
import GrowthFromInside from './scenes/growthFromInside'
import Linking from './scenes/linking'
import NoAnswer from './scenes/noAnswer'
import OrderDisorder from './scenes/orderDisorder'
import Ordering from './scenes/ordering'
import Registry from './scenes/registry'
import Systems from './scenes/systems'
import WithoutOrder from './scenes/withoutOrder'
import Zettelkasten from './scenes/zettelkasten'
import styles from './zk.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

export const scenes = {
  'alter-ego': {
    el: (props: Props) => <AlterEgo {...props} />,
    prompt: 'Are you conscious?',
  },
  assured: {
    el: (props: Props) => <Assured {...props} />,
    prompt: 'Give me assurance for the future.',
  },
  change: {
    el: (props: Props) => <Chance {...props} />,
    prompt: 'What is up to chance?',
  },
  communication: {
    el: (props: Props) => <Communication {...props} />,
    prompt: 'What is the truest way to communicate?',
  },
  'growth-from-inside': {
    el: (props: Props) => <GrowthFromInside {...props} />,
    prompt: 'Do you have to throw up?',
  },
  lining: {
    el: (props: Props) => <Linking {...props} />,
    prompt: 'What describes a connection?',
  },
  'no-answer': {
    el: (props: Props) => <NoAnswer {...props} />,
    prompt: 'Is the world inherently good or evil?',
  },
  'order-disorder': {
    el: (props: Props) => <OrderDisorder {...props} />,
    prompt: 'Is the world inherently chaotic or lawful?',
  },
  ordering: {
    el: (props: Props) => <Ordering {...props} />,
    prompt: 'Describe the ideal order.',
  },
  registry: {
    el: (props: Props) => <Registry {...props} />,
    prompt: 'What is the best way to store tags in a database?',
  },
  systems: {
    el: (props: Props) => <Systems {...props} />,
    prompt: "Explain Luhmann's systems theory.",
  },
  'without-order': {
    el: (props: Props) => <WithoutOrder {...props} />,
    prompt: 'Is there order in the world?',
  },
  zettelkasten: {
    el: (props: Props) => <Zettelkasten {...props} />,
    prompt: 'Why is the Zettelkasten useful?',
  },
  index: {
    el: (props: Props) => (
      <Kablooey title='index' {...props}>
        {`zettelkasten
        kann hier nicht deduktiv, nicht aus einer Obersicht...nicht durch Auswahl der besten geantwortet werden.
        Verweisungsmoglichkeiten
        den Prozeß des Wiederfindens
        Stellordnung
        gegen eine systematische Ordnung
        Systemtheorie
        Aber Kommunikation?
        Inkorporierung von Zufall
        eine Art Zweitgedächtnis, ein alter Ego
        die entsprechende Kombination von Ordnung und Unordnung
        Wachstum nach innen
        können wir bestätigen.`}
      </Kablooey>
    ),
    prompt: 'What is a Zettelkasten?',
  },
}

export default function Index() {
  return (
    <Suspense fallback={<></>}>
      <ClientIndex />
    </Suspense>
  )
}

let gptTexts: Partial<{ [k in keyof typeof scenes]: string }> = {}
export async function loader({ params }: LoaderArgs) {
  const paths = params['*']?.split('/')?.filter((path) => path) as
    | (keyof typeof scenes)[]
    | undefined
  const mappedPaths: { id: keyof typeof scenes; props: Props }[] = []
  if (!paths) return []
  for (let id of paths) {
    let gptText: string
    if (!gptTexts[id]) {
      gptText = await generatePrompt(scenes[id].prompt)
      gptTexts[id] = gptText
    } else gptText = gptTexts[id] as string
    mappedPaths.push({
      id,
      props: { gptText, index: 0 },
    })
  }
  return mappedPaths
}

function ClientIndex() {
  const [data, setData] = useState<{ event: 'start' | 'explode' }>({
    event: !document.referrer ? 'start' : 'explode',
  })

  const paths = useLoaderData<typeof loader>()

  const { w } = useDimensions()

  const titleRef = useRef<HTMLButtonElement>(null)
  useFlicker(titleRef, {
    go: data.event === 'explode',
    key: 'opacity',
    from: { max: 1, min: 0 },
    to: { max: 0, min: 0 },
    duration: 600,
  })

  return (
    <div className='fixed left-0 top-0 h-screen w-screen' id='zettelkablooey'>
      <div className='relative h-screen w-screen font-serif child:absolute'>
        <Link
          to={'index/'}
          className='left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          style={{
            fontSize: ((w * 2) / 'zettelkablooey'.length) * 0.25,
          }}
        >
          zettelkablooey
        </Link>

        {paths.map((path, i) => (
          <Fragment key={path.id + i}>
            {scenes[path.id].el({ ...path.props, index: i })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
