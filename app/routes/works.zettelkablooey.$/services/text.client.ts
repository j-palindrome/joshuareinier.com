import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'

export function useFakeStream(
  text: string,
  { speed = 100, variation = 0.5 } = {},
  start = true
) {
  const [streamedText, setStreamedText] = useState('')
  const currentWord = useRef(0)
  useEffect(() => {
    const words = text.split(' ')
    const addWord = () => {
      currentWord.current += 1
      if (currentWord.current >= words.length) return
      setStreamedText((text) => text + ' ' + words[currentWord.current])
      window.setTimeout(
        addWord,
        Math.max(1, speed * _.random(1 - variation, 1 + variation, true))
      )
    }
    if (start) addWord()
  }, [start])

  return streamedText
}
