import type { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Section from '~/components/Section'
import { images } from '../assets/assets'
import ViewButton from '~/components/ViewButton'

export const meta: MetaFunction = () => [{ title: 'Home' }]

export default function Index() {
  return (
    <>
      <Section className='mx-auto max-w-4xl'>
        <img
          src={images.headshot}
          className='mx-auto aspect-square w-[300px] self-center rounded-lg sm:float-right sm:m-4'
        ></img>

        <p className='text-left'>
          His work tightropes the boundary between speech and sound, often
          taking the form of creative/critical hypertexts, performances, and
          installations. Inspired by posthumanist ideas, his work challenges
          anthropocentrism, using technology and multimedia to articulate
          technological, ghostly ways of being.
        </p>
        <p className='text-left'>
          Reinier attended Oberlin College and Conservatory, where he studied
          composition and comparative literature. He received Highest Honors for
          his undergraduate thesis, "Demons of Analogy: The Encounter Between
          Music and Language After Mallarmé," which investigates how French
          Symbolist poet Stéphane Mallarmé theorizes a musical poetics, and how
          music speaks back at this poetics. He has designed and taught four
          courses in Oberlin's Experimental College which explore experimental
          literature and posthumanist philosophies. He currently lives and works
          in New York City.
        </p>

        <div className='flex w-full space-x-2'>
          <ViewButton href='assets/doc/joshua-reinier_resume.pdf'>
            Résumé
          </ViewButton>
          <ViewButton href='assets/doc/joshua-reinier_cv.pdf'>CV</ViewButton>
        </div>
      </Section>
      <Outlet />
    </>
  )
}
