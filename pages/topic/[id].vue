<template>
  <div class="topic-page">
    <div class="page-left">
      <div>
        <TopicHeader :topic="topic" />
      </div>
      <div class="sections-list">
        <SectionFull
          v-for="(section, index) in topicSections"
          :id="`section_${section.id}`"
          :key="section.id"
          ref="sections"
          class="section"
          :section="section"
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
    <div class="page-right">
      <RightMenu :sections="topicSections" :hide-years="true" />
    </div>
  </div>
</template>

<script setup>
import SectionFull from '~/components/sectionFull.vue'
import { useTopicsStore } from '~/stores/topics'

const route = useRoute()
const store = useTopicsStore()

await store.fetchTopics()
const topicName = route.params.id
const topics = store.getTopics

const id =
  topics[topics.findIndex((topic) => titleUrl(topic.name) === topicName)].id

const { data } = await useAPIFetch(`/api/topic/${id}`, {
  key: topicName
})
const sections = ref([])
const audioPlayers = ref([])
const topic = data.value.topic
const topicSections = data.value.sections

function closeAll(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`)

  sections.value.forEach((section) => {
    // sectionDetail.classList.toggle('hidden')
    section.showDetails = false
    if (section.id === id) {
      sectionDetail.focus()
    }
  })
  nextTick(() => {
    // const sectionDetail = document.getElementById(`section_detail_${id}`)
  })
}
function audiodetails(id) {
  audioPlayers.value.forEach((player) => {
    if (player.id !== id) player.visible = false
  })
}
</script>

<style lang="scss">
.topic-page {
  display: flex;
  flex-direction: row;
  .page-left {
    // max-width: 1080px;
    width: 100%;
  }
  .page-right {
    max-width: 240px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    padding-left: 3rem;
    display: none;

    @media (min-width: 1280px) {
      max-width: 240px;
      padding-left: 60px;
    }
  }
}
@media (max-width: 768px) {
  .topic-page {
    .sections-list {
      display: flex;

      flex-direction: column;
      justify-content: space-evenly;
      width: 100%;
      max-width: 100%;
    }
  }
}
</style>
