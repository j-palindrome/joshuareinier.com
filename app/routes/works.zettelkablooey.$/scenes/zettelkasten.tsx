import Kablooey from '../components/Kablooey'

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
