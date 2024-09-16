<template>
  <div :id="`teaser_${section.id}`" class="section-teaser">
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
    <div class="section-summary summary-teaser">
      <div class="section-title">
        {{ section.title.split(':')[1] }}
      </div>
      <div class="section-summary-text">{{ section.fields.summary }}</div>
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

/*
function hasAudio() {
  return section.fields.audio && section.fields.audio.length > 0
    ? section.fields.audio[0]
    : null
} */
</script>

<style lang="scss" scoped>
.section-teaser {
  padding: 40px 0;
  display: flex;
  max-height: 270px;
  border-bottom: #fff solid 1px;
  scroll-margin-top: 50px;
  scroll-behavior: smooth;

  @media (min-width: 768px) {
    min-height: 220px;
    padding: 60px 0;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
  }
  @media (min-width: 1280px) {
    display: grid;
    grid-template-columns: 240px auto 240px;
  }

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
    // margin-right: 110px;
    white-space: nowrap;
  }
  .section-summary {
    position: relative;
    font-size: 20px !important;
    line-height: 28px !important;
    padding-right: 1rem;
    width: 480px;

    @media (min-width: 1200px) {
      padding-right: 2rem;
    }
    
    .section-title {
      color: #fdda24;
      //position: absolute;
      //bottom: 0;
      text-align: left;
      width: 100%;
      padding-bottom: 20px;
      font-size: 24px;
      font-weight: 600;

      @media (max-width: 767px) {
        padding-bottom: 5px;
      }
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
  .section-summary-text {
    display: inline;
    background-image: linear-gradient(0deg, #fdda24 0, #fdda24);
    background-position: 0 100%;
    background-repeat: repeat-x;
    background-size: 100% 0px;
    transition: all 0.2s var(--ease-authentic);
  }
  .flex-center-line {
    display: flex;
    align-items: center;
    padding: 5px 0 30px 0;
    margin-right: 0px;

    @media (max-width: 7687px) {
      padding-bottom: 15px;
    }
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

    @media (min-width: 1280px) {
      width: 240px;
    }

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
    transition: all 0.3s;
    cursor: pointer;
    .section-summary {
      transition: all 0.3s;
      .section-summary-text {
        color: #000;
        background-size: 100% 100%;
        transition: all 0.2s var(--ease-authentic);
        opacity: 1;
      }
    }
    .section-image {
      .image-opacity-50 {
        opacity: 1;
        background: none;
        filter: brightness(1);
        mix-blend-mode: normal;
        transition: all 0.3s;
      }
    }
  }
}
@media (max-width: 768px) {
  .section-teaser {
    padding: 2rem 0;
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
      padding-bottom: 0;
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
