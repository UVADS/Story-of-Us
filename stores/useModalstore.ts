import { defineStore } from 'pinia'

const basicState = { component: null, props: {} }

export const useModalStore = defineStore({
  id: 'useModalStore',
  state: () => ({ modalState: { component: null, props: {} } }),
  actions: {
    openModal(payload) {
      // Get props and component from payload passed to function
      const { props, component } = payload

      // Assign them to our state
      this.modalState = { component, props: props || {} }
    },

    closeModal() {
      // Reset our state
      this.modalState = basicState
    }
  }
})
