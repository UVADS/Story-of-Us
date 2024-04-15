<template>
  <div :id="`detail_${section.id}`" class="section-detail">
    <div class="section-top-container">
      <div class="col-3 section-years digital-number">
        <div class="flex-center-line">
          <div class="icon-container">
            <VectorsDot class="icon-dot"></VectorsDot>
          </div>
          <div class="section-year">
            {{ yearRange }}
          </div>
        </div>
      </div>
      <div class="btn-container" @click.prevent="collapseSection(section.id)">
        <CloseButton class="btn btn-top-close"></CloseButton>
      </div>
    </div>
    <div class="section-text">
      <div
        class="section-summary summary-detail"
        v-html="section.fields.summary"
        :id="`section-summary-${section.id}`"
      ></div>

      <div class="audioMobile">
        <slot> </slot>
      </div>
      <div class="section-title">{{ section.title.split(':')[1] }}</div>

      <div class="section-body" v-html="section.body"></div>

      <button
        class="btn-close btn"
        @click.prevent="collapseSection(section.id)"
      >
        Close Section
      </button>
    </div>
    <div class="section-media">
      <h3 class="section-content-header">Media</h3>
      <div class="section-media-images">
        <DocumentModal
          v-for="photo in section.fields.photos"
          :key="`image_${photo.url}`"
          :show="showModal"
          :image="photo"
          :ref="media"
          @close="showModal = false"
        >
        </DocumentModal>
      </div>
      <div class="section-media-videos">
        <DocumentModal
          v-for="vid in videoIds"
          :key="`video_${vid}`"
          :show="showModal"
          :video="vid"
          :ref="media"
          @close="showModal = false"
        >
        </DocumentModal>
      </div>
      <h3 class="section-content-header section-documents">Documents</h3>

      <div v-for="file in section.fields.files" :key="file.url">
        <DocumentModal
          :key="`document_modal_${section.id}_${file.id}`"
          :show="showModal"
          :document="file"
          ref="documents"
          @close="showModal = false"
        >
        </DocumentModal>
      </div>

      <h3 class="section-content-header">People</h3>
      <a
        v-for="person in section.fields.connected_people"
        :key="person.id"
        class="person-link"
        :href="`/people/${person.id}`"
      >
        {{ person.name }}
      </a>
      <br />
      <h3>Topics</h3>
      <div v-if="section.fields.topics">
        <a
          v-for="topic in section.fields.topics"
          :key="topic.id"
          class="topic-link"
          :href="`/topic/${titleUrl(topic.name)}`"
        >
          {{ topic.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import DocumentModal from './documentModal.vue'
import CloseButton from './vectors/closeButton.vue'
import dot from './vectors/dot.vue'
const store = useModalStore()
const visible = ref(false)
// const openModal = ref(null)
const showModal = ref(false)
const documents = ref([])
const media = ref([])
const videoIds = ref([])
const audioFiles = ref([])
let lastAudio = 0
const props = defineProps({
  section: {
    type: Object,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['visible'])

function collapseSection(section) {
  emits('visible', false)
  nextTick(() => {
    const sectionDetail = document.getElementById(`section_${props.section.id}`)
    sectionDetail.scrollIntoView({ behavior: 'smooth' })
  })
}

function getVideoId(video) {
  return /[^/]*$/.exec(video)[0]
}

function openModal(modal) {
  // store.openModal( component: DocumentModal )
}
const section = props.section
const yearRange =
  section.fields.year_range[0].start_year ===
  section.fields.year_range[0].end_year
    ? section.fields.year_range[0].start_year
    : section.fields.year_range[0].start_year +
      ' - ' +
      section.fields.year_range[0].end_year
const images = section.fields.photos
videoIds.value =
  section.fields.video !== undefined
    ? section.fields.video.map((vid) => /[^/]*$/.exec(vid.value)[0])
    : []
</script>

<style lang="scss" scoped>
.btn-close {
  width: 240px;
  height: 45px;
  color: #fff;
  margin-top: 30px;
}

.padding- .btn-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 20px;
}

.section-summary {
  max-height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
}
.section:last-child {
  border: none;
}

.section-detail {
  padding: 60px 0;
  display: flex;
  clear: both;
  border-bottom: #fff solid 1px;
  position: relative;
  .icon-container {
    padding-right: 10px;
  }
  .section-years {
    color: #fff;
    font-family: Digital-7;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    /* 110% */
    letter-spacing: 2px;
    width: 130px;
    margin-right: 110px;
    white-space: nowrap;
  }
  .flex-center-line {
    display: flex;
    align-items: center;
    padding: 10px 0 30px 0;
    margin-right: 120px;
    white-space: nowrap;
  }

  .section-summary,
  .section-text {
    max-width: 100%;
    color: #fff;
    font-size: 28px;
    font-style: normal;
    font-weight: 300;
    line-height: 40px;

    .section-title {
      color: #fdda24;
      font-weight: 600;
      padding: 30px 0;
    }

    p {
      font-size: 19px;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 30px;
    }

    .section-body {
      color: #fff;
      font-size: 19px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
      /* 157.895% */
    }

    .icon-container {
      padding-right: 10px;
    }

    .btn-top.btn {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  h3 {
    color: #fff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    /* 133.333% */
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 20px 0;

    &:first-of-type {
      padding-top: 0;
    }

    padding-left: unset !important;
  }

  .btn-close {
    border-radius: 50px;
    background: #ffffff11;
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    /* 112.5% */
    letter-spacing: -0.25px;
  }

  .section-media,
  .section-documents {
    padding-left: 120px;
    font-family: 'IBM Plex Mono', monospace;

    a {
      display: block;
      padding: 5px 0;
    }

    a,
    p {
      color: #fdda24;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      /* 142.857% */
      text-align: left;
      letter-spacing: 0em;
    }

    .section-media-images {
      display: flex;
      flex-direction: row;
      width: 240px;
      justify-content: flex-start;
      justify-items: flex-start;
      gap: 5px;
      max-width: 240px;
      flex-wrap: wrap;
      margin: 5px 7.5px;
    }

    .section-image-thumbnail {
      width: 110px;
      height: 62px;
      object-fit: cover;
      min-width: 110px;
    }

    .section-media-videos {
      padding: 10px 0px;
      max-width: 240px;
    }

    .video-player {
      padding: 20px 0;

      iframe {
        max-width: 240px;
        max-height: 120px;

        #player {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
@media (min-width: 769px) {
  .section-detail .btn-container {
    position: absolute;
    top: 15px;
    right: 10px;
  }
}
@media (max-width: 768px) {
  .section-play {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-left: 15px;
  }
  .section-detail {
    padding: 20px 21px;
    display: flex;
    flex-direction: column;
    clear: both;
    border-bottom: #fff solid 1px;
    width: 100%;
    .section-top-container {
      display: flex;
      justify-content: space-between;
    }
    .section-summary,
    .section-text {
      max-width: 100%;
      color: #fff;
      font-size: 24px;
      font-style: normal;
      font-weight: 300;
      line-height: 34px;
      /* 142.857% */
      padding-bottom: 30px;

      p {
        font-size: 18px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 10px;
      }
    }

    .btn-close {
      width: 240px;
      height: 45px;
      color: #fff;
      margin-top: 30px;
      text-align: center;
    }

    .section-media,
    .section-documents {
      img {
        max-width: 100%;
      }

      width: 100% !important;
      padding-left: unset !important;
      font-family: 'IBM Plex Mono', monospace;

      a {
        display: block;
        padding: 5px 0;
      }

      a,
      p {
        color: #fdda24;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
        /* 142.857% */
        text-align: left;
        letter-spacing: 0em;
      }

      .section-media-images {
        display: flex;
        flex-direction: row;
        width: 100% !important;
        justify-content: left;

        & > * {
          flex: 1;
        }

        .btn .btn-image {
          flex: 0 1 auto;
        }

        .section-image-thumbnail {
          object-fit: cover;
          padding: 0 5px;
          max-height: 120px;
          height: 100%;
          width: 100%;
        }
      }

      .video-player {
        padding: 20px 0;

        iframe {
          max-width: 100%;
          max-height: auto;

          #player {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
}
</style>
