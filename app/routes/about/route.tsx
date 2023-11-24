import { images } from '~/assets/assets'
import ViewButton from '~/components/ViewButton'

export default function About() {
  return (
    <div className='floater'>
      <div
        className='absolute left-0 top-0 -z-10 h-full w-full cursor-pointer'
        onClick={() => history.back()}
      ></div>
      <div className='floater-overlay p-4'>
        <img
          alt='joshua tazman reinier'
          src={images.headshot}
          className='mx-auto aspect-square w-[300px] self-center rounded-lg sm:float-right sm:m-4'
        ></img>

        <p className='text-left'>
          Reinier's work tightropes the boundary between speech and sound, often
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
      </div>
    </div>
  )
}
