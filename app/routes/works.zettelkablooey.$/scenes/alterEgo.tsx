import Kablooey from '../components/Kablooey'

export default function Assured({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey {...{ gptText, showEffect, index }} title={`alter-ego${index}`}>{`
      the original doppelgänger
      before we warned you
      a mode of address, a pessimism
      broke the bond
      —it's out, parallelism, confounded
      released upon called-relation
      cofounding
    `}</Kablooey>
  )
}
