<template>
  <div :id="`teaser_${section.id}`" class="section-teaser">
    <div class="col-3 section-years digital-number">
      <div class="flex-center-line">
        <div class="icon-container">
          <VectorsDot class="icon-dot"> </VectorsDot>
        </div>
        <div class="section-year">
          {{ yearRange }}
        </div>
      </div>
    </div>
    <div class="section-summary summary-teaser">
      <div class="section-title">{{ section.title.split(':')[1] }}</div>
      <div>{{ section.fields.summary }}</div>
    </div>

    <div class="section-image">
      <NuxtImg
        v-if="images[0] && images[0].url"
        class="image-opacity-50"
        :src="`${images[0].url.replace('files/', 'files/styles/max_650x650/public/')}`"
        :alt="`${images[0].alt}`"
        sizes="300px sm:200px md:600px lg:1000px "
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

const images = section.fields.photos

function hasAudio() {
  return section.fields.audio && section.fields.audio.length > 0
    ? section.fields.audio[0]
    : null
}
</script>

<style lang="scss" scoped>
.section-teaser {
  padding: 60px 0;
  display: flex;
  max-height: 270px;
  border-bottom: #fff solid 1px;
  scroll-margin-top: 50px;
  scroll-behavior: smooth;

  .section-title {
    color: #fdda24;
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
  .section-summary {
    position: relative;
    font-size: 20px !important;
    line-height: 28px !important;
    width: 480px;
    .section-title {
      color: #fdda24;
      //position: absolute;
      //bottom: 0;
      text-align: left;
      width: 100%;
      padding-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
    }
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
    padding: 5px 0 30px 0;
    margin-right: 0px;
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
    width: 240px;
    img {
      max-height: 150px;
      width: 100%;
      object-fit: cover;
    }
  }

  .vector-dot {
    line-height: 22px;
  }
  &:hover {
    transition: all 0.5s;
    cursor: pointer;
    .section-summary {
      opacity: 0.75;
      transition: all 0.5s;
    }
    .section-image .image-opacity-50 {
      opacity: 1;
      background: none;
      mix-blend-mode: normal;
      transition: all 0.5s;
    }
  }
}
@media (max-width: 768px) {
  .section-teaser {
    padding: 20px 21px;
    display: flex;
    flex-direction: column;
    max-height: unset;
    border-bottom: #fff solid 1px;
    .section-image {
      display: none;
    }
    .section-summary,
    .section-text {
      color: #fff;
      font-size: 24px;
      font-style: normal;
      font-weight: 300;
      line-height: 34px; /* 142.857% */
      padding-bottom: 30px;
      width: 100%;
      max-width: 100% !important;
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
}
</style>
