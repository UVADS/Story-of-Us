<template>
  <button
    aria-label="Open document dialog"
    :aria-controls="`${modalId}`"
    :aria-expanded="showModal"
    aria-haspopup="dialog"
    v-if="document"
    class="btn btn-document"
    @click="toggleModal(true)"
  >
    {{ document.description }}
  </button>
  <button
    aria-label="Open image dialog"
    :aria-controls="`${modalId}`"
    :aria-expanded="showModal"
    aria-haspopup="dialog"
    v-if="image"
    class="btn btn-image"
    @click="toggleModal(true)"
  >
    <NuxtImg
      :key="image.url"
      :src="`${image.url.replace('files/', 'files/styles/max_650x650/public/')}`"
      :alt="image.alt"
      class="section-image-thumbnail"
    />
  </button>
  <button
    aria-label="Open video dialog"
    :aria-controls="`${modalId}`"
    :aria-expanded="showModal"
    aria-haspopup="dialog"
    v-if="video"
    class="btn btn-image"
    @click="toggleModal(true)"
  >
    <NuxtImg
      :src="`https://vumbnail.com/${video}.jpg`"
      sizes="300px"
      :alt="'video'"
      class="section-video-thumbnail"
    />
  </button>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        :aria-labelledby="triggerId"
        v-if="showModal"
        :id="modalId"
        class="modal-mask"
        ref="trapRef"
        role="dialog"
        onkeydown="event.key === 'Escape' && $emit('close')"
        :aria-expanded="showModal"
      >
        <div class="modal-container">
          <div class="modal-body">
            <div
              v-if="image"
              class="image"
            >
              <div class="image-description">
                {{ image.description }}
                {{ image.caption }}
                {{ image.credit }}
              </div>
              <div class="image-container">
                <NuxtImg
                  :src="`${image.url.replace('files/', 'files/styles/wide/public/')}`"
                  :alt="`${image.alt}`"
                  sizes="50vw sm:200px md:600px lg:1000px "
                />
              </div>
            </div>
            <div
              v-if="document"
              class="document"
            >
              <div class="document-description">
                <p>{{ document.description }}</p>
                <p>{{ document.summary }}</p>
                <br>
                <p>{{ document.author }}</p>
                <p>{{ document.pub_title }}</p>
                <p class="source-link">
                  {{ document.source_link }}
                </p>
              </div>
              <div class="document-container">
                <ClientOnly>
                  <VuePdfEmbed :source="docUrl" />
                </ClientOnly>
              </div>
            </div>
            <div
              v-if="video"
              class="video"
            >
              <VimeoPlayer
                id="vimeo-video-player"
                ref="player"
                :key="vimeoVideo"
                :video-id="video"
                class="video-player"
                :player-width="900"
                @playing="checkAudio"
              />
            </div>
          </div>
          <button 
            ref="btnModalClose" 
            class="modal-close btn btn-top-close" 
            @click="toggleModal(false)"
          >
            <Icon
              icon="gridicons:cross-circle"
              height="50"
              width="50"
            />
            <span class="sr-only">Close Section</span>
          </button>
        </div>
        <footer class="modal-footer">
          <slot name="footer" />
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import useFocusTrap from "../composables/useFocusTrap";
import { Icon } from '@iconify/vue'

const showModal = ref(false)
defineEmits(['close'])
const playerStore = useAudioStore
const videoTitle = ref('')
const props = defineProps({
  id: {
    type: Number,
  },
  isDocument: {
    type: Boolean,
  },
  isImage: {
    type: Boolean,
  },
  document: {
    type: Object,
    required: false,
    default: null,
  },
  image: {
    type: Object,
    required: false,
    default: null,
  },
  video: {
    type: String,
    required: false,
    default: null,
  },
  show: {
    type: Boolean,
  },
})
const { trapRef } = useFocusTrap();
const btnModalClose = ref(null)
const docUrl = props.document ? props.document.url : null
/* const width = computed(() => {
  if (process.client) {
    console.log(window.innerWidth)
    return window.innerWidth
  }
}) */

// ARIA Labels
const triggerId = `trigger-${props.id}`
const modalId = `modal-${props.id}`

function toggleModal(modalValue) {
  showModal.value = modalValue
  if (showModal.value) {
    document.body.classList.add('modal-open')
    // Put tab focus inside modal
    if (btnModalClose.value) {
      btnModalClose.value.focus()
    }
    watchEffect(() => {
      if (btnModalClose.value) {
        btnModalClose.value.focus()
      } else {
        // not mounted yet, or the element was unmounted (e.g. by v-if)
      }
    })
  }
  else {
    document.body.classList.remove('modal-open')
  }
}
function checkAudio() {
  if (playerStore.currentElement) {
    try {
      const audioElement = playerStore.currentElement
      console.log(audioElement)
      audioElement.pause()
    }
    catch (e) {
      console.log(e)
    }
  }
}
function keydownListener(event) {
  // Assert the key is escape
  if (event.key === 'Escape') toggleModal(false)
}
async function getVideoTitle() {
  const videoElement = document.getElementById('vimeo-video-player')
  if (videoElement) {
    videoElement.onloadedmetadata = () => {
      videoTitle.value = document
        .getElementById('vimeo-video-player')
        .getElementsByTagName('iframe')[0].title
    }
  }
}
// Attach event listener on mount
onMounted(() => {
  document.addEventListener('keydown', keydownListener)
  getVideoTitle()
})

// Clean up on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', keydownListener)
})
// Make a function that will trigger on keydown
</script>

<style lang="scss" scoped>
* {
  font-family: 'ibm-plex-mono', monospace !important;
}
.btn.btn-top-close {
  color: #fff;
}
.image,
.document {
  display: flex;
  height: 100%;
}
.image {
  height: 100%;
  img {
    width: 100%;
  }
}
.image-description,
.document-description {
  max-width: 300px;
  padding-right: 60px;
  align-content: start;
  flex: 0 0 300px;
  font-family: mo nospace;
  align-self: center;
  overflow: wrap;
}
.btn-document {
  color: #fdda24;
  margin-bottom: 1rem;
  max-width: 240px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  width: 240px;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
}
.image-container {
  max-width: 900px;
  width: 100%;
  align-self: center;
  margin: 0 auto;
}

.document-container,
.vue-pdf-embed {
  flex: 1 1 auto;
  align-self: center;
  max-width: 780px;
  max-height: inherit;
  canvas {
    max-height: 700px;
  }
}
.vue-pdf-embed {
  overflow: scroll;
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
  top: 1rem;
  right: 1rem;
  z-index: 10;
  background: transparent;
  border: none;
  .icon-close {
    color: #fff;
    background: #000;
  }

  @media (min-width: 768px) {
    top: 60px;
    right: 60px;
  }
}
.modal-mask {
  max-width: 100vw;
  max-height: 100vh;
  position: fixed;
  inset: 60px 0 0 0;
  background: rgba(0, 0, 0, 0.95);
  margin: 0 auto;
  padding: 60px;
  z-index: 5;
}
.modal-container {
  padding: 1rem;
  border-radius: 7px;
  color: #fff;
  height: 100%;
  width: 100%;
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
  transition: 0.15s var(--ease-authentic) all;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: 0.3s var(--ease-authentic) all;
}
.document-container {
  .toolbar {
    display: none;
  }
}

.document-container {
  max-height: 768px;
}

embed {
  max-height: 768px;
}
.video {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 100%;
}
@media (max-width: 768px) {
  .modal-container {
    padding: 0.5rem;
    width: inherit;
  }
  .image,
  .document {
    display: flex;
    flex-direction: column;
    width: unset;
    justify-content: center;
    padding: 0;
    .image-description,
    .document-description {
      max-width: 100%;
      min-height: 75px;
      flex: 0 0 auto;
      line-height: 1.5;
      font-family: monospace;
      text-align: center;
      padding: 0;
    }
    .document-container {
      max-height: 768px;
    }
    img {
      padding-top: 20px;
      width: 100%;
    }
  }

  .modal-mask {
    padding: 60px 10px;
  }
  #vimeo-video-player {
    iframe {
      width: 100% !important;
    }
  }
  #vimeo-video-player iframe {
    width: 100vw;
  }
}
embed html,
html {
  border: none;
  height: 768px;
  --page-border: none !important;
  --page-margin: none;
}
</style>
