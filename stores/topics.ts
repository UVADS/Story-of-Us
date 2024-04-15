import { defineStore } from 'pinia'

export const useTopicsStore = defineStore({
  id: 'TopicsStore',
  state: () => ({ topics: [] }),
  actions: {
    async fetchTopics(): Promise<void> {
      const { data } = await useAPIFetch<ResultsType>('/topics')
      if (data.value) {
        this.topics = data.value
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
