<script setup>
const store = useChaptersStore()
store.fetchChapters()
const chapters = computed(() => store.souChapters)
</script>
<template>
  <div class="main-content">
    <div class="chapters">
      <ChapterInfo :chapters="chapters"></ChapterInfo>
    </div>
  </div>
</template>

<style></style>
