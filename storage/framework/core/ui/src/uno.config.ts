import type { UserConfig as UnoConfig } from 'unocss'
import { presetForms } from '@julr/unocss-preset-forms'
import { ui } from '@stacksjs/config'
import { path } from '@stacksjs/path'
import presetWebFonts from '@unocss/preset-web-fonts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  // presetWebFonts,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,

} from 'unocss'

const config: UnoConfig = {
  shortcuts: ui.shortcuts,

  content: {
    pipeline: {
      include: [/\.(stx|vue|[jt]sx|mdx?|elm|html)($|\?)/],
      // exclude files
      // exclude: []
    },
  },

  presets: [
    presetUno(), // allows for Tailwind utility classes
    presetAttributify(),
    // presetHeadlessUi(),
    presetForms(), // allows for form Tailwind's form styling
    presetTypography(),
    presetIcons({
      prefix: 'i-',
      warn: true,
      collections: {
        hugeicons: () => import('@iconify-json/hugeicons/icons.json').then(i => i.default as any),
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),

    presetWebFonts({
      provider: 'google', // privacy-friendly Google Web Fonts proxy
      fonts: {
        'sans': 'Inter',
        'serif': 'Inter',
        'lobster': 'Lobster',
        'libre': [
          {
            name: 'Libre Baskerville',
            weights: ['400', '500', '700', '800'],
            italic: true,
          },
          {
            name: 'sans-serif',
            provider: 'none',
          },
        ],
        'pt-serif': [
          {
            name: 'PT Serif',
            weights: ['400', '500', '700', '800'],
            italic: true,
          },
          {
            name: 'serif',
            provider: 'none',
          },
        ],
        'mono': 'Fira Code',
      },

      processors: createLocalFontProcessor({
        // Directory to cache the fonts
        cacheDir: path.projectPath('node_modules/.cache/unocss/fonts'),

        // Directory to save the fonts assets
        fontAssetsDir: path.resourcesPath('assets/fonts'),

        // Base URL to serve the fonts from the client
        fontServeBaseUrl: path.resourcesPath('assets/fonts'),
      }),
    }),
  ],

  transformers: [
    transformerCompileClass({
      classPrefix: ui.classPrefix,
      trigger: ui.trigger,
    }),
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  safelist: ui.safelist?.split(' ') || [],

  theme: {
    colors: {
      offBrown: '#f8f5e8',
      offWhite: '#F9F7F1',
      offGray: '#FFFDF9',
      offWhiteDarker: '#EAE3CE',
      warmGray: '#E5DED0',
      softBrown: '#D4C5A8',
      deepBrown: '#8B7355',
      mutedBrown: '#B8A99A',
      richBrown: '#6B4F4F',
    },
    extend: {
      colors: {
        primary: '#1F1FE9',
        secondary: '#B80C09',
        success: '#CAFE48',
        dark: '#1A181B',
        light: '#F5F3F5',
      },
    },
  },
}

export default config
