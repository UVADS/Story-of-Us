<template>
  <div
    v-if="`!isHidden[${section.id}]`"
    :id="`detail_${section.id}`"
    class="section-detail"
    @load="`isHidden[${section.id}]= true`"
  >
    <div class="col-3 section-years digital-number">
      <div class="flex-center-line">
        <div class="icon-container">
          <VectorsDot class="icon-dot"> </VectorsDot>
        </div>
        <div class="section-year">
          {{ yearRange }}
        </div>
      </div>
      <div class="section-play">
        <img class="play-icon" src="/images/play.svg" />
      </div>
    </div>
    <div class="section-text">
      <div class="section-summary" v-html="section.fields.summary"></div>
      <div class="section-body" v-html="section.body"></div>
      <button class="btn-close" @click="`isHidden_${section.nid} = true`">
        Collapse Section
      </button>
    </div>
    <div class="section-media">
      <h3 class="section-content-header">Media</h3>
      <div class="section-media-images">
        <img
          v-for="photo in section.fields.photos"
          :key="photo.url"
          :src="`${photo.url}`"
          :alt="photo.alt"
          class="section-image-thumbnail"
        />
      </div>
      <VimeoPlayer
        ref="player"
        :video-id="videoId"
        :player-height="height"
        class="video-player"
        @ready="onReady"
      />
      <h3 class="section-content-header">Documents</h3>
      <div v-for="file in section.fields.files" :key="file.url">
        <a :href="`${file.url}`" target="_blank" rel="noopener noreferrer">
          {{ file.description }}
        </a>
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
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})

const section = props.section
const yearRange = computed(() =>
  section.fields.year_range[0].start_year ===
  section.fields.year_range[0].end_year
    ? section.fields.year_range[0].start_year
    : section.fields.year_range[0].start_year +
      ' - ' +
      section.fields.year_range[0].end_year
)
const images = computed(() => section.fields.photos)
const videoId = computed(() => {
  return /[^/]*$/.exec(section.fields.video)[0]
})
console.log(images)
</script>

<style lang="scss">
.section-teaser {
  padding: 60px 0;
  display: flex;
  max-height: 270px;
  clear: both;
  border-bottom: #fff solid 1px;
}
.section:last-child {
  border: none;
}
.flex-center-line {
  display: flex;
  align-items: center;
  padding: 10px 0 30px 0;
  margin-right: 120px;
  white-space: nowrap;
}
.section-years {
  color: #fff;
  font-family: Digital-7;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px; /* 110% */
  letter-spacing: 2px;
  width: 130px;
  margin-right: 110px;
  white-space: nowrap;
}
.section-summary,
.section-text {
  max-width: 480px;
  color: #fff;
  font-size: 28px;
  font-style: normal;
  font-weight: 300;
  line-height: 40px; /* 142.857% */
  padding-bottom: 30px;
}
.section-summary {
  max-height: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
}
.section-body {
  color: #fff;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 157.895% */
}
.icon-container {
  padding-right: 10px;
}
.section-detail {
  padding: 60px 0;
  display: flex;
  clear: both;
  border-bottom: #fff solid 1px;

  h3 {
    color: #fff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 20px 0;
    &:first-of-type {
      padding-top: 0;
    }
  }

  .section-media {
    width: 240px;
    margin-left: 120px;
    font-family: 'IBM Plex Mono', monospace;

    a {
      display: block;
      padding: 10px 0;
    }
    a,
    p {
      color: #fdda24;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
    .section-media-images {
      display: flex;
      flex-direction: row;
      width: 240px;
      justify-content: center;
    }
    .section-image-thumbnail {
      width: 110px;
      height: 62px;
      object-fit: fill;
      padding: 0 5px;
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
</style>
