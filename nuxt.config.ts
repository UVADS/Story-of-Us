// https://nuxt.com/docs/api/configuration/nuxt-config
const host = process.env.SITE_HOST || 'https://localhost:4500'
// const apihost = process.env.API_HOST || 'http://stage.datascience.virginia.edu:8080'

export default defineNuxtConfig({
  target: 'static',
  generate: {
    fallback: true
  },
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/kma2wyt.css' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap'
      }
    ]
  },
  runtimeConfig: {
    public: {
      siteHost: process.env.SITE_HOST || 'https://localhost:4500',
      apiHost:
        process.env.API_HOST || 'https://stage.datascience.virginia.edu:8443'
    }
  },

  host,
  // Cache ttl
  cachettl: 86400,

  // Default meta items in our simple flat meta notation.
  defaultMeta: {
    title: 'The Story of Us - UVA School of Data Science',
    description:
      'The Story of US - School of Data Science at the University of Virginia.',
    image: `${host}/uva-datascience-og.png`,
    image_width: 1200,
    image_height: 630,
    type: 'website',
    url: null
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }]
  ],
  plugins: [{ src: '~/plugins/infiniteloading', ssr: false }],
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }
  ]
})
