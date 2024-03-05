<script setup>
const store = useChaptersStore()
await store.fetchChapters()
const chapters =store.chapters
const hasrun_chapters = ref(0)
</script>
<template>
    <div class="chapters">
      <ChapterInfo :chapters="chapters"></ChapterInfo>
    </div>
</template>

<style scoped>
.main-content
{
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
  animation: slide-in 1s forwards;
  animation-delay: 1s;
  transform: translateX(-100%);

}
@keyframes slide-in {
  0%
  {
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

/*

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
}*/