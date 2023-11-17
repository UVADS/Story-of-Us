<template>
  <div
    v-for="chapter in chapters"
    :key="field_chapter_number"
    class="chapter-info"
  >
    <div class="chapter-number">
      <a :href="`/chapters/${chapter.tid}`"
        >0{{ chapter.field_chapter_number }}</a
      >
    </div>
    <div class="chapter-name">
      <a :href="`/chapters/${chapter.tid}`">{{ chapter.name }}</a>
    </div>
    <div class="chapter-years">{{ chapter.field_years }}</div>
  </div>
</template>

<script setup>
const props = defineProps(['chapters'])
</script>

<style lang="scss">
.chapter-years {
  padding-top: 20px;
}

.chapters {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chapter-info {
  border-bottom: solid 1px #fff;
  display: grid;
  grid-template-columns: 120px auto;
  vertical-align: flex-start;
  align-items: center;
  align-content: center;
  height: calc(100% / 3);
  margin: 20px 0;
  clear: both;
  min-height: 240px;
}

.chapter-name {
  font-size: 48px;
  font-family: 'franklin-gothic-urw';
  font-style: normal;
  font-weight: 600;
  font-size: 90px;
  line-height: 80px;
}

.chapter-years {
  font-size: 24px;
  font-family: Digital-7;
  line-height: 24px;
  grid-column: 2;
}

.chapter-number {
  color: #fdda24;
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
</style>
