import type { V2_MetaFunction } from '@remix-run/node'
import { Link, Outlet } from '@remix-run/react'
import Section from '~/components/Section'
import ViewButton from '~/components/ViewButton'
import { images } from '../../assets/assets'
import DynamicSection from './DynamicSection'
import Tag from '~/components/Tag'
import { repulsion, useMatter } from '../../util/matter'
import {
  useAmmo,
  useAnimationLoop,
  useMousePosition,
  useWindow,
} from '~/util/hooks'
import { Bodies, Body, Constraint, Vector } from 'matter-js'
import invariant from 'tiny-invariant'
import { useEffect, useMemo, useRef } from 'react'
import Ammo from 'ammojs3'
import { useAnimate, useAnimation } from 'framer-motion'
import Header from '~/components/Header'

export const meta: V2_MetaFunction = () => [{ title: 'Home' }]

export default function Index() {
  return (
    <>
      <DynamicSection
        className='flex flex-col items-center justify-center font-serif'
        id='artist-statement'
      >
        <DynamicSection.Child angle={0.1}>
          My work tangles the webs of thought enshrining sapien’s separateness
          from the nonhuman
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.5}>
          —the animal, the artificial—
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.75}>
          opening to a cyborg, animistic, animated posthumanity.
        </DynamicSection.Child>
      </DynamicSection>
      <DynamicSection className='flex flex-col items-center justify-center font-serif'>
        <DynamicSection.Child angle={0.1} className='text-xl font-bold'>
          Performativity and interactivity
        </DynamicSection.Child>
        <DynamicSection.Child angle={1}>
          are integral to my practice:
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.75}>
          theater as surface that twists its insides out,
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.3}>
          turning audience into performer.
        </DynamicSection.Child>
      </DynamicSection>
      <DynamicSection className='flex flex-col items-center justify-center font-serif'>
        <DynamicSection.Child angle={0.1}>
          I believe in performance as a space of
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.5} className='text-3xl font-bold'>
          static and noise
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.75}>
          of productive difference between mediums
        </DynamicSection.Child>
        <DynamicSection.Child angle={0.3}>
          (of parasitism, as Michel Serres calls it)
        </DynamicSection.Child>
      </DynamicSection>
      <DynamicSection className='flex flex-col items-center justify-center font-serif'>
        {[
          <DynamicSection.Child angle={0.1} className='text-xl font-bold'>
            Engulf ourselves in a maelstrom and ask us to find a way in.
          </DynamicSection.Child>,
        ]}
      </DynamicSection>

      <Outlet />
    </>
  )
}