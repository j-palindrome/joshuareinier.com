import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Assured({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`assured${index}`}>{`
      the error of our ways
      in thinking there is
      flourishing without bound, without boundaries
      upon—is this not assurance? or the open wound
      without which one? a log lies
      —your mind, behind me
    `}</Kablooey>
  )
}
