<script setup>
const store = useChaptersStore()
await store.fetchChapters()
const chapters = store.chapters
const hasrun_chapters = ref(0)
</script>
<template>
  <div class="chapters" id="chaptersPage">
    <ChapterInfo :chapters="chapters"></ChapterInfo>
  </div>
</template>

<style scoped>
.main-content {
  padding: 0 120px;
}

.chapters {
  height: 100%;
  display: block;
  flex-direction: column;
}
</style>

<style lang="scss">
.chapter-info {
  animation: fade-in 1s forwards;
  animation-delay: 1s;
}
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@-webkit-keyframes slide-in {
  0% {
    -webkit-transform: translateX(-100%);
  }
  100% {
    -webkit-transform: translateX(0%);
  }
}
</style>
