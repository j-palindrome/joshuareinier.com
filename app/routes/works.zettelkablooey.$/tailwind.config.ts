import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import config from '../../../tailwind.config'

export default {
  ...config,
  content: ['./**/*.{js,jsx,ts,tsx,css}'],
  important: '#zettelkablooey',
  theme: {
    extend: {
      fontFamily: {
        serif: 'Times New Roman',
        mono: 'Kanit',
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
