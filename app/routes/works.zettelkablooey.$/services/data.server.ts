import { readFileSync, writeFile, writeFileSync } from 'fs'
import _ from 'lodash'
import data from './data.json'

export type Data = {
  posts: Record<string, string[]>
}

// let data = JSON.parse(
//   readFileSync(process.cwd() + '/public/data.json').toString('utf-8')
// ) as Data

// export function writeData(newData: Partial<Data>) {
//   data = { ...data, ...newData }
//   saveData()
// }

export function readResponse(post: keyof typeof data.posts) {
  return _.sample(data.posts[post]) ?? ''
}

// export function writeResponse(post: string, response: string) {
//   if (data.posts[post]) {
//     data.posts[post].push(response)
//   } else {
//     data.posts[post] = [response]
//   }
//   saveData()
// }

// function saveData() {
//   writeFileSync(process.cwd() + '/public/data.json', JSON.stringify(data))
// }
