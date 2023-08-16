import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Systems({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`systems${index}`}>{`
      a system
      of interlinked offset
      grapheme-control
      with every source collided
      : the "gravitation"—a simple determinant
      complexified by redoings, reorderings
      —if you're not before yourself
    `}</Kablooey>
  )
}
