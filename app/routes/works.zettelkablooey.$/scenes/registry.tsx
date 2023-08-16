import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Registry({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`registry${index}`}>{`
      A single world
      word connotes
      the unpacked expanse, a lively
      of sorts, a literary ecosystem
      the constant thicket of
      nonessence, quintessence, or a sequence? But
    `}</Kablooey>
  )
}
