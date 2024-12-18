<template>
  <div :id="`detail_${section.id}`" class="section-detail">
    <div class="section-top-container">
      <div class="col-3 section-years digital-number">
        <div class="flex-center-line">
          <div class="icon-container">
            <VectorsDot class="icon-dot" />
          </div>
          <div class="section-year">
            {{ yearRange }}
          </div>
        </div>
      </div>
    </div>
    <div class="section-text">
      <div
        :id="`section-summary-${section.id}`"
        class="section-summary summary-detail"
        v-html="section.fields.summary"
      />

      <div class="audioMobile">
        <slot />
      </div>
      <div class="section-title">
        {{ section.title.split(':')[1] }}
      </div>

      <div class="section-body" v-html="section.body" />

      <button
        class="btn-close btn"
        @click.prevent="collapseSection(section.id)"
        tabindex="-1"
      >
        <Icon icon="gridicons:cross" height="25" /> &nbsp; Close Section
      </button>
    </div>
    <div class="section-media">
      <h3 class="section-content-header">Media</h3>
      <div class="section-media-images">
        <DocumentModal
          v-for="photo in section.fields.photos"
          :key="`image_${photo.url}`"
          :ref="media"
          :show="showModal"
          :image="photo"
          @close="showModal = false"
        />
      </div>
      <div class="section-media-videos">
        <DocumentModal
          v-for="vid in videoIds"
          :key="`video_${vid}`"
          :ref="media"
          :show="showModal"
          :video="vid"
          @close="showModal = false"
        />
      </div>
      <h3
        v-if="hasDocuments()"
        class="section-content-header section-documents"
      >
        Documents
      </h3>

      <div v-for="file in section.fields.files" :key="file.url">
        <DocumentModal
          :key="`document_modal_${section.id}_${file.id}`"
          ref="documents"
          :show="showModal"
          :document="file"
          @close="showModal = false"
        />
      </div>

      <h3 v-if="hasPeople()" class="section-content-header">People</h3>
      <NuxtLink
        v-for="person in section.fields.connected_people"
        :key="person.id"
        class="person-link"
        :to="`/people/${titleUrl(person.name)}`"
      >
        {{ person.name }}
      </NuxtLink>
      <br />
      <h3 v-if="hasTopics()" class="section-content-header">Topics</h3>
      <div v-if="section.fields.topics">
        <NuxtLink
          v-for="topic in section.fields.topics"
          :key="topic.id"
          class="topic-link"
          :to="`/topic/${titleUrl(topic.name)}`"
        >
          {{ topic.name }}
        </NuxtLink>
      </div>
    </div>
    <!-- Close section button -->
    <div class="btn-container" @click.prevent="collapseSection(section.id)">
        <CloseButton class="btn btn-top-close" />
      </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import DocumentModal from './documentModal.vue'
import CloseButton from './vectors/closeButton.vue'

// const openModal = ref(null)
const showModal = ref(false)
const documents = ref([])
const media = ref([])
const videoIds = ref([])
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

function collapseSection() {
  emits('visible', false)
  nextTick(() => {
    document
      .getElementById(`section_${props.section.id}`)
      .scrollIntoView({ behavior: 'smooth' })
  })
}

function hasDocuments() {
  return props.section.fields.files && props.section.fields.files.length > 0
}
function hasTopics() {
  return props.section.fields.topics && props.section.fields.topics.length > 0
}
function hasPeople() {
  return (
    props.section.fields.connected_people &&
    props.section.fields.connected_people.length > 0
  )
}

const section = props.section
const yearRange =
  section.fields.year_range[0].start_year ===
  section.fields.year_range[0].end_year
    ? section.fields.year_range[0].start_year
    : section.fields.year_range[0].start_year +
      ' - ' +
      section.fields.year_range[0].end_year

videoIds.value =
  section.fields.video !== undefined
    ? section.fields.video.map((vid) => /[^/]*$/.exec(vid.value)[0])
    : []
</script>

<style lang="scss">
.btn-close {
  width: 240px;
  height: 45px;
  color: #fff;
  margin-top: 30px;

  &:hover, 
  &:focus {
    color: var(--color-yellow);
  }
}
.btn.btn-image,
.btn {
  text-decoration: none;
  border: none;
  padding: 0;
  border: none;
  background: none;
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
  .section-detail {
    border-bottom: none;
  }
}

.section-content-header {
  margin-top: 2rem;
}

.section-detail {
  padding: 60px 0;
  display: flex;
  border-bottom: #fff solid 1px;
  position: relative;

  @media (min-width: 768px) and (max-width: 1279px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 240px auto 240px;
  }

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
    min-width: 130px;
    // margin-right: 110px;
    white-space: nowrap;
    width: 100%;
  }
  .flex-center-line {
    display: flex;
    align-items: center;
    padding: 5px 0 30px 0;
    // margin-right: 120px;
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
      padding-bottom: 0;
    }

    .section-body {
      color: #fff;
      font-size: 19px;
      font-style: normal;
      font-weight: 400;
      line-height: 30px;
      /* 157.895% */

      > p:first-child {
        margin-top: 0;
      }
    }

    .icon-container {
      padding-right: 10px;
    }

    .btn-top.btn {
      position: absolute;
      top: 0;
      right: 21px;
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

    &:first-of-type {
      padding-top: 0;
    }

    padding-left: unset !important;
  }

  .btn-close {
    border-radius: 50px;
    background: var(--color-dark-blue-67);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    /* 112.5% */
    letter-spacing: -0.25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn.btn-top-close {
    color: #fff;
  }
  .section-media,
  .section-documents {
    // padding-left: 120px;
    font-family: 'IBM Plex Mono', monospace;

    a {
      display: block;
      padding: 5px 0;

      &:hover,
      &:focus {
        text-decoration: underline !important;
      }
    }

    a,
    p {
      color: #fdda24 !important;
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

      &:has(.btn.btn-image:only-child) {
        margin: 0;
      }

      img {
        width: 110px;
        max-width: 110px;
      }
      .btn.btn-image:only-child {
        width: 240px;
        width: 100%;

        @media (min-width: 768px) and (max-width: 1339px) {
          max-width: calc(25vw - 1.5rem);
          width: 100%;
        }

        img {
          max-width: inherit;
          width: inherit;
          height: auto;
        }
      }
    }

    .section-image-thumbnail {
      width: 110px;
      height: 62px;
      object-fit: cover;
      min-width: 110px;
      max-height: 135px;
      object-fit: cover;
    }

    .section-media-videos {
      padding: 10px 0px;
      max-width: 240px;

      @media (min-width: 768px) and (max-width: 1339px) {
        max-width: calc(25vw - 1.5rem);
        width: 100%;
      }

      .section-video-thumbnail {
        max-width: inherit;
        width: 240px;

        @media (min-width: 768px) and (max-width: 1339px) {
          max-width: calc(25vw - 1.5rem);
          width: 100%;
        }
      }
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

.section-detail {
  .section-summary,
  .section-text {
    max-width: 35ch;
    padding-right: 2rem;
    width: 100%;

    @media (max-width: 450px) {
      padding-right: 0;
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
  .audioMobile {
    padding-bottom: 80px;
  }
  .section-play {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding-left: 15px;
  }
  .section-detail {
    display: flex;
    flex-direction: column;
    clear: both;
    border-bottom: #fff solid 1px;
    padding: 2rem 0;
    .section-top-container {
      display: flex;
      justify-content: space-between;
    }
    .section-summary,
    .section-text {
      min-width: 100%;
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
      display: flex;
      align-items: center;
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
        flex-wrap: unset;
        margin: 0;
        gap: 10px;
        & > * {
          flex: 1;
        }

        .btn .btn-image {
          flex: 0 1 auto;
        }

        .section-image-thumbnail {
          object-fit: cover;
          padding: 0 0px;
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

.btn.btn-top-close {

  &:hover,
  &:focus {
    color: var(--color-yellow);
  }
}

.btn-image {
  transition: opacity 0.3s;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
}

.section-media {
  @media (min-width: 768px) and (max-width: 1020px) {
    max-width: calc(25vw - 1.5rem);
  }
}
</style>
