import { defineStore } from 'pinia'

export const useTopicsStore = defineStore('topics', {
  state: () => ({ topics: [] }),
  actions: {
    async fetchTopics(): Promise<void> {
      const { data } = await useAPIFetch<ResultsType>('/api/topic')
      if (data.value) {
        this.topics = data.value.topic
      }
    }
  },

  getters: {
    getTopics() {
      if (this.topics.length < 0) {
        fetchTopics()
      }
      return this.topics
    }
  }
})
