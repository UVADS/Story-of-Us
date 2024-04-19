import { defineStore } from 'pinia'

export const useAudioStore = defineStore({
  id: 'audioStore',
  state: () => ({
    isPlaying: false,
    currentlyPlaying: null,
    currentElement: null

  }),
  actions: {
    test(id) {
      this.currentlyPlaying = id
    }
  },
  getters: {
    getCurrentlyPlaying: (state) => state.currentlyPlaying
  },
  setters: {

    setCurrentlyPlaying(state, id) {
      state.currentlyPlaying = id
    },
    setCurrentlyPlayingElement(state, element) {
      state.currentlyElement = element
    }

  }
})
