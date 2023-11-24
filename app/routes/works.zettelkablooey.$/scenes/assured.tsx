import Kablooey from '../components/Kablooey'

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
