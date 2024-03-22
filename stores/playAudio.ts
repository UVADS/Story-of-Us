import { defineStore } from 'pinia'

export const useMyPlayAudioStore = defineStore({
  id: 'myPlayAudioStore',
  state: () => ({
    isPlaying: false,
    currentlyPlaying: null
  }),
  actions: {
    test(id) {
      this.currentlyPlaying = id
    }
  },
  getters: {
    getCurrentlyPlaying: (state) => state.currentlyPlaying
  }
})
