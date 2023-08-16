import { useLoaderData } from '@remix-run/react'
import { isErrorResponse } from '@remix-run/react/dist/data'
import { OpenAIApi, Configuration } from 'openai'
import { readResponse } from './data.server'

/**
 * @borrows This only works inside useLoaderData
 * @see useLoaderData
 */
export const generatePrompt = async (
  prompt: string,
  config: Partial<
    Parameters<InstanceType<typeof OpenAIApi>['createChatCompletion']>[0]
  > = {
    temperature: 2,
    stream: false,
  }
) => {
  // const openai = new OpenAIApi(
  //   new Configuration({ apiKey: process.env.GPT_SECRET })
  // )

  // const newResponse = async () => {
  //   const response =
  //     (
  //       await openai.createChatCompletion({
  //         model: 'gpt-3.5-turbo',
  //         messages: [
  //           {
  //             role: 'user',
  //             content: prompt,
  //           },
  //         ],
  //         ...config,
  //       })
  //     ).data.choices[0].message?.content ?? ''

  //   if (response) writeResponse(prompt, response)

  //   return response
  // }
  // const response = newResponse()

  // return readResponse(prompt) || (await response)
  return readResponse(prompt as any)

  // const data = (
  //   await openai.createChatCompletion(
  //     {
  //       model: 'gpt-3.5-turbo',
  //       messages: [
  //         {
  //           role: 'user',
  //           content: prompt,
  //         },
  //       ],
  //       ...config,
  //     },
  //     { responseType: 'stream' }
  //   )
  // ).data

  // // @ts-ignore
  // data.on('data', (data: Buffer) => {
  //   try {
  //     if (data.includes('[DONE]')) return

  //     const { choices } = JSON.parse(
  //       data.toString('utf-8').replace('data: ', '')
  //     )
  //     const message: string = choices[0].delta.content
  //     if (!message) return
  //     console.log(message)
  //   } catch (err: any) {
  //     console.log(err['message'])
  //   }
  // })
}
