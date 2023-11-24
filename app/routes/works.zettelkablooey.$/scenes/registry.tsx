import Kablooey from '../components/Kablooey'

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
