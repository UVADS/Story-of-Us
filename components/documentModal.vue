<template>
  <button v-if="document" class="btn" @click="showModal = true">
    {{ document.description }}
  </button>
  <button v-if="image" class="btn" @click="showModal = true">
    <img
      :key="image.url"
      :src="`${image.url}`"
      :alt="image.alt"
      class="section-image-thumbnail"
    />
  </button>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="showModal"
        class="modal-mask"
        onkeydown="event.key === 'Escape' && $emit('close')"
      >
        <div class="modal-container">
          <div class="modal-body">
            <div v-if="image" class="image">
              <div class="image-description">
                {{ image.description }}
                {{ image.caption }}
                {{ image.credit }}
              </div>
              <div class="image-container">
                <img :src="`${image.url}`" :alt="`${image.alt}`" />
              </div>
            </div>
            <div v-if="document" class="document">
              <div class="document-description">
                <p>{{ document.description }}</p>
                <p>{{ document.summary }}</p>
              </div>
              <div class="document-container">
                <embed :src="`${document.url}#toolbar=0`" />
              </div>
            </div>
            <button class="modal-close" @click="showModal = false">
              <CloseButton></CloseButton>
            </button>
          </div>
          <footer class="modal-footer">
            <slot name="footer"> </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import CloseButton from './vectors/closeButton.vue'
const store = useModalStore()
const showModal = ref(false)
defineProps({
  isDocument: {
    type: Boolean
  },
  isImage: {
    type: Boolean
  },
  document: {
    type: Object,
    required: false,
    default: null
  },
  image: {
    type: Object,
    required: false,
    default: null
  },
  show: {
    type: Boolean
  }
})
function keydownListener(event) {
  // Assert the key is escape
  if (event.key === 'Escape') store.closeModal()
}

// Attach event listener on mount
onMounted(() => {
  document.addEventListener('keydown', keydownListener)
})

// Clean up on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', keydownListener)
})
// Make a function that will trigger on keydown
</script>

<style scoped>
/* Inline #33 | https://localhost:4500/chapters/1 */
* {
  font-family: 'ibm-plex-mono', monospace;
}
.image,
.document {
  display: flex;
}
.image {
  height: 100%;
}
.image-description,
.document-description {
  max-width: 300px;
  align-content: start;
  align-self: center;
  margin: 0 120px 0 60px;
  font-family: monospace;
}

.modal-container[data-v-ca2c163d] {
  height: 100%;
  width: 100%;
}

.image-container {
  max-width: 740px;
  align-self: center;
}

.document-container {
  flex: 0 0 760px;
  align-self: center;
}
embed {
  width: 100%;
  height: 100%;
  min-height: 80vh;
}
.modal-body {
  height: 100%;
  width: 100%;
}
.modal-close {
  position: absolute;
  top: 60px;
  right: 60px;
}
.modal-mask {
  width: 1440px;
  height: 960px;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  margin: 0 auto;
  padding: 60px;
}
.modal-container {
  padding: 1rem;
  border-radius: 7px;
  color: #fff;
}
.modal-footer {
  /*border-top: 1px solid #ddd;*/
  margin-top: 1rem;
  padding-top: 0.5rem;
  font-size: 0.8rem;
}
.modal-footer button {
  background: #ddd;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}
.modal-footer button:hover {
  background: #c8c8c8;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: 0.25s ease all;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.5s ease all;
}
</style>
