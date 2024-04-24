<template>
  <div
    v-for="chapter in chapters"
    :key="`chapter_${chapter.field_chapter_number}`"
    class="chapter-info"
  >
    <div class="chapter-number">
      <nuxt-link :to="`/chapters/${chapter.tid}`">
        0{{ chapter.field_chapter_number }}</nuxt-link
      >
    </div>
    <div class="chapter-name">
      <nuxt-link :to="`/chapters/${titleUrl(chapter.name)}`">{{
        chapter.name
      }}</nuxt-link>
      <span class="arrow"></span>
    </div>
    <div class="chapter-years padding-top-20">
      {{ yearRange(chapter.field_years) }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['chapters'])
function yearRange(years) {
  return years && years.includes('-') ? years : years + ' - ONWARDS'
}
</script>

<style lang="scss">
a,
div a {
  color: #fff;
  text-decoration: none !important;
}
.chapters {
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
}

.chapter-info {
  //animation: slide-in 10s ease-in;
  //animation-delay: 3s;
  border-bottom: solid 1px #fff;
  display: grid;
  grid-template-columns: 120px auto;
  vertical-align: flex-start;
  align-items: center;
  align-content: center;
  height: 240px;
  height: calc(100% / 3);
  clear: both;
  min-height: 240px;
  transition: all 0.5s;
}

.chapter-name {
  font-size: 48px;
  font-family: 'franklin-gothic-urw', 'Franklin Gothic', 'ITC Franklin Gothic',
    'franklin-gothic-ext-comp-urw', Arial, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 90px;
  line-height: 80px;
  transition: all 0.5s;
}

.chapter-years {
  font-size: 24px;
  font-family: Digital-7;
  line-height: 24px;
  grid-column: 2;
  animation: 2s;
  transition: all 0.5s;
  padding-top: 20px;
}

.chapter-number,
.chapter-number a {
  color: #fdda24 !important;
  font-family: Digital-7;
  font-size: 90px;
  font-style: normal;
  font-weight: 400;
  line-height: 80px;
  width: 120px;
  min-width: 120px;
  padding-top: calc(1em / 8);
}

.chapter-info:last-child {
  border: none;
}
@media (max-width: 768px) {
  .chapter-name {
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 100% */
  }
  .chapter-number {
    font-size: 50px;
    line-height: 30px;
  }
  .sections-page .chapter-info {
    border-bottom: solid 1px #fff;
    display: grid;
    grid-template-columns: 120px auto;
    vertical-align: flex-start;
    align-items: center;
    align-content: center;

    clear: both;
  }
  .chapter-years {
    font-size: 20px;
    line-height: 16px;
  }
}
</style>
<style lang="scss">
#chaptersPage {
  .chapter-name::after {
    content: '\00bb';
    position: relative;
    top: 0;
    left: 10px;
    transition: all 1s;
    opacity: 1;
    z-index: 10;
    display: none;
    color: #fdda24;
  }

  .chapter-info:hover {
    .chapter-name,
    .chapter-years {
      padding-left: 20px;
      filter: brightness(2);
      color: #fdda24;
      transition: all 0.5s;
    }
    .chapter-name a {
      color: #fdda24;
    }

    .chapter-name::after {
      transition: all 0.5s;
      opacity: 1;
      display: inline;
      filter: brightness(2);
    }
  }
}
</style>
