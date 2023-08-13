import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mouse: { raw: '(hover: none)' },
        touch: { raw: '(hover)' },
        '-md': { max: '767px' },
        '-lg': { max: '1023px' },
        tall: { raw: '(min-height: 700px)' },
      },
      fontFamily: {
        menu: 'Dosis',
        serif: 'Cormorant Garamond',
        sans: 'Asap',
      },
      dropShadow: {
        text: '0 0 6px rgb(0, 0, 0)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('child', '& > *')
    }),
  ],
} satisfies Config
