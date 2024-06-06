import VuePdfEmbed from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/style/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VuePdfEmbed)
  nuxtApp.vueApp.component('VuePdfEmbed', VuePdfEmbed)
})
