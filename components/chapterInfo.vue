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
</style>
