<template>
  <div class="sections-page">
    <div class="sections-left">
      <ChapterInfo :chapters="chapter"></ChapterInfo>
      <div class="sections-list">
        <div
          v-for="section in chapterSections"
          :key="section.nid"
          class="section"
        >
          {{ isHidden }}
          <SectionTeaser
            v-show="isHidden[section.nid]"
            :section="section"
            class="section-teaser"
            @click="showSectionDetails(section.nid)"
          ></SectionTeaser>

          <SectionDetail
            v-show="!isHidden[section.nid]"
            :section="section"
            class="section-detail"
          ></SectionDetail>
        </div>
      </div>
    </div>
    <div class="sections-right">
      <RightMenu
        :sections="chapterSections"
        :chapter-id="chapter.tid"
      ></RightMenu>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const store = useChaptersStore()
const chapterId = route.params.id
store.fetchChapters()
const chapters = store.getChapters
const chapter = chapters.filter((chapter) => chapter.tid === chapterId)
const { data, pending, error, refresh } = await useFetch(
  `https://story.ddev.site:8444/api/sections/${route.params.id}`,
  { key: route.params.id }
)
console.log(data)
console.log(error)
const chapterSections = data.value.results
defineProps({
  chapterName: { type: String },
  chapters: { type: Object },
  chapter: { type: Object },
  isHidden: {
    type: Array,
    default: () => []
  }
})
function showSectionDetails(section) {
  isHidden[section.nid] = !isHidden[section.nid]
  console.log(isHidden, section)
}
</script>

<style lang="scss">
.sections-page {
  display: flex;
  flex-direction: row;

  .sections-right {
    max-width: 240px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    padding-left: 120px;
    .menu-chapters {
      color: #fff;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 16px; /* 114.286% */
    }
  }

  .sections-left {
    max-width: 1080px;
  }
  .chapter-info {
    padding-bottom: 60px;
    margin: 0;
    align-items: start;
    height: fit-content;
  }

  .sections-list {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .section-year {
    white-space: nowrap;
  }

  .section-video {
    padding: 20px 5px;
    max-width: 240px;
  }
}

.year-menu-list {
  display: list-item;
  width: 70px;
  color: #fff;
}
.year-menu-item {
  color: #fff;

  font-family: ibm-plex-mono, Helvetica, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 230.769% */
}
</style>
