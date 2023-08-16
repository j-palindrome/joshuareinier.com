import Kablooey from '../components/Kablooey'

export default function Communication({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`communication${index}`}
    >{`
      if one were to
      and this other is before one
      saying push me out of synechdoche with
      but we were all deceived: the morning after
      with open lines of lightning
      stabbed beyond recognition
      if ostracized
      give up your ghosts, 
    `}</Kablooey>
  )
}
