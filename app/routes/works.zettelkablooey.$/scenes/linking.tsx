import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Linking({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`linking${index}`}>{`
      the world thwarted between our own offerings
      a system of control, of barbaric mutiny towards
      or claustrophobic, catacombed, convalescent
      my mother explains the doorway:
      and visited sound, reneging on the original
      favorably?
    `}</Kablooey>
  )
}
