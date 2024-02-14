<template>
  <div class="sections-page">
    <div class="sections-left">
      <div class="chapter-header">
        <ChapterInfo :chapters="chapter"></ChapterInfo>
      </div>
      <div class="sections-list">
        <SectionFull
          v-for="(section, index) in chapterSections"
          :key="section.id"
          :id="`section_${section.id}`"
          ref="sections"
          class="section"
          :section="section"
          :anchor="isAnchorSection(section.id)"
          @close-others="closeAll(section.id)"
          :index="index"
        >
        </SectionFull>
      </div>
    </div>
    <div class="sections-right">
      <RightMenu :sections="chapterSections" :chapterId="chapterId"></RightMenu>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useChaptersStore } from '~/stores/chapters';
const route = useRoute();
const store = useChaptersStore();
const { fetchChapters } = store; // have all non reactiave stuff here
await store.fetchChapters();
const chapterId = Number(route.params.id);
const chapters = store.getChapters;
const chapter = chapters.filter((chapter) => Number(chapter.tid) === chapterId);
//console.log(chapterId, chapters, chapter)
const {
  data,
  pending,
  error,
  refresh,
} = await useAPIFetch(`/api/sections/${route.params.id}`, {
  key: route.params.id,
});

const chapterSections = data.value.results;
const sections = ref([]);
let current = null;
let anchorSections = []; // onMounted(() => {})
const props = defineProps({
  chapterName: { type: String },
  chapters: { type: Object },
  chapter: { type: Object },
});

let sectionAnchors = [
  ...new Set(
    chapterSections.map((item) => item.fields.year_range[0].start_year)
  ),
];
chapterSections.forEach((section) => {
  const year = section.fields.year_range[0].start_year;

  if (sectionAnchors.includes(year)) {
    anchorSections.push(section.id);
    sectionAnchors = sectionAnchors.filter((item) => item !== year);
  }
});

function isAnchorSection(id) {
  return anchorSections.includes(id);
}

function closeAll(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`);
  sections.value.forEach((section) => {
    //sectionDetail.classList.toggle('hidden')
    section.showDetails = false;
    if (section.id === id) {
      section.value.focus();
    }
  });
  nextTick(() => {
    const sectionDetail = document.getElementById(`section_detail_${id}`);
  });
  current = id;
}
</script>
<style lang="scss">
.chapter-header {
  min-height: 240px;
  height: 240px;
  border-bottom: solid 1px #fff;
}
.sections-page,
.person-page,
.topic-page {
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
    height: 240px;
  }

  .sections-list {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 1080px;
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
@media (max-width: 768px) {
  .sections-right {
    display: none;
  }

  .chapter-name {
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 100% */
  }
  .chapter-number {
    font-size: 50px;
    line-height: 30px;
    width: unset;
    min-width: 120px;
  }

  .chapter-years {
    font-size: 20px;
    line-height: 16px;
  }
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
      padding: 60px 0;
      margin: 0;
      align-items: start;
      height: unset !important;
      display: block;
      grid-template-columns: unset;
      text-align: center;
      align-items: center;
      align-content: center;
      justify-content: center;
      clear: both;
      border: none;
      div {
        padding: 10px 0;
      }
    }

    .sections-list {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 100%;
    }
  }
}
</style>