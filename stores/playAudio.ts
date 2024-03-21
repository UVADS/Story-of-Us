import { defineStore } from 'pinia'

export const useMyPlayAudioStore = defineStore({
  id: 'myPlayAudioStore',
  state: () => ({
    isPlaying: false,
    currentlyPlaying: null

  }),
  actions: {}
})
