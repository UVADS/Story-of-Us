<template>
  <div class="sections-page">
    <div class="sections-left">
      <div class="chapter-header">
        <ChapterInfo :chapters="chapter" />
      </div>
      <div class="sections-list">
        <SectionFull
          v-for="(section, index) in chapterSections"
          :id="`section_${section.id}`"
          :key="section.id"
          ref="sections"
          class="section"
          :section="section"
          :anchor="isAnchorSection(section.id)"
          :index="index"
          @close-others="closeAll(section.id)"
        >
          <template #audioPlayer>
            <AudioPlayer
              v-if="hasAudio(section)"
              :id="`audio_${section.id}`"
              ref="audioPlayers"
              :section="section"
              :is-responsive="false"
              class="full-audio"
              @click="audiodetails(section.id)"
            />
          </template>
          <template #audioPlayerMobile>
            <AudioPlayer
              v-if="hasAudio(section)"
              :id="`audio_${section.id}_responsive`"
              ref="audioPlayers"
              :is-responsive="true"
              :section="section"
              class="mobile-audio"
              @click="audiodetails(section.id)"
            />
          </template>
        </SectionFull>
      </div>
    </div>

    <div class="sections-right">
      <RightMenu :sections="chapterSections" :chapter-id="Number(id)" />
    </div>
  </div>
</template>

<script setup>
import { useChaptersStore } from '~/stores/chapters'

const route = useRoute()
const store = useChaptersStore()

await store.fetchChapters()
const chapterId = route.params.id
const chaptersList = store.getChapters
const id =
  chaptersList[
    chaptersList.findIndex((chapter) => titleUrl(chapter.name) === chapterId)
  ].tid

const chapter = chaptersList.filter(
  (chapter) => titleUrl(chapter.name) === chapterId
)
const { data } = await useAPIFetch(`/api/sections/${id}`, {
  key: route.params.id
})
// throw new Error(id)
const chapterSections = data.value.results
const sections = ref([])
const audioPlayers = ref([])
const anchorSections = [] // onMounted(() => {})
defineProps({
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
    document.getElementById(`section_detail_${id}`)
  })
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
    max-width: 1080px;
  }
  .section-year {
    white-space: nowrap;
  }

  .section-video {
    padding: 20px 5px;
    max-width: 240px;
  }

  .section:last-child {
    border-bottom: none;
    margin-bottom: 60px;
    .section-teaser {
      border-bottom: none;
    }
  }
}

.year-menu-list {
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
    min-height: 240px;
    height: fit-content;
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
      min-width: 100%;
    }
    .chapter-info {
      padding: 30px 0;
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
