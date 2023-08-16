import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import MyLink from '../components/MyLink'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Zettelkasten({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`zettelkasten${index}`}
    >{`
      There is nothing between
      What would you see if
      the morningstar of this everlasting
      remains
      about itself? about golden?
      the index, nonwithstanding
    `}</Kablooey>
  )
}
