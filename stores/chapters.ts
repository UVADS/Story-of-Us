import { defineStore } from 'pinia'

export const useChaptersStore = defineStore('souChapters', {
  id: 'souChapters',
  state: () => ({ souChapters: ref([]) }),
  actions: {
    async fetchChapters() {
      const { data } = await useFetch('https://story.ddev.site:8444/chapters')
      if (data.value) {
        this.souChapters = data.value
      }
    }
  },
  getters: {
    getChapters() {
      if (this.souChapters.length < 0) {
        fetchChapters()
      }
      return this.souChapters
    }
  }
})
