<template>
  <div :id="`teaser_${section.id}`" class="section-teaser" >
    <div class="col-3 section-years digital-number">
      <div class="flex-center-line">
        <div class="icon-container">
          <VectorsDot class="icon-dot"> </VectorsDot>
        </div>
        <div class="section-year">
          {{ yearRange }}
        </div>
      </div>
      <div v-if="audio()" class="section-play">
        <audio v-if="audio()" :id="`audioFile_${section.id}`" :src="audio().url"></audio>
        <button @click="playAudio(section.id)" :id="`playAudio_${section.id}`">
          <NuxtImg class="play-icon" src="/images/play.svg" />
        </button>

      </div>
    </div>
    <div class="section-summary">{{ section.fields.summary }}</div>
    <div class="section-image">
      <NuxtImg
        v-if="images[0] && images[0].url"
        class="image-opacity-50"
        :src="`${images[0].url}`"
        :alt="`${images[0].alt}`"
      />
    </div>
  </div>
</template>

<script setup>
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

const section = props.section
const yearRange =
  section.fields.year_range[0].start_year ===
  section.fields.year_range[0].end_year
    ? section.fields.year_range[0].start_year
    : section.fields.year_range[0].start_year +
      ' - ' +
      section.fields.year_range[0].end_year

const images =  section.fields.photos

function audio() {

return section.fields.audio && section.fields.audio.length > 0 ? section.fields.audio[0] : null
}
function playAudio(id) {
//let lastAudioFile = null

// console.log("lastAudio-entering", lastAudio)
//const lastAudioFile = document.getElementById(`audioFile_${lastAudio}`)
const audioElement = document.getElementById(`audioFile_${id}`)
if (audioElement.paused) {
  audioElement.play()
} else {
  audioElement.pause()
}
// lastAudio = id
//console.log("lastAudio-set", lastAudio)


}
</script>

<style lang="scss" scoped>
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
.icon-container {
  padding-right: 10px;
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
  line-height: 36px; /* 142.857% */
  padding-bottom: 30px;
}
.flex-center-line {
  display: flex;
  align-items: center;
  padding: 10px 0 30px 0;
  margin-right: 120px;
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
.section-image {
  align-self: center;
  margin-left: 120px;
  img {
    max-height: 150px;

    object-fit: cover;
  }
}
.section-play {
  padding: 30px 0;
}
.vector-dot {
  line-height: 22px;
}
@media (max-width:  768px) {
  .section-teaser {
  padding: 20px 21px;
  display: flex;
  flex-direction: column;
  max-height: unset;
  clear: both;
  border-bottom: #fff solid 1px;
}
.section-image {
display:none;
}
.section-play {
  display:none;
}
  .section-summary,
.section-text {
  max-width: 100%;
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 34px; /* 142.857% */
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
}
</style>