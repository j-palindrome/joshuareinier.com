import Kablooey from '../components/Kablooey'

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
