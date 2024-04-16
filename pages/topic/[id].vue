<template>
  <div class="topic-page">
    <div class="page-left">
      <div>
        <TopicHeader :topic="topic"></TopicHeader>
      </div>
      <div class="sections-list">
        <SectionFull
          v-for="(section, index) in topicSections"
          :key="section.id"
          :id="`section_${section.id}`"
          ref="sections"
          class="section"
          :section="section"
          @close-others="closeAll(section.id)"
          :index="index"
        >
        </SectionFull>
      </div>
    </div>
    <div class="page-right">
      <RightMenu :sections="topicSections" :hide-years="true"></RightMenu>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTopicsStore } from '~/stores/topics'
const route = useRoute()
const store = useTopicsStore()
const { fetchTopics } = store
await store.fetchTopics()
const topicName = route.params.id
const topics = store.getTopics

const id =
  topics[topics.findIndex((topic) => titleUrl(topic.name) === topicName)].id

const { data } = await useAPIFetch(`/api/topic/${id}`, {
  key: topicName
})
let current = null
const sections = ref([])
const topic = data.value.topic
const topicSections = data.value.sections

function closeAll(id) {
  const sectionDetail = document.getElementById(`section_detail_${id}`)

  sections.value.forEach((section) => {
    //sectionDetail.classList.toggle('hidden')
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
</script>
<style lang="scss">
.topic-page {
  display: flex;
  flex-direction: row;
  .page-left {
    max-width: 1080px;
  }
  .page-right {
    max-width: 240px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px; /* 114.286% */
    padding-left: 120px;
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
    .page-right {
      display: none;
    }
  }
}
</style>
