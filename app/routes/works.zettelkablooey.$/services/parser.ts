import _ from 'lodash'

export const convertTextToLines = (title: string, text: string): Line[] => {
  const fullLines = text.split('\n').map((text, i) => {
    const line = text.replace(/^\s+/, '').replace(/\s+$/, '')
    if (!line) return
    const newLine: Line = {
      t: line,
      w: line.length * 12,
      id: `${title}-${i}`,
      o: _.round(_.random(true), 2),
      to: _.sample([
        'alter-ego',
        'assured',
        'chance',
        'communication',
        'zettelkasten',
        'growth-from-inside',
        'linking',
        'no-answer',
        'order-disorder',
        'ordering',
        'registry',
        'systems',
        'without-order',
      ]) as string,
    }
    return newLine
  })
  return fullLines.filter((line) => line) as Line[]
}
