import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Ordering({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`order-disorder${index}`}
    >{`
      our offness, one organ fights another
      the structural coupling of gravity
      an essential determinant: sleepily taxonomized
      foregone from essential fear insipid of ears begone
      a corona of temporary reaction
      and the slippery rot of make
      believing that the olden days were
      and progressing towards the completion
    `}</Kablooey>
  )
}
