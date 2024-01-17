<template>
  <button v-if="document" class="btn btn-document" @click="showModal = true">
    {{ document.description }}
  </button>
  <button v-if="image" class="btn btn-image" @click="showModal = true">
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
defineEmits(['close'])
defineProps({
  id: {
    type: Number
  },
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
  flex: 0 0 300px;
  font-family: monospace;
  align-self: center;
}
.btn-document
{
  color: #FDDA24;

  max-width:240px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  width:240px;

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
  flex: 1 1 760px;
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
  transition: 1s ease all;
}
.document-container {

  .toolbar {
    display:none;
  }
  :root{

  }
}

/* Inline #40 | https://localhost:4500/chapters/1 */

.document-container[data-v-ca2c163d] {
  /* max-height: fit-content; */
  /* max-height: inherit; */
  /* max-height: initial; */
  /* max-height: max-content; */
  /* max-height: min-content; */
  /* max-height: none; */
  /* max-height: revert; */
  /* max-height: revert-layer; */
  /* max-height: unset; */
  /* max-height: 7; */
  /* max-height: 76; */
  /* max-height: 768; */
  /* max-height: 768p; */
  max-height: 768px;
}

embed[data-v-ca2c163d] {
  /* max-height: 7; */
  /* max-height: 76; */
  /* max-height: 768; */
  /* max-height: 768p; */
  max-height: 768px;
}

/* viewer.css | resource://pdf.js/web/viewer.css */

@media (prefers-color-scheme: dark) {
  :root {
    max-height: 768px;
  }
}

.pdfViewer {
  /* --scale-factor: 1; */
}

body {
  /* scrollbar-color: var(--scrollbar-color) var(--scrollbar-bg-color); */
  scrollbar-color: rgb(255, 255, 255) var(--scrollbar-bg-color);
}

embed #toolbarViewer {
  /* height: 32px; */
  height: 0px;
  display: none;
}

.pdfViewer .page {
  border: none;
}

embed :root {
  color: white;
}

.pdfViewer .page {
  /* border: none; */
}

embed > html > body > div#outerContainer > div#mainContainer > div.toolbar
{
  display: none;
}


embed html, html {
  border: none;
  height: 768px;
  --page-border: none !important;
  --page-margin: none;
}
</style>
