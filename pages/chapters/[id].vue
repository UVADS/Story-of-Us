<template>
  <div class="sections-page">
    <div class="sections-left">
      <div class="chapter-header">
        <ChapterInfo :chapters="chapter"></ChapterInfo>
      </div>
      <div class="sections-list">
        <div v-for="(section, index) in chapterSections" :key="section.id">
          <SectionFull
            :id="`section_${section.id}`"
            ref="sections"
            class="section"
            :section="section"
            :anchor="isAnchorSection(section.id)"
            @close-others="closeAll(section.id)"
            :index="index"
          >
            <template v-slot:audioPlayer>
              <AudioPlayer
                :id="`audio_${section.id}`"
                v-if="hasAudio(section)"
                :section="section"
                ref="audioPlayers"
                @click="audiodetails(section.id)"
                class="full-audio"
              ></AudioPlayer>
            </template>
            <template v-slot:audioPlayerMobile>
              <AudioPlayer
                :id="`audio_${section.id}`"
                v-if="hasAudio(section)"
                :section="section"
                ref="audioPlayers"
                @click="audiodetails(section.id)"
                class="mobile-audio"
              ></AudioPlayer
            ></template>
          </SectionFull>
        </div>
      </div>
    </div>
    <div class="sections-right">
      <RightMenu
        :sections="chapterSections"
        :chapterId="Number(id)"
      ></RightMenu>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChaptersStore } from '~/stores/chapters'
const route = useRoute()
const store = useChaptersStore()
const { fetchChapters } = store
await store.fetchChapters()
const chapterId = route.params.id
const chapters = store.getChapters
const id =
  chapters[
    chapters.findIndex((chapter) => titleUrl(chapter.name) === chapterId)
  ].tid

const chapter = chapters.filter(
  (chapter) => titleUrl(chapter.name) === chapterId
)
const { data, pending, error, refresh } = await useAPIFetch(
  `/api/sections/${id}`,
  {
    key: route.params.id
  }
)
//throw new Error(id)
const chapterSections = data.value.results
const sections = ref([])
const audioPlayers = ref([])
let current = null
let anchorSections = [] // onMounted(() => {})
const props = defineProps({
  chapterName: { type: String },
  chapters: { type: Object }
})

let sectionAnchors = [
  ...new Set(
    chapterSections.map((item) => item.fields.year_range[0].start_year)
  )
]
chapterSections.forEach((section) => {
  const year = section.fields.year_range[0].start_year

  if (sectionAnchors.includes(year)) {
    anchorSections.push(section.id)
    sectionAnchors = sectionAnchors.filter((item) => item !== year)
  }
})

function isAnchorSection(id) {
  return anchorSections.includes(id)
}
function audiodetails(id) {
  audioPlayers.value.forEach((player) => {
    if (player.id !== id) player.visible = false
  })
}
function closeAll(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`)

  sections.value.forEach((section) => {
    section.showDetails = false

    if (section.id === id) {
      sectionDetail.focus()
    }
  })

  nextTick(() => {
    const sectionDetail = document.getElementById(`section_detail_${id}`)
  })
  current = id
}

useHead({
  title: `Chapter ${chapter[0].field_chapter_number} - ${chapter[0].name}`,
  meta: [
    {
      name: 'description',
      content: chapterSections[0].fields.summary
    },
    {
      name: 'og:image',
      content: chapterSections[0].fields.photos
        ? chapterSections[0].fields.photos[0].url
        : null
    }
  ]
})
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
  .section-play.full-audio {
    display: none;
  }
  .sections-right {
    display: none;
  }

  .chapter-header {
    padding-bottom: 30px;
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
    justify-content: center;
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
      max-width: 100%;
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
