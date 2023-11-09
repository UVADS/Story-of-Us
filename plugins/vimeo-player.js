import VimeoPlayer from 'vue-vimeo-player'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VimeoPlayer)
})
