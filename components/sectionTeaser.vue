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
      <div class="section-play">
        <img class="play-icon" src="/images/play.svg" />
      </div>
    </div>
    <div class="section-summary">{{ section.fields.summary }}</div>
    <div class="section-image">
      <img
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
  line-height: 40px; /* 142.857% */
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
  align-self: flex-end;
  margin-left: auto;
  img {
    max-height: 150px;

    object-fit: contain;
  }
}
.play-section {
  padding: 30px 0;
}
.vector-dot {
  line-height: 22px;
}
</style>
