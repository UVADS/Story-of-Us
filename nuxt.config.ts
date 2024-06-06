// https://nuxt.com/docs/api/configuration/nuxt-config
const host = process.env.SITE_HOST || 'https://localhost:4500'
const apihost
  = process.env.API_HOST || 'http://story-api.datascience.virginia.edu'

export default defineNuxtConfig({
  dev: process.env.NODE_ENV !== 'production',
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: false,
    },
  },
  build: {
    extend(config, _ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      })
    },
  },
  components: [
    '~/components',
    {
      path: '~/pages',
      pattern: '*/components/**',
      pathPrefix: false,
    },
  ],
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: ['assets/css/main.scss', 'assets/css/typed.scss'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'autoprefixer': {},
    },
  },
  head: {
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/kma2wyt.css' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap',
      },
    ],
  },
  runtimeConfig: {
    public: {
      siteHost: process.env.SITE_HOST || 'https://localhost:4500',
      apiHost:
        apihost || 'https://story-api.datascience.virginia.edu',
    },
  },
  routeRules: {
    '/pdf/**': { proxy: { to: process.env.API_HOST + '/**' } },
  },

  host,
  // Cache ttl
  cachettl: 3600,

  // Default meta items in our simple flat meta notation.
  defaultMeta: {
    title: 'The Story of Us - UVA School of Data Science',
    description:
      'The Story of US - School of Data Science at the University of Virginia. To Build A School Without Walls. It began as an idea then evolved into an institute before ultimately transforming into the first data science school in the country. In this exhibition you’ll learn how this improbable story unfolded and hear from the people who turned a vision into reality.',
    image: `${host}/uva-datascience-og.png`,
    image_width: 1200,
    image_height: 630,
    type: 'website',
    url: null,
  },
  gtag: {
    id: 'G-9TG2GBD71R',
  },
  modules: [
    '@nuxtjs/eslint-module',
    'nuxt-gtag',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],
  eslint: {

  },
  plugins: [
    { src: '~/plugins/vue-pdf-embed.client.js', ssr: false, mode: 'client' },
  ],
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'vue-typed-js',
    },
    app: {
      pageTransition: { name: 'page', mode: 'out-in' },
      layoutTransition: { name: 'layout', mode: 'out-in' },
    },
  },
})
