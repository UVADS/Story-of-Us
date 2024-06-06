<script setup>
const store = useChaptersStore()
await store.fetchChapters()
const chapters = store.chapters
</script>

<template>
  <div>
    <div
      id="chaptersPage"
      class="chapters"
    >
      <ChapterInfo :chapters="chapters" />
    </div>
    <div>
      <div class="links">
        <NuxtLink
          class="btn-yellow"
          to="/about"
        >
          About This Project
        </NuxtLink>
        <NuxtLink
          class="btn-yellow"
          to="https://uvadatapoints.castos.com/episodes/the-story-of-us"
        >The Story of Us Full Podcast</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  padding: 0 120px;
}
.links {
  display: flex;
  display: none;
  margin-top: 30px;
  margin-bottom: 60px;

  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  .btn-yellow {
    margin: 0 20px;
    font-weight: 600;
  }
  .btn-yellow:hover {
    filter: brightness(0.9);
  }
}
.chapters {
  height: 100%;
  display: block;
  flex-direction: column;
}
@media (max-width: 768px) {
  .links {
    display: none;
    margin-top: 10px;
    margin-bottom: 100px;
    width: 100%;
    justify-content: space-around;
    .btn-yellow {
      margin: 10px 0px;
      font-weight: 600;
      line-height: 20px;
      align-items: center;
      height: 45px;
    }
    .btn-yellow:hover {
      filter: brightness(0.9);
    }
  }
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
