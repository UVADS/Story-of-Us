import { defineStore } from 'pinia'

export const useChaptersStore = defineStore('chapters', {
  state: () => ({ chapters: [] }),
  actions: {
    async fetchChapters(): Promise<void> {
      const { data } = await useAPIFetch<ResultsType>('/chapters')
      if (data.value) {
        this.chapters = data.value
      }
    },
  },
  getters: {
    getChapters() {
      if (this.chapters.length < 0) {
        fetchChapters()
      }
      return this.chapters
    },
  },
})
