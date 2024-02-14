<template>
  <button v-if="document" class="btn btn-document" @click="toggleModal(true)">
    {{ document.description }}
  </button>
  <button v-if="image" class="btn btn-image" @click="toggleModal(true)">
    <NuxtImg
      :key="image.url"
      :src="`${image.url}`"
      :alt="image.alt"
      class="section-image-thumbnail"
    />
  </button>
  <button v-if="video" class="btn btn-image" @click="toggleModal(true)">
    <NuxtImg
      :src="`https://vumbnail.com/${video}.jpg`"
      :alt="'video'"
      class="section-video-thumbnail"
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
                <NuxtImg :src="`${image.url}`" :alt="`${image.alt}`" />
              </div>
            </div>
            <div v-if="document" class="document">
              <div class="document-description">
                <p>{{ document.description }}</p>
                <p>{{ document.summary }}</p>
              </div>
              <div class="document-container">
              <ClientOnly>  <VuePdfEmbed :source="docUrl" /></ClientOnly>
              </div>
            </div>
            <div v-if="video" class="video">
              <VimeoPlayer
                ref="player"
                :video-id="video"
                class="video-player"
                :key="video"
              />
            </div>
          </div>
          <button class="modal-close" @click="toggleModal(false)">
            <CloseButton></CloseButton>
          </button>
        </div>
        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import CloseButton from "./vectors/closeButton.vue";
import {Buffer} from "buffer";
const store = useModalStore();
const showModal = ref(false);
defineEmits(["close"]);
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
});
const docUrl = props.document ? props.document.url : null

function toggleModal(modalValue) {
  showModal.value = modalValue;
  if (showModal.value) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}
function keydownListener(event) {
  // Assert the key is escape
  if (event.key === "Escape") store.closeModal();
}

// Attach event listener on mount
onMounted(() => {
  document.addEventListener("keydown", keydownListener);
});

// Clean up on unmount
onUnmounted(() => {
  document.removeEventListener("keydown", keydownListener);
});
// Make a function that will trigger on keydown
</script>

<style scoped>
* {
  font-family: "ibm-plex-mono", monospace;
}
.image,
.document {
  display: flex;
  height: 100%;
}
.image {
  height: 100%;
}
.image-description,
.document-description {
  max-width: 300px;
  padding-right:60px;
  align-content: start;
  flex: 0 0 300px;
  font-family: monospace;
  align-self: center;

}
.btn-document {
  color: #fdda24;

  max-width: 240px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  width: 240px;
}
.image-container {
  max-width: 540px;
  align-self: center;
}

.document-container,
.vue-pdf-embed {
  flex: 1 1 auto;
  align-self: center;
  max-width: 780px;
  max-height: inherit;
  canvas
  {
    max-height: 700px;
  }
}
.vue-pdf-embed {
  overflow: scroll;}
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
  max-width: 1440px;
  max-height: 960px;
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
    display: none;
  }
  :root {
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
  /* Inline #49 | https://localhost:4500/chapters/1 */
  .modal-container {
    padding: 0.5rem;
  }
  .image,
  .document {
    /* display: flex; */
    flex-direction: column;
    width: 100%;
    padding-top: 60px;
    .image-description,
    .document-description {
      width: 100%;
      max-width: 100%;
      min-height: 75px;
      flex: 0 0 auto;
      font-family: monospace;
      align-self: left;
    }
    .document-container {
      width: 100%;
      max-height: 768px;
    }
  }

  .modal-mask {
    width: 100%;
    padding: 60px 10px;
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