import { defineStore } from 'pinia'

export const usePeopleStore = defineStore( 'people', {
  state: () => ({ people: [] }),
  actions: {
    async fetchPeople(): Promise<void> {
      const { data } = await useAPIFetch<ResultsType>('/api/person')
      if (data.value) {
        this.people = data.value.person
      }
    }
  },

  getters: {
    getPeople() {
      if (this.people.length < 0) {
        fetchPeople()
      }
      return this.people
    },
    getPerson(state) {
      return (name) => state.people.find(person => person.name === name)
    }
  }
})
