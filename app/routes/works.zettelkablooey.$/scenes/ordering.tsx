import { useLoaderData } from '@remix-run/react'
import GptMesh from '../components/GptMesh'
import Kablooey from '../components/Kablooey'
import Line from '../components/Line'
import { generatePrompt } from '../services/gpt.server'

export default function Ordering({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`ordering${index}`}>{`
      one first then another
      and so Adam named the animals: 
      —but if the starry-eyed have purpose to
      remarking upon their "one-another," a hierarchy emerges
      climbing towards the sky, a Babel
      when we learn instigation of force
      but what offset is there?
    `}</Kablooey>
  )
}
