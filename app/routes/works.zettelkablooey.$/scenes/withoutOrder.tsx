import Kablooey from '../components/Kablooey'

export default function WithoutOrder({ gptText, showEffect, index }: Props) {
  return (
    <Kablooey
      {...{ gptText, showEffect, index }}
      title={`without-order${index}`}
    >{`
      For there to be a spark
      mainly without us, the original
      classic idea: a commenced measurement
      of the—
      somewhat offset by the theoretical considerations of
      and if they could be reordered—a minimum standard of
      daily renewal
    `}</Kablooey>
  )
}
