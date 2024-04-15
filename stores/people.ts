import { defineStore } from 'pinia'

export const usePeopleStore = defineStore({
  id: 'PeopleStore',
  state: () => ({ }),
  actions: {
    async fetchPeople(): Promise<void> {
      const { data } = await useAPIFetch<ResultsType>('/people')
      if (data.value) {
        this.people = data.value
      }
    }
  },

  getters: {
    getPeople() {
      if (this.people.length < 0) {
        fetchPeople()
      }
      return this.people
    }
  }
})
